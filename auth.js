import bcrypt from 'bcrypt';
import { isEmail } from 'validator';
import { getUserByEmailId } from './app/_lib/db/user/controller';
import { cookies } from "next/headers";
const jwt = require('jsonwebtoken');

const sessionExpiry = Date.now() + 1000 * 60 * 60 * 24; //1 day
const key = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function encrypt(payload) {
    const token = jwt.sign(payload, key, { expiresIn: sessionExpiry });
    return token;
}

export async function decrypt(input) {
    const decoded = jwt.verify(input, key);
    return decoded;
}

export async function login(data) {
    const { email, password } = data;
    if (isEmail(email) && password?.trim()?.length > 6) {
        const user = await getUserByEmailId(email);
        if (!user) return { error: { message: 'Invalid credentials' } };
        const { password: userPassword, ...rest } = user;
        const passwordsMatch = await bcrypt.compare(password, userPassword);
        if (passwordsMatch) {
            if (user?.role !== "admin") return { error: { message: 'users only with admin role can login' } };
            const { fullName, email, role } = rest
            const session = await encrypt({ fullName, email, role });
            cookies().set("session", session, { secure: true, httpOnly: true, expires: new Date(sessionExpiry) });
        } else {
            return { error: { message: 'Invalid credentials' } };
        }
    } else {
        return { error: { message: 'Invalid credentials' } };
    }
}

export async function logout() {
    // Destroy the session
    cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
    const session = cookies().get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
}