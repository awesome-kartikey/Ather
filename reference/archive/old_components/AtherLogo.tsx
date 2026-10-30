export function AtherLogo({ className = 'h-8' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Industrial geometric electric bolt badge */}
      <div className="w-9 h-9 bg-act rounded-lg border-2 border-ink flex items-center justify-center shadow-[2px_2px_0px_#14232b] shrink-0">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-5 h-5 text-card stroke-card stroke-2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="#ffffff" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-heading font-extrabold text-2xl tracking-wider text-ink uppercase">
          ATHER
        </span>
        <span className="font-mono text-[10px] tracking-widest text-act font-bold uppercase">
          AURIC · M002
        </span>
      </div>
    </div>
  );
}
