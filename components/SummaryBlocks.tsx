import { getSummaryBlocksData } from "@/lib/services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export function SummaryBlocks() {
  const {
    formattedBalance,
    formattedAvailable,
    formattedPoints,
    currentMonth,
  } = getSummaryBlocksData();

  return (
    <section
      className="flex flex-col min-[380px]:grid grid-cols-2 grid-rows-2 gap-2 p-4 leading-tight"
      aria-label="Account summary"
    >
      <div
        className="bg-foreground-primary col-span-1 flex flex-col rounded-xl py-2 px-4 ring-1 ring-block-outline ring-border-primary/20"
        aria-live="polite"
      >
        <h2 className="font-medium">Card Balance</h2>
        <p className="text-3xl font-bold">{formattedBalance}</p>
        <p className="text-text-secondary font-medium">
          {formattedAvailable} Available
        </p>
      </div>

      <div className="bg-foreground-primary col-span-1 row-span-2 flex flex-col justify-between gap-2 rounded-xl pt-2 pb-4 px-4 ring-1 ring-border-primary/20">
        <div>
          <h2 className="font-medium">No Payment Due</h2>
          <p className="text-text-secondary font-medium">
            You&apos;ve paid your {currentMonth} balance.
          </p>
        </div>
        <div className="flex shrink-0 items-center justify-center self-end size-16 rounded-full bg-surface-primary ring-1 ring-border-primary">
          <FontAwesomeIcon icon={faCheck} size="xl" aria-hidden="true" />
        </div>
      </div>

      <div className="bg-foreground-primary col-span-1 flex flex-col justify-center rounded-xl py-2 px-4 ring-1 ring-border-primary/20">
        <h2 className="font-medium">Daily Points</h2>
        <p className="text-text-secondary font-medium">{formattedPoints}</p>
      </div>
    </section>
  );
}
