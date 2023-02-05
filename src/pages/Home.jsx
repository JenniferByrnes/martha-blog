import React from 'react';
import image from '../assets/images/outside/3.webp'

const Home = () => {

  return (
    // Page Container
    <section className=" mx-auto min-h-full h-screen w-screen bg-pcGreen" >
      {/* Divide the container into one flex column */}
      <div className="flex flex-col p-6 lg:p-12 justify-center items-center" >

        <p className="text-4xl md:text-6xl text-center mb-2">
          Burfmusing
        </p>
        {/* Card */}
        <div className="rounded-2xl shadow-lg max-w-sm bg-white">
          {/* Image */}
          <div >
            <img className="rounded-t-xl object-fill h-60 w-96 ..."
              alt="Sample"
              src={image}
            />
          </div>
          {/* Card Info below image */}
          {/* <div className="p-6"> */}
            {/* <p className="text-xl font-medium text-center mb-2">
              Home Page Title
            </p>
            <p
              className="mb-2 text-muted text-center"
            >
              Home Page Subtitle
            </p>
            <p className="text-center leading-5 tracking-wide">
              Some quick example text to build on the card title and make up the bulk of the card‘s content.
            </p> */}
          {/* </div> */}
        </div>
        <p className="italic font-bold text-l sm:text-xl md:text-3xl pt-5 md:pt-10 text-rose-400 text-center mt-4">
        Burfmusing is where Martha Burford’s love for hospitality, music, mountains, people, seasons, and purpose come together. Here you can check out the latest news for her AirBnB, Blue Ridge Hideaway; follow links to music Martha loves and makes with others; and read her blog for musings on dachshunds, mourning, falling in love with sunsets, and the connections we discover when we listen without reservation and open our hearts. 
        </p>
      </div>
    </section>
  );
};

export default Home;