import MenuLinkAds from "@/app/[locale]/components/elivagar-parts/MenuLinkAds";
import Shorts from "@/app/[locale]/components/elivagar-parts/Shorts";
import SoundCloudPoster from "@/app/[locale]/components/elivagar-parts/SoundCloudPoster";
import SoundfolioAnimation from "@/app/[locale]/components/elivagar-parts/SoundfolioAnimation";
import Twinkles from "@/app/[locale]/components/elivagar-parts/Twinkles";

const Commercial = () => {
  return (
    <div className="h-screen w-full relative ">
      {/* <Twinkles /> */}
      {/* <SoundfolioAnimation tracklist={true} /> */}
      {/* <SoundCloudPoster /> */}
      {/* <Shorts /> */}
      <MenuLinkAds />
    </div>
  );
};

export default Commercial;
