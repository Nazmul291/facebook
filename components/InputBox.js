import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { EmojiHappyIcon } from '@heroicons/react/outline'
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { db, storage } from '../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { Oval } from 'react-loader-spinner'
import { getAuth } from 'firebase/auth'

function InputBox() {
  const user = getAuth().currentUser
  const [progress, setProgress] = useState(0)
  const inputRef = useRef(null)
  const filepickerRef = useRef(null)
  const [imagetoPost, setimageToPost] = useState(null)
  const [preview, setPreview] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [docId, setDocId] = useState(null)

  const sendPost = async (e) => {
    e.preventDefault()

    if (!inputRef.current.value) return
    try {
      setIsLoading(true)
      setProgress('Getting things ready...')
      const docRef = await addDoc(collection(db, 'posts'), {
        message: inputRef.current.value,
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
        timestamp: serverTimestamp(),
      }).then((doc) => {
        if (imagetoPost) {
          //funky upload stuff for image storage.bucket().file('/path/to/file');
          const storageRef = ref(storage, `/posts/${doc.id}`)
          const uploadTask = uploadBytesResumable(storageRef, imagetoPost)

          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const prog = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              )
              setProgress(prog)
            },
            (err) => console.log(err),
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                setIsLoading(false)
                setimageToPost(url)
                setDocId(doc.id)
              })
            }
          )
        } else {
          setIsLoading(false)
        }
      })
      if (!isLoading) {
        inputRef.current.value = ''
      }
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  if (docId) {
    console.log(docId)
    setDoc(
      doc(db, 'posts', docId),
      { postImage: imagetoPost },
      { merge: true }
    ).catch((error) => {
      console.log(error)
    })

    setimageToPost(null)
    setDocId(null)
  }

  const addImagetoPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      setimageToPost(e.target.files[0])
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setPreview(readerEvent.target.result)
    }
  }

  const removeImage = () => {
    setimageToPost(null)
  }

  return (
    <div className='bg-white p-2 relative rounded-2xl shadow-md text-gray-500 font-medium mt-6'>
      {isLoading ? (
        <div className='h-full flex items-center flex-col justify-center w-full top-0 left-0 bg-white p-2 rounded-2xl shadow-md text-gray-500 absolute z-50 font-medium '>
          <Oval
            color='#00BFFF'
            className='flex mx-auto'
            height={80}
            width={80}
          />
          <h2 className='text-center mt-6'>{progress}%</h2>
        </div>
      ) : (
        ''
      )}

      <div className='flex space-x-4 p-4 items-center '>
        <Image
          src={user.photoURL}
          className='rounded-full'
          height={40}
          width={40}
          layout='fixed'
        />
        <form className='flex flex-1'>
          <input
            ref={inputRef}
            className='rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none'
            type={'text'}
            placeholder={`What's on your mind, ${user.displayName}?`}
          />
          <button hidden type='submit' onClick={sendPost}>
            Submit
          </button>
        </form>

        {imagetoPost && (
          <div
            onClick={removeImage}
            className='flex flex-col cursor-pointer filter hover:brightness-110 transition duration-150 transform hover:scale-105 '
          >
            <img
              className='h-10 object-contain'
              src={preview}
              alt='preview post media'
            />
            <p className='text-xs text-red-500 text-center'>Remove</p>
          </div>
        )}
      </div>
      <div className='flex justify-evenly p-3 border-t'>
        <div className='inputIcon'>
          <VideoCameraIcon className='h-7 text-red-500' />
          <p className='text-xs sm:text-sm xl:text-base'>Live Video</p>
        </div>
        <div
          onClick={() => filepickerRef.current.click()}
          className='inputIcon'
        >
          <CameraIcon className='h-7 text-green-400 ' />
          <p className='text-xs sm:text-sm xl:text-base'>Feeling/Activity</p>
          <input
            ref={filepickerRef}
            onChange={addImagetoPost}
            type='file'
            hidden
          />
        </div>
        <div className='inputIcon'>
          <EmojiHappyIcon className='h-7 text-yellow-300 ' />
          <p className='text-xs sm:text-sm xl:text-base'>Feeling/Activity</p>
        </div>
      </div>

      {/* <img src={progress} /> */}
    </div>
  )
}

export default InputBox
