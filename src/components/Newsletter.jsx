// Newsletter.jsx

const Newsletter = () => {
  return (
      <div className="bg-black py-12 text-white mt-6 mb-6 shadow-lg">
          <div className="container mx-auto text-center">
              <div className="pl-8 pr-8">
                <h2 className="text-[20px] lg:text-3xl md:text-2xl font-bold	mb-8">"STAY UPDATED ON OUR LATEST EFFORTS TO SHARE MEDICAL SUPPLIES AND EQUIPMENT SUBSCRIBING TO  OUR NEWSLETTER"</h2>
              </div>
              <div className="max-w-md mx-auto">
                  <form>
                      <label htmlFor="email" className="sr-only">Email Address</label>
                      <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Enter your email"
                          className="w-full py-2 px-4 rounded-full	 border border-white bg-black text-white placeholder-white focus:outline-none focus:border-gray-400"
                      />
                      <button type="submit" className="mt-4 py-2 px-6 bg-white text-black rounded-md hover:bg-gray-100 transition duration-300">Subscribe</button>
                  </form>
              </div>
          </div>
      </div>
  );
};

export default Newsletter;
