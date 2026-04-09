"use client";
import { motion } from "framer-motion";
import { ELIVAGAR_TRACKLISTS } from "../data/trackLists";

const TrackList = () => {
  const { episode, tracks } = ELIVAGAR_TRACKLISTS;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="secondary z-10 w-[500px]  h-auto flex flex-col items-center gap-1"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="font-light text-2xl mb-4">
        Essence Radio | <b className="font-bold uppercase">Episode {episode}</b>
      </h1>
      {tracks.map((track, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative overflow-hidden text-cream text-[12px] px-1"
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
    </motion.div>
  );
};

export default TrackList;
