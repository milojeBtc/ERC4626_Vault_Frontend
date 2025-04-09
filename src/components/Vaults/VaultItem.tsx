import { usdc } from "@/assets/images";
import PrimaryButton from "../common/PrimaryButton";
import { useEffect, useState } from "react";
import { getTokenContract, getVaultContract } from "@/web3/utils";
import { useAccount, useSwitchNetwork } from "wagmi";
import { getTargetNetwork } from "@/services/web3/networks";

interface VaultItemProps {
  name: string;
  symbol: string;
  apy: string;
  borrowApy: string;
  vaultAddress: string;
  assetAddress: string;
  setIsDepositOpen: () => void;
  setIsWithdrawOpen: () => void;
}
const VaultItem = ({
  name,
  symbol,
  apy,
  borrowApy,
  vaultAddress,
  assetAddress,
  setIsDepositOpen,
  setIsWithdrawOpen,
}: VaultItemProps) => {
  const { switchNetwork } = useSwitchNetwork();
  const [balance, setBalance] = useState("");
  const [totalAsset, setTotalAsset] = useState("");

  const { address, isConnected } = useAccount();
  useEffect(() => {
    const update = async () => {
      try {
        if (address && isConnected && vaultAddress) {
          const vaultContract = getVaultContract(vaultAddress);
          const decimals = await vaultContract.decimals();
          const bal = await vaultContract.balanceOf(address);
          const result = Number(bal) / 10 ** Number(decimals);
          setBalance(result.toString());
        } else {
          setBalance("---");
        }
      } catch (error) {
        console.log("ERRORRRR:", error);
      }
    };
    update();
  }, [address, isConnected, vaultAddress]);

  useEffect(() => {
    const update = async () => {
      try {
        const tokenContract = getTokenContract(assetAddress);
        const totalBalance = await tokenContract.balanceOf(vaultAddress);
        const decimals = await tokenContract.decimals();
        const result = Number(totalBalance) / 10 ** Number(decimals);
        setTotalAsset(result.toString());
      } catch (error) {
        console.log("ERRORRRR:", error);
      }
    };
    update();
  }, []);
  useEffect(() => {
    if (isConnected && address) {
      switchNetwork?.(getTargetNetwork().id);
    }
  }, [isConnected, address]);
  return (
    <tr className="bg-slateIron text-left text-sm xl:text-lg">
      {/* Token Information */}
      <td className="p-3 text-left">
        <div className="flex items-center gap-3 rounded-lg bg-ironBlue p-2">
          <img
            src={usdc}
            className="w-8 sm:w-8 md:w-10 lg:w-12 2xl:w-14"
            alt="USDC logo"
          />
          <div className="font-bold">{name}</div>
          <div className="hidden text-paleBlue md:block">{symbol}</div>
        </div>
      </td>

      {/* APY Information */}
      <td className="hidden p-3 lg:table-cell">
        <span className="text-paleLilac">{apy}</span>
        {/* <span className="text-paleBlue">APY</span> */}
      </td>

      <td className="hidden p-3 lg:table-cell">
        <span className="text-paleLilac">{borrowApy}</span>
        {/* <span className="text-paleBlue">APY</span> */}
      </td>

      {/* Total Value */}
      <td className="hidden p-3 lg:table-cell">{totalAsset}</td>

      {/* User Balance */}
      <td className="hidden p-3 text-sm lg:table-cell">
        <div>{balance}</div>
        <div className="text-paleBlue">{balance}</div>
      </td>

      {/* Action Buttons */}
      <td className="">
        <div className="flex justify-start gap-2">
          <PrimaryButton
            title={"WITHDRAW"}
            customCss="bg-ironBlue text-paleLilac text-sm hover:bg-opacity-70 hover:shadow-lg transition duration-300"
            onClick={() => setIsWithdrawOpen()}
          />
          <PrimaryButton
            title={"DEPOSIT"}
            customCss="bg-lemonYellow text-darkIndigo text-sm hover:bg-opacity-70 hover:shadow-lg transition duration-300"
            onClick={() => setIsDepositOpen()}
          />
        </div>
      </td>
    </tr>
  );
};

export default VaultItem;
