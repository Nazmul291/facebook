import Image from 'next/image'
// import {  signIn } from "next-auth/react"
import {signInWithPopup, FacebookAuthProvider } from 'firebase/auth'
import {authentication} from '../firebase'

function Login() {
  const LoginWithFacebook = () =>{
    const provider = new FacebookAuthProvider();
    signInWithPopup(authentication, provider)
    .then((re)=>{
      console.log(re)
    })
    .catch((err)=>{
      console.log(err.message)
    })
  }

  return (
    <div className='grid place-items-center' >
        <Image 
        src='https://links.papareact.com/t4i'
        height={400}
        width={400}
        objectFit='contain'
        />
        <h1 onClick={LoginWithFacebook} className='p-5 bg-blue-500 rounded-full text-white text-center cursor-pointer' >Login with Facebook</h1>
    </div>
  )
}

export default Login