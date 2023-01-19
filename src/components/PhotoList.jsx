import React, { useState } from 'react';
import Modal from './Modal';

const PhotoList = ({ category }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [photos] = useState([
    {
      name: 'Living Room',
      category: 'living',
      description: 'A lovely room to gather and enjoy the view through a large picture window.',
    },
    {
      name: 'Living Room - side view',
      category: 'living',
      description: "There's a grand piano and plenty of reading material.",
    },
    {
      name: 'Den - front view',
      category: 'living',
      description: "Lot's of light and 2 daybeds.",
    },
    {
      name: 'Den - back view',
      category: 'living',
      description: "A large TV and seating when the daybeds are not in use.",
    },
    {
      name: 'Kitchen',
      category: 'living',
      description: 'A bright, cheery kitchen with lots of room for prep and breakfast seating.',
    },
    {
      name: 'Dining Room',
      category: 'living',
      description: "The table comfortably seats 6.  There is additional seating with stools in the kitchen and welcoming outdoor space.",
    },
    {
      name: 'Main Bedroom',
      category: 'bedrooms',
      description: 'A king size bed in a room with plenty of closet space.',
    },
    {
      name: 'Main Bedroom - side',
      category: 'bedrooms',
      description: 'A work desk and attached bath.',
    },
    {
      name: 'Bedroom #2',
      category: 'bedrooms',
      description: 'The best bedroom view from the house - simply stunning!',
    },
    {
      name: 'Building exterior',
      category: 'outside',
      description: "A drone's eye view of the house.  Look at those mountains!",
    },
    {
      name: 'Front Porch',
      category: 'outside',
      description: 'Sitting area for viewing the sunrise.',
    },
    {
      name: 'Burrito',
      category: 'Back Patio',
      description: 'Enclosed patio - perfect for enjoying the outdoors.',
    },
    {
      name: 'Outside',
      category: 'outside',
      description: 'This is the view that brings you to this house.  See yourself with a sweet iced tea enjoying the view.',
    },
    {
      name: 'Main Bedroom - Bath',
      category: 'other',
      description: 'Full sized bathtub.',
    },
    {
      name: 'Bathroom',
      category: 'other',
      description: 'Full sized shower.',
    },
  ]);

  // Filter for photos
  const currentPhotos = photos.filter((photo) => photo.category === category);

  // State for photo
  const [currentPhoto, setCurrentPhoto] = useState( );

  // Toggle for modal
  const toggleModal = (image, i) => {
    setCurrentPhoto({ ...image, index: i });
    setIsModalOpen(!isModalOpen);
  }

  return (
    // Container for Photo List
    <div className="max-w-6xl mx-auto">
      {/* Modal if needed */}
      {isModalOpen && (
        <Modal currentPhoto={currentPhoto} onClose={toggleModal}/>
      )}
      {/* Photos by category */}
      <div className="flex flex-col justify-center content-center md:flex-row md:flex-wrap max-w-full ">
        {currentPhotos.map((image, i) => (
          <section key={image.name} className="py-4 px-2 mx-auto justify-center content-center ">
            <div className="flex flex-col items-center w-96 max-w-xs rounded-xl shadow-2xl drop-shadow-2xl ">
              <img
                src={require(`../assets/images/${category}/${i}.webp`)}
                alt={image.name}
                className="mx-1"
                onClick={() => toggleModal(image, i)}
              />
              <span className='px-3 py-1 text-xl'>{image.name}</span>
              <span className='px-3 py-1'>{image.description}</span>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default PhotoList;