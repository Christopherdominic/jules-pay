"use client";

import { useRegisterPlanter, useReferrals } from "@/hooks/use-referrals";
import { useWallet } from "@/providers/StellarWalletProvider";
import { Button } from "@/components/ui/button";
import { Sprout, CheckCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { notify } from "@/utils/notification";

function RegisterPlanterInner() {
  const { address } = useWallet();
  const { isRegistered, isLoading } = useReferrals();
  const { register, isRegistering } = useRegisterPlanter();
  const searchParams = useSearchParams();
  const referrerFromUrl = searchParams.get("referrer");

  if (isLoading) {
    return null;
  }

  if (isRegistered) {
    return (
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-semibold text-white">You&apos;re a Member!</h3>
        </div>
        <p className="text-sm text-zinc-400">
          You&apos;re registered on the platform. Complete jobs and refer friends to earn rewards.
        </p>
      </div>
    );
  }

  const handleRegister = () => {
    register(referrerFromUrl || undefined, {
      onSuccess: () => {
        notify.success("Successfully joined the referral program!");
      },
      onError: (error) => {
        notify.error(`Registration failed: ${error.message}`);
      },
    });
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <Sprout className="w-5 h-5 text-jules-pay-orange" />
        <h3 className="text-lg font-semibold text-white">Join the Referral Program</h3>
      </div>
      <p className="text-sm text-zinc-400 mb-4">
        Join to get your referral link and earn XLM for every friend who makes their first payment.
        {referrerFromUrl && (
          <span className="block mt-1 text-jules-pay-orange">
            Referred by a friend — you&apos;ll help them earn 2 XLM when you complete your first job!
          </span>
        )}
      </p>
      <Button
        onClick={handleRegister}
        disabled={!address || isRegistering}
        className="bg-jules-pay-orange hover:bg-jules-pay-orange/80 text-white"
      >
        {isRegistering ? "Registering..." : "Join Now"}
      </Button>
    </div>
  );
}

export default function RegisterPlanter() {
  return (
    <Suspense fallback={null}>
      <RegisterPlanterInner />
    </Suspense>
  );
}
