import React from 'react';
import PolicyIcon from '@mui/icons-material/Policy';
import Person4Icon from '@mui/icons-material/Person4';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import ThreePIcon from '@mui/icons-material/ThreeP';

const Services = () => {
  const servicesData = [
    { 
      icon: <DynamicFeedIcon />, 
      title: "Donation / Demande", 
      description: "L'utilisateur peut soit créer une publication de don, soit demander du matériel également sur le site aux autre utilisateurs.",
    },
    { 
      icon:<Person4Icon/>, 
      title: "Profils d'utilisateurs", 
      description: "Permet aux utilisateurs de créer un profil personnel, où ils peuvent modifier leurs informations et voir leurs publications.",
    },
    { 
      icon: <AdsClickIcon/>, 
      title: "Promotion", 
      description:"Vous pouvez promouvoir votre activité pharmaceutique afin que les autres utilisateurs puissent la voir une fois qu'elle aura été approuvée par l'administration.",
    },
    
    { 
      icon: <ThreePIcon/>, 
      title: "Communication", 
      description: "La possibilité de communiquer avec d'autres utilisateurs pour obtenir des dons ou les donner, via différentes manières comme WhatsApp ou par e-mail.",
    },
  ];

  return (
    <section id="features" aria-labelledby="services-heading" className="mt-8 mb-10" >
      <div className="mx-auto p-2 rounded-xl">
        <h2 id="services-heading" className="text-[50px] font-bold text-center text-[black] mb-8">Traits</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 group  lg:grid-cols-4 gap-2">
          {servicesData.map((service, index) => (
            <div 
              key={index}
              className="rounded-3xl shadow shadow-[#00A4BF] duration-500 group-hover:blur-sm hover:!blur-none group-hover:scale-[0.90]  hover:!scale hover:shadow-black px-4 bg-cover text-[#00A4BF] hover:bg-[#00A4BF] hover:text-[--bg] rounded-tl-none rounded-br-none" data-aos="fade-up" data-aos-delay="">
              <div className="text-3xl  text-center py-2  font-bold" fontSize='medium'>{service.icon}</div>
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