import { useRouter } from "next/navigation"
import { useState } from "react"
import { addEditGroupModalAction } from "../../../../db/groups/actions"

export const useAddEditGroupModalFormEventHandler = ({ editingData = {} }) => {
    const [group, setGroup] = useState({
        id: editingData?.id || null,
        name: editingData?.name || '',
        code: editingData?.code || '',
        description: editingData?.description || '',
        members: editingData?.members?.length > 0 ? editingData?.members?.map(member => member?.email) : []
    })

    const handleGroupFormChange = (e) => {
        const { name, value } = e.target
        setGroup({ ...group, [name]: value })
    }

    return { group, setGroup, handleGroupFormChange }
}

export const useAddEditGroupModalFormSubmit = ({ group = {} }) => {
    const router = useRouter()

    const [pending, setPending] = useState(false)

    const [errors, setErrors] = useState({ name: '', code: '', members: '', message: '' })

    const handleSubmit = async (event) => {
        event.preventDefault()

        setPending(true)

        const addedOrUpdatedGroup = await addEditGroupModalAction(group)

        if (addedOrUpdatedGroup.errors) {
            setErrors({
                name: '',
                code: '',
                members: '',
                message: '',
                ...addedOrUpdatedGroup.errors
            })
            setPending(false)
        }

        if (addedOrUpdatedGroup?.id) {
            setPending(false)
            router.back()
        }
    }

    return { errors, pending, handleSubmit }
}
