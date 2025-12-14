"use client";
import { motion } from "framer-motion";

const TrackList = () => {
  const trackList = [
    "Carlo Whale, Th;en, Innellea - Inside Your Mind",
    "CultureKind - Signs Of Life",
    "Greenjack, Boosin - The World is On Fire (Two Are Remix)",
    "Passenger 10 - Countdown (Vicissu Remix)",
    "AVIRA, Ennea, Kayrae - Darkest Before Dawn",
    "Fancy Inc - Nightmare",
    "Karry G - Bando",
    "Inellea, Cylon ft. BRAEV - Downfall",
    "Einmusik, Jordan Arts - Echoes",
    "Anthony Middleton - Anti-Aging",
  ];

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
      className="secondary z-10 w-96 h-auto flex flex-col items-center gap-1"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="font-light text-2xl mb-4">
        Essence Radio | <b className="font-bold uppercase">Episode 006</b>
      </h1>
      {trackList.map((track, index) => (
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
