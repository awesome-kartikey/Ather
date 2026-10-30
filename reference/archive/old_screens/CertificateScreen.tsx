import type { RunSummary, LanguageCode, UserProfile } from '../engine/types';
import { useTranslation } from '../i18n/translations';
import { TactileButton } from '../components/TactileButton';
import { Printer, X, ShieldCheck } from 'lucide-react';

interface CertificateScreenProps {
  summary: RunSummary;
  lang: LanguageCode;
  profile: UserProfile;
  onClose: () => void;
}

export function CertificateScreen({
  summary,
  lang,
  profile,
  onClose
}: CertificateScreenProps) {
  const t = useTranslation(lang);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const currentDate = '28 August 2026';

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 w-full flex flex-col gap-6 animate-in fade-in duration-300 select-none">
      {/* Top action toolbar (hidden during print) */}
      <div className="flex items-center justify-between gap-4 bg-card p-4 rounded-2xl border-3 border-ink shadow-[4px_4px_0px_#14232b] print:hidden">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-ok" />
          <span className="font-heading font-black text-xl text-ink uppercase">
            Official Floor Certification
          </span>
        </div>

        <div className="flex items-center gap-3">
          <TactileButton variant="primary" size="md" onClick={handlePrint}>
            <Printer className="w-5 h-5 mr-1" />
            <span>{t.printCertificate}</span>
          </TactileButton>

          <TactileButton variant="secondary" size="md" onClick={onClose}>
            <X className="w-5 h-5 mr-1" />
            <span>{t.close}</span>
          </TactileButton>
        </div>
      </div>

      {/* Official Certificate Canvas */}
      <div
        id="certificate-print-area"
        className="bg-[#ffffff] text-[#14232b] border-8 border-double border-ink p-8 sm:p-12 rounded-3xl shadow-[8px_8px_0px_#14232b] flex flex-col items-center text-center gap-6 relative overflow-hidden"
      >
        {/* Corner Ornaments */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-4 border-l-4 border-act" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-4 border-r-4 border-act" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-4 border-l-4 border-act" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-4 border-r-4 border-act" />

        {/* Ather Plant Logo & Title */}
        <div className="flex flex-col items-center gap-2">
          <div className="px-4 py-1.5 bg-ink text-card rounded-lg font-heading font-black text-lg tracking-widest uppercase">
            ATHER ENERGY · AURIC PLANT M002
          </div>
          <span className="text-xs font-mono font-bold text-act tracking-widest uppercase mt-1">
            Chhatrapati Sambhajinagar Warehouse Operations
          </span>
          <h1 className="font-heading font-black text-4xl sm:text-5xl text-ink tracking-wide uppercase mt-2">
            Certificate of Floor Competency
          </h1>
          <div className="h-1 w-32 bg-act my-1" />
        </div>

        {/* Certificate Body */}
        <div className="flex flex-col gap-3 max-w-2xl">
          <p className="font-body text-base text-ink/80 font-medium">
            This is to officially certify that warehouse operator
          </p>
          <span className="font-heading font-black text-3xl sm:text-4xl text-ink tracking-wider underline decoration-act decoration-4 underline-offset-8">
            {profile.name || 'Floor Operator'}
          </span>
          <p className="font-body text-base text-ink/80 font-medium mt-2">
            has successfully completed standardized simulation assessment and demonstrated 100%
            compliance with plant standard operating procedures for:
          </p>

          <div className="bg-concrete/40 p-4 rounded-2xl border-2 border-ink my-2 flex flex-col items-center">
            <span className="font-heading font-black text-2xl text-ink uppercase">
              Module 1 · Stage 1: Gate & Dock Operations
            </span>
            <span className="font-mono text-xs font-bold text-ink/70 mt-1">
              SOP Document No: XXXX_PRO_001 · Revision 1.0 (Date: 28/08/2026)
            </span>
          </div>

          <p className="font-body text-sm text-ink/75 font-semibold">
            Operational Coverage: Driver document verification, SAP YMM_GATE_ENTRY, barcode printing
            (YPR_GATEENTRY), bay dock allocation (YMM_DOCK_ALLOCATE), mandatory wheel chocks safety
            enforcement, and returnable container Delivery Challan (DC) clearance.
          </p>
        </div>

        {/* Metrics & Barcode Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl border-t-2 border-b-2 border-ink/20 py-4 my-2">
          <div className="flex flex-col items-center">
            <span className="text-xs font-mono text-ink/60 uppercase font-bold">Accuracy</span>
            <span className="font-heading font-black text-2xl text-ink">
              {summary.accuracyPct}%
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs font-mono text-ink/60 uppercase font-bold">Rating</span>
            <span className="font-heading font-black text-2xl text-act">
              {'⭐'.repeat(summary.stars)}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs font-mono text-ink/60 uppercase font-bold">Date of Issue</span>
            <span className="font-heading font-black text-lg text-ink">{currentDate}</span>
          </div>
        </div>

        {/* Signatures */}
        <div className="flex items-end justify-between w-full max-w-2xl pt-6 text-xs font-mono font-bold">
          <div className="flex flex-col items-center">
            <div className="w-48 border-b-2 border-ink mb-1" />
            <span>OPERATOR SIGNATURE</span>
          </div>

          {/* Barcode graphic seal */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-24 h-8 barcode-pattern border border-ink" />
            <span className="text-[10px] tracking-widest">TR-M002-XXXX-001</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-48 border-b-2 border-ink mb-1" />
            <span>WAREHOUSE SUPERVISOR</span>
          </div>
        </div>
      </div>
    </div>
  );
}
