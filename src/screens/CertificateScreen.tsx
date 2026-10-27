import type { LanguageCode } from '../engine/types';
import type { TrainingPackData } from '../content/schema';
import { useTranslation } from '../i18n/translations';
import { Printer, ArrowLeft, Award, CheckCircle } from 'lucide-react';

interface CertificateScreenProps {
  workerName: string;
  pack: TrainingPackData;
  lang: LanguageCode;
  onBack: () => void;
}

export function CertificateScreen({
  workerName,
  pack,
  lang,
  onBack
}: CertificateScreenProps) {
  const t = useTranslation(lang);
  const currentDate = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center gap-6 max-w-3xl mx-auto p-4 sm:p-8 w-full animate-in fade-in duration-300">
      {/* Top Action Controls (hidden on print) */}
      <div className="flex items-center justify-between w-full no-print">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2.5 bg-card border-2 border-ink rounded-xl font-heading text-lg font-bold text-ink hover:bg-concrete transition-all shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Results</span>
        </button>

        <button
          type="button"
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-2.5 bg-act text-ink border-3 border-ink rounded-xl font-heading text-xl font-bold uppercase hover:brightness-105 active:scale-95 transition-all shadow-md"
        >
          <Printer className="w-5 h-5" />
          <span>{t.printCertificate}</span>
        </button>
      </div>

      {/* Printable Certificate Frame */}
      <div
        id="certificate-print-area"
        className="w-full bg-white text-[#14232b] p-8 sm:p-12 rounded-3xl border-8 border-double border-[#14232b] shadow-2xl flex flex-col items-center text-center gap-6 relative"
      >
        {/* Decorative corner accents */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-4 border-l-4 border-[#14232b]" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-4 border-r-4 border-[#14232b]" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-4 border-l-4 border-[#14232b]" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-4 border-r-4 border-[#14232b]" />

        {/* Ather Plant Logo & Header */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2 text-act">
            <Award className="w-10 h-10 text-[#ee6a1f]" />
            <span className="font-heading text-4xl font-extrabold tracking-wider text-[#14232b]">
              ATHER ENERGY
            </span>
          </div>
          <span className="text-xs font-mono font-bold tracking-widest text-[#14232b]/60 uppercase">
            CHHATRAPATI SAMBHAJINAGAR PLANT · WAREHOUSE LOGISTICS
          </span>
        </div>

        {/* Certificate Title */}
        <div className="border-b-2 border-t-2 border-[#14232b] py-2 w-full max-w-lg">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase tracking-wide text-[#14232b]">
            Certificate of Qualification
          </h2>
        </div>

        {/* Awardee Name */}
        <div className="flex flex-col gap-1">
          <span className="text-sm font-serif italic text-[#14232b]/70">
            This is proudly awarded to
          </span>
          <h3 className="font-heading text-4xl sm:text-5xl font-black text-[#14232b] tracking-wider underline decoration-[#ee6a1f] decoration-4 underline-offset-8 py-2">
            {workerName.trim() || 'Floor Operator'}
          </h3>
        </div>

        {/* Qualification Statement */}
        <p className="text-base sm:text-lg max-w-xl font-medium leading-relaxed text-[#14232b]/90">
          For demonstrating proficiency in standard operating procedures (SOP), adhering to strict warehouse safety protocols, and scoring a 3-Star mastery in:
        </p>

        {/* Training Module Name */}
        <div className="px-6 py-2.5 bg-[#dfe5e8]/50 border-2 border-[#14232b] rounded-xl flex items-center gap-3">
          <span className="text-3xl">{pack.icon}</span>
          <span className="font-heading text-2xl font-bold text-[#14232b]">
            {pack.title[lang]}
          </span>
          <CheckCircle className="w-6 h-6 text-[#1f8a4c]" />
        </div>

        {/* Date and Signatures */}
        <div className="grid grid-cols-2 gap-8 w-full max-w-xl pt-8 mt-4 border-t-2 border-[#14232b]/30">
          <div className="flex flex-col items-center">
            <span className="font-heading text-lg font-bold text-[#14232b]">
              {currentDate}
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-[#14232b]/60 border-t border-[#14232b] w-full pt-1">
              Date of Issue
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="h-6 w-full" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#14232b]/60 border-t border-[#14232b] w-full pt-1">
              {t.supervisorSignatureLine}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
