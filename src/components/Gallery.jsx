import PhotoList from './PhotoList'

function Gallery({ currentCategory }) {
  const {
    categoryName,
    description
  } = currentCategory;

  return (
    // render the photos for the named category
    <section >
      <p className='text-xl'>{description}</p>
      <PhotoList category={categoryName} key={categoryName} />
    </section>
  )
}

export default Gallery;