import { getFilteredUsersAction } from '@/app/_lib/db/user/actions';
import { useState, useEffect } from 'react';

const useFilteredUsers = () => {
    const [users, setUsers] = useState([]);

    const [query, setQuery] = useState('');

    useEffect(() => {
        const fetchUsersData = async () => {
            const usersList = await getFilteredUsersAction(query);
            setUsers(usersList);
        };

        if (query?.length > 1) {
            fetchUsersData();
        } else {
            setUsers([]);
        }
    }, [query]);

    return { users, query, setQuery };
};

export default useFilteredUsers;
