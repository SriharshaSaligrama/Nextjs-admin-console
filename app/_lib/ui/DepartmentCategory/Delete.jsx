'use client'

import React, { useState } from 'react'
import { List, ListItem, ListItemText, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import globalStyles from '@/app/globalStyles'
import { deleteDepartmentAction } from '@/app/_lib/db/departments/actions'
import { deleteCategoryAction } from '@/app/_lib/db/categories/actions'
import PageHeading from '../PageHeading'
import DeleteCancelButtons from '../DeleteCancelButtons'

const Delete = (props) => {
    const { deletingData, childrenData, parentData } = props
    const router = useRouter()
    const pathname = usePathname();
    const label = pathname.includes('departments') ? 'department' : pathname.includes('categories') ? 'category' : ''
    const childrenLabel = pathname.includes('departments') ? 'departments' : pathname.includes('categories') ? 'categories' : ''
    const returnLink = pathname.includes('departments') ? '/departments' : pathname.includes('categories') ? '/categories' : ''
    const deleteAction = pathname.includes('departments') ? deleteDepartmentAction : pathname.includes('categories') ? deleteCategoryAction : () => { }
    const [parent, setParent] = useState('')
    const transferringParent = parentData?.find((data) => data.id === parent)

    const handleCancelClick = () => {
        router.push(returnLink)
    }

    const handleDeleteClick = async () => {
        await deleteAction({ id: deletingData.id, parentId: parent })
    }

    return (
        <>
            <PageHeading heading='Delete Dependencies' />
            {
                childrenData?.length > 0 ? <Stack sx={{ ...styles.dependenciesContainer }}>
                    <Stack spacing={2}>
                        <Typography><b>{deletingData.name}</b> {label} has <b>{childrenData.length}</b> children {label}(s):</Typography>
                        <List sx={{ ...styles.childList }}>
                            {
                                childrenData.map((child) => (
                                    <ListItem key={child.id} sx={{ ...styles.childListItem }}>
                                        <ListItemText primary={child.name} />
                                    </ListItem>
                                ))
                            }
                        </List>
                        {
                            (parentData?.length > 0) ? <>
                                <Typography>Please select a {label} from the list to which you need to transfer the children {childrenLabel}</Typography>
                                <TextField
                                    select
                                    name='parent'
                                    size='small'
                                    value={parent}
                                    onChange={(event) => setParent(event.target.value)}
                                >
                                    {
                                        parentData?.map((parent) => (
                                            <MenuItem key={parent.id} value={parent.id}>{parent.name}</MenuItem>
                                        ))
                                    }
                                </TextField>
                            </> : <>
                                <Typography>There are no parent {childrenLabel} available to transfer the above children {childrenLabel}.</Typography>
                                <Typography>Please either add a new parent {label} to transfer the above children {childrenLabel} or delete the above children {childrenLabel} and then delete the <b>{deletingData.name}</b> {label}</Typography>
                            </>
                        }
                        {
                            parent && <>
                                <Typography>The children {childrenLabel} listed above will be transferred to <b>{transferringParent?.name}</b> {label}</Typography>
                                <Typography>Are you sure to delete <b>{deletingData.name}</b> {label}?</Typography>
                            </>
                        }
                        <DeleteCancelButtons handleCancelClick={handleCancelClick} handleDeleteClick={handleDeleteClick} disabled={!parent} />
                    </Stack>
                </Stack> : <Stack spacing={4} sx={{ ...styles.noDependenciesContainer }} >
                    <Typography><b>{deletingData.name}</b> {label} has no dependencies</Typography>
                    <Typography>Are you sure you want to delete <b>{deletingData.name}</b> {label}?</Typography>
                    <DeleteCancelButtons handleCancelClick={handleCancelClick} handleDeleteClick={handleDeleteClick} />
                </Stack>
            }
        </>
    )
}

export default Delete

const styles = {
    dependenciesContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '80dvh'
    },
    noDependenciesContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '80dvh'
    },
    childList: {
        margin: 0,
        padding: 0,
        paddingLeft: 2,
        maxHeight: '150px',
        overflow: 'auto',
        ...globalStyles.thinScrollBar
    },
    childListItem: {
        margin: 0,
        padding: 0,
        paddingBottom: 1
    }
}