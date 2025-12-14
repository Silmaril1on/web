"use client"
import { motion } from 'framer-motion';
import Image from 'next/image'
import SoundfolioAnimation from './SoundfolioAnimation'
import TextAnimation from './TextAnimation';

const Shorts = () => {
  return (
    <section>
        <article className='w-[950px] h-[630px] grid grid-cols-3 grid-rows-3 overflow-hidden'>
            <div className='bg-black'></div>
            <BoxTwo />
            <div className='bg-black'></div>
            <BoxFour/>
            <MidBox />
            <BoxFive />
            <div className='bg-black'></div>
            <div className='bg-gold'></div>
            <div className='bg-black'></div>
        </article>
    </section>
  )
}

const BoxTwo = () =>{ 
  return (
   <div className='bg-gold'>
      <TextAnimation text="soundfolio" />
   </div>
  )
}

const BoxFour = () => {
  return (
    <div className='bg-gold center'>
      <motion.div 
        initial={{ x: "-250px" }}
        animate={{ 
          x: 0, 
          rotate: 360 
        }}
        transition={{ 
          x: { duration: 0.5, delay: 0.5 },
          rotate: { 
            duration: 1.3, 
            delay: 0.5,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      >
        <Image 
          src="/assets/vynil.png" 
          alt="vynil" 
          className='w-28 h-28' 
          width={200} 
          height={200}
        />
      </motion.div>
    </div>
  );
};

const MidBox = () =>{ 
    return (
      <div className='overflow-hidden flex items-center justify-center '>
         <SoundfolioAnimation variant="none" className="scale-60" />
      </div>
    )
}

const BoxFive = () =>{
    return (
    <div className='bg-gold center'>
      <motion.div 
        initial={{ x: "250px" }}
        animate={{ 
          x: 0, 
          rotate: 360 
        }}
        transition={{ 
          x: { duration: 0.5, delay: 0.5 },
          rotate: { 
            duration: 1.3, 
            delay: 0.5,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      >
        <Image 
          src="/assets/vynil.png" 
          alt="vynil" 
          className='w-28 h-28' 
          width={200} 
          height={200}
        />
      </motion.div>
    </div>
  );
};




export default Shorts