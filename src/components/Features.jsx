import React from 'react'

const Features = () => {
  const servicesData = [
    {icon: 'flaticon-test', title: 'Community Collaboration:', description: 'We provide a platform for healthcare professionals, organizations, and individuals to come together and share surplus medical supplies and equipment.'},
    {icon: 'flaticon-test', title: 'Empowering Communities:', description: 'By      facilitating the sharing      of    medical supplies and equipment, we   empower communities to address their healthcare needs and build resilience   in the face of health challenges.'},
    {icon: 'flaticon-test', title: 'Global Reach:', description: 'Our network spans across borders, enabling us to connect donors with recipients in different parts of the world, ensuring that medical resources are distributed where they are needed most.'},
  ];

  return (
    <section id="services" aria-labelledby="services-heading" className=" mt-8">
      <div className="mx-auto p-2 bg-[#38867D]    rounded-xl">
        <h2 id="services-heading" className="text-4xl font-bold text-center text-[--bg] mb-10">Featurs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8  ">
          {servicesData.map((service, index) => (
            <div key={index} className=" rounded-xl  shadow p-2 bg-[--bg]" data-aos="fade-up" data-aos-delay="">
              <span className={`block text-center  rounded-full mb-3 bg-gradient-to-r from-green-400 to-blue-500 p-4`}>
                <i className={`fa ${service.icon}`}></i>
              </span>
              <h3 className="text-xl text-[--textColor] font-bold">{service.title}</h3>
              <p className="text-[--softTextColor]">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features