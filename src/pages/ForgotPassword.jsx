import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')

  const onChange = (e) => setEmail(e.target.value)

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Email was sent')
    } catch (error) {
      toast.error('Could not send reset email')
    }
  }

  return (
    <div className='flex flex-col items-center justify-center px-6 py-8 pt-[60px] mx-auto md:h-screen lg:py-0 text-stone-800'>
      <header>
        <h1 className='flex items-center mb-6 text-3xl border-b-4 border-pcCoral'>Forgot Password</h1>
      </header>

      <main className="relative flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0">
        <div className="form-container">
          <div className="form-inner-container">
            <form className="space-y-4 md:space-y-6 " onSubmit={onSubmit}>
              <label htmlFor="email" className="block mb-2 text-sm font-medium ">Your email</label>
              <input
                type='email'
                className="form-field  mb-4 focus: outline-pcGreen"
                placeholder='Email'
                id='email'
                value={email}
                onChange={onChange}
              />
              <button type="button" className="form-button">
                <Link to='/login'>
                  Login
                </Link>
              </button>

              <div>
                <button type="submit" className="form-button">
                  <div>Send Reset Link</div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

// Brad Traversy - Udemy React class