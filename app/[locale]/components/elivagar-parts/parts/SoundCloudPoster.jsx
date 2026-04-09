import { Michroma } from "next/font/google";
import Image from "next/image";

const michroma = Michroma({
  weight: "400",
  subsets: ["latin"],
});

const SoundCloudPoster = () => {
  return (
    <div className="h-screen w-full center z-10">
      <div className="w-[800px] h-[650px] relative bg-stone-950">
        {/* POSTER  */}
        <div className=" w-full h-full">
          <Image
            src="/assets/elivagar-poster.png"
            alt="Essence Radio 001"
            width={1500}
            height={1500}
            quality={100}
            className="w-auto h-full object-cover"
          />
        </div>
        {/* ESSENCE RADIO TEXT */}
        <div className="absolute top-23 left-13">
          <div className=" border-cream/20 rounded-md backdrop-blur-lg h-10 w-65 relative">
            <Image
              src="/assets/radiotitle.png"
              className="absolute -top-[75px] left-7.5"
              alt="Essence radio"
              width={400}
              height={400}
            />
          </div>
        </div>
        {/* ELIVAGAR  TEXT */}
        <div className="absolute -top-3 left-25 sepia">
          <Image
            src="/assets/elivagar.png"
            alt="name"
            width={250}
            height={250}
          />
        </div>
        {/* EPISODE NUMBER */}
        <div className="absolute top-25 left-71 w-14 center border border-cream/20 rounded-sm backdrop-blur-lg bg-black/20 ">
          <h1 className="text-3xl font-bold ">019</h1>
        </div>
        {/* LOGO */}
        <div className="absolute top-5 right-21 sepia">
          <Image
            className="drop-shadow-[2px_2px_10px_rgba(0,0,0,0.6)]"
            src="/assets/elivagar-logo.png"
            alt="logo"
            width={130}
            height={130}
          />
        </div>
      </div>
    </div>
  );
};

export default SoundCloudPoster;
