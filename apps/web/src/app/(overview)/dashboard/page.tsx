import StatsOverview from "@/components/modules/dashboard/StatsOverview";
import DashboardOverview from "@/components/modules/dashboard/DashboardOverview";
import FeatureCards from "@/components/modules/dashboard/FeatureCards";

const DashboardPage = async () => {
    return (
        <main className="h-full overflow-y-auto space-y-4 md:space-y-12 py-10">
            <header className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white font-bricolage">
                    Pay your people, <span className="text-jules-pay-orange">second by second.</span>
                </h1>
                <p className="text-zinc-400 max-w-2xl">
                    Stream salaries, send bulk payouts and cash out to your bank, all on Stellar with near-zero fees.
                </p>
            </header>
            <StatsOverview />
            <FeatureCards />
            <DashboardOverview title="Payment volume" description="How much you've paid out over time" />
        </main>
    );
};

export default DashboardPage;
