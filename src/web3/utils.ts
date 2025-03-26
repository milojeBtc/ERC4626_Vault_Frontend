import { ethers } from "ethers";
import { vault_factory_abi } from "./abis/vault_factory_abi";
import { RPC_URL, token_factory_address } from "./config";
import { token_abi } from "./abis/token_abi";
import { vault_abi } from "./abis/vault_abi";

export const getVaultFactory = () =>
  new ethers.Contract(
    token_factory_address,
    vault_factory_abi,
    new ethers.providers.JsonRpcProvider(RPC_URL)
  );

export const getVaultContract = (vault_address: string) =>
  new ethers.Contract(
    vault_address,
    vault_abi,
    new ethers.providers.JsonRpcProvider(RPC_URL)
  );
export const getTokenContract = (token_address: string) =>
  new ethers.Contract(
    token_address,
    token_abi,
    new ethers.providers.JsonRpcProvider(RPC_URL)
  );
