import { ConnectButton } from "@rainbow-me/rainbowkit";
import { logo } from "@/assets/images";

const Header = () => {
  return (
    <div className="bg-gunMetal fixed left-0 right-0 top-0 z-50 flex justify-between py-5">
      <div className="flex cursor-pointer items-center gap-4 px-20">
        <div>
          <img src={logo} width="40px" />
        </div>
        <div className="text-3xl">COVAULT</div>
      </div>
      <div className="flex items-center gap-12">
        <div className="text-24 flex gap-16">
          <div className="cursor-pointer">Prizes</div>
          <div className="cursor-pointer">Vaults</div>
          <div className="cursor-pointer">Account</div>
        </div>
        <div className="flex  w-[400px] justify-end ">
          <ConnectButton />
        </div>
        <div className="px-10">MENU</div>
      </div>
    </div>
  );
};

export default Header;
