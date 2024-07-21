import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useState } from 'react'
import { app } from '../firebase'

const CreateListing = () => {
    const [files, setfiles] = useState([])
    const [formData, setFormData] = useState({
        imageUrls: [],

    })
    const [imageUploadError, setImageUploadError] = useState(false)
    const [uploading , setUploading] = useState(false)
    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setUploading(true)
            const promises = []
            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]))
            }
            Promise.all(promises).then((urls) => {
                setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls), })
                setImageUploadError(false)
                setUploading(false)
            }).catch((err) => {
                setImageUploadError('Image Upload Failed (2 MB max per Image)')
                setUploading(false)
            })
        } else {
            setImageUploadError('You can upload 6 images per listing ')
            setUploading(false)
        }

    }
    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app)
            const fileName = new Date().getTime() + file.name
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    console.log(`Upload is ${progress}% done`)
                },
                (error) => {
                    reject(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                    })
                }
            )
        })
    }
    console.log(formData)
    console.log(files)
    
    const handleremoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        })
    }
    return (
        <main className='p-3 max-w-4xl mx-auto '>
            <h1 className='text-3xl font-semibold text-center my-7 '>Create a Listing </h1>
            <form className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input type="text" placeholder='Name ' className='border p-3 rounded-lg ' id='name' maxLength='10' required />
                    <textarea type="text" placeholder='Description ' className='border p-3 rounded-lg ' id='description' required />
                    <input type="text" placeholder='Address' className='border p-3 rounded-lg ' id='address' required />
                    <div className='flex gap-6 flex-wrap '>
                        <div className='flex gap-2 '>
                            <input type="checkbox" id="sale" className='w-5 ' /><span>sell</span>
                        </div>
                        <div className='flex gap-2 '>
                            <input type="checkbox" id="rent" className='w-5 ' /><span>Rent</span>
                        </div>
                        <div className='flex gap-2 '>
                            <input type="checkbox" id="parking" className='w-5 ' /><span>Parking spot</span>
                        </div>
                        <div className='flex gap-2 '>
                            <input type="checkbox" id="furnished" className='w-5 ' /><span>Furnished</span>
                        </div>
                        <div className='flex gap-2 '>
                            <input type="checkbox" id="other" className='w-5 ' /><span>Other</span>
                        </div>

                    </div>
                    <div className='flex gap-6 flex-wrap '>
                        <div className='flex items-center gap-2 '>
                            <input className='p-3 border border-gray-300 rounded-lg' type="number" id="beds" min='1' max='10' required /><p>Beds</p>
                        </div>
                        <div className='flex items-center gap-2 '>
                            <input className='p-3 border border-gray-300 rounded-lg' type="number" id="bathrooms" min='1' max='10' required /><p>Baths</p>
                        </div>
                        <div className='flex items-center gap-2 '>
                            <input className='p-3 border border-gray-300 rounded-lg' type="number" id="regularPrice" min='1' max='10' required />
                            <div className='flex flex-col items-center '>
                                <p>Regular Price</p>
                                <span className='text-xs '>($/month)</span>
                            </div>

                        </div>
                        <div className='flex items-center gap-2 '>
                            <input className='p-3 border border-gray-300 rounded-lg' type="number" id="discountPrice" min='1' max='10' required />
                            <div className='flex flex-col items-center '>
                                <p>Discountes Price</p>
                                <span className='text-xs '>($/month)</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-4 flex-1 '>
                    <p className='font-semibold '>Images :
                        <span className='font-normal text-gray-600 ml-2 '>the first image will be the cover </span>
                    </p>
                    <div className='flex gap-4 '>
                        <input onChange={(e) => setfiles(e.target.files)} className='p-3 border border-gray-300 rounded w-full ' type="file" id="images" accept='image/*' multiple />
                        <button type='button' disabled={uploading} onClick={handleImageSubmit} className='p-3 border border-green-700- text-green-700  rounded hover:shadow-lg disabled:opacity-80 uppercase '>{uploading ? 'Uploading...' : 'Upload'}</button>
                    </div>
                    <p className='text-red-700 '>
                        {imageUploadError && imageUploadError}
                    </p>
                    {
                        formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                            <div key={url} className='flex justify-between p-3 border items-center'>
                                <img src={url} alt='listing images' className='w-40 h-40 object-contain rounded-lg' />
                                <button type='button' onClick={() => handleremoveImage(index)} className='p-3 text-red-700 rounded-lg hover:opacity-95'>Delete</button>
                            </div>

                        ))
                        
                    }
                    
                    <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                        create Listing
                    </button>
                </div>

            </form>
        </main>
    )
}

export default CreateListing
