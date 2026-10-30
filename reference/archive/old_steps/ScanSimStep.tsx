import { useState } from 'react';
import type { ScanSimStepData, BarcodeOption } from '../content/schema';
import type { LanguageCode } from '../engine/types';
import { ScanBarcode, Printer, CheckCircle2, XCircle } from 'lucide-react';
import { TactileButton } from '../components/TactileButton';

interface ScanSimStepProps {
  step: ScanSimStepData;
  lang: LanguageCode;
  isAnswered: boolean;
  onScanOption: (option: BarcodeOption) => void;
}

export function ScanSimStep({ step, lang, isAnswered, onScanOption }: ScanSimStepProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const handleSelect = (opt: BarcodeOption) => {
    if (isAnswered) return;
    setSelectedOptionId(opt.id);
  };

  const handleScanTrigger = () => {
    if (!selectedOptionId || isAnswered) return;
    const opt = step.options.find((o) => o.id === selectedOptionId);
    if (opt) {
      onScanOption(opt);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full select-none">
      {/* Thermal Printer Output Graphic (Gate Barcode Sticker) */}
      <div className="bg-card p-5 rounded-2xl border-3 border-ink shadow-[4px_4px_0px_#14232b] flex flex-col md:flex-row items-center gap-6">
        {/* Physical Windshield Barcode Sticker Mockup */}
        <div className="w-full md:w-80 bg-[#fffdfa] border-3 border-ink p-4 rounded-xl shadow-[3px_3px_0px_#14232b] text-ink font-mono flex flex-col gap-2 relative overflow-hidden">
          {/* Ather Header in sticker */}
          <div className="flex items-center justify-between border-b-2 border-ink pb-1.5">
            <span className="font-heading font-black text-lg text-ink">ATHER ENERGY AURIC</span>
            <span className="text-[10px] bg-ink text-card px-1.5 py-0.5 rounded font-bold">
              YPR_GATEENTRY
            </span>
          </div>

          <div className="text-xs space-y-0.5">
            <div className="flex justify-between">
              <span className="text-ink/60">TR NO:</span>
              <span className="font-bold">{step.expectedCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink/60">PLANT:</span>
              <span className="font-bold">M002 (CHH. SAMBHAJINAGAR)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink/60">TRUCK:</span>
              <span className="font-bold">MH-20-DE-4412</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink/60">MATERIAL:</span>
              <span className="font-bold">VEHICLE SUB-ASSEMBLIES</span>
            </div>
          </div>

          {/* Barcode visual lines */}
          <div className="my-1.5 h-12 w-full barcode-pattern rounded border border-ink/40" />

          <div className="text-center font-mono font-black text-sm tracking-widest text-ink">
            *{step.expectedCode}*
          </div>

          {/* Perforated bottom edge */}
          <div className="absolute bottom-0 left-0 right-0 h-1 border-b-2 border-dashed border-ink/30" />
        </div>

        {/* Instructions & Printer Info */}
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex items-center gap-2 text-act font-heading font-extrabold text-sm uppercase">
            <Printer className="w-4 h-4" />
            Thermal Pass Generated via YPR_GATEENTRY
          </div>
          <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-ink leading-tight">
            {lang === 'hi'
              ? 'ऑप्टिकल स्कैनर से पढ़ने के लिए वाहन विंडशील्ड बारकोड का चयन करें:'
              : lang === 'mr'
              ? 'ऑप्टिकल स्कॅनरने वाचण्यासाठी वाहनाच्या विंडशील्ड बारकोडची निवड करा:'
              : 'Select & Scan the correct barcode identification code onto the terminal:'}
          </h3>
          <p className="font-body text-sm text-ink/75 font-medium">
            Match the ERP TR reference number generated during SAP gate entry. Scanning wrong codes
            triggers barcode mismatch flags in SAP.
          </p>
        </div>
      </div>

      {/* Barcode Options to Scan */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {step.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          let cardStyle =
            'bg-card text-ink border-3 border-ink shadow-[4px_4px_0px_#14232b] hover:bg-concrete/40';

          if (isAnswered) {
            if (opt.correct) {
              cardStyle = 'bg-ok/20 border-3 border-ok text-ink ring-3 ring-ok';
            } else if (isSelected && !opt.correct) {
              cardStyle = 'bg-no/20 border-3 border-no text-ink ring-3 ring-no';
            } else {
              cardStyle = 'opacity-50 bg-concrete/40 border-2 border-ink/30 shadow-none';
            }
          } else if (isSelected) {
            cardStyle = 'bg-act/15 border-3 border-act text-ink ring-3 ring-act scale-[1.02]';
          }

          return (
            <button
              key={opt.id}
              type="button"
              disabled={isAnswered}
              onClick={() => handleSelect(opt)}
              className={`min-h-[72px] p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all cursor-pointer text-center font-mono font-extrabold ${cardStyle}`}
            >
              <div className="flex items-center gap-2">
                <ScanBarcode className="w-5 h-5 text-act" />
                <span className="text-base sm:text-lg">{opt.code}</span>
              </div>

              {isAnswered && opt.correct && (
                <div className="flex items-center gap-1 text-ok text-xs font-heading font-extrabold">
                  <CheckCircle2 className="w-4 h-4" /> VERIFIED TR CODE
                </div>
              )}
              {isAnswered && isSelected && !opt.correct && (
                <div className="flex items-center gap-1 text-no text-xs font-heading font-extrabold">
                  <XCircle className="w-4 h-4" /> MISMATCH CODE
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Scan Action Button */}
      {!isAnswered && (
        <div className="flex justify-end pt-2">
          <TactileButton
            variant="primary"
            size="lg"
            disabled={!selectedOptionId}
            onClick={handleScanTrigger}
            className="w-full sm:w-auto min-w-[240px]"
          >
            <ScanBarcode className="w-6 h-6 mr-1" />
            {lang === 'hi'
              ? 'बारकोड स्कैन करें (TRIGGER SCAN)'
              : lang === 'mr'
              ? 'बारकोड स्कॅन करा (TRIGGER SCAN)'
              : 'TRIGGER OPTICAL SCAN'}
          </TactileButton>
        </div>
      )}
    </div>
  );
}
