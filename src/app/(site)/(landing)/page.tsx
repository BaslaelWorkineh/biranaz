
import Link from 'next/link'
import {signIn,signOut,auth} from 'base/lib/backend/auth'
import { Session } from 'next-auth'
const page =async () => {
  
  const session  =  await auth()
  console.log("this is the current session",session)
   
  return (
    <div className='flex flex-col gap-6'>
        <div className="">auth page</div>
        <div className="w-full px-25 py-10 ">
            {
              session?(
                <>
                <div className="text-2xl font-bold text-stone-800">signed in as {session.user.name}</div>
                <Link href="/api/auth/signout">
                  <button className="w-[60%] px-6 py-3 bg-stone-900 text-stone-300">signOut</button>
                </Link>
            </>
              ):(
                <Link href="/api/auth/signin">
                  <button className="w-[60%] px-6 py-3 bg-stone-900 text-stone-300">signin</button>
                </Link>
              )
            }
        </div>

    </div>
  )
}

export default page