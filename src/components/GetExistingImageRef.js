
import { ref } from "firebase/storage";

// const blogList = ({ blogPost, id, onEdit, onDelete }) => {
//   const blogDate = blogPost.timestamp.toDate().toDateString()

const GetExistingImageRef = (url, storage) => {

  // Delete the old image from storage if there is one
  // TODO - this does not always succeed.  I solved the problem of getting the "%2F" replaced by the "/", but it is still inconsistant for reasons yet unknown.
  const urlToDelete = url
  let fileName = urlToDelete.split('/').pop().split('#')[0].split('?')[0];
  // console.log('1fileName=')
  // console.log(fileName)
  const imageToDeleteRef = ref(storage, `${fileName.replace('%2F', '/')}`);
  // console.log('imageToDeleteRef=')
  // console.log(imageToDeleteRef)
  return(imageToDeleteRef)
}
export default GetExistingImageRef