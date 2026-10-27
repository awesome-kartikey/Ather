interface PalletProgressBarProps {
  totalSlots: number;
  currentIndex: number;
  results: Array<{ ok: boolean }>;
}

export function PalletProgressBar({
  totalSlots,
  currentIndex,
  results
}: PalletProgressBarProps) {
  return (
    <div className="flex gap-2 w-full my-3" role="progressbar" aria-valuenow={currentIndex} aria-valuemax={totalSlots}>
      {Array.from({ length: totalSlots }).map((_, index) => {
        const hasResult = index < results.length;
        const isCurrent = index === currentIndex && !hasResult;
        const result = hasResult ? results[index] : null;

        let slotClass = 'bg-[#b88a55]/35 border-ink/40';

        if (hasResult && result) {
          slotClass = result.ok ? 'bg-ok border-ok shadow-sm' : 'bg-no border-no shadow-sm';
        } else if (isCurrent) {
          slotClass = 'bg-[#b88a55] border-ink ring-2 ring-act animate-pulse';
        }

        return (
          <div
            key={index}
            className={`flex-1 h-5 rounded-[4px] border-2 transition-all ${slotClass}`}
            title={`Step ${index + 1}: ${
              hasResult ? (result?.ok ? 'Passed' : 'Missed') : isCurrent ? 'Current' : 'Upcoming'
            }`}
          />
        );
      })}
    </div>
  );
}
