import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const useModal = () => {
    const router = useRouter();

    const dialogRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            // Check if the click is outside the modal
            const clickTarget = event.target;

            if (
                !clickTarget.closest('dialog') &&
                !clickTarget.closest('.MuiAutocomplete-listbox') &&
                clickTarget !== dialogRef.current
            ) {
                router.back();
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [router]);

    return dialogRef
}

export default useModal