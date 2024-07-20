import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { updateUserFailure, updateUserSuccess, updateUserStart, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/user/userSlice'
import { Link } from 'react-router-dom'

// // firebase Storage
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read;
//       allow write: if
//       request.resource.size < 2 * 1024 * 1024 && 
//       request.resource.contentType.matches('image/.*')
//     }
//   }
// }

const Profile = () =>  {
  const fileRef = useRef(null)
  const { currentUser, loading, error } = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setupdateSuccess] = useState(false);
  const displatch = useDispatch();

  console.log(formData)
  console.log(filePerc)
  console.log(fileUploadError)
  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file])
  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        setFilePerc(Math.round(progress))
      },
      (error) => {
        setFileUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then
          ((downloadURL) => {
            setFormData({ ...formData, avatar: downloadURL })
          })
      })

  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      displatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        displatch(updateUserFailure(data.message));
        return;
      }
      displatch(updateUserSuccess(data));
      setupdateSuccess(true);
    } catch (error) {
      displatch(updateUserFailure(error.message));

    }
  }
  const handleDeleteUser = async () => {
    try {
      displatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',

      });
      const data = await res.json();
      if (data.success === false) {
        displatch(deleteUserFailure(data.message));
        return;
      }
      displatch(deleteUserSuccess(data));
    } catch (error) {
      displatch(deleteUserFailure(error.message));
    }
  }

  const handleSignOut = async () => {
    try {
      displatch(signOutUserStart());
      const res = await fetch('api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        displatch(deleteUserFailure(data.message));
        return;
      }
      displatch(deleteUserSuccess(data));
    } catch (error) {
      displatch(deleteUserFailure(data.message));
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto '>

      <h1 className='text-3xl font-semibold my-7 text-center '>Profile</h1>
      <form action='' onSubmit={handleSubmit} className='flex flex-col gap-4 '>
        <input onChange={(e) => setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*' />
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt='profile' className='rounded-full h-24 w-24 object-cover cursor-pointer self-center' />
        <p className='text-sm self-center'>
          {fileUploadError ?
            (<span className='text-red-700 '>error image upload (image must be less than 2mb )
            </span>) :
            filePerc > 0 && filePerc < 100 ? (
              <span className='text-slate-700'>{`Uploading ${filePerc}%`}
              </span>)
              : filePerc === 100 ? (
                <span className='text-green-700'>Upload Complete</span>)
                : " "

          }


        </p>
        <input type='text' placeholder='username' id='username' defaultValue={currentUser.username} className='border p-3 rounded-lg ' onChange={handleChange} ></input>
        <input type='text' placeholder='email' id='email' defaultValue={currentUser.email} className='border p-3 rounded-lg ' onChange={handleChange}></input>
        <input type='password' placeholder='password' id='password' className='border p-3 rounded-lg '></input>
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 '>{loading ? 'Loading...' : 'update'}</button>
        <Link className = 'bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-90' to={"/create-listing"}>create listing 
        </Link>
      </form>
      <div className='flex justify-between mt-5 '>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer '>Delete Account</span>
        <span className='text-red-700 cursor-pointer ' onClick={handleSignOut}>Sign Out</span>

      </div>

      <p className='text-green-700 mt-5 '>{updateSuccess ? 'user updates succesfull' : ''}</p>
    </div>
  )
}

export default Profile 
