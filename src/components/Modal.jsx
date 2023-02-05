
function Modal({ onClose, currentPhoto }) {
  const { name, category, description, index } = currentPhoto;

  return (
    // Modal backdrop
    <div className=" bg-black overflow-auto fixed z-10 top-0 bottom-0 right-0 left-0">
      {/* Modal container */}
      <div className="flex flex-col justify-center relative">
        {/* Modal title */}
        <h3 className= "text-white text-center font-extrabold text-2xl">{name}</h3>
        {/* Modal image */}
        <img src={require(`../assets/images/${category}/${index}.webp`)} alt="current category" />
        {/* Modal description */}
        <p>{description}</p>
        {/* Close button */}
        <button onClick={onClose} type="button" className="absolute top-0 right-2 text-white  font-extrabold text-2xl">X</button>
      </div>
    </div>
  );
}

export default Modal;