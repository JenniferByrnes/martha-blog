import imageFun from "../assets/images/MBXmaxPuppies.jpeg";
import { SocialIcon } from 'react-social-icons';

const Contact = () => {

  return (
    // Contact page container
    <section className="mx-auto min-h-screen h-full w-screen bg-pcGreen text-stone-800 flex justify-center items-center md:p-4 ">

      {/* container to place form and text */}
      <div className="flex flex-col justify-center items-center px-6 pt-4 py-4 sm:pt-[30px] mx-auto ">
        {/* before the form header */}
        <div className="text-center space-x-2">
          <h2 className="text-4xl inline border-b-4 border-pcCoral">Contact</h2>
          <SocialIcon url="https://www.instagram.com/burford469/" bgColor="#546a7b" style={{ height: 25, width: 25 }} className="mb-2"/>
          <p className="py-6">
            Please use this contact form to get in touch.
          </p>
        </div>
        <div className="relative flex flex-col w-full mx-auto m-6 space-y-10 shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0">
          {/* Left Side */}
          {/* Use getform.com for email. */}
          <form
            method="POST"
            action="https://getform.io/f/0b8b8f26-9b4d-4d00-87df-6b03218d70a2"
            className="form-container md:w-96"
          >
            <div className="form-inner-container ">
              {/* name */}
              <div>
                <label htmlFor="name" className="block pt-3 ">
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="form-field focus: outline-pcGreen"
                />
              </div>
              {/* email */}
              <div>
                <label htmlFor="email" className="block ">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="form-field focus: outline-pcGreen"
                />
              </div>
              {/* message */}
              <div>
                <label htmlFor="message" className="block text-stone-800">
                  Your message
                </label>
                <textarea
                  name="message"
                  rows="8"
                  required
                  className="form-field focus: outline-pcGreen"
                />
              </div>
              {/* button */}
              <div className="flex items-center justify-evenly">
                <button className="form-button">Submit</button>
              </div>
            </div>
          </form>

          {/* Right Side */}
          <img
            src={imageFun}
            alt="Girl band"
            className="w-[430px] hidden lg:block"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;