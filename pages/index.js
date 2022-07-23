import { getSession } from 'next-auth/react'
import { useSession } from "next-auth/react"
import Head from 'next/head'
import Header from '../components/Header'
import Login from '../components/Login'

export default function Home({ session }) {
  // if (!session){
  //   console.log(`hello ${session}`)
  //   return <Login />
    
  // } 

  const { status } = useSession()

  if (status !== "authenticated") {
    return <Login />
  }
  
  return (
    <div>
      <Head>
        <title>Facebook</title>
      </Head>
      <Header />
      <main>
        {/* sidebar */}
        {/* Feed */}
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
