import { exit, usdc } from "@/assets/images";
import PrimaryButton from "../common/PrimaryButton";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ethers } from "ethers";
import { token_abi } from "@/web3/abis/token_abi";
import { vault_abi } from "@/web3/abis/vault_abi";
import { getTokenContract, getVaultContract } from "@/web3/utils";
import { useAccount } from "wagmi";
interface DepositWithdrawDialogProps {
  option: string;
  amount: number;
  status: boolean;
  setAmount: (num: number) => void;
  setOpen: (open: boolean) => void;
  onDeposit: () => void;
  onWithdraw: () => void;
  depositAsset: string;
  vaultAddress: string;
}
const DepositWithdrawDialog = ({
  option,
  amount,
  status,
  setAmount,
  setOpen,
  onDeposit,
  onWithdraw,
  depositAsset,
  vaultAddress,
}: DepositWithdrawDialogProps) => {
  const { address, isConnected } = useAccount();
  const [approval, setApproval] = useState("");
  const [balance, setBalance] = useState("");
  const [lpBalance, setLpBalance] = useState("");

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const udpate = async () => {
      const tokenContract = getTokenContract(depositAsset);
      const vaultContract = getVaultContract(vaultAddress);

      let decimals = await tokenContract.decimals();
      const allowance = await tokenContract.allowance(address, vaultAddress);

      const balance = await tokenContract.balanceOf(address);
      decimals = await vaultContract.decimals();

      const lpbalance = await vaultContract.balanceOf(address);
      decimals = await tokenContract.decimals();

      let amount = ethers.utils.formatUnits(allowance, decimals);
      setApproval(amount);
      amount = ethers.utils.formatUnits(balance, decimals);
      setBalance(amount);
      amount = ethers.utils.formatUnits(lpbalance, decimals);
      setLpBalance(amount);
    };
    udpate();
  }, []);
  return (
    <div className="bg-bg-dark fixed inset-0 z-50 flex w-screen items-center justify-center overflow-y-auto bg-opacity-70 shadow-lg backdrop-blur-xl">
      <div className="relative w-[550px] rounded-lg bg-deepSlate p-10 text-center">
        <div className="text-2xl">
          {option == "deposit"
            ? "Deposit your fund to the Vault"
            : "Withdraw your fund from the Vault"}
        </div>
        <div className="text-md">Prize Pool</div>
        <div className="mt-10 rounded-lg bg-slateIron px-4">
          <div className="flex justify-between p-4">
            <input
              className="no-hover-input text-xl"
              type="text"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <div className="flex items-center gap-3">
              <img src={usdc} width="40px" />
              <div className="text-xl">
                {option == "deposit" ? "USDC" : "pUSDC"}
              </div>
            </div>
          </div>
          <div className="flex justify-between px-4 py-2">
            <div>$0.00</div>
            <div>
              Balance: {(option == "deposit" ? balance : lpBalance) || "--"}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-lg bg-slateIron px-4">
          <div className="flex justify-between p-4">
            <input
              className="no-hover-input text-xl"
              type="text"
              value={amount}
            />
            <div className="flex items-center gap-3">
              <img src={usdc} width="40px" />
              <div className="text-xl">
                {option == "deposit" ? "pUSDC" : "USDC"}
              </div>
            </div>
          </div>
          <div className="flex justify-between px-4 py-2">
            <div>$0.00</div>
            <div>
              Balance: {(option == "deposit" ? lpBalance : balance) || "--"}
            </div>
          </div>
        </div>

        <div className="my-4 mt-4 flex justify-center gap-4">
          <div className="flex flex-col gap-4">
            <div>Receive up to</div>
            <div>10-12% APY</div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <div>Estimated Network Fees</div>
            <div className="text-sm">
              <div className="flex gap-4">
                <div>Approval</div>
                <div>{approval || "..."}</div>
              </div>
              <div className="flex gap-4">
                <div>Withdraw</div>
                <div>{lpBalance || "..."}</div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`w-[130px] w-full rounded-lg bg-slateIron p-3 px-3 py-2 text-center text-lg text-cloudyBlue`}
        >
          <button
            className=""
            onClick={() => {
              if (amount) {
                if (option == "deposit") onDeposit();
                else onWithdraw();
              } else
                toast.info("Please enter the amount.", {
                  duration: 2300,
                });
            }}
          >
            {!status &&
              (amount
                ? option == "deposit"
                  ? " Confirm Deposit"
                  : "Confirm Withdraw"
                : "Enter An Amount")}
            {status && (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="dark:text-gray-600 h-8 w-8 animate-spin fill-blue text-gray"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </button>
        </div>
        <div
          className="absolute right-2 top-2 cursor-pointer"
          onClick={() => setOpen(false)}
        >
          <img src={exit} className="w-[18px] lg:w-[23px]"></img>
        </div>
      </div>
    </div>
  );
};

export default DepositWithdrawDialog;
