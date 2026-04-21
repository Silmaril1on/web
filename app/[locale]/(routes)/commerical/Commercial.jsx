import Image from "next/image";
import Shorts from "../../components/elivagar-parts/parts/Shorts";
import SoundCloudPoster from "../../components/elivagar-parts/parts/SoundCloudPoster";
import Twinkles from "../../components/elivagar-parts/parts/Twinkles";
import RadioTrackListShowcase from "../../components/elivagar-parts/RadioTrackListShowcase";
import Reel from "../../components/elivagar-parts/parts/Reel";

const Commercial = () => {
  return (
    <div className="h-screen w-full relative ">
      {/* <Twinkles /> */}
      {/* <RadioTrackListShowcase tracklist={true} /> */}
      <Reel />
      {/* <SoundCloudPoster /> */}
      {/* <Shorts /> */}
    </div>
  );
};

export default Commercial;
