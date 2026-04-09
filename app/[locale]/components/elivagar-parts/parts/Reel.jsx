"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { ELIVAGAR_TRACKLISTS } from "../data/trackLists";

const Reel = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="w-[1000px] h-[650px] relative overflow-hidden">
        <PosterSection />
        <TrackListSection />
        <Elements />
      </div>
    </div>
  );
};

const PosterSection = () => {
  return (
    <>
      <Image
        className="w-full h-full object-cover"
        src="/assets/elivagar-poster.png"
        alt="Elivagar Poster"
        width={1000}
        height={650}
        quality={100}
      />

      {/* Glitch Overlay */}
      <motion.div
        className="absolute inset-0 -left-5"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 0, 0, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "loop",
          times: [0, 0.1, 0.15, 0.4, 0.45, 1],
          ease: "easeInOut",
        }}
      >
        <Image
          className="w-full h-full object-cover"
          src="/assets/elivagar-poster-glitch.png"
          alt="Glitch Poster"
          width={1000}
          height={650}
          quality={100}
        />
      </motion.div>
    </>
  );
};

const TrackListSection = () => {
  const { tracks } = ELIVAGAR_TRACKLISTS;

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="absolute  backdrop-blur-md shadow-[2px_2px_10px_rgba(0,0,0,0.5)] border border-neutral-700 bg-black/30 right-5 bottom-5 w-88 p-2 rounded-lg">
      {/* Animated Neon Border */}
      <div className="absolute inset-0 rounded-lg neon-border" />

      {/* Inner Content */}
      <div className="relative h-full w-full rounded-lg ">
        {/* Your tracklist content here */}
        {tracks.map((track, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative overflow-hidden text-cream text-[14px] no-main font-medium tracking-tight text-start px-1"
          >
            {/* THE SHIMMER EFFECT - text-only left->right, preserves original timing */}
            <span className="shimmer inline-block w-full">
              <span className="block opacity-90">{track}</span>
              <span
                className="shimmer-overlay block"
                style={{ animationDelay: `${4 + index * 0.1}s` }}
              >
                {track}
              </span>
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Elements = () => {
  const { episode } = ELIVAGAR_TRACKLISTS;

  return (
    <div className="absolute inset-0">
      <Image
        className="sepia absolute -top-10 left-10"
        src="/assets/elivagar.png"
        alt="Elivagar"
        width={300}
        height={300}
      />
      <Image
        src="/assets/radiotitle.png"
        className="absolute top-0 left-5.5"
        alt="Essence radio"
        width={300}
        height={300}
      />
      <Image
        className="sepia absolute right-10 animate-pulse"
        src="/assets/elivagar-logo.png"
        alt="Elivagar Logo"
        width={200}
        height={200}
      />
      <div className="absolute top-25 left-65 w-17 center border border-cream/20 rounded-sm backdrop-blur-lg bg-black/20 ">
        <h1 className="text-3xl font-bold ">{episode}</h1>
      </div>
    </div>
  );
};

export default Reel;
