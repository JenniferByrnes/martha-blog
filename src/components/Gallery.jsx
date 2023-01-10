
import PhotoList from './PhotoList'

function Gallery({ currentCategory }) {
  const {
    name,
    description
  } = currentCategory;

  
  return (
    // render the photos for the catergory
    <section >
      {/* <h1>{(name)}</h1> */}
      <p className='text-xl'>{description}</p>
      <PhotoList category={currentCategory.name} />
    </section>
  )
}

export default Gallery;