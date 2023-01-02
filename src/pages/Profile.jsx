import { getAuth, updateProfile } from 'firebase/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'


export default function Profile() {
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false)
  console.log("changeDetails=", changeDetails)

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

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== username) {
        //Update display name in Firebase
        await updateProfile(auth.currentUser, {
          displayName: username
        })
        // Update in Firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name: username
        })

      }
    } catch (error) {
      console.log(error)
      toast.error('Could not update profile details')

    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  // const onDelete = async (listingId) => {
  //   if (window.confirm('Are you sure you want to delete?')) {
  //     await deleteDoc(doc(db, 'listings', listingId))
  //     const updatedListings = listings.filter(
  //       (listing) => listing.id !== listingId
  //     )
  //     setListings(updatedListings)
  //     toast.success('Successfully deleted listing')
  //   }
  // }

  // const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`)

  return (
    <section className="flex flex-col items-center justify-center px-6 py-8 pt-[60px] mx-auto md:h-screen lg:py-0 text-stone-800">
      <h1 className="flex items-center mb-6 text-3xl border-b-4 border-pcCoral">
        <p>My Profile</p>
      </h1>
      <main
        className="relative flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0"
      >
        <div className="form-container">
          <div className="form-inner-container">
            <h1 className="text-2xl">Personal Details</h1>
            <div>
              <form className="space-y-2 md:space-y-4 " action="">
                <label htmlFor="username" className="block text-sm font-medium ">Your username</label>
                {/* Make text appear changeable when available */}
                <input type="text"
                  id='username'
                  className={!changeDetails ? 'bg-pcGreen' : ''}
                  disabled={!changeDetails}
                  value={username}
                  onChange={onChange}
                />
                <label htmlFor="email" className="block text-sm font-medium ">Your email</label>
                <input type="email"
                  id='email'
                  className='bg-pcGreen mb-20'
                  disabled={!changeDetails}
                  value={email}
                  onChange={onChange}
                />
                {/* This must not be a button or type "submit" - causes a re-render */}
                <p className="form-button" onClick={() => {
                  changeDetails && onSubmit()
                  setChangeDetails((prevState) => !prevState)
                }}>
                  {changeDetails ? 'Save' : 'Update'}
                </p>

              </form>
              <button type='button' className="form-button"
                onClick={onLogout}>  Logout </button>
            </div>
          </div>
        </div>
      </main>
    </section>
  )
}