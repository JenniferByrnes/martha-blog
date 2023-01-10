
function Modal({ onClose, currentPhoto }) {
  const { name, category, description, index } = currentPhoto;

  return (
    // Modal backdrop
    <div className="modalBackdrop">
      {/* Modal container */}
      <div className="modalContainer">
        {/* Modal title */}
        <h3 className="modalTitle">{name}</h3>
        {/* Modal image */}
        <img src={require(`../assets/images/${category}/${index}.webp`)} alt="current category" />
        {/* Modal description */}
        <p>{description}</p>
        {/* Close button */}
        <button onClick={onClose} type="button">Close this modal</button>
      </div>
    </div>
  );
}

export default Modal;