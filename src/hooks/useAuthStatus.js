import { useEffect, useState, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

// Hook to see if user is logged in
export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  // this is like loading
  const [checkingStatus, setCheckingStatus] = useState(true)
  // Code around memory leak
  const isMounted = useRef(true)

  useEffect(() => {
    if (isMounted) {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        // if an auth user is found, we are logged in and setCheckingStatus is set to false so that we can re-render
        if (user) {
          setLoggedIn(true)
        }
        setCheckingStatus(false)
      })
    }

    return () => {
      isMounted.current = false
    }
  }, [isMounted])

  return { loggedIn, checkingStatus }
}

// Brad Traversy code from React Udemy class

// Protected routes in v6
// https://stackoverflow.com/questions/65505665/protected-route-with-firebase

// Fix memory leak warning
// https://stackoverflow.com/questions/59780268/cleanup-memory-leaks-on-an-unmounted-component-in-react-hooks