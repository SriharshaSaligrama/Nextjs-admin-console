import { getBuildings, getBuildingsByLocationId } from "./buildings/controller"
import { getAllCategoriesIncludingDeleted } from "./categories/controller"
import { getAllDepartmentsIncludingDeleted } from "./departments/controller"
import { getAllGroupsIncludingDeleted } from "./groups/controller"
import { getAllLocationsIncludingDeleted, getLocations } from "./locations/controller"
import { getAllUsersIncludingDeleted } from "./user/controller"
import isEmail from 'validator/lib/isEmail';

export const departmentValidator = async ({ name, code, editId }) => {
    try {
        const errors = {}
        const allDepartments = await getAllDepartmentsIncludingDeleted()
        const duplicateDepartmentName = allDepartments?.find((department) => department?.name?.toLowerCase() === name?.toLowerCase())
        const duplicateDepartmentCode = allDepartments?.find((department) => department?.code?.toLowerCase() === code?.toLowerCase())

        if (!name || !name?.trim()) {
            errors.name = 'Name is required'
        }
        else if (name?.trim().length < 2 || name?.trim().length > 120) {
            errors.name = 'Name must be between 2 and 120 characters'
        }
        else if (duplicateDepartmentName?.id && duplicateDepartmentName?.id?.toString() !== editId) {
            errors.name = 'Name already exists'
        }
        else if (!code || !code?.trim()) {
            errors.code = 'Code is required'
        }
        else if (code?.trim().length < 2 || code?.trim().length > 120) {
            errors.code = 'Code must be between 2 and 120 characters'
        }
        else if (duplicateDepartmentCode?.id && duplicateDepartmentCode?.id?.toString() !== editId) {
            errors.code = 'Code already exists'
        }

        return errors
    } catch (error) {
        console.log({ departmentValidatorError: error })
        return { errors: { message: error.message } }
    }
}

export const categoryValidator = async ({ name, code, editId }) => {
    try {
        const errors = {}
        const allCategories = await getAllCategoriesIncludingDeleted()
        const duplicateCategoryName = allCategories?.find((category) => category?.name?.toLowerCase() === name?.toLowerCase())
        const duplicateCategoryCode = allCategories?.find((category) => category?.code?.toLowerCase() === code?.toLowerCase())

        if (!name || !name?.trim()) {
            errors.name = 'Name is required'
        }
        else if (name?.trim().length < 2 || name?.trim().length > 120) {
            errors.name = 'Name must be between 2 and 120 characters'
        }
        else if (duplicateCategoryName?.id && duplicateCategoryName?.id?.toString() !== editId) {
            errors.name = 'Name already exists'
        }
        else if (!code || !code?.trim()) {
            errors.code = 'Code is required'
        }
        else if (code?.trim().length < 2 || code?.trim().length > 120) {
            errors.code = 'Code must be between 2 and 120 characters'
        }
        else if (duplicateCategoryCode?.id && duplicateCategoryCode?.id?.toString() !== editId) {
            errors.code = 'Code already exists'
        }

        return errors
    } catch (error) {
        console.log({ categoryValidatorError: error })
        return { errors: { message: error.message } }
    }
}

export const locationValidator = async ({ name, editId }) => {
    try {
        const errors = {}
        const allLocations = await getAllLocationsIncludingDeleted()
        const duplicateLocationName = allLocations?.find((location) => location?.name?.toLowerCase() === name?.toLowerCase())

        if (!name || !name?.trim()) {
            errors.name = 'Name is required'
        }
        else if (name?.trim().length < 2 || name?.trim().length > 120) {
            errors.name = 'Name must be between 2 and 120 characters'
        }
        else if (duplicateLocationName?.id && duplicateLocationName?.id?.toString() !== editId) {
            errors.name = 'Name already exists'
        }

        return errors
    } catch (error) {
        console.log({ locationValidatorError: error })
        return { errors: { message: error.message } }
    }
}

export const buildingValidator = async ({ name, location, editId }) => {
    try {
        const errors = {}
        const allLocations = await getLocations()
        const allBuildingsOfSelectedLocation = await getBuildingsByLocationId(location)
        const duplicateBuildingName = allBuildingsOfSelectedLocation?.find((building) => building?.name?.toLowerCase() === name?.toLowerCase() && building?.id?.toString() !== editId?.toString())

        if (!name || !name?.trim()) {
            errors.name = 'Name is required'
        }
        else if (name?.trim().length < 2 || name?.trim().length > 120) {
            errors.name = 'Name must be between 2 and 120 characters'
        }
        else if (!allLocations?.length) {
            errors.location = 'No locations added. Please add a location to add a building.'
        }
        else if (!location || !location?.trim()) {
            errors.location = 'Location is required'
        }
        else if (duplicateBuildingName?.name) {
            errors.name = 'Building with the same name already exists in the selected location'
        }

        return errors
    } catch (error) {
        console.log({ buildingValidatorError: error })
        return { errors: { message: error.message } }
    }
}

export const addUserValidator = async ({ fullName, email, password, role, buildingAssignedTo, managingBuildings }) => {
    try {
        const errors = {}
        const allUsers = await getAllUsersIncludingDeleted()
        const allBuildings = await getBuildings()
        const duplicateUserEmail = allUsers?.find((user) => user?.email?.toLowerCase() === email?.toLowerCase())

        if (!fullName?.trim()) {
            errors.fullName = 'Name is required'
        } else if (fullName?.trim().length < 3 || fullName?.trim().length > 120) {
            errors.fullName = 'Name must be between 3 and 120 characters'
        } else if (!email?.trim()) {
            errors.email = 'Email is required'
        } else if (!isEmail(email?.trim())) {
            errors.email = 'Invalid email'
        } else if (duplicateUserEmail?.email) {
            errors.email = 'Email already exists'
        } else if (!password?.trim()) {
            errors.password = 'Password is required'
        } else if (password?.trim().length < 6 || password?.trim().length > 128) {
            errors.password = 'Password must be between 6 and 128 characters'
        } else if (!role?.trim()) {
            errors.role = 'Role is required'
        } else if (role !== 'admin' && role !== 'employee' && role !== 'facility manager') {
            errors.role = 'Role must be either admin, employee or facility manager'
        } else if (!allBuildings?.length) {
            errors.buildingAssignedTo = 'No buildings added. Please add a building to add a user.'
        } else if (buildingAssignedTo === null) {
            errors.buildingAssignedTo = 'Building is required'
        } else if (role === 'facility manager' && !managingBuildings?.length) {
            errors.managingBuildings = 'Buildings being managed by the facility manager should be selected'
        } else if (role === 'employee' && managingBuildings?.length > 0) {
            errors.managingBuildings = 'Employees can not manage any building.'
        }

        return errors
    } catch (error) {
        console.log({ addUserValidatorError: error })
        return { errors: { message: error.message } }
    }
}

export const editUserValidator = async ({ fullName, role, buildingAssignedTo, managingBuildings }) => {
    try {
        const errors = {}
        const allBuildings = await getBuildings()

        if (!fullName?.trim()) {
            errors.fullName = 'Name is required'
        } else if (fullName?.trim().length < 3 || fullName?.trim().length > 120) {
            errors.fullName = 'Name must be between 3 and 120 characters'
        } else if (!role?.trim()) {
            errors.role = 'Role is required'
        } else if (role !== 'admin' && role !== 'employee' && role !== 'facility manager') {
            errors.role = 'Role must be either admin, employee or facility manager'
        } else if (!allBuildings?.length) {
            errors.buildingAssignedTo = 'No buildings added. Please add a building to add a user.'
        } else if (buildingAssignedTo === null) {
            errors.buildingAssignedTo = 'Building is required'
        } else if (role === 'facility manager' && !managingBuildings?.length) {
            errors.managingBuildings = 'Buildings being managed by the facility manager should be selected'
        } else if (role === 'employee' && managingBuildings?.length > 0) {
            errors.managingBuildings = 'Employees can not manage any building.'
        }

        return errors
    } catch (error) {
        console.log({ editUserValidatorError: error })
        return { errors: { message: error.message } }
    }
}

export const groupValidator = async ({ name, code, members, editId }) => {
    try {
        const errors = {}
        const allGroups = await getAllGroupsIncludingDeleted()
        const duplicateGroupName = allGroups?.find((group) => group?.name?.toLowerCase() === name?.toLowerCase())
        const duplicateGroupCode = allGroups?.find((group) => group?.code?.toLowerCase() === code?.toLowerCase())

        if (!name || !name?.trim()) {
            errors.name = 'Name is required'
        }
        else if (name?.trim().length < 2 || name?.trim().length > 120) {
            errors.name = 'Name must be between 2 and 120 characters'
        }
        else if (duplicateGroupName?.id && duplicateGroupName?.id?.toString() !== editId) {
            errors.name = 'Name already exists'
        }
        else if (!code || !code?.trim()) {
            errors.code = 'Code is required'
        }
        else if (code?.trim().length < 2 || code?.trim().length > 120) {
            errors.code = 'Code must be between 2 and 120 characters'
        }
        else if (duplicateGroupCode?.id && duplicateGroupCode?.id?.toString() !== editId) {
            errors.code = 'Code already exists'
        }
        else if (members?.length) {
            const invalidEmail = members?.find(member => !isEmail(member))
            if (invalidEmail) {
                errors.members = `Invalid email ${invalidEmail}`
            }
        }

        return errors
    } catch (error) {
        console.log({ groupValidatorError: error })
        return { errors: { message: error.message } }
    }
}