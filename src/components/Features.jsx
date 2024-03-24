import React from 'react'
import { IconButton } from '@mui/material';

const Services = () => {
  const servicesData = [
    { 
      icon: 'flaticon-test', 
      title: "MAKE DONATION", 
      description: "Simply select the items you'd like to donate, fill out a brief form...",
      image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F2d%2F23%2F5f%2F2d235f733c7fd7553ff283646bdf5bd1.png&tbnid=Tpim_PmaZSJ13M&vet=12ahUKEwiV8NTWgf-EAxX5TKQEHRhODIoQMygAegQIARBT..i&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F838021443157224675%2F&docid=muZuV7moV2cbfM&w=2380&h=1490&q=pixels&hl=en&client=opera-gx&ved=2ahUKEwiV8NTWgf-EAxX5TKQEHRhODIoQMygAegQIARBT"  // change with your actual image links
    },
    { 
      icon: 'flaticon-test', 
      title: "MAKE DONATION", 
      description: "Simply select the items you'd like to donate, fill out a brief form...",
      image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F2d%2F23%2F5f%2F2d235f733c7fd7553ff283646bdf5bd1.png&tbnid=Tpim_PmaZSJ13M&vet=12ahUKEwiV8NTWgf-EAxX5TKQEHRhODIoQMygAegQIARBT..i&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F838021443157224675%2F&docid=muZuV7moV2cbfM&w=2380&h=1490&q=pixels&hl=en&client=opera-gx&ved=2ahUKEwiV8NTWgf-EAxX5TKQEHRhODIoQMygAegQIARBT"  // change with your actual image links
    },
    { 
      icon: 'flaticon-test', 
      title: "MAKE DONATION", 
      description: "Simply select the items you'd like to donate, fill out a brief form...",
      image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F2d%2F23%2F5f%2F2d235f733c7fd7553ff283646bdf5bd1.png&tbnid=Tpim_PmaZSJ13M&vet=12ahUKEwiV8NTWgf-EAxX5TKQEHRhODIoQMygAegQIARBT..i&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F838021443157224675%2F&docid=muZuV7moV2cbfM&w=2380&h=1490&q=pixels&hl=en&client=opera-gx&ved=2ahUKEwiV8NTWgf-EAxX5TKQEHRhODIoQMygAegQIARBT"  // change with your actual image links
    },
    // add as many services as you like
  ];

  return (
    <section id="features" aria-labelledby="services-heading" className="mt-8" >
      <div className="mx-auto p-2 rounded-xl">
        <h2 id="services-heading" className="text-4xl font-bold text-center text-[black] mb-10">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div 
              key={index}
              style={{ imageUrl: `url(${service.image})` }}
              className="rounded-xl shadow px-4 bg-cover bg-[#00A4BF] rounded-l-none rounded-b-none" data-aos="fade-up" data-aos-delay="">
              <i className={`fa ${service.icon}`}></i>
              <h3 className="text-lg text-center py-6 text-[white] h-24 font-bold">{service.title}</h3>
              <p className="text-[white] text-md py-4 pb-12">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services