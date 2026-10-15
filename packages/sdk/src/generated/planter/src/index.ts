import { Buffer } from "buffer";
import { Address } from "@stellar/stellar-sdk";
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from "@stellar/stellar-sdk/contract";
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Timepoint,
  Duration,
} from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";

if (typeof window !== "undefined") {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}




export const Errors = {
  /**
   * Contract already initialized.
   */
  1: {message:"AlreadyInitialized"},
  /**
   * Contract not initialized.
   */
  2: {message:"NotInitialized"},
  /**
   * Unauthorized caller.
   */
  3: {message:"Unauthorized"},
  /**
   * Planter already registered.
   */
  4: {message:"AlreadyRegistered"},
  /**
   * Planter not found.
   */
  5: {message:"PlanterNotFound"},
  /**
   * Invalid reward amount.
   */
  6: {message:"InvalidRewardAmount"},
  /**
   * Reward already claimed.
   */
  7: {message:"RewardAlreadyClaimed"}
}

/**
 * Storage key enumeration.
 */
export type DataKey = {tag: "Admin", values: void} | {tag: "RewardToken", values: void} | {tag: "RewardAmount", values: void} | {tag: "Planter", values: readonly [string]} | {tag: "Referrals", values: readonly [string]};


/**
 * Planter information.
 */
export interface PlanterInfo {
  /**
 * Planter address.
 */
address: string;
  /**
 * Whether the first job completion reward has been claimed.
 */
first_job_reward_claimed: boolean;
  /**
 * Number of jobs completed.
 */
jobs_completed: u64;
  /**
 * Who referred this planter (if any).
 */
referrer: Option<string>;
}


/**
 * Referral information.
 */
export interface ReferralInfo {
  /**
 * Number of planters referred.
 */
referral_count: u64;
  /**
 * Number of referred planters who completed their first job.
 */
successful_referrals: u64;
}


export interface PlanterMetrics {
  avg_completion_time: u64;
  current_bond_locked: i128;
  success_rate: u32;
  trees_completed: u32;
}


/**
 * Event emitted when a planter completes a job.
 */
export interface JobCompletedEvent {
  job_count: u64;
  planter: string;
}


/**
 * Event emitted when a planter is registered.
 */
export interface PlanterRegisteredEvent {
  planter: string;
  referrer: Option<string>;
}


/**
 * Event emitted when a referral reward is claimed.
 */
export interface ReferralRewardClaimedEvent {
  amount: i128;
  referred_planter: string;
  referrer: string;
}

export interface Client {
  /**
   * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Initialize the contract.
   * 
   * # Arguments
   * * `admin` — Admin address authorized to update parameters.
   * * `reward_token` — XLM token contract address.
   * * `reward_amount` — Reward amount in stroops (default: 20,000,000 = 2 XLM).
   */
  initialize: ({admin, reward_token, reward_amount}: {admin: string, reward_token: string, reward_amount: i128}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a get_planter transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Get planter information.
   * 
   * # Arguments
   * * `planter` — Planter address.
   */
  get_planter: ({planter}: {planter: string}, options?: MethodOptions) => Promise<AssembledTransaction<PlanterInfo>>

  /**
   * Construct and simulate a complete_job transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Record a job completion for a planter.
   * 
   * # Arguments
   * * `planter` — Planter address.
   */
  complete_job: ({planter}: {planter: string}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a register_planter transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Register a new planter with an optional referrer.
   * 
   * # Arguments
   * * `planter` — Planter address to register.
   * * `referrer` — Optional referrer address.
   */
  register_planter: ({planter, referrer}: {planter: string, referrer: Option<string>}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a get_referral_info transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Get referral information.
   * 
   * # Arguments
   * * `referrer` — Referrer address.
   */
  get_referral_info: ({referrer}: {referrer: string}, options?: MethodOptions) => Promise<AssembledTransaction<ReferralInfo>>

  /**
   * Construct and simulate a get_reward_amount transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Get current reward amount.
   */
  get_reward_amount: (options?: MethodOptions) => Promise<AssembledTransaction<i128>>

  /**
   * Construct and simulate a set_reward_amount transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Update reward amount (admin only).
   * 
   * # Arguments
   * * `new_amount` — New reward amount in stroops.
   */
  set_reward_amount: ({new_amount}: {new_amount: i128}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a get_planter_metrics transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Return aggregate metrics for a planter wallet.
   */
  get_planter_metrics: ({wallet}: {wallet: string}, options?: MethodOptions) => Promise<AssembledTransaction<PlanterMetrics>>

  /**
   * Construct and simulate a set_planter_metrics transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Persist aggregate metrics for a planter wallet.
   */
  set_planter_metrics: ({wallet, metrics}: {wallet: string, metrics: PlanterMetrics}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a claim_referral_reward transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Claim referral reward for a referred planter's first job completion.
   * 
   * # Arguments
   * * `referrer` — Referrer address claiming the reward.
   * * `referred_planter` — The referred planter who completed their first job.
   */
  claim_referral_reward: ({referrer, referred_planter}: {referrer: string, referred_planter: string}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

}
export class Client extends ContractClient {
  static async deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAABwAAAB1Db250cmFjdCBhbHJlYWR5IGluaXRpYWxpemVkLgAAAAAAABJBbHJlYWR5SW5pdGlhbGl6ZWQAAAAAAAEAAAAZQ29udHJhY3Qgbm90IGluaXRpYWxpemVkLgAAAAAAAA5Ob3RJbml0aWFsaXplZAAAAAAAAgAAABRVbmF1dGhvcml6ZWQgY2FsbGVyLgAAAAxVbmF1dGhvcml6ZWQAAAADAAAAG1BsYW50ZXIgYWxyZWFkeSByZWdpc3RlcmVkLgAAAAARQWxyZWFkeVJlZ2lzdGVyZWQAAAAAAAAEAAAAElBsYW50ZXIgbm90IGZvdW5kLgAAAAAAD1BsYW50ZXJOb3RGb3VuZAAAAAAFAAAAFkludmFsaWQgcmV3YXJkIGFtb3VudC4AAAAAABNJbnZhbGlkUmV3YXJkQW1vdW50AAAAAAYAAAAXUmV3YXJkIGFscmVhZHkgY2xhaW1lZC4AAAAAFFJld2FyZEFscmVhZHlDbGFpbWVkAAAABw==",
        "AAAAAgAAABhTdG9yYWdlIGtleSBlbnVtZXJhdGlvbi4AAAAAAAAAB0RhdGFLZXkAAAAABQAAAAAAAAAoR2xvYmFsIGFkbWluIGFkZHJlc3MgKGluc3RhbmNlIHN0b3JhZ2UpLgAAAAVBZG1pbgAAAAAAAAAAAAAuUmV3YXJkIHRva2VuIGFkZHJlc3MgKFhMTSkgKGluc3RhbmNlIHN0b3JhZ2UpLgAAAAAAC1Jld2FyZFRva2VuAAAAAAAAAAAsUmV3YXJkIGFtb3VudCBpbiBzdHJvb3BzIChpbnN0YW5jZSBzdG9yYWdlKS4AAAAMUmV3YXJkQW1vdW50AAAAAQAAADNQbGFudGVyIGluZm8ga2V5ZWQgYnkgYWRkcmVzcyAocGVyc2lzdGVudCBzdG9yYWdlKS4AAAAAB1BsYW50ZXIAAAAAAQAAABMAAAABAAAAPVJlZmVycmFsIGluZm8ga2V5ZWQgYnkgcmVmZXJyZXIgYWRkcmVzcyAocGVyc2lzdGVudCBzdG9yYWdlKS4AAAAAAAAJUmVmZXJyYWxzAAAAAAAAAQAAABM=",
        "AAAAAQAAABRQbGFudGVyIGluZm9ybWF0aW9uLgAAAAAAAAALUGxhbnRlckluZm8AAAAABAAAABBQbGFudGVyIGFkZHJlc3MuAAAAB2FkZHJlc3MAAAAAEwAAADlXaGV0aGVyIHRoZSBmaXJzdCBqb2IgY29tcGxldGlvbiByZXdhcmQgaGFzIGJlZW4gY2xhaW1lZC4AAAAAAAAYZmlyc3Rfam9iX3Jld2FyZF9jbGFpbWVkAAAAAQAAABlOdW1iZXIgb2Ygam9icyBjb21wbGV0ZWQuAAAAAAAADmpvYnNfY29tcGxldGVkAAAAAAAGAAAAI1dobyByZWZlcnJlZCB0aGlzIHBsYW50ZXIgKGlmIGFueSkuAAAAAAhyZWZlcnJlcgAAA+gAAAAT",
        "AAAAAQAAABVSZWZlcnJhbCBpbmZvcm1hdGlvbi4AAAAAAAAAAAAADFJlZmVycmFsSW5mbwAAAAIAAAAcTnVtYmVyIG9mIHBsYW50ZXJzIHJlZmVycmVkLgAAAA5yZWZlcnJhbF9jb3VudAAAAAAABgAAADpOdW1iZXIgb2YgcmVmZXJyZWQgcGxhbnRlcnMgd2hvIGNvbXBsZXRlZCB0aGVpciBmaXJzdCBqb2IuAAAAAAAUc3VjY2Vzc2Z1bF9yZWZlcnJhbHMAAAAG",
        "AAAAAQAAAAAAAAAAAAAADlBsYW50ZXJNZXRyaWNzAAAAAAAEAAAAAAAAABNhdmdfY29tcGxldGlvbl90aW1lAAAAAAYAAAAAAAAAE2N1cnJlbnRfYm9uZF9sb2NrZWQAAAAACwAAAAAAAAAMc3VjY2Vzc19yYXRlAAAABAAAAAAAAAAPdHJlZXNfY29tcGxldGVkAAAAAAQ=",
        "AAAAAQAAAC1FdmVudCBlbWl0dGVkIHdoZW4gYSBwbGFudGVyIGNvbXBsZXRlcyBhIGpvYi4AAAAAAAAAAAAAEUpvYkNvbXBsZXRlZEV2ZW50AAAAAAAAAgAAAAAAAAAJam9iX2NvdW50AAAAAAAABgAAAAAAAAAHcGxhbnRlcgAAAAAT",
        "AAAAAQAAACtFdmVudCBlbWl0dGVkIHdoZW4gYSBwbGFudGVyIGlzIHJlZ2lzdGVyZWQuAAAAAAAAAAAWUGxhbnRlclJlZ2lzdGVyZWRFdmVudAAAAAAAAgAAAAAAAAAHcGxhbnRlcgAAAAATAAAAAAAAAAhyZWZlcnJlcgAAA+gAAAAT",
        "AAAAAQAAADBFdmVudCBlbWl0dGVkIHdoZW4gYSByZWZlcnJhbCByZXdhcmQgaXMgY2xhaW1lZC4AAAAAAAAAGlJlZmVycmFsUmV3YXJkQ2xhaW1lZEV2ZW50AAAAAAADAAAAAAAAAAZhbW91bnQAAAAAAAsAAAAAAAAAEHJlZmVycmVkX3BsYW50ZXIAAAATAAAAAAAAAAhyZWZlcnJlcgAAABM=",
        "AAAAAAAAAOFJbml0aWFsaXplIHRoZSBjb250cmFjdC4KCiMgQXJndW1lbnRzCiogYGFkbWluYCDigJQgQWRtaW4gYWRkcmVzcyBhdXRob3JpemVkIHRvIHVwZGF0ZSBwYXJhbWV0ZXJzLgoqIGByZXdhcmRfdG9rZW5gIOKAlCBYTE0gdG9rZW4gY29udHJhY3QgYWRkcmVzcy4KKiBgcmV3YXJkX2Ftb3VudGAg4oCUIFJld2FyZCBhbW91bnQgaW4gc3Ryb29wcyAoZGVmYXVsdDogMjAsMDAwLDAwMCA9IDIgWExNKS4AAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAwAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAAxyZXdhcmRfdG9rZW4AAAATAAAAAAAAAA1yZXdhcmRfYW1vdW50AAAAAAAACwAAAAA=",
        "AAAAAAAAAEZHZXQgcGxhbnRlciBpbmZvcm1hdGlvbi4KCiMgQXJndW1lbnRzCiogYHBsYW50ZXJgIOKAlCBQbGFudGVyIGFkZHJlc3MuAAAAAAALZ2V0X3BsYW50ZXIAAAAAAQAAAAAAAAAHcGxhbnRlcgAAAAATAAAAAQAAB9AAAAALUGxhbnRlckluZm8A",
        "AAAAAAAAAFRSZWNvcmQgYSBqb2IgY29tcGxldGlvbiBmb3IgYSBwbGFudGVyLgoKIyBBcmd1bWVudHMKKiBgcGxhbnRlcmAg4oCUIFBsYW50ZXIgYWRkcmVzcy4AAAAMY29tcGxldGVfam9iAAAAAQAAAAAAAAAHcGxhbnRlcgAAAAATAAAAAA==",
        "AAAAAAAAAJdSZWdpc3RlciBhIG5ldyBwbGFudGVyIHdpdGggYW4gb3B0aW9uYWwgcmVmZXJyZXIuCgojIEFyZ3VtZW50cwoqIGBwbGFudGVyYCDigJQgUGxhbnRlciBhZGRyZXNzIHRvIHJlZ2lzdGVyLgoqIGByZWZlcnJlcmAg4oCUIE9wdGlvbmFsIHJlZmVycmVyIGFkZHJlc3MuAAAAABByZWdpc3Rlcl9wbGFudGVyAAAAAgAAAAAAAAAHcGxhbnRlcgAAAAATAAAAAAAAAAhyZWZlcnJlcgAAA+gAAAATAAAAAA==",
        "AAAAAAAAAElHZXQgcmVmZXJyYWwgaW5mb3JtYXRpb24uCgojIEFyZ3VtZW50cwoqIGByZWZlcnJlcmAg4oCUIFJlZmVycmVyIGFkZHJlc3MuAAAAAAAAEWdldF9yZWZlcnJhbF9pbmZvAAAAAAAAAQAAAAAAAAAIcmVmZXJyZXIAAAATAAAAAQAAB9AAAAAMUmVmZXJyYWxJbmZv",
        "AAAAAAAAABpHZXQgY3VycmVudCByZXdhcmQgYW1vdW50LgAAAAAAEWdldF9yZXdhcmRfYW1vdW50AAAAAAAAAAAAAAEAAAAL",
        "AAAAAAAAAGBVcGRhdGUgcmV3YXJkIGFtb3VudCAoYWRtaW4gb25seSkuCgojIEFyZ3VtZW50cwoqIGBuZXdfYW1vdW50YCDigJQgTmV3IHJld2FyZCBhbW91bnQgaW4gc3Ryb29wcy4AAAARc2V0X3Jld2FyZF9hbW91bnQAAAAAAAABAAAAAAAAAApuZXdfYW1vdW50AAAAAAALAAAAAA==",
        "AAAAAAAAAC5SZXR1cm4gYWdncmVnYXRlIG1ldHJpY3MgZm9yIGEgcGxhbnRlciB3YWxsZXQuAAAAAAATZ2V0X3BsYW50ZXJfbWV0cmljcwAAAAABAAAAAAAAAAZ3YWxsZXQAAAAAABMAAAABAAAH0AAAAA5QbGFudGVyTWV0cmljcwAA",
        "AAAAAAAAAC9QZXJzaXN0IGFnZ3JlZ2F0ZSBtZXRyaWNzIGZvciBhIHBsYW50ZXIgd2FsbGV0LgAAAAATc2V0X3BsYW50ZXJfbWV0cmljcwAAAAACAAAAAAAAAAZ3YWxsZXQAAAAAABMAAAAAAAAAB21ldHJpY3MAAAAH0AAAAA5QbGFudGVyTWV0cmljcwAAAAAAAA==",
        "AAAAAAAAANVDbGFpbSByZWZlcnJhbCByZXdhcmQgZm9yIGEgcmVmZXJyZWQgcGxhbnRlcidzIGZpcnN0IGpvYiBjb21wbGV0aW9uLgoKIyBBcmd1bWVudHMKKiBgcmVmZXJyZXJgIOKAlCBSZWZlcnJlciBhZGRyZXNzIGNsYWltaW5nIHRoZSByZXdhcmQuCiogYHJlZmVycmVkX3BsYW50ZXJgIOKAlCBUaGUgcmVmZXJyZWQgcGxhbnRlciB3aG8gY29tcGxldGVkIHRoZWlyIGZpcnN0IGpvYi4AAAAAAAAVY2xhaW1fcmVmZXJyYWxfcmV3YXJkAAAAAAAAAgAAAAAAAAAIcmVmZXJyZXIAAAATAAAAAAAAABByZWZlcnJlZF9wbGFudGVyAAAAEwAAAAA=" ]),
      options
    )
  }
  public readonly fromJSON = {
    initialize: this.txFromJSON<null>,
        get_planter: this.txFromJSON<PlanterInfo>,
        complete_job: this.txFromJSON<null>,
        register_planter: this.txFromJSON<null>,
        get_referral_info: this.txFromJSON<ReferralInfo>,
        get_reward_amount: this.txFromJSON<i128>,
        set_reward_amount: this.txFromJSON<null>,
        get_planter_metrics: this.txFromJSON<PlanterMetrics>,
        set_planter_metrics: this.txFromJSON<null>,
        claim_referral_reward: this.txFromJSON<null>
  }
}