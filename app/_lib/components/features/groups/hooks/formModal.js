import { useRouter } from "next/navigation"
import { useState } from "react"
import { addEditGroupModalAction } from "../../../../db/groups/actions"

const useAddEditGroupModal = ({ editingData = {} }) => {
    const router = useRouter()

    const [group, setGroup] = useState({
        id: editingData?.id || null,
        name: editingData?.name || '',
        code: editingData?.code || '',
        description: editingData?.description || '',
        members: editingData?.members?.length > 0 ? editingData?.members?.map(member => member?.email) : []
    })

    const [pending, setPending] = useState(false)

    const [errors, setErrors] = useState({ name: '', code: '', members: '', message: '' })

    const handleChange = (e) => {
        const { name, value } = e.target
        setGroup({ ...group, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        let ignore = false

        if (!ignore) {
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

        return () => {
            ignore = true;
        };
    }

    return { group, setGroup, errors, pending, handleChange, handleSubmit }
}

export default useAddEditGroupModal