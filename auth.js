import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { isEmail } from 'validator';
import { getUserByEmailId } from './app/_lib/db/user/controller';

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorize(credentials) {
            const { email, password } = credentials;
            if (isEmail(email) && password?.trim()?.length > 6) {
                const user = await getUserByEmailId(email);
                if (!user) return null;
                const passwordsMatch = await bcrypt.compare(password, user.password);
                if (passwordsMatch) return user;
            }

            console.log('Invalid credentials');
            return null;
        },
    })],
})