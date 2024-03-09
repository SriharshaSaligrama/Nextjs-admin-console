import { useRouter } from "next/navigation"

const useHandleCancelClick = (returnLink) => {
    const { push } = useRouter()

    const handleCancelClick = () => {
        push(returnLink)
    }

    return handleCancelClick
}

export default useHandleCancelClick