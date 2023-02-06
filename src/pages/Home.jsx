import React from 'react';
import image from '../assets/images/MarthaElliptical.png'

const Home = () => {

  return (
    // Page Container
    <section className="relative mx-auto min-h-screen h-full w-screen bg-pcGreen" >
      {/* Divide the container into one flex column */}
      <div className="flex flex-col p-6 lg:p-12 justify-center items-center" >

        <p className="text-4xl text-pcBlue md:text-6xl text-center mb-2">
          Burfmusing
        </p>
          {/* Image */}
          <div >
            <img className="rounded-xl object-fill h-96 ..."
              alt="Sample"
              src={image}
            />
          </div>
   
        <p className="italic font-bold text-l sm:text-xl md:text-3xl pt-5 md:pt-10 text-rose-400 text-center mt-4 z-10">
        Burfmusing is where Martha Burford’s love for hospitality, music, mountains, people, seasons, and purpose come together. Here you can check out the latest news for her AirBnB, Blue Ridge Hideaway; follow links to music Martha loves and makes with others; and read her blog for musings on dachshunds, mourning, falling in love with sunsets, and the connections we discover when we listen without reservation and open our hearts. 
        </p>
      </div>
      {/* svg image of mountains - in indes.css */}
      <div className='absolute bottom-0 mountain-footer'>
      </div>
    </section>
  );
};

export default Home;