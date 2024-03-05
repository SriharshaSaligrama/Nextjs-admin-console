import { useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';
import { addEditGroupAction } from '../../db/groups/actions';
import { useEffect, useState } from 'react';
import { getFilteredUsersAction } from '../../db/user/actions';
import { debounce } from '../../utils';

const useAddEditGroup = ({ editingData = {} }) => {
    const router = useRouter()

    const initialErrorState = { name: '', code: '', members: '', message: '' }

    const [state, dispatch] = useFormState(addEditGroupAction, initialErrorState);

    const [users, setUsers] = useState([]);

    const [selectedEmails, setSelectedEmails] = useState(editingData?.members?.length > 0 ? editingData?.members?.map(member => member?.email) : [])

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

    const handleCancelClick = () => {
        router.push('/groups');
    }

    const handleSearch = debounce((term) => {
        if (term && term?.toLowerCase() !== query?.toLowerCase()) {
            setQuery(term)
        } else {
            setQuery('')
        }
    }, 500)

    return { state, dispatch, users, selectedEmails, setSelectedEmails, handleCancelClick, handleSearch }
}

export default useAddEditGroup