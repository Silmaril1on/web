"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FiCheck,
  FiCheckCircle,
  FiArrowRight,
  FiZap,
  FiBarChart2,
  FiShoppingCart,
  FiCreditCard,
  FiCalendar,
  FiBell,
  FiSettings,
  FiStar,
  FiMessageSquare,
  FiPackage,
  FiSmartphone,
  FiCamera,
  FiGlobe,
  FiGrid,
  FiCoffee,
} from "react-icons/fi";
import { MdQrCode2, MdRestaurantMenu } from "react-icons/md";
import { BiStore } from "react-icons/bi";

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -64 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const slideRight = {
  hidden: { opacity: 0, x: 64 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── Animated Section Wrapper ─────────────────────────────────────────────────

function Reveal({ children, className = "", variants = stagger }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// Feature Card
function FeatureCard({ icon: Icon, title, items }) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-stone-900 border border-gold/10 rounded-2xl p-6 hover:border-gold/40 hover:bg-stone-800 transition-all duration-300 group"
    >
      <div className="w-12 h-12 rounded-xl bg-gold/10 center mb-4 group-hover:bg-gold/20 transition-colors duration-300">
        <Icon className="text-gold text-xl" />
      </div>
      <h3 className="text-white font-semibold text-lg mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-cream/60">
            <FiCheck className="text-gold mt-0.5 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// reusable headline component for sectioons
const HeadlineComponent = ({
  eyebrow,
  title,
  gradientText,
  body,
  divider = true,
  className = "py-28 px-6",
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      <div className="max-w-4xl mx-auto text-center">
        {eyebrow && (
          <motion.p
            variants={fadeUp}
            className="text-xs tracking-[0.35em] uppercase text-papaya mb-4"
          >
            {eyebrow}
          </motion.p>
        )}

        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-5xl font-bold text-white mb-6 leading-snug"
        >
          {title}
          {gradientText && (
            <span className="menulink-gradient">{gradientText}</span>
          )}
        </motion.h2>

        {body && (
          <motion.p
            variants={fadeUp}
            className="text-gray text-lg max-w-2xl mx-auto leading-relaxed"
          >
            {body}
          </motion.p>
        )}
      </div>

      {divider && <Divider />}
    </motion.section>
  );
};

// ─── Divider ──────────────────────────────────────────────────────────────────

function Divider() {
  return (
    <div className="flex items-center justify-center my-8">
      <div className="h-px w-1/3 bg-linear-to-r from-transparent to-gold/30" />
      <div className="w-2 h-2 rounded-full bg-gold/50 mx-3 shrink-0" />
      <div className="h-px w-1/3 bg-linear-to-l from-transparent to-gold/30" />
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────

function Badge({
  children,
  colorClass = "bg-gold/10 text-gold border-gold/25",
}) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border tracking-widest ${colorClass}`}
    >
      {children}
    </span>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const MenulinkPresentation = () => {
  return (
    <main className="bg-black text-white overflow-hidden no-main ">
      {/*  HERO  */}
      <Header />
      {/*  INTRO  */}
      <HeadlineComponent
        eyebrow="What is MenuLink"
        title="An advanced all-in-one "
        gradientText="restaurant service platform"
        body="MenuLink transforms traditional dining into a seamless, modern, and data-driven experience — combining immersive digital menus, operational tools, analytics, and customer interaction systems into a single ecosystem."
      />
      {/*  PROBLEM  */}
      <TheProblem />
      {/* SOLUTION  */}
      <TheSolution />
      {/*  QR MENU SYSTEM  */}
      <QrMenuSystem />
      {/*  ADMIN PLATFORM  */}
      <AdminPanel />
      {/*  EVENTS & PROMOTIONS  */}
      <EventsSection />
      {/*  REVIEW SYSTEM  */}
      <ReviewSystem />
      {/* ORDERING & ANALYTICS  */}
      <OrderingSystem />
      {/*  PAYMENT  */}
      <PaymentSection />
      {/*  TABLE RESERVATION  */}
      <ReservationSection />
      {/* SMART CALLING SYSTEM  */}
      <CallingSection />
      {/*  PHYSICAL INTEGRATION */}
      <Integration />
      {/* KEY ADVANTAGES  */}
      <KeyAdvantages />
      {/*  VISION  */}
      <HeadlineComponent
        className="py-10"
        eyebrow="OUR VISION"
        title=" Redefining How Restaurants"
        gradientText=" Interact with Customers"
        body="MenuLink aims to create a fully digital, intelligent, and immersive dining ecosystem — where every touchpoint between a restaurant and its guests is seamless, modern, and meaningful."
      />
    </main>
  );
};

// HERO HEADER
const Header = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative z-10 max-w-5xl mx-auto"
      >
        <motion.div variants={fadeUp} className="mb-6">
          <Badge colorClass="bg-papaya/10 text-papaya border-papaya/25">
            Restaurant Technology · 2025
          </Badge>
        </motion.div>
        <motion.h1
          variants={fadeUp}
          className="text-[150px] font-black tracking-tighter leading-none mb-5"
          style={{
            background:
              "linear-gradient(135deg, #ffd700 0%, #ff8000 55%, #fcb913 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          MENU LINK
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="text-xl md:text-2xl text-cream/70 max-w-2xl mx-auto mb-10 font-light"
        >
          The Next-Generation Restaurant Experience Platform
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {[
            { icon: FiZap, label: "24-HOUR SETUP" },
            { icon: MdQrCode2, label: "SMART QR MENUS" },
            { icon: FiBarChart2, label: "REAL-TIME ANALYTICS" },
            { icon: FiBell, label: "SMART CALLING" },
          ].map((chip) => (
            <div
              key={chip.label}
              className="flex items-center gap-2 px-4 py-2 bg-gold/15 rounded-full border border-gold/30"
            >
              <chip.icon className="text-gold text-sm" />
              <span className="text-xs text-white/80 tracking-wider">
                {chip.label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeIn} className="mt-20">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2 text-white/50"
          >
            <span className="text-[10px] tracking-[0.4em]">SCROLL</span>
            <div className="w-px h-14 bg-linear-to-b from-white/50 to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// The Problem section
const TheProblem = () => {
  return (
    <Reveal className="py-24 px-6 bg-white/1.5">
      <div className="max-w-6xl mx-auto">
        <HeadlineComponent
          className="py-10"
          eyebrow="The Problem"
          title="What the Market"
          gradientText=" is Missing"
          body="Traditional restaurant solutions fall short in every critical area."
        />
        <motion.div
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {[
            {
              number: "01",
              title: "Static & Unappealing",
              desc: "Traditional QR menus are lifeless and fail to stimulate appetite.",
            },
            {
              number: "02",
              title: "No Control or Flexibility",
              desc: "Restaurants cannot update, reorder, or personalize their menu in real time.",
            },
            {
              number: "03",
              title: "Zero Analytics",
              desc: "No customer behavior data, no insights, no way to optimize operations.",
            },
            {
              number: "04",
              title: "Poor Customer Interaction",
              desc: "Manual ordering, slow waiter service — hospitality stuck in the past.",
            },
            {
              number: "05",
              title: "Expensive Content Production",
              desc: "Professional photography and design costs thousands and takes weeks.",
            },
          ].map((p) => (
            <motion.div
              key={p.number}
              variants={fadeUp}
              className="relative p-6 rounded-2xl cursor-pointer border border-crimson/30 bg-crimson/5 hover:border-crimson/40 hover:bg-crimson/10 duration-300"
            >
              <span className="text-6xl font-black text-crimson/40 absolute top-3 right-4 select-none">
                {p.number}
              </span>
              <h3 className="text-white font-semibold text-lg mb-2">
                {p.title}
              </h3>
              <p className="text-gray text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Reveal>
  );
};

// The Solution section
const TheSolution = () => {
  return (
    <Reveal className="py-24 px-6 ">
      <div className="max-w-5xl mx-auto">
        <HeadlineComponent
          eyebrow="The Solution"
          className="py-10"
          title="Everything in"
          gradientText=" One Platform"
          body="MenuLink delivers a complete digital ecosystem for modern restaurants — all within 24 hours."
        />
        <motion.div
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {[
            { icon: MdQrCode2, label: "Dynamic Animated QR Menus" },
            { icon: FiSettings, label: "Full Restaurant Management" },
            { icon: FiShoppingCart, label: "Integrated Ordering & Payment" },
            { icon: FiBell, label: "Smart Customer Interaction" },
            { icon: FiBarChart2, label: "Real-Time Analytics & Insights" },
            { icon: FiZap, label: "Fully Automated 24-Hour Setup" },
          ].map((item) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              className="flex items-center gap-4 p-5 rounded-xl bg-gold/10 border border-gold/20 hover:border-gold/40 cursor-pointer hover:bg-gold/10 duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-gold/10 center shrink-0 group-hover:bg-gold/20 transition-colors">
                <item.icon className="text-gold" />
              </div>
              <span className="text-white/80 text-sm font-medium flex-1">
                {item.label}
              </span>
              <FiArrowRight className="text-gold/30 group-hover:text-gold/70 transition-colors shrink-0" />
            </motion.div>
          ))}
        </motion.div>
        <motion.div variants={fadeUp} className="mt-12 text-center">
          <p className="text-cream/70 text-xs tracking-[0.3em]">
            ALL DELIVERED WITH <span className="text-gold">ZERO EFFORT</span>{" "}
            FROM RESTAURANT OWNERS
          </p>
        </motion.div>
      </div>
    </Reveal>
  );
};

// QR MENU system section
const QrMenuSystem = () => {
  return (
    <Reveal className="py-24 px-6 bg-white/1.5">
      <div className="max-w-6xl mx-auto">
        <HeadlineComponent
          className="py-10"
          eyebrow="Core Product"
          title="Smart QR "
          gradientText=" Menu System"
          body="A living, breathing digital menu that captivates every guest the moment they scan."
        />
        <motion.div
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          <FeatureCard
            icon={FiCamera}
            title="Smart Visuals"
            items={[
              "Professional visuals from existing data",
              "360° video generation",
              "No photographer needed",
              "Fully automated in 24 hours",
            ]}
          />
          <FeatureCard
            icon={MdRestaurantMenu}
            title="Rich Dish Info"
            items={[
              "Calories & macros",
              "Ingredient showcase",
              "Preparation time",
              "Portion size & dosage",
              "Allergen information",
            ]}
          />
          <FeatureCard
            icon={FiStar}
            title="Visual Excellence"
            items={[
              "Animated & vivid presentation",
              "Appetite-stimulating design",
              "Modern UI/UX built for engagement",
              "Custom branding per restaurant",
            ]}
          />
          <FeatureCard
            icon={FiGlobe}
            title="Global Accessibility"
            items={[
              "Multi-language support",
              "Designed for international audiences",
              "Custom colors, fonts & card styles",
              "Unlimited categories & dishes",
            ]}
          />
        </motion.div>
      </div>
    </Reveal>
  );
};

// Admin panel section
const AdminPanel = () => {
  return (
    <Reveal className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={slideLeft}>
            <p className="text-xs tracking-[0.35em] uppercase text-papaya mb-4">
              Admin Platform
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Full Control
              <br />
              <span className="menulink-gradient">In Your Hands</span>
            </h2>
            <p className="text-gray text-lg leading-relaxed mb-8">
              A powerful, intuitive dashboard built for non-technical restaurant
              owners. Manage your entire menu, promotions, and multiple
              locations from one place.
            </p>

            <div className="space-y-3">
              {[
                "Create, update, and delete dishes & categories",
                "Reorder menu items with ease",
                "Toggle availability ON / OFF instantly",
                "Manage multiple restaurants from one account",
                "Seamless switching between locations",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <FiCheckCircle className="text-gold mt-0.5 shrink-0" />
                  <span className="text-white/70 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={slideRight} className="grid grid-cols-2 gap-4">
            {[
              {
                icon: FiSettings,
                label: "Full CRUD Control",
                sub: "Complete menu management",
              },
              {
                icon: BiStore,
                label: "Multi-Location",
                sub: "One account, many restaurants",
              },
              {
                icon: FiSmartphone,
                label: "Mobile Ready",
                sub: "Manage on any device",
              },
              {
                icon: FiZap,
                label: "Instant Updates",
                sub: "Changes reflect in real time",
              },
            ].map((card) => (
              <div
                key={card.label}
                className="p-5 rounded-xl bg-stone-900 border border-gold/10 hover:border-gold/30 hover:bg-stone-800 transition-all duration-300 group"
              >
                <card.icon className="text-gold text-2xl mb-3 group-hover:scale-110 transition-transform" />
                <p className="text-white font-semibold text-sm mb-1">
                  {card.label}
                </p>
                <p className="text-gray text-xs">{card.sub}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </Reveal>
  );
};

// events section
const EventsSection = () => {
  return (
    <Reveal className="py-24 px-6 bg-white/1.5">
      <div className="max-w-6xl mx-auto">
        <HeadlineComponent
          className="py-10"
          eyebrow="Engagement"
          title="Manage"
          gradientText=" Events & Promotions"
          body="Keep customers informed and engaged with live events and offers directly on the QR menu."
        />
        <motion.div
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {[
            {
              icon: FiStar,
              title: "Create Events",
              desc: "Build and publish events directly from the admin panel in minutes.",
            },
            {
              icon: FiZap,
              title: "Live Promotions",
              desc: "Display active deals and special offers on the digital menu instantly.",
            },
            {
              icon: FiBell,
              title: "Customer Alerts",
              desc: "Notify guests about upcoming activities and seasonal specials.",
            },
            {
              icon: FiSettings,
              title: "Full Control",
              desc: "Manage, edit, or remove events at any time via the admin panel.",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="p-6 rounded-2xl border border-violet/20 bg-violet/10 hover:border-violet/40 hover:bg-violet/15 cursor-pointer transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-xl bg-violet/10 center mb-4 group-hover:bg-violet/20 transition-colors">
                <item.icon className="text-violet" />
              </div>
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-gray text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Reveal>
  );
};

// Review system section
const ReviewSystem = () => {
  return (
    <Reveal className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <HeadlineComponent
          className="py-10"
          eyebrow="Customer Insights"
          title="Advanced"
          gradientText=" Review System"
          body="Categorized feedback that reveals exactly where you excel and where to improve."
        />
        <motion.div
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              category: "Food",
              desc: "Taste, presentation, portion size, and overall dish satisfaction.",
              borderColor: "#ff8000",
              glowColor: "rgba(255,128,0,0.12)",
              iconColor: "#ff8000",
            },
            {
              category: "Service",
              desc: "Staff responsiveness, speed, friendliness, and interaction quality.",
              borderColor: "#fcb913",
              glowColor: "rgba(252,185,19,0.12)",
              iconColor: "#fcb913",
            },
            {
              category: "Environment",
              desc: "Ambiance, cleanliness, noise level, and overall dining atmosphere.",
              borderColor: "#4affd7",
              glowColor: "rgba(74,255,215,0.10)",
              iconColor: "#4affd7",
            },
          ].map((item) => (
            <motion.div
              key={item.category}
              variants={fadeUp}
              className="relative p-8 rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300"
              style={{
                border: `1px solid ${item.borderColor}40`,
                background: `linear-gradient(160deg, ${item.glowColor} 0%, transparent 60%)`,
              }}
            >
              <FiMessageSquare
                className="text-4xl mb-4"
                style={{ color: item.iconColor, opacity: 0.8 }}
              />
              <h3 className="text-white text-2xl font-bold mb-3">
                {item.category}
              </h3>
              <p className="text-gray text-sm leading-relaxed">{item.desc}</p>
              <div
                className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full blur-2xl pointer-events-none"
                style={{ background: item.glowColor }}
              />
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap justify-center gap-8"
        >
          {[
            { label: "Identify Strengths", icon: FiBarChart2 },
            { label: "Spot Weaknesses", icon: FiCheckCircle },
            { label: "Improve Operations", icon: FiZap },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 text-white/40 text-sm"
            >
              <item.icon className="text-gold" />
              <span>{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </Reveal>
  );
};

// Orders section
const OrderingSystem = () => {
  return (
    <Reveal className="py-24 px-6 bg-white/1.5">
      <div className="max-w-6xl mx-auto">
        <HeadlineComponent
          className="py-10"
          eyebrow="Operations"
          title="Super Flexible"
          gradientText=" Ordering & Analytics"
          body="Real-time order management paired with powerful business intelligence."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ordering */}
          <motion.div
            variants={slideLeft}
            className="p-8 rounded-2xl border border-gold/20 bg-gold/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 center rounded-xl bg-gold/10">
                <FiShoppingCart className="text-gold" />
              </div>
              <h3 className="text-white text-xl font-bold">Ordering System</h3>
            </div>
            <p className="text-gray text-sm mb-6 leading-relaxed">
              Customers order directly from the QR menu — no app download, no
              friction.
            </p>
            <div>
              <p className="text-white/30 text-[10px] tracking-[0.3em] mb-3">
                ORDER STATUS FLOW
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {["Pending", "Preparing", "Delivering", "Completed"].map(
                  (status, i, arr) => (
                    <div key={status} className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs bg-gold/10 border border-white/10 text-white/70">
                        {status}
                      </span>
                      {i < arr.length - 1 && (
                        <FiArrowRight className="text-gold/40 text-xs shrink-0" />
                      )}
                    </div>
                  ),
                )}
              </div>
            </div>
          </motion.div>

          {/* analytics */}
          <motion.div
            variants={slideRight}
            className="p-8 rounded-2xl border border-green/20 bg-green/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 center rounded-xl bg-green/10">
                <FiBarChart2 className="text-green" />
              </div>
              <h3 className="text-white text-xl font-bold">
                Powerful Analytics
              </h3>
            </div>
            <div className="space-y-4">
              {[
                "Most ordered dishes & top performers",
                "Customer behavior & preference insights",
                "Time-based filtering — day / week",
                "Per-item performance tracking",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <FiCheckCircle className="text-green shrink-0" />
                  <span className="text-white/70 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Reveal>
  );
};

// payment section
const PaymentSection = () => {
  return (
    <Reveal className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <HeadlineComponent
          className="py-10"
          eyebrow="Checkout"
          title="Integrated "
          gradientText="Payment"
          body="Secure in-app payments that make checkout fast and effortless —
          reducing drop-off and increasing guest satisfaction."
        />
        <motion.div
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {[
            {
              icon: FiCreditCard,
              label: "Secure Payments",
              sub: "Bank-grade transaction security",
            },
            {
              icon: FiZap,
              label: "Instant Checkout",
              sub: "One-tap payment flow",
            },
            {
              icon: FiCheckCircle,
              label: "Reduced Friction",
              sub: "No cash, no waiting",
            },
          ].map((item) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              className="p-7 rounded-2xl bg-gold/10 border border-gold/20 hover:border-gold/30 hover:bg-gold/20 cursor-pointer duration-300"
            >
              <item.icon className="text-gold text-3xl mx-auto mb-4" />
              <p className="text-white font-semibold mb-1">{item.label}</p>
              <p className="text-gray text-sm">{item.sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Reveal>
  );
};

// reservation
const ReservationSection = () => {
  return (
    <Reveal className="py-24 px-6 bg-white/1.5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* visual side */}
          <motion.div variants={slideLeft} className="grid grid-cols-3 gap-3">
            {[
              { icon: FiCalendar, label: "Date", sub: "Pick your day" },
              { icon: FiCoffee, label: "Guests", sub: "Select party size" },
              {
                icon: MdRestaurantMenu,
                label: "Preferences",
                sub: "Food & dietary",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="aspect-square p-4 rounded-2xl bg-papaya/10 cursor-pointer border border-papaya/20 flex flex-col items-center justify-center text-center gap-2 hover:border-papaya/40 transition-all duration-300"
              >
                <item.icon className="text-papaya text-2xl" />
                <p className="text-white font-semibold text-sm">{item.label}</p>
                <p className="text-gray text-xs">{item.sub}</p>
              </div>
            ))}
          </motion.div>

          {/* text side */}
          <motion.div variants={slideRight}>
            <p className="text-xs tracking-[0.35em] uppercase text-papaya mb-4">
              Convenience
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Table
              <br />
              <span className="menulink-gradient">Reservation</span>
            </h2>
            <p className="text-gray text-lg leading-relaxed">
              Guests book a table directly from the QR menu — selecting their
              date, party size, and food preferences before they even arrive. No
              phone calls, no friction.
            </p>
          </motion.div>
        </div>
      </div>
    </Reveal>
  );
};

// smart calling section
const CallingSection = () => {
  return (
    <Reveal className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <HeadlineComponent
          className="py-10"
          eyebrow="Key Differentiator"
          title="Smart"
          gradientText=" Calling System"
          body="The feature that sets MenuLink completely apart from every other dining solution on the market."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* how it works */}
          <motion.div
            variants={slideLeft}
            className="p-8 rounded-2xl border border-violet/30 bg-violet/4"
          >
            <p className="text-violet text-[10px] tracking-[0.35em] mb-6">
              HOW IT WORKS
            </p>
            <div className="space-y-7">
              {[
                {
                  step: "1",
                  title: "Customer Presses Call Button",
                  desc: "A single tap on the QR menu triggers a service request",
                },
                {
                  step: "2",
                  title: "Waitstaff Receives Notification",
                  desc: "Instant alerts sent to smartwatches and staff devices",
                },
                {
                  step: "3",
                  title: "Fast, Graceful Response",
                  desc: "Staff arrives promptly — no shouting, no waving required",
                },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-violet/30 center shrink-0 text-violet font-bold text-sm">
                    {s.step}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {s.title}
                    </p>
                    <p className="text-gray text-xs mt-1">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* benefits */}
          <motion.div variants={slideRight} className="space-y-4">
            <p className="text-[10px] tracking-[0.35em] uppercase text-violet mb-6">
              Benefits
            </p>
            {[
              {
                title: "No Shouting or Hand-Waving",
                desc: "A dignified, modern way to request service",
              },
              {
                title: "Faster Service Response",
                desc: "Staff is alerted instantly with zero delay",
              },
              {
                title: "More Professional Environment",
                desc: "Elevates the entire dining atmosphere",
              },
              {
                title: "Higher Customer Satisfaction",
                desc: "Guests feel respected and well-served",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-4 rounded-xl bg-violet/15 border border-violet/20 hover:border-violet/30 hover:bg-violet/25 duration-300"
              >
                <p className="text-white font-semibold text-sm">{item.title}</p>
                <p className="text-gray text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </Reveal>
  );
};

// integration part
const Integration = () => {
  return (
    <Reveal className="py-24 px-6 bg-white/1.5">
      <div className="max-w-4xl mx-auto text-center">
        <HeadlineComponent
          className="py-10"
          eyebrow="Physical + Digital"
          title="Complete "
          gradientText="Integration"
          body="The digital experience meets the physical world — a fully branded presence on every table."
        />
        <motion.div
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto"
        >
          {[
            {
              icon: FiPackage,
              title: "Custom QR Stands",
              desc: "Branded, premium stands designed to match each restaurant's aesthetic and identity.",
            },
            {
              icon: MdQrCode2,
              title: "Branded Stickers",
              desc: "High-quality stickers for seamless table placement and a professional first impression.",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="p-8 rounded-2xl bg-gold/10 border border-gold/20 hover:border-gold/30 hover:bg-gold/15 transition-all duration-300 group"
            >
              <item.icon className="text-gold text-3xl mb-5 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-gray text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Reveal>
  );
};

// key advantages section
const KeyAdvantages = () => {
  return (
    <Reveal className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <HeadlineComponent
          className="py-10"
          eyebrow="Why MenuLink"
          title="Key"
          gradientText=" Advantages"
          body="Built for speed, scale, and the future of hospitality."
        />
        <motion.div
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {[
            {
              icon: FiZap,
              title: "24-Hour Automated Setup",
              desc: "Full deployment without any effort from the restaurant owner.",
            },
            {
              icon: FiCheckCircle,
              title: "Zero Effort Required",
              desc: "We handle everything — from visuals to configuration and onboarding.",
            },
            {
              icon: FiStar,
              title: "Premium Visual Experience",
              desc: "Unique, appetite-stimulating design unlike anything else in the market.",
            },
            {
              icon: FiGrid,
              title: "All-in-One Platform",
              desc: "Menu, orders, payments, analytics, reservations — one ecosystem.",
            },
            {
              icon: BiStore,
              title: "Multi-Location Scalability",
              desc: "Works for single restaurants and large multi-branch chains alike.",
            },
            {
              icon: FiBarChart2,
              title: "Data-Driven Growth",
              desc: "Real-time analytics that help restaurants make smarter decisions.",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="p-6 rounded-2xl bg-violet/15 border border-violet/20 hover:border-violet/40 hover:bg-violet/20 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-violet/10 center mb-4 group-hover:bg-violet/20 transition-colors">
                <item.icon className="text-violet text-xl" />
              </div>
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-gray text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Reveal>
  );
};

export default MenulinkPresentation;
