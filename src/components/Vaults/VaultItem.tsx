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
      if (address && isConnected && vaultAddress) {
        const vaultContract = getVaultContract(vaultAddress);
        const decimals = await vaultContract.decimals();
        const bal = await vaultContract.balanceOf(address);
        const result = Number(bal) / 10 ** Number(decimals);
        setBalance(result.toString());
      } else {
        setBalance("---");
      }
    };
    update();
  }, [address, isConnected, vaultAddress]);

  useEffect(() => {
    const update = async () => {
      const tokenContract = getTokenContract(assetAddress);
      const totalBalance = await tokenContract.balanceOf(vaultAddress);
      const decimals = await tokenContract.decimals();
      const result = Number(totalBalance) / 10 ** Number(decimals);
      setTotalAsset(result.toString());
    };
    update();
  }, []);
  useEffect(() => {
    if (isConnected && address) {
      switchNetwork?.(getTargetNetwork().id);
    }
  }, [isConnected, address]);
  return (
    <tr className="bg-slateIron text-left text-lg">
      {/* Token Information */}
      <td className=" w-[250px]  p-3 text-left">
        <div className="flex items-center gap-3 rounded-lg bg-ironBlue p-2">
          <img src={usdc} width={"40px"} />
          <div className="font-bold">{name}</div>
          <div className="text-paleBlue">{symbol}</div>
        </div>
      </td>

      {/* APY Information */}
      <td className="w-[120px] p-3">
        <span className="text-paleLilac">{apy}</span>
        <span className="text-paleBlue">APY</span>
      </td>

      <td className="w-[120px]  p-3">
        <span className="text-paleLilac">{borrowApy}</span>
        <span className="text-paleBlue">APY</span>
      </td>

      {/* Total Value */}
      <td className="w-[150px]  p-3">{totalAsset}</td>

      {/* User Balance */}
      <td className="w-[180px] p-3 text-sm">
        <div>{balance}</div>
        <div className="text-paleBlue">{balance}</div>
      </td>

      {/* Action Buttons */}
      <td className="w-[270px]  p-3">
        <div className="flex justify-center gap-2">
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
