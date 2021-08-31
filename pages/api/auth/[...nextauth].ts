import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectToDatabase } from "../../../db/mongoDB";
import bcrypt from "bcryptjs";

type Cre = {
  email: string,
  password: string,
}

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials: Cre) {
        // console.log('credentials: ', credentials)
        // console.log("credentials.email: ", typeof(credentials.email));

        const client = await connectToDatabase();
        const usersCollection = await client.db().collection("users");
        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        // console.log("user: ", user);
        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        // console.log('isValidPassword: ', isValidPassword);

        if (user && isValidPassword) {
          // key名は id, name, email で固定（そうしないとJWTに組み込まれない）
          // id は sub という key名になる
          return {
            email: user.email,
            name: user.username,
            id: user._id,
          };
        } else {
          throw new Error("Could not log you in...");
        }
      },
    }),
  ],
  callbacks: {
    // async jwt(token, user, account, profile, isNewUser) {
    //   return token;
    // },
    async session(session, token) {
      return token;
    },
  },
});
