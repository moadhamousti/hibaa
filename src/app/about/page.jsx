import React from 'react'

const page = () => {
  return (
    <div className=" min-h-screen font-sans leading-normal overflow-x-hidden lg:overflow-auto">
        <section className=" p-4 shadow">
          <div className="md:flex">
          <h2 className="md:w-1/3 sm:text-start text-center uppercase  text-sm font-bold sm:text-lg  mb-16">Personatl Information</h2>
          </div>
          <div className=' p-2  grid sm:grid-cols-2  gap-0"  '>
            <div className='  flex flex-col items-center  w-full '>
              <div className='mb-8'>
                <img src="userProfile.svg" alt="" />
              </div>
              
              <div className="">
                  <div className=" bg-[--btnBlue] text-xl font-normal py-2 px-4 rounded-2xl text-[--bg]   justify-center   mb-6   w-fit mx-auto cursor-pointer relative">
                    <input className="opacity-0 absolute items-left" type="file" name="cover_image" />
                    Upload Image
                </div>
              </div>
            </div>
            <form className='    w-full  '>
              <div className="md:flex mb-8  flex flex-col justify-center sm:w-1/2 w-full ">
                <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                  <div className="mb-4">
                    <label className="block uppercase tracking-wide text-xs font-bold">Full name</label>
                    <input className="w-full shadow-inner rounded-xl p-2 border outline-none mx-1" type="text" name="name" placeholder="Mouad" />
                  </div>
                <div className="md:flex-1 mt-2 mb:mt-0 md:px-0">
                  <div className="mb-4">
                    <label className="block uppercase tracking-wide text-xs font-bold">Username</label>
                    <input className="w-full shadow-inner rounded-xl p-2 border outline-none mx-1" type="text" name="name" placeholder="sous" />
                  </div>
                </div>
                  <div className="md:flex mb-8">
                    <div className="md:flex-1 mt-2 mb:mt-0 md:px-0">
                              <div className="mb-4">
                                <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Email</label>
                                <input className="w-full shadow-inner rounded-xl p-2 border outline-none mx-1" type="email" name="email" placeholder="Mouad.tct@gmail.com" />
                              </div>
                    </div>
                  </div>
            
                  <button className=" bg-[--btnBlue] text-xl font-normal py-2 px-4 rounded-2xl text-[--bg]  flex sm:mx-0 mx-auto  mb-6   w-fit cursor-pointer relative">
                  Save changes
                  </button>
              </div>
              </div>
              </form>
          </div>
        </section>
      {/* </main> */}
    </div>
  )
}

export default page