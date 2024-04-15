import React from 'react'

const JoinUs = () => {
  return (
    <div className='bg-black  w-full text-center '>
        <div className='w-1/2  mx-auto'>

            <h1 className='text-[#EF507F] text-3xl font-semibold py-4 pt-10'>Rejoignez-nous pour faire la différence.</h1>
            <p className='text-[--bg] text-2xl sm:px-0 py-8 text-center'>
          Ensemble, nous pouvons faire la différence. Rejoignez-nous pour partager des équipements, soutenir les communautés et créer un avenir meilleur pour tous.
        </p>
            <div className='sm:flex text-center gap-8 mx-auto sm:w-96 py-4' >
                <p className='text-center text-[--bg] text-sm py-4  leading-8 '> <span className='text-[#00A4BF] text-xl 	  font-black'>10,000+</span><br /> Les dons d'équipement</p>
                <p className='text-center text-[--bg] py-4  text-sm  leading-8 '> <span className='text-[#00A4BF] text-xl 	 font-black'>50+</span><br />Organisations partenaires</p>
            </div>
        </div>
    </div>
  )
}

export default JoinUs