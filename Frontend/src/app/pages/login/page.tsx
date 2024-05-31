import { getSession } from "@/action"
import LoginForm from "@/app/(components)/LoginForm"
import { redirect } from "next/navigation"

const LoginPage = async () => {  
  const session = await getSession()
  return (
    <div className="p-16">
      <LoginForm/>
    </div>
  )
}

export default LoginPage