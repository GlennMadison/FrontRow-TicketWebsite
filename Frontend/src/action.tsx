"use server";

import { sessionOptions, SessionData, defaultSession } from "@/lib";
import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "axios";

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }
  return session;
};

export const login = async (
    prevState: { error: undefined | string },
    formData: FormData
  ) => {
    const formEmail= formData.get("email") as string;
    const formPassword = formData.get("password") as string;
  
      // Make an HTTP request to your backend endpoint to check user credentials
      const response = await axios.post('http://localhost:5000/account/login', {
        email: formEmail,
        password: formPassword,
      });
  
      // Extract user data from the response
      const userData = response.data.LoginInfo;
      if(!userData || userData.email !== formEmail){
        return { error: 'Invalid email or password' };
      }
  
      // Update the session with user data retrieved from the backend
      const session = await getSession();
      session.userId = userData.ID;
      session.email = userData.email;
      session.password = userData.password;
      session.isLoggedIn = true;
      await session.save();
      
      redirect("/");
    
  };
  
export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};
