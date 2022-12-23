import { getAuth } from 'firebase/auth'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { updateDoc } from 'firebase/firestore'
import { db } from '../firebase.config'


export default function Profile() {
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false)

  const [formData, setFormData] = useState({
    username: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const { username, email } = formData

  const navigate = useNavigate()

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  const onSubmit = () => {
    console.log(123)
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  return <div>
    <header>
      <p>My Profile</p>
      <button type='button'
        onClick={onLogout}>Logout </button>
    </header>
    <main>
      <div>
        <p className="profileDetailsText">Personal Details</p>
        <p onClick={() => {
          changeDetails && onSubmit()
          setChangeDetails((prevState) => !prevState)
        }}>
          {changeDetails ? 'done' : 'change'}
        </p>

      </div>
      <div>
        <form action="">
          <input type="text"
            id='username'
            className={!changeDetails ? 'profileName' : 'profileNameActive'}
            disabled={!changeDetails}
            value={username}
            onChange={onChange}
          />
        </form>
      </div>
    </main>
  </div>
}