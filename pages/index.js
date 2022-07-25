import { getSession, useSession  } from 'next-auth/react'
import Head from 'next/head'
import Header from '../components/Header'
import Login from '../components/Login'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'

export default function Home() {

  const { status } = useSession()

  if (status !== "authenticated") {
    return <div><Header /><Login /></div>
  }
  
  return (
    <div>
      <Head>
        <title>Facebook</title>
      </Head>
      <Header />
      <main className='flex'>
        {/* sidebar */}
        <Sidebar />
        {/* Feed */}
        <Feed />
        {/* Widgets */}
      </main>

        
    </div>
  )
}

export async function getServerSideProps(context){
  const session = await getSession(context);
  return{
    props:{
      session
    }
  }
}
