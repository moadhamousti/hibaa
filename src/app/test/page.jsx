import React from 'react'

const page = () => {
  return (
    <div className=" min-h-screen font-sans leading-normal overflow-x-hidden lg:overflow-auto">
        <section className=" p-4 shadow">
          <div className="md:flex">
          <h2 className="md:w-1/3 sm:text-start text-center uppercase  text-sm font-bold sm:text-lg  mb-16">Personal Information de <span className='text-blue-500'>{session?.user.username || session?.user.name}</span> </h2>
          </div>
          <div className=' p-2  grid sm:grid-cols-2  gap-0"  '>
            <div className='  flex flex-col items-center  w-full '>
              <div className='mb-8'>
                <img src="userProfile.svg" alt="" />
              </div>
              
              <div className="">
                  <div className=" bg-[--btnBlue] text-xl font-normal py-2 px-4 rounded-2xl text-[--bg]   justify-center   mb-6   w-fit mx-auto cursor-pointer relative">
                  <img
                    className="w-20 h-20 rounded-full mb-4"
                    src={imagePreview || 'https://github.com/shadcn.png'}
                    alt="Profile"
                    value={session?.user.image}

                  />
                  <label
                    htmlFor="profile-image"
                    className="block mt-2 px-4 py-2 bg-gray-200 rounded-md cursor-pointer text-center"
                  >
                    Upload Image
                    <input
                      id="profile-image"
                      type="file"
                      alt=''
                      accept="image/*"
                      onChange={onChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
            <form className='    w-full  '>
              <div className="md:flex mb-8  flex flex-col justify-center sm:w-1/2 w-full ">
                <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                  <div className="mb-4">
                    <label className="block uppercase tracking-wide text-xs font-bold">Full name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Name"
                      className="w-full shadow-inner rounded-xl p-2 border outline-none mx-1"
                      value={newName || ''} // Ensure this value is always defined
                      onChange={(e) => setNewName(e.target.value)}
                    />
                    
                  </div>
                <div className="md:flex-1 mt-2 mb:mt-0 md:px-0">
                  <div className="mb-4">
                    <label className="block uppercase tracking-wide text-xs font-bold">Username</label>
                    <input
                      id="username"
                      type="text"
                      placeholder="Username"
                      value={newUserName || ''} // Ensure this value is always defined
                      onChange={(e) => setNewUserName(e.target.value)}
                      className="w-full shadow-inner rounded-xl p-2 border outline-none mx-1"
                    />
                  </div>
                </div>
                  <div className="md:flex mb-8">
                    <div className="md:flex-1 mt-2 mb:mt-0 md:px-0">
                              <div className="mb-4">
                                <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Email</label>
                                <input
                                  id="email"
                                  type="email"
                                  placeholder="Email"
                                  value={newEmail || ''}
                                  readOnly // This makes the input field read-only
                                  className="w-full bg-gray-200 shadow-inner rounded-xl p-2 border outline-none mx-1"
                                />
                              </div>
                          </div>
                  </div>
            
                  <button 
                  className=" bg-[#217bbc] text-xl font-normal py-2 px-4 rounded-2xl text-black  flex sm:mx-0 mx-auto  mb-6   w-fit cursor-pointer relative" 
                  onClick={() => update({ username: newUserName, name: newName, email: newEmail,image: newImage })}
                  >update</button>

              </div>
              </div>
              </form>
          </div>
                
        </section>
        {/* <div>
          <h2 className="text-lg font-semibold mt-8">Postes d'utilisateur</h2>
          <CurrentUserPosts id={session?.user?.id} />
        </div> */}

      </div>
  )
}

export default page