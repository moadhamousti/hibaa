import React from 'react';
import PolicyIcon from '@mui/icons-material/Policy';
import Person4Icon from '@mui/icons-material/Person4';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

const Services = () => {
  const servicesData = [
    { 
      icon: <PolicyIcon />, 
      title: "Recherche Avancée", 
      description: "An advanced search function enabling users to easily find the equipment they need based on specific criteria such as equipment type.",
    },
    { 
      icon:<Person4Icon/>, 
      title: "Profils d'utilisateurs:", 
      description: "Permettre aux utilisateurs de créer des profils personnalisés afin de définir leurs besoins en équipements médicaux et de recevoir des notifications lorsqu'ils sont disponibles.",
    },
    { 
      icon: <ContactPhoneIcon/>, 
      title: "Fonctionnalités de communication:", 
      description:"Les outils de communication intégrés, tels que la messagerie instantanée ou les forums de discussion, facilitent les interactions entre utilisateurs.",
    },
    { 
      icon: <AccessibilityNewIcon/>, 
      title: "Accessibilité:", 
      description: "Assurer que le site web est facilement accessible aux personnes handicapées conformément aux normes d'accessibilité Web.",
    },
  ];

  return (
    <section id="services" aria-labelledby="services-heading" className="mt-8 mb-10">
      <div className="mx-auto p-2 rounded-xl">
        <h2 id="services-heading" className="text-[50px] font-bold text-center text-[black] mb-8">Traits</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 group  lg:grid-cols-4 gap-2">
          {servicesData.map((service, index) => (
            <div 
              key={index}
              className="rounded-3xl shadow shadow-[#00A4BF] duration-500 group-hover:blur-sm hover:!blur-none group-hover:scale-[0.90]  hover:!scale hover:shadow-black px-4 bg-cover text-[#00A4BF] hover:bg-[#00A4BF] hover:text-[--bg] rounded-tl-none rounded-br-none" data-aos="fade-up" data-aos-delay="">
              <div className="text-3xl text-[#852844] text-center py-2  font-bold" fontSize='medium'>{service.icon}</div>
              <h3 className="text-lg text-center py-2 h-fit font-bold ">{service.title}</h3>
              <p className=" text-md  pb-2">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;