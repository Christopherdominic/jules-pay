"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "./connect-button";
import { NetworkSwitcher } from "./network-switcher";

const links = [
  { title: "Home", href: "/dashboard" },
  { title: "Streams", href: "/payment-stream" },
  { title: "Payouts", href: "/distribution" },
  { title: "Balances", href: "/balances" },
  { title: "Cash Out", href: "/offramp" },
  { title: "Help", href: "/support" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-40 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest text-[#92A5A8]">
          <Link href="/dashboard" className="flex items-center gap-2 group text-sm tracking-normal text-white">
            Jules <span className="text-jules-pay-orange">Pay</span>
          </Link>

          {/* Desktop Nav */}
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`transition-colors uppercase pb-1 border-b-2 ${isActive
                  ? "text-white border-jules-pay-orange"
                  : "border-transparent hover:text-white hover:border-white/50"
                  }`}
              >
                {link.title}
              </Link>
            );
          })}
        </div>

        {/* Action Area */}
        <div className="flex items-center gap-4">
          <NetworkSwitcher />
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
}
