import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import Post from './Post'

function Posts() {
  const [posts, setPosts] = useState([])

  useEffect(
    () => () =>
      onSnapshot(collection(db, 'posts'), (snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      }),
    []
  )

  return (
    <div>
      {posts
        .map((post) => (
          <Post
            key={post.id}
            name={post.name}
            id={post.id}
            message={post.message}
            email={post.email}
            image={post.image}
            postImage={post.postImage}
            timestamp={post.timestamp}
          />
        ))
        .reverse()}
    </div>
  )
}

export default Posts
