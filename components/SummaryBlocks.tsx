import { calculateDailyPoints, formatPointsShort } from "@/lib/points";
import { formatCurrency } from "@/lib/format";
import { getWalletSummary } from "@/lib/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export function SummaryBlocks() {
  const walletSummary = getWalletSummary();
  const today = new Date();
  const todayPoints = calculateDailyPoints(today);
  const currentMonth = today.toLocaleString("en-US", {
    month: "long",
  });
  return (
    <section
      className="flex flex-col min-[380px]:grid grid-cols-2 grid-rows-2 gap-4 p-4"
      aria-label="Account summary"
    >
      <div
        className="bg-white col-span-1 flex flex-col rounded-xl py-2 px-4 ring-1 ring-block-outline ring-zinc-100"
        aria-live="polite"
      >
        <h2 className="font-medium">Card Balance</h2>
        <p className="text-3xl font-extrabold">
          {formatCurrency(walletSummary.balance)}
        </p>
        <p className="text-zinc-500 font-medium">
          {formatCurrency(walletSummary.available)} Available
        </p>
      </div>

      <div className="bg-white col-span-1 row-span-2 flex flex-col justify-between gap-2 rounded-xl pt-2 pb-4 px-4 ring-1 ring-zinc-100">
        <div>
          <h2 className="font-medium">No Payment Due</h2>
          <p className="text-zinc-500 font-medium leading-tight">
            You&apos;ve paid your {currentMonth} balance.
          </p>
        </div>
        <div className="flex shrink-0 items-center justify-center self-end size-18 rounded-full bg-zinc-100 ring-1 ring-zinc-200">
          <FontAwesomeIcon icon={faCheck} size="2xl" aria-hidden="true" />
        </div>
      </div>

      <div className="bg-white col-span-1 flex flex-col justify-center rounded-xl py-2 px-4 ring-1 ring-zinc-100">
        <h2 className="font-medium">Daily Points</h2>
        <p className="text-zinc-500 font-medium">
          {formatPointsShort(todayPoints)}
        </p>
      </div>
    </section>
  );
}
