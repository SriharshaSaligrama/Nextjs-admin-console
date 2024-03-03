import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getFilteredUsersAction } from "../../db/user/actions"
import { debounce } from "../../utils"
import { addEditGroupModalAction } from "../../db/groups/actions"

const useAddEditGroup = ({ editingData = {} }) => {
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

    const [users, setUsers] = useState([]);

    const [query, setQuery] = useState('')

    useEffect(() => {
        const fetchUsersData = async () => {
            const usersList = await getFilteredUsersAction(query)
            setUsers(usersList)
        }

        if (query?.length > 1) {
            fetchUsersData()
        } else {
            setUsers([])
        }
    }, [query])

    const handleSearch = debounce((term) => {
        if (term && term?.toLowerCase() !== query?.toLowerCase()) {
            setQuery(term)
        } else {
            setQuery('')
        }
    }, 500)

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

    return { group, setGroup, errors, pending, users, handleChange, handleSearch, handleSubmit }
}

export default useAddEditGroup