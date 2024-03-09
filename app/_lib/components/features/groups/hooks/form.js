import { useFormState } from 'react-dom';
import { addEditGroupAction } from '../../../../db/groups/actions';
import { useState } from 'react';

const useAddEditGroup = ({ editingData = {} }) => {
    const initialErrorState = { name: '', code: '', members: '', message: '' }

    const [state, dispatch] = useFormState(addEditGroupAction, initialErrorState);

    const [selectedEmails, setSelectedEmails] = useState(editingData?.members?.length > 0 ? editingData?.members?.map(member => member?.email) : [])

    return { state, dispatch, selectedEmails, setSelectedEmails }
}

export default useAddEditGroup