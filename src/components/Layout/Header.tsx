import { ConnectButton } from "@rainbow-me/rainbowkit";
import { logo } from "@/assets/images";

const Header = () => {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-gunMetal py-5">
      <div className="flex cursor-pointer items-center gap-4 px-4 md:px-8 lg:px-20">
        <div>
          <img src={logo} width="40px" />
        </div>
        <div className="hidden text-2xl sm:block lg:text-3xl">COVAULT</div>
      </div>
      <div className="hidden gap-8 text-sm lg:flex lg:gap-16 lg:text-lg">
        <div className="cursor-pointer">Prizes</div>
        <div className="cursor-pointer">Vaults</div>
        <div className="cursor-pointer">Account</div>
      </div>
      <div className="flex items-center gap-12">
        <div className="flex w-auto items-center justify-end pr-4">
          <div className="">
            <ConnectButton />
          </div>
          <div className="text-md cursor-pointer px-10 lg:text-lg">MENU</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
