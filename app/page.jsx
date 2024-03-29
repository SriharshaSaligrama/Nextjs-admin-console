import { getSession } from '@/auth';
import { Typography } from '@mui/material'
import LoginPage from './login/page';
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await getSession();
    if (session?.exp) redirect("/locations")

    return (
        !session?.exp ? <LoginPage session={session} /> : <Typography >Home Page</Typography>
    )
}
