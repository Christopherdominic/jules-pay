import FeatureCard from "./FeatureCard";

const FeatureCards = () => {
  const stream =
    "Pay salaries and contractors in real time. Set an amount and a schedule once, and funds flow to your team every second until the stream ends.";

  const payouts =
    "Pay dozens of people in one transaction. Upload a list of addresses and amounts, or split a total equally, for payroll, bonuses or grants.";

  const cashOut =
    "Turn the stablecoins you've earned into money in your bank account. Get a quote, confirm, and track the transfer until it lands.";

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-4 md:gap-8">
      <FeatureCard
        title="Payroll Streams"
        linkText="Start a Stream"
        description={stream}
        link="/payment-stream"
      />
      <FeatureCard
        title="Bulk Payouts"
        linkText="Send Payouts"
        description={payouts}
        link="/distribution"
      />
      <FeatureCard
        title="Cash Out"
        linkText="Cash Out"
        description={cashOut}
        link="/offramp"
      />
    </div>
  );
};

export default FeatureCards;
