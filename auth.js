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
            authorize: async (credentials, req) => {
                try {
                    const { username, password } = credentials;
                    const res = await fetch(`${process.env.API}/auth/userlogin`, {
                        method: "POST",
                        body: JSON.stringify({ username, password }),
                        headers: { "Content-Type": "application/json" }
                    });
                    const user = await res.json();

                    console.log('[auth.js]: ', user);

                    if (res.ok && user) {
                        return {
                            id: user?.user?.id,
                            name: user?.user?.name,
                            username: user?.user?.username,
                            email: user?.user?.email,
                            image: user?.user?.image,
                            role: user?.user?.role
                        };
                    }

                    return null;
                } catch (error) {
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const { id, name, username, email, image, role } = user;
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
            session.role = token.role;
            session.url = `${process.env.ROOT}${token.role}` || "/";

            return session;
        },
        async signIn() {
            // const role = user?.user?.role;

            // if (role === "student") {
            //     return "/student/";
            // }
            // else if (role === "faculty") {
            //     return "/faculty/";
            // }

            return true;
        }
    },
    events: {
        signOut: async (message) => {
            console.log(message);
        },
    },
    pages: {
        signIn: '/login'
    },
    secret: process.env.AUTH_SECRET,
    trustHost: true,
    // debug: true,
})