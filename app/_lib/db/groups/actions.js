"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { groupValidator } from "../validators";
import { addGroup, addGroupModal, deleteGroup, editGroup, editGroupModal } from "./controller";
import { getFormDataObject, mongoErrorHandler } from "../../utils";
import { getUsers } from "../user/controller";

export async function addEditGroupAction(prevState, data) {
    try {
        const { id, name, code, description, members } = getFormDataObject(data)

        const errors = await groupValidator({ name, code, members: JSON.parse(members), editId: id })

        if (Object.values(errors).some(error => error.length > 0)) {
            return errors
        }

        const existingUsers = await getUsers()

        const membersType = JSON.parse(members)?.length > 0 ? JSON.parse(members)?.map(member => {
            const data = { email: member }
            const internalUser = existingUsers.find(user => user.email === member)
            internalUser ? data.type = 'internal' : data.type = 'external'
            return data
        }) : []

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

        const existingUsers = await getUsers()

        const membersType = members?.length > 0 ? members?.map(member => {
            const data = { email: member }
            const internalUser = existingUsers.find(user => user.email === member)
            internalUser ? data.type = 'internal' : data.type = 'external'
            return data
        }) : []

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

export async function deleteGroupAction({ id }) {
    try {
        const deleteGroupError = await deleteGroup({ id })

        mongoErrorHandler({ mongoError: deleteGroupError })
    } catch (error) {
        console.log({ deleteGroupError: error })
        throw new Error(error)
    }

    revalidatePath("/groups")
    redirect("/groups")
}