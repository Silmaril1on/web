"use client";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useAnimation,
} from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { MdQrCodeScanner } from "react-icons/md";
import { FaFire, FaHandPointUp } from "react-icons/fa";
import { dishes, menulinkData } from "@/app/localDb/dishesDb";
import { TbCurrencyLari } from "react-icons/tb";
import { CiTimer } from "react-icons/ci";
import Particle from "./Particle";
import ParticleOne from "./ParticleOne";
import Twinkles from "./Twinkles";

const MenuLinkAds = () => {
  const [showLastPart, setShowLastPart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLastPart(true);
    }, 23500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="center h-full flex">
      {/* <Twinkles /> */}
      <article className="w-[600px] h-[600px] relative overflow-hidden">
        <AdBackground />
        <QrMenu />
        <PhoneMenu />
        <MenuLinkQr />
        <MenuLinkPhone />
        <Features />
        {showLastPart && <LastPart />}
        {/* <ParticleOne /> */}
        {/* <Particle /> */}
      </article>
    </main>
  );
};

const AdBackground = () => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 26500);

    return () => clearTimeout(exitTimer);
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden">
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isExiting ? "-100%" : 0 }}
        transition={{ duration: 0.4 }}
        className="box-clip bg-slate-900 w-full h-full relative"
      >
        {/* Meat - Bouncy scale in + floating */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{
            scale: 1,
            rotate: 12,
          }}
          transition={{
            scale: { type: "spring", stiffness: 260, damping: 20, delay: 0.5 },
            rotate: { duration: 0.6, delay: 0.5 },
          }}
          className="absolute top-9 right-14"
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [12, 18, 12],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            }}
          >
            <Image src="/assets/meat.png" alt="menu" width={110} height={110} />
          </motion.div>
        </motion.div>

        {/* Salad - Elastic bounce + circular motion */}
        <motion.div
          initial={{ scale: 0, x: -100, y: 100 }}
          animate={{ scale: 1, x: 0, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 1.2,
          }}
          className="absolute bottom-12 left-15"
        >
          <motion.div
            animate={{
              x: [0, 10, 0, -10, 0],
              y: [0, -10, 0, 10, 0],
              rotate: [-12, -18, -12, -6, -12],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.3,
            }}
          >
            <Image
              src="/assets/salad.png"
              alt="menu"
              width={130}
              height={130}
            />
          </motion.div>
        </motion.div>

        {/* Burger - Pop in with overshoot + pulse scale */}
        <motion.div
          initial={{ scale: 0, rotate: 360 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 10,
            delay: 1.4,
          }}
          className="absolute top-64 left-12"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1, 1.05, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          >
            <Image src="/assets/burger.png" alt="menu" width={80} height={80} />
          </motion.div>
        </motion.div>

        {/* Pizza - Swing in + wobble rotation */}
        <motion.div
          initial={{ scale: 0, y: -200, rotate: -90 }}
          animate={{ scale: 1, y: 0, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 12,
            delay: 0.6,
          }}
          className="absolute top-8 left-22"
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 3, -3, 0],
              scale: [1, 0.95, 1, 0.98, 1],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.3,
            }}
          >
            <Image
              src="/assets/pizza.png"
              alt="menu"
              width={140}
              height={140}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ x: "400px", y: "500px" }}
        animate={{ x: isExiting ? "400px" : 0, y: isExiting ? "500px" : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute right-0 bottom-0 bg-papaya w-[370px] h-[414px] overflow-hidden"
      >
        <Image
          src="/assets/enu.png"
          alt="menu"
          width={800}
          height={804}
          className="w-full h-full object-cover object-top"
        />
      </motion.div>
    </div>
  );
};

const QrMenu = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 1, 1, 1, 0],
      }}
      transition={{
        duration: 5,
        delay: 3,
        times: [0, 0.05, 0.4, 0.65, 0.95, 1],
        ease: "easeInOut",
      }}
      className="absolute center backdrop-blur-[2px] inset-0 bg-black/30 center"
    >
      <motion.div
        initial={{ scale: 0, rotateX: 0 }}
        animate={{ scale: 1, rotateX: 540 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
          delay: 3,
        }}
        className="relative"
      >
        <Image
          src="/assets/qrqrqr.png"
          alt="qr code"
          width={200}
          height={200}
        />
        <Corner />
      </motion.div>
    </motion.div>
  );
};

const Corner = () => {
  return (
    <>
      {/* Bottom Left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, x: "-20px", y: "-20px" }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 3.8 }}
        className="absolute -top-2 -left-2 w-5 h-5 border-t-4 border-l-4 border-yellow-400"
      />

      {/* Bottom Right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, x: "20px", y: "-20px" }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 3.8 }}
        className="absolute -top-2 -right-2 w-5 h-5 border-t-4 border-r-4 border-yellow-400"
      />

      {/* Top Left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, x: "-20px", y: "20px" }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 3.8 }}
        className="absolute -bottom-2 -left-2 w-5 h-5 border-b-4 border-l-4 border-yellow-400"
      />

      {/* Top Right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, x: "20px", y: "20px" }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 3.8 }}
        className="absolute -bottom-2 -right-2 w-5 h-5 border-b-4 border-r-4 border-yellow-400"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 3.8 }}
        className="absolute border-2 border-yellow-400 -top-14 left-5 bg-black/70 rounded-full"
      >
        <div className="px-3 py-1 rounded-full flex items-center gap-2">
          <span>
            <MdQrCodeScanner />
          </span>
          <h1 className="text-yellow-400 font-bold rotate-x-180">
            yourmenu.com
          </h1>
          <span className="rounded-full bg-neutral-700 center">
            <IoIosArrowUp />
          </span>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: [1, 0.85, 1, 0.85, 1],
        }}
        transition={{
          opacity: { duration: 0.6, delay: 5.5 },
          y: { duration: 0.6, delay: 5.5 },
          scale: { duration: 0.5, delay: 6.1, ease: "easeOut" },
        }}
        className="absolute right-16 -top-16 rotate-225"
      >
        <FaHandPointUp size={25} />
      </motion.div>
    </>
  );
};

const PhoneMenu = () => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Exit animation starts at 11 seconds
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 11000);

    return () => clearTimeout(exitTimer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.4, delay: isExiting ? 1 : 7.7 }}
      className="absolute inset-0 center bg-black/40"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={
          isExiting
            ? {
                scale: [1, 0.9, 0.7, 0.4, 0.1, 0],
                rotateX: [0, 20, 45, 70, 90],
                rotateY: [0, -10, 15, -25, 40],
                rotateZ: [0, -15, 30, -45, 180, 360],
                y: [0, -30, -10, 50, 200, 500],
                x: [0, 10, -15, 30, 100],
              }
            : { scale: 1 }
        }
        transition={
          isExiting
            ? { duration: 1.4, ease: [0.6, 0.05, 0.8, 0.9] }
            : { duration: 0.5, delay: 7.8 }
        }
        className="relative rounded-4xl overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
      >
        <motion.div
          animate={
            isExiting
              ? {
                  filter: [
                    "brightness(1) contrast(1)",
                    "brightness(0.8) contrast(1.2)",
                    "brightness(0.6) contrast(1.4)",
                    "brightness(0.3) contrast(1.6)",
                    "brightness(0)",
                  ],
                }
              : {}
          }
          transition={{ duration: 1.4 }}
        >
          <Image
            className="relative z-5"
            src="/assets/phone.png"
            alt="phone menu"
            width={250}
            height={500}
          />
        </motion.div>
        <MenuShowCase />
      </motion.div>
    </motion.div>
  );
};

const MenuShowCase = () => {
  return (
    <div className="bg-white absolute inset-0 z-0 m-1 rounded-4xl center flex-col pt-6">
      <div className="w-full px-3 flex items-center gap-2">
        <input
          type="text"
          placeholder="Search dishes..."
          className="flex-1 px-2 py-1 text-xs border placeholder:text-neutral-500 border-neutral-200 rounded-md "
        />
        <button className="p-1 border border-neutral-200 rounded-md">
          <svg
            className="w-4 h-4 text-neutral-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="3" width="7" height="7" strokeWidth="2" />
            <rect x="14" y="3" width="7" height="7" strokeWidth="2" />
            <rect x="3" y="14" width="7" height="7" strokeWidth="2" />
            <rect x="14" y="14" width="7" height="7" strokeWidth="2" />
          </svg>
        </button>
        <button className="p-1 border border-neutral-300 rounded-md hover:bg-neutral-100">
          <svg
            className="w-4 h-4 text-neutral-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <line x1="3" y1="6" x2="21" y2="6" strokeWidth="2" />
            <line x1="3" y1="12" x2="21" y2="12" strokeWidth="2" />
            <line x1="3" y1="18" x2="21" y2="18" strokeWidth="2" />
          </svg>
        </button>
      </div>
      <div className="p-3 grid grid-cols-2 gap-1">
        {dishes.map((dish) => (
          <div key={dish.id} className="bg-neutral-200 p-1 rounded-sm">
            <Image
              src={dish.image}
              alt={dish.name}
              width={100}
              height={100}
              className="w-full h-20 rounded-sm"
            />
            <h3 className="text-black text-xs mb-1">{dish.name}</h3>
            <p className="text-neutral-200 bg-black w-fit px-1 rounded-sm text-xs flex items-center">
              <TbCurrencyLari className="mb-0.5" />
              {dish.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Spotlight = () => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const radius = useMotionValue(150);

  const smoothX = useSpring(x, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 20 });
  const smoothRadius = useSpring(radius, { stiffness: 50, damping: 25 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMove = (e) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      x.set(mouseX);
      y.set(mouseY);

      // Check if mouse is in center area (within 100px radius from center)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const distanceFromCenter = Math.sqrt(
        Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
      );

      if (distanceFromCenter < 100 && !isExpanding) {
        setIsExpanding(true);
        radius.set(1000);
        setTimeout(() => {
          setShowContent(true);
        }, 800);
      }
    };

    const handleEnter = () => setIsHovered(true);
    const handleLeave = () => {
      if (!isExpanding) {
        setIsHovered(false);
        x.set(-500);
        y.set(-500);
      }
    };

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseenter", handleEnter);
    container.addEventListener("mouseleave", handleLeave);

    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseenter", handleEnter);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, [x, y, radius, isExpanding]);

  return (
    <motion.div ref={containerRef} className="absolute inset-0">
      <motion.div
        className="absolute inset-0 bg-black/60"
        animate={{ opacity: showContent ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        style={{
          maskImage: useMotionTemplate`radial-gradient(
            circle ${smoothRadius}px at ${smoothX}px ${smoothY}px,
            transparent 0%,
            transparent 40%,
            black 70%
          )`,
          WebkitMaskImage: useMotionTemplate`radial-gradient(
            circle ${smoothRadius}px at ${smoothX}px ${smoothY}px,
            transparent 0%,
            transparent 40%,
            black 70%
          )`,
          pointerEvents: showContent ? "none" : "auto",
        }}
      />
    </motion.div>
  );
};

const MenuLinkQr = () => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 19500);

    return () => clearTimeout(exitTimer);
  }, []);

  return (
    <motion.div
      className="absolute center backdrop-blur-[1px] bg-black/10 inset-0 center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{
        duration: isExiting ? 0.4 : 0.4,
        delay: isExiting ? 0 : 13,
      }}
    >
      <Spotlight />
      {/* QR CONTAINER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 16.2 }}
        className="relative"
      >
        <div className="relative w-[180px] h-[180px] bg-white masky">
          <Image
            src="/assets/menulink_qr.png"
            alt="menu link"
            width={180}
            height={180}
          />
          <Image
            className="absolute pt-1 pr-1 z-20 top-14 right-14 bg-white rounded-full"
            src="/assets/menulink-logo.png"
            alt="menu link logo"
            width={70}
            height={70}
          />
        </div>
        <CornerMenulink />
      </motion.div>
    </motion.div>
  );
};

const CornerMenulink = () => {
  return (
    <>
      {/* Bottom Left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, x: "-20px", y: "-20px" }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 17 }}
        className="absolute -top-2 -left-2 w-5 h-5 border-t-4 border-l-4 border-yellow-400"
      />

      {/* Bottom Right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, x: "20px", y: "-20px" }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 17 }}
        className="absolute -top-2 -right-2 w-5 h-5 border-t-4 border-r-4 border-yellow-400"
      />

      {/* Top Left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, x: "-20px", y: "20px" }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 17 }}
        className="absolute -bottom-2 -left-2 w-5 h-5 border-b-4 border-l-4 border-yellow-400"
      />

      {/* Top Right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, x: "20px", y: "20px" }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 17 }}
        className="absolute -bottom-2.5 -right-2 w-5 h-5 border-b-4 border-r-4 border-yellow-400"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 17.4 }}
        className="absolute border-2 border-yellow-400 -bottom-15 left-4 bg-black/70 rounded-full"
      >
        <div className="px-3 py-1 rounded-full flex items-center gap-2">
          <span>
            <MdQrCodeScanner />
          </span>
          <h1 className="text-yellow-400 font-bold ">menulink.co</h1>
          <span className="rounded-full bg-neutral-700 center">
            <IoIosArrowUp />
          </span>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: [1, 0.85, 1, 0.85, 1],
        }}
        transition={{
          opacity: { duration: 0.6, delay: 17.8 },
          y: { duration: 0.6, delay: 17.8 },
          scale: { duration: 0.5, delay: 18.2, ease: "easeOut" },
        }}
        className="absolute right-14 -bottom-16 -rotate-25"
      >
        <FaHandPointUp size={25} />
      </motion.div>
    </>
  );
};

const MenuLinkPhone = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsActive(true);
    }, 20000);

    const hideTimer = setTimeout(() => {
      setIsActive(false);
    }, 26000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 center bg-black/40"
      style={{ pointerEvents: isActive ? "auto" : "none" }}
    >
      <motion.div
        animate={{ scale: [1, 1.03, 1, 1.03, 1] }}
        transition={{
          duration: 3,
          delay: 21,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative rounded-4xl overflow-hidden"
      >
        <Image
          className="relative z-5"
          src="/assets/phone.png"
          alt="phone menu"
          width={275}
          height={500}
        />
        <div className="bg-white absolute inset-0 z-0 m-1 rounded-4xl center flex-col pt-6">
          <div className="flex items-center justify-between gap-1 flex-col mb-1">
            <Image
              src="/assets/menu-logo.png"
              alt="menu logo"
              width={100}
              height={100}
            />
            <h1 className="secondary text-xs font-medium w-full bg-linear-to-r from-yellow-400 to-papaya bg-clip-text text-transparent">
              Bring Your Menu To Life
            </h1>
          </div>
          <div className="w-full px-5 flex items-center gap-2">
            <input
              type="text"
              placeholder="Search dishes..."
              className="flex-1 px-2 py-1 text-xs border placeholder:text-papaya/30 border-papaya/30 rounded-sm"
            />
            <button className="p-1 border border-papaya/30 rounded-md">
              <svg
                className="w-4 h-4 text-papaya/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="3" width="7" height="7" strokeWidth="2" />
                <rect x="14" y="3" width="7" height="7" strokeWidth="2" />
                <rect x="3" y="14" width="7" height="7" strokeWidth="2" />
                <rect x="14" y="14" width="7" height="7" strokeWidth="2" />
              </svg>
            </button>
            <button className="p-1 border border-papaya/30 rounded-md hover:bg-neutral-100">
              <svg
                className="w-4 h-4 text-papaya/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <line x1="3" y1="6" x2="21" y2="6" strokeWidth="2" />
                <line x1="3" y1="12" x2="21" y2="12" strokeWidth="2" />
                <line x1="3" y1="18" x2="21" y2="18" strokeWidth="2" />
              </svg>
            </button>
          </div>
          <div className="p-3 grid grid-cols-2 gap-1">
            {menulinkData.map((dish) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 20 + dish.id * 0.1 }}
                key={dish.id}
                className="bg-neutral-100 shadow-md p-1 rounded-sm relative"
              >
                <video
                  src={dish.video_url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-20 rounded-sm object-cover"
                />
                <h3 className="text-black text-xs mb-1">{dish.title}</h3>

                <div className="flex items-center justify-between">
                  <p className="text-black bg-linear-to-r from-yellow-400 to-papaya w-fit px-1 rounded-sm text-xs flex items-center secondary text-[10px] font-medium">
                    <TbCurrencyLari />
                    {dish.price.toFixed(2)}
                  </p>
                  <div className="flex items-center mr-1 mt-1">
                    <span className="text-yellow-500 text-[9px]">⭐</span>
                    <span className="text-black text-[8px] secondary">
                      {dish.rating}
                    </span>
                  </div>
                  <span className="text-yellow-400 text-[8px] absolute top-2 left-2 flex items-center secondary bg-black/50 rounded-sm px-1">
                    <FaFire
                      size={10}
                      className="mb-0.5 text-orange-500 mr-0.5"
                    />
                    {dish.calories}
                  </span>
                  <span className="text-yellow-400 secondary text-[8px] flex items-center gap-1 bg-black/50 rounded-sm px-1 absolute left-2 bottom-11">
                    <CiTimer size={11} className="mb-0.5 " /> {dish.prepTime}{" "}
                    min
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Features = () => {
  return (
    <>
      <motion.div
        className="absolute bottom-8 right-20 rounded-md overflow-hidden w-12 h-auto"
        initial={{ y: 200, x: 0 }} // start from below
        animate={{
          y: [200, 0, 0, 0, 0], // rise up, then stay
          x: [0, 0, 0, 0, , 500], // stay, then slide right offscreen
        }}
        transition={{
          delay: 21.8,
          duration: 3,
          times: [0, 0.5, 1], // first 0.3 = rise, last part = slide out
          ease: "easeInOut",
        }}
      >
        <Image src="/assets/ing-1.png" alt="ing" width={200} height={200} />
      </motion.div>
      <motion.div
        initial={{ y: 200, x: 0 }} // start from below
        animate={{
          y: [200, 0, 0, 0, 0], // rise up, then stay
          x: [0, 0, 0, 0, , 500], // stay, then slide right offscreen
        }}
        transition={{
          delay: 21.7,
          duration: 3,
          times: [0, 0.5, 1], // first 0.3 = rise, last part = slide out
          ease: "easeInOut",
        }}
        className="absolute bottom-[110px] right-20 rounded-md overflow-hidden w-12 h-auto "
      >
        <Image src="/assets/ing-2.png" alt="ing" width={200} height={200} />
      </motion.div>
      <motion.div
        initial={{ y: 500, x: 0 }} // start from below
        animate={{
          y: [500, 0, 0, 0, 0], // rise up, then stay
          x: [0, 0, 0, 0, , 500], // stay, then slide right offscreen
        }}
        transition={{
          delay: 21.6,
          duration: 3,
          times: [0, 0.5, 1], // first 0.3 = rise, last part = slide out
          ease: "easeInOut",
        }}
        className="absolute bottom-[185px] right-20 rounded-md overflow-hidden w-12 h-auto "
      >
        <Image src="/assets/ing-3.png" alt="ing" width={200} height={200} />
      </motion.div>
      <motion.div
        initial={{ y: 500, x: 0 }} // start from below
        animate={{
          y: [500, 0, 0, 0, 0], // rise up, then stay
          x: [0, 0, 0, 0, , 500], // stay, then slide right offscreen
        }}
        transition={{
          delay: 21.5,
          duration: 3,
          times: [0, 0.5, 1], // first 0.3 = rise, last part = slide out
          ease: "easeInOut",
        }}
        className="absolute bottom-[260px] right-20 rounded-md overflow-hidden w-12 h-auto "
      >
        <Image src="/assets/ing-4.png" alt="ing" width={200} height={200} />
      </motion.div>
      <motion.div
        initial={{ y: 500, x: 0 }} // start from below
        animate={{
          y: [500, 0, 0, 0, 0], // rise up, then stay
          x: [0, 0, 0, 0, , 500], // stay, then slide right offscreen
        }}
        transition={{
          delay: 21.4,
          duration: 3,
          times: [0, 0.5, 1], // first 0.3 = rise, last part = slide out
          ease: "easeInOut",
        }}
        className="absolute bottom-[335px] right-20 rounded-md overflow-hidden w-12 h-auto "
      >
        <Image src="/assets/ing-5.png" alt="ing" width={200} height={200} />
      </motion.div>
    </>
  );
};

const LastPart = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 center"
    >
      <div className="relative w-full h-full overflow-hidden z-2">
        {/* <Particle /> */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3.5 }}
        >
          <Twinkles />
        </motion.div>
        <ParticleOne />
      </div>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4, delay: 12.9 }}
        className="bg-neutral-100 z-4 h-20 w-full absolute left-0"
      />
      <motion.div
        className="absolute inset-0 z-2 bg-linear-to-br from-yellow to-papaya rounded-full scale-150 blur-lg"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 12 }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 13.2 }}
        className="absolute z-3 inset-0"
      >
        <Image
          src="/assets/vector-food.png"
          alt="bg"
          width={600}
          height={600}
          className="object-cover w-full h-full"
        />
      </motion.div>
      <motion.div
        className="absolute z-5"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 12.5 }}
      >
        <Image
          src="/assets/menu-logo.png"
          alt="last part"
          width={250}
          height={250}
        />
      </motion.div>
    </motion.div>
  );
};

export default MenuLinkAds;
