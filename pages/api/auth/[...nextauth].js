import NextAuth from 'next-auth';
import FacebookProvider from "next-auth/providers/facebook"

export default NextAuth({
    providers:[
        FacebookProvider({
            clientId: process.env.Facebook_CLIENT_ID,
            clientSecret: process.env.Facebook_CLIENT_SECRET,
        }),
    ],
});