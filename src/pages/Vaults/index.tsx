import DepositWithdrawDialog from "@/components/dialog/DepositWithdrawDialog";
import Filter from "@/components/Vaults/Filter";
import VaultItem from "@/components/Vaults/VaultItem";
import { sleep } from "@/utils/utils";
import { token_abi } from "@/web3/abis/token_abi";
import { vault_abi } from "@/web3/abis/vault_abi";
import {
  getTokenContract,
  getVaultContract,
  getVaultFactory,
} from "@/web3/utils";
import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";

interface VaultInfo {
  vaultAddress: string;
  name: string;
  symbol: string;
  asset: string;
}
export default function Vaults() {
  const { address, isConnected } = useAccount();
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [vaultInfos, setVaultInfos] = useState<VaultInfo[]>([]);
  const [asset, setAsset] = useState("");
  const [vaultAddress, setVaultAddress] = useState("");
  const [userBalance, setUserBalance] = useState("");
  const [loading, setLoading] = useState(false);
  const [depositStatus, setDepositStatus] = useState(false);

  const [option, setOption] = useState("");

  useEffect(() => {
    const getVaultCount = async () => {
      setLoading(true);
      const vault_factory = getVaultFactory();
      const count = await vault_factory.getDeployedVaultCount();
      let temp: VaultInfo[] = [];
      for (let i = 0; i < count; i++) {
        const vaultInfo = await vault_factory.vaultInfos(i);
        temp = [...temp, vaultInfo];
      }
      setVaultInfos([...temp]);
      setLoading(false);
    };
    getVaultCount();
  }, []);

  const handleDeposit = async () => {
    try {
      setDepositStatus(true);
      if (address && isConnected) {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum as any
        );

        const signer = provider.getSigner();
        const tokenContract = new ethers.Contract(asset, token_abi, signer);
        const vaultContract = new ethers.Contract(
          vaultAddress,
          vault_abi,
          signer
        );

        tokenContract.removeAllListeners("Approval");
        tokenContract.on("Approval", async (owner, spender, amount) => {
          if (
            owner == address &&
            spender == vaultAddress &&
            amount.eq(deposit)
          ) {
            try {
              if (deposit.gt(currentBalance)) {
                toast.info("Insufficient Funds", {
                  duration: 2500,
                });
                await sleep(500);
              } else {
                const tx = await vaultContract.deposit(deposit, address);
                await tx.wait();
              }
              setDepositStatus(false);
              setIsDepositOpen(false);
            } catch (error) {
              console.log(error);
              setDepositStatus(false);
              setIsDepositOpen(false);
            }
          }
        });

        const currentBalance = await tokenContract.balanceOf(address);
        const decimals = await tokenContract.decimals();
        const allowance = await tokenContract.allowance(address, vaultAddress);

        console.log({ decimals }, { allowance });
        const deposit = ethers.utils.parseUnits(amount.toString(), decimals);

        if (deposit.gt(allowance)) {
          const tx = await tokenContract.approve(vaultAddress, deposit);
          await tx.wait();
          console.log({ tx });
        } else {
          if (deposit.gt(currentBalance)) {
            toast.info("Insufficient Funds", {
              duration: 2500,
            });
            await sleep(500);
            setDepositStatus(false);
            setIsDepositOpen(false);
            return;
          }
          await vaultContract.deposit(deposit, address);
          setDepositStatus(false);
          setIsDepositOpen(false);
        }
      }
    } catch (error) {
      setDepositStatus(false);
      setIsDepositOpen(false);
    }
  };
  const handleWithdraw = async () => {
    try {
      setDepositStatus(true);
      if (address && isConnected) {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum as any
        );

        const signer = provider.getSigner();
        const vaultContract = new ethers.Contract(
          vaultAddress,
          vault_abi,
          signer
        );
        const decimals = await getTokenContract(asset).decimals();
        const withdrawAmount = ethers.utils.parseUnits(
          amount.toString(),
          decimals
        );
        const currentBalance = await vaultContract.balanceOf(address);
        if (withdrawAmount.gt(currentBalance)) {
          toast.info("Insufficient Funds", {
            duration: 2500,
          });
          await sleep(500);
        } else {
          await vaultContract.redeem(withdrawAmount, address, address);
        }

        setDepositStatus(false);
        setIsDepositOpen(false);
      }
    } catch (error) {
      setDepositStatus(false);
      setIsDepositOpen(false);
    }
  };
  useEffect(() => {
    if (!isDepositOpen) {
      setDepositStatus(false);
    }
  }, [isDepositOpen]);
  return (
    <div className="mx-auto mt-20 flex w-[95%] flex-col items-center justify-center gap-5 bg-slateGray py-8 text-white lg:w-[80%]">
      <Filter />
      {!loading && (
        <table className="border-gray-300 font-space w-full border-separate border-spacing-y-3 rounded-b-2xl rounded-t-lg bg-deepSlate p-3">
          <thead className="bg-tColor5 text-md">
            <tr className="text-bgColor8">
              <th className="rounded-bl-lg rounded-tl-lg p-3 text-left">
                Token
              </th>
              <th className="hidden text-left lg:table-cell">APY(Yield)</th>
              <th className="hidden text-left lg:table-cell">Bonous Rewards</th>
              <th className="hidden text-left lg:table-cell">Total Deposits</th>
              <th className="hidden text-left lg:table-cell">My Balance</th>
              <th className="text-left">Manage</th>
            </tr>
          </thead>

          <tbody>
            {vaultInfos.map((info, index) => (
              <VaultItem
                key={index}
                name={info.name}
                symbol={info.symbol}
                apy="15%"
                borrowApy="15%"
                vaultAddress={info.vaultAddress}
                assetAddress={info.asset}
                setIsDepositOpen={() => {
                  setAmount(0);
                  if (address && isConnected) {
                    setOption("deposit");
                    setAsset(info.asset);
                    setVaultAddress(info.vaultAddress);
                    setIsDepositOpen(true);
                  } else {
                    toast.info("Please connect the wallet.", {
                      duration: 2300,
                    });
                  }
                }}
                setIsWithdrawOpen={() => {
                  setAmount(0);
                  if (address && isConnected) {
                    setOption("withdraw");
                    setAsset(info.asset);
                    setVaultAddress(info.vaultAddress);
                    setIsDepositOpen(true);
                  } else {
                    toast.info("Please connect the wallet.", {
                      duration: 2300,
                    });
                  }
                }}
              />
            ))}
          </tbody>
        </table>
      )}
      {loading && (
        <div className="mt-20 flex flex-col items-center justify-center gap-5">
          <div>Loading the vaults</div>
          <div className="border-gray-300 h-[120px] w-[120px] animate-spin rounded-full border-8 border-t-blue"></div>
        </div>
      )}

      {isDepositOpen && (
        <DepositWithdrawDialog
          option={option}
          amount={amount}
          status={depositStatus}
          setAmount={setAmount}
          setOpen={setIsDepositOpen}
          onDeposit={() => handleDeposit()}
          onWithdraw={() => handleWithdraw()}
          depositAsset={asset}
          vaultAddress={vaultAddress}
        />
      )}
    </div>
  );
}
