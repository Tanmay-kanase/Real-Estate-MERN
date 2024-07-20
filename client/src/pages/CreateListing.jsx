import React from 'react'

const CreateListing = () => {
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
                            <input type="checkbox" id="sale" className='w-5 '/><span>sell</span>
                        </div>
                        <div className='flex gap-2 '>
                            <input type="checkbox" id="rent" className='w-5 '/><span>Rent</span>
                        </div>
                        <div className='flex gap-2 '>
                            <input type="checkbox" id="parking" className='w-5 '/><span>Parking spot</span>
                        </div>
                        <div className='flex gap-2 '>
                            <input type="checkbox" id="furnished" className='w-5 '/><span>Furnished</span>
                        </div>
                        <div className='flex gap-2 '>
                            <input type="checkbox" id="other" className='w-5 '/><span>Other</span>
                        </div>

                    </div>
                    <div className='flex gap-6 flex-wrap '>
                        <div className='flex items-center gap-2 '>
                            <input className='p-3 border border-gray-300 rounded-lg' type="number" id="beds" min='1' max='10' required/><p>Beds</p>
                        </div>
                        <div className='flex items-center gap-2 '>
                            <input className='p-3 border border-gray-300 rounded-lg' type="number" id="bathrooms" min='1' max='10' required/><p>Baths</p>
                        </div>
                        <div className='flex items-center gap-2 '>
                            <input className='p-3 border border-gray-300 rounded-lg' type="number" id="regularPrice" min='1' max='10' required/>
                            <div className='flex flex-col items-center '>
                                <p>Regular Price</p>
                                <span className='text-xs '>($/month)</span>
                            </div>

                        </div>
                        <div className='flex items-center gap-2 '>
                            <input className='p-3 border border-gray-300 rounded-lg' type="number" id="discountPrice" min='1' max='10' required/>
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
                        <input className='p-3 border border-gray-300 rounded w-full ' type="file" id="images" accept='image/*' multiple/>
                        <button className='p-3 border border-green-700- text-green-700  rounded hover:shadow-lg disabled:opacity-80 uppercase '>Upload</button>
                    </div>

                <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                    create Listing 
                </button>
                </div>
            </form>
        </main>
    )
}

export default CreateListing
