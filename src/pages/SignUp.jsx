import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
//import OAuth from '../components/OAuth'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import image from '../assets/images/BurfordTogether.jpeg'

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const { username, email, password } = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      if (userCredential.user) {
        navigate('/')
      }
    } catch (error) {
      toast.error('Bad User Credentials')
    }
  }

  return (
    <>
      <section className="flex flex-col items-center justify-center px-6 py-8 pt-[60px] mx-auto md:h-screen lg:py-0 text-stone-800">
        <h1 className="flex items-center mb-6 text-3xl border-b-4 border-pcCoral">
          Account Sign Up
        </h1>
        <div
          className="relative flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0"
        >
          {/* Left Side */}
          <div className="form-container">
            <div className="form-inner-container">
              <h1 className="md:text-2xl items-center justify-center">
                No need to sign up to read.
              </h1>
              <form className="space-y-4 md:space-y-6 " onSubmit={onSubmit}>
              <div>
                  <label for="username" className="block mb-2 text-sm font-medium ">Name</label>
                  <input
                    type='username'
                    className='form-field  mb-4 focus: outline-pcGreen'
                    id='username'
                    value={username}
                    onChange={onChange}
                  />
                </div>
                <div>
                  <label for="email" className="block mb-2 text-sm font-medium ">Email</label>
                  <input
                    type='email'
                    className='form-field  mb-4 focus: outline-pcGreen'
                    id='email'
                    value={email}
                    onChange={onChange}
                  />
                </div>

                <div>
                  <label for="password" className="block mb-2 text-sm font-medium ">Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className='form-field  mb-4 focus: outline-pcGreen'
                    placeholder='........'
                    id='password'
                    value={password}
                    onChange={onChange}
                  />
                  <img
                    src={visibilityIcon}
                    alt='show password'
                    className='showPassword'
                    onClick={() => setShowPassword((prevState) => !prevState)}
                  />
                </div>

                <div className="flex items-center justify-evenly space-x-2">

                <button type="submit" className="form-button">Submit</button>

                <button type="submit" className="form-button"><Link to="/login">Login instead?</Link></button>
              </div>
                {/* <div className='signInBar'>
                  <p className='signInText'>Sign In</p>
                  <button className='signInButton'>
                    <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
                  </button>
                </div> */}
              </form>

              {/* <OAuth /> */}

            </div>
          </div>
          {/* Right Side */}
          <img src={image} alt="" className="w-[430px] hidden md:block" />
        </div>
      </section>
    </>
  )
}