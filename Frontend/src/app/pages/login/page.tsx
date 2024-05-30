import { getSession } from "@/action"
import LoginForm from "@/app/(components)/LoginForm"
import { redirect } from "next/navigation"

const LoginPage = async () => {  
  const session = await getSession()
  return (
    <div className="m-10">
      <h1>Welcome to the LoginPage</h1>
      <LoginForm/>
    </div>
  )
}

export default LoginPage