// This code was mostly created by PedroTech in his tutorial on YouTube
import { useState } from "react"
import { db } from "../../firebase.config"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export default function BlogImage({ handleImage }) {
  // State for the uploaded image
  // const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const [selectedImage, setSelectedImage] = useState();
  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };

  // Handle file upload event and update state
  // blogImages is the folder where the image will be stored.
  const uploadFile = () => {
    if (!selectedImage) return;
    // add characters to the filename to make it unique with v4
    const imageRef = ref(db, `blogImages/${selectedImage.name + v4()}`);
    // pass in the location and the image
    uploadBytes(imageRef, selectedImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
        removeSelectedImage()
      });

    },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadBytes.snapshot.ref).then((url) => {
          console.log(url);
        });
      });
  };

  //Code from What's Cooking that updates image without saving)
  // function updtImage() {
  //   const source = document.getElementById("recipe-image").value;
  //   document.getElementById("recipe-pic").src = source;
  // }

  return (
    // image display and selection
    <div className="container pt-5">
      {/* type file allows user to upload file */}
      <input
        accept="image/*"
        type="file"
        className="bg-pcGreen border-pcGreen border-4"
        onChange={imageChange}
      />
      <button
        onClick={uploadFile}
      > Save file.</button>
      {imageUrls.map((url) => {
        { handleImage(url) };
        return <img src={url} alt='' width='50%' />;
      })}
      {/* preview selected file */}
      {selectedImage && (
        <div className="flex flex-col mt-4 " >
          <img
            src={URL.createObjectURL(selectedImage)}
            className="max-w-100 max-h-96"
            alt="Thumb"
          />
          {/* user can choose to remove previewed image */}

          <button
            onClick={removeSelectedImage}
            className="cursor-pointer p-3 mt-5 w-fit mx-auto rounded-full bg-pcGreen"
          >Changed your mind?
          </button>

        </div>
      )}
      {/* save selected file to Firebase*/}



    </div>
  );
}

// Styles - not tailwindCSS - needs work

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
    background: "green",
    color: "white",
  },
};