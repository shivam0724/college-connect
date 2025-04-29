import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            id: "user",
            name: "user",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            type: "credentials",
            async authorize(credentials, req) {
                try {
                    const { username, password } = credentials;
                    const res = await fetch(`${process.env.API}/auth/userlogin`, {
                        method: "POST",
                        body: JSON.stringify({ username, password }),
                        headers: { "Content-Type": "application/json" }
                    });
                    const user = await res.json();

                    if (res.status == 200 && user?.user) {
                        return user;
                    } else {
                        return null;
                    }
                } catch (error) {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const { id, name, username, email, image, role } = user.user;
                token.id = id;
                token.name = name;
                token.username = username;
                token.email = email;
                token.picture = image;
                token.role = role;
            }

            return token;
        },
        async session({ session, token }) {
            session.id = token.id;
            session.name = token.name;
            session.username = token.username;
            session.email = token.email;
            session.picture = token.picture;

            return session;
        },
        async signIn(user) {
            const role = user?.user?.user?.role || false;
            if (role === "student") {
                return "/student/";
            }
            else if (role === "faculty") {
                return "/faculty/";
            }

            return false;
        }
    },
    events: {
        signOut: async (message) => {
            console.log(message);
        }
    },
    pages: {
        signIn: '/login'
    },
    jwt: {
        // maxAge: 60 * 60 * 28,
        encryption: true,
    },
    session: {
        // maxAge: 60 * 60 * 28,
        jwt: true,
    },
    cookies: {
        sessionToken: {
            name: 'sessionToken',
            options: {
                httpOnly: true,
                sameSite: 'Strict',
                secure: true,
                path: '/',
            }
        },
    },
    secret: process.env.AUTH_SECRET,
    trustHost: true,
    // debug: true,
})