import { getAuth } from 'firebase/auth'
import { useState, useEffect } from 'react'


export default function Profile() {
  const [user, setuser] = useState(null)

  const auth = getAuth()
  useEffect(() => {
    console.log(auth.currentUser)
  }, [])

  return user ? <h1>{user.displayName}</h1> : 'Not logged in'
}