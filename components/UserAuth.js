import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { useState } from 'react';

export default function currentUser(){
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
}

