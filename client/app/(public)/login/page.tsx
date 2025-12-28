import { getSession } from '@/lib/get-session'
import { redirect } from 'next/navigation';
const   LoginPage  = async () => {
  const session=await getSession();
  if(session){
    redirect('/dashboard')
  }
  return (
    <div>LoginPage</div>
  )
}

export default LoginPage