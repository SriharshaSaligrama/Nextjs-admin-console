"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { groupValidator } from "../validators";
import { addGroup, addGroupModal, deleteGroup, editGroup, editGroupModal, getGroup } from "./controller";
import { getFormDataObject, mongoErrorHandler } from "../../utils";
import { getUserType } from "../user/controller";

export async function addEditGroupAction(prevState, data) {
    try {
        const { id, name, code, description, members } = getFormDataObject(data)

        const errors = await groupValidator({ name, code, members: JSON.parse(members), editId: id })

        if (Object.values(errors).some(error => error.length > 0)) {
            return errors
        }

        const membersTypePromises = JSON.parse(members)?.length > 0 ? JSON.parse(members)?.map(async (member) => {
            const data = { email: member };
            const userType = await getUserType(member);
            data.type = userType;
            return data;
        }) : [];

        const membersType = await Promise.all(membersTypePromises);

        const addedOrUpdatedGroupError = id ?
            await editGroup(id, { name, code, description, members: membersType }) :
            await addGroup({ name, code, description, members: membersType })

        mongoErrorHandler({ errorProneFields: ['name', 'code'], mongoError: addedOrUpdatedGroupError })
    } catch (error) {
        console.log({ addedOrUpdatedGroupError: error })
        throw new Error(error)
    }

    revalidatePath("/groups")
    redirect("/groups")
}

export async function addEditGroupModalAction(data) {
    try {
        const { id, name, code, description, members } = data

        const errors = await groupValidator({ name, code, members, editId: id })

        if (Object.values(errors).some(error => error.length > 0)) {
            return { errors }
        }

        const membersTypePromises = members?.length > 0 ? members?.map(async (member) => {
            const data = { email: member };
            const userType = await getUserType(member);
            data.type = userType;
            return data;
        }) : [];

        const membersType = await Promise.all(membersTypePromises);

        const addedOrUpdatedGroup = id ?
            await editGroupModal(id, { name, code, description, members: membersType }) :
            await addGroupModal({ name, code, description, members: membersType })

        if (addedOrUpdatedGroup?.error || addedOrUpdatedGroup?.errors || addedOrUpdatedGroup?.message) {
            mongoErrorHandler({ errorProneFields: ['name', 'code'], mongoError: addedOrUpdatedGroup })
        } else {
            revalidatePath("/groups")
            return addedOrUpdatedGroup
        }
    } catch (error) {
        console.log({ addGroupError: error })
        throw new Error(error)
    }
}

export async function deleteGroupAction({ id, transferringGroupId }) {
    try {
        const transferringGroup = await getGroup(transferringGroupId)
        if (transferringGroupId && !transferringGroup?.id) {
            throw new Error('Transferring group not found')
        }
        const deleteGroupError = await deleteGroup({ id, transferringGroupId })

        mongoErrorHandler({ mongoError: deleteGroupError })
    } catch (error) {
        console.log({ deleteGroupError: error })
        throw new Error(error)
    }

    revalidatePath("/groups")
    redirect("/groups")
}