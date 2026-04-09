"use client";
import { motion } from "framer-motion";
import TrackList from "./parts/TrackList";
import LogoAnimation from "./parts/LogoAnimation";
import TextAnimation from "./parts/TextAnimation";
import ParticleAnimation from "./parts/ParticleAnimation";

const RadioTrackListShowcase = ({
  tracklist = false,
  className = "",
  text = " ",
}) => {
  return (
    <article className={`relative center h-screen max-h-[800px] ${className}`}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.3,
          delay: 0,
          type: "spring",
          stiffness: 120,
          damping: 20,
        }}
        className={`flex flex-col items-center center z-20 ${
          tracklist ? "gap-10" : " gap-10"
        }`}
      >
        {/* Logo animation */}
        <LogoAnimation />
        {/* Tracklist */}
        {tracklist && <TrackList />}
        {/* Title */}
        {/* <TextAnimation /> */}
      </motion.div>
      {/* Particle animation */}
      <div className="absolute -bottom-24">
        <ParticleAnimation />
      </div>
    </article>
  );
};

export default RadioTrackListShowcase;
