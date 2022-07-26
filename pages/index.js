import { getSession, useSession  } from 'next-auth/react'
import Head from 'next/head'
import Header from '../components/Header'
import Login from '../components/Login'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { useState } from 'react';
// import { getAuth, signOut } from "firebase/auth";



export default function Home() {

  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(null)
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user)
      // ...
    } else {
      setCurrentUser(null)
    }
  });
  console.log(currentUser)
  
    if (!currentUser) {
      
      return <div>
        <Header currentUser={currentUser} />
        <Login currentUser={currentUser}  />
      </div>
    }


  
  
  return (
    <div>
      <Head>
        <title>Facebook</title>
      </Head>
      <Header currentUser={currentUser}  />
      <main className='flex'>
        {/* sidebar */}
        <Sidebar currentUser={currentUser}  />
        {/* Feed */}
        <Feed currentUser={currentUser}  />
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
