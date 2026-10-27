export function App() {
  return (
    <div className="min-h-screen bg-concrete text-ink flex flex-col items-center justify-center p-6 selection:bg-act selection:text-ink">
      <div className="max-w-lg w-full bg-card p-8 rounded-3xl border-3 border-ink shadow-xl text-center flex flex-col items-center gap-4">
        <span className="text-6xl">🏭</span>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-ink tracking-wide">
          Floor Trainer · Ather AURIC
        </h1>
        <p className="text-ink/80 text-base font-medium">
          Clean canvas ready (0 UI). Share PDF 1 to begin building the first workflow from scratch.
        </p>
        <div className="px-4 py-1.5 bg-concrete rounded-xl border-2 border-ink text-xs font-mono text-act uppercase">
          Chhatrapati Sambhajinagar Plant
        </div>
      </div>
    </div>
  );
}

export default App;
