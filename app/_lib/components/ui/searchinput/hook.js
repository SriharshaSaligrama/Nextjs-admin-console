import { debounce } from "@/app/_lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useSearchInput = () => {
    const searchParams = useSearchParams();

    const pathname = usePathname();

    const { replace } = useRouter();

    const handleSearch = debounce((term) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 500);

    return { handleSearch, searchParams }
}