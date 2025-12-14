"use client";
import React from 'react';
import { motion } from "framer-motion";
import { Michroma } from 'next/font/google'


const michroma = Michroma({
  weight: '400',
  subsets: ['latin'],
})

const TextAnimation = ({ text = "soundfolio" }) => {
  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      transition={{
        delayChildren: 0.25,
        staggerChildren: 0.1,
      }}
      className="text-4xl uppercase font-bold relative block z-10 text-black"
    >
      {text.split("").map((l, i) => {
        return (
          <motion.span
            key={i}
            variants={{
              hidden: {
                opacity: 0,
                x: -20,
              },
              visible: {
                opacity: 1,
                x: 0,
              },
            }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
            className={`inline-block ${michroma.className}`}
          >
            {l}
          </motion.span>
        );
      })}
    </motion.h1>
  )
}

export default TextAnimation