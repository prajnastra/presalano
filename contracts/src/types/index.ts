import { Address, PolicyId, TxHash, Unit } from 'lucid-cardano';

export type ContractConfig = {
  presaleToken: Unit;
  policyId: PolicyId;
  token_per_lovelace: bigint;
  owner?: Address;
  deployHash?: TxHash;
};

export type AssetName = string;
export type NameAndQuantity = Record<AssetName, bigint>;
