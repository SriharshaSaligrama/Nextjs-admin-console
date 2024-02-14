import { getAllCategoriesIncludingDeleted } from "./categories/controller"
import { getAllDepartmentsIncludingDeleted } from "./departments/controller"

export const departmentValidator = async ({ name, code, editId }) => {
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
}

export const categoryValidator = async ({ name, code, editId }) => {
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
}
