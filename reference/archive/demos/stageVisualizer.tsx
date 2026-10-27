import type { LanguageCode } from '../engine/types';

interface StageVisualizerProps {
  sceneKitId: string;
  lang: LanguageCode;
}

export function StageVisualizer({ sceneKitId }: StageVisualizerProps) {
  // Module 1: Receiving & Put-Away Stages
  if (sceneKitId === 'auric-rec-gate') {
    return (
      <div className="w-full h-full flex flex-col justify-between p-4 bg-ink text-white rounded-2xl border-2 border-act/40">
        <div className="flex items-center justify-between border-b border-white/20 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-act text-ink font-heading font-extrabold text-sm rounded-lg uppercase">
              Stage 1
            </span>
            <span className="font-heading text-xl font-bold tracking-wide">
              Gate Entry & Bay Dock Allocation
            </span>
          </div>
          <span className="text-xs font-mono text-[#7cffb0]">AURIC INWARD</span>
        </div>

        <div className="grid grid-cols-4 gap-3 my-2 text-center">
          <div className="p-3 bg-white/10 rounded-xl border border-white/20 flex flex-col items-center">
            <span className="text-3xl mb-1">🚚</span>
            <span className="text-xs font-mono font-bold text-act">1. ARRIVAL</span>
            <span className="text-xs text-white/80 mt-1">Vehicle Reporting & Driver Verification</span>
          </div>
          <div className="p-3 bg-white/10 rounded-xl border border-white/20 flex flex-col items-center">
            <span className="text-3xl mb-1">📋</span>
            <span className="text-xs font-mono font-bold text-[#7cffb0]">2. YMM_GATE_ENTRY</span>
            <span className="text-xs text-white/80 mt-1">PO / Inward Challan Validation</span>
          </div>
          <div className="p-3 bg-white/10 rounded-xl border border-white/20 flex flex-col items-center">
            <span className="text-3xl mb-1">🏷️</span>
            <span className="text-xs font-mono font-bold text-act">3. YPR_GATEENTRY</span>
            <span className="text-xs text-white/80 mt-1">Barcode Print & Vehicle Sticker</span>
          </div>
          <div className="p-3 bg-white/10 rounded-xl border border-white/20 flex flex-col items-center">
            <span className="text-3xl mb-1">🏗️</span>
            <span className="text-xs font-mono font-bold text-[#7cffb0]">4. YMM_DOCK_ALLOCATE</span>
            <span className="text-xs text-white/80 mt-1">Bay Dock Assignment & Offloading</span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-black/40 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono">
          <span className="text-act font-bold">CRITICAL SOP:</span>
          <span className="text-white/80">Never offload without valid SAP Gate Entry Pass & verified PO match</span>
        </div>
      </div>
    );
  }

  if (sceneKitId === 'auric-rec-iqc') {
    return (
      <div className="w-full h-full flex flex-col justify-between p-4 bg-ink text-white rounded-2xl border-2 border-act/40">
        <div className="flex items-center justify-between border-b border-white/20 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-act text-ink font-heading font-extrabold text-sm rounded-lg uppercase">
              Stage 2
            </span>
            <span className="font-heading text-xl font-bold tracking-wide">
              Receiving Offload & 10% IQC Quality Verification
            </span>
          </div>
          <span className="text-xs font-mono text-[#ff8a4a]">30 MIN SLA</span>
        </div>

        <div className="grid grid-cols-3 gap-3 my-2 text-center">
          <div className="p-3 bg-white/10 rounded-xl border border-white/20 flex flex-col items-center">
            <span className="text-3xl mb-1">📦</span>
            <span className="text-xs font-mono font-bold text-act">10% LOT SAMPLING</span>
            <span className="text-xs text-white/80 mt-1">Transfer sample to IQC Staging within 30 min</span>
          </div>
          <div className="p-3 bg-white/10 rounded-xl border border-white/20 flex flex-col items-center">
            <span className="text-3xl mb-1">🏷️</span>
            <span className="text-xs font-mono font-bold text-[#7cffb0]">STATUS TAGGING</span>
            <span className="text-xs text-white/80 mt-1">Apply "Under IQC" or "IQC Hold" physical flags</span>
          </div>
          <div className="p-3 bg-white/10 rounded-xl border border-white/20 flex flex-col items-center">
            <span className="text-3xl mb-1">✅</span>
            <span className="text-xs font-mono font-bold text-act">QC CLEARANCE</span>
            <span className="text-xs text-white/80 mt-1">QC Pass sticker applied or JIRA ticket for defects</span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-black/40 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono">
          <span className="text-[#ff6b5e] font-bold">SAFETY HOLD:</span>
          <span className="text-white/80">Unapproved lots cannot move to production shelves under any condition</span>
        </div>
      </div>
    );
  }

  if (sceneKitId === 'auric-rec-putaway') {
    return (
      <div className="w-full h-full flex flex-col justify-between p-4 bg-ink text-white rounded-2xl border-2 border-act/40">
        <div className="flex items-center justify-between border-b border-white/20 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-act text-ink font-heading font-extrabold text-sm rounded-lg uppercase">
              Stage 3
            </span>
            <span className="font-heading text-xl font-bold tracking-wide">
              Specialized Warehouse Put-Away Protocols
            </span>
          </div>
          <span className="text-xs font-mono text-[#7cffb0]">DOL / NON-DOL</span>
        </div>

        <div className="grid grid-cols-3 gap-3 my-2 text-center">
          <div className="p-3 bg-white/10 rounded-xl border border-white/20 flex flex-col items-center">
            <span className="text-3xl mb-1">🔋</span>
            <span className="text-xs font-mono font-bold text-[#7cffb0]">BATTERY CELLS</span>
            <span className="text-xs text-white/80 mt-1">20°C–25°C, 60%–65% Humidity, 2-hr Putaway SLA</span>
          </div>
          <div className="p-3 bg-white/10 rounded-xl border border-white/20 flex flex-col items-center">
            <span className="text-3xl mb-1">⚠️</span>
            <span className="text-xs font-mono font-bold text-act">CHEMICALS / THINNERS</span>
            <span className="text-xs text-white/80 mt-1">Dedicated Flammable Stores, 2-hr Transfer SLA</span>
          </div>
          <div className="p-3 bg-white/10 rounded-xl border border-white/20 flex flex-col items-center">
            <span className="text-3xl mb-1">🗄️</span>
            <span className="text-xs font-mono font-bold text-act">C-CLASS HARDWARE</span>
            <span className="text-xs text-white/80 mt-1">MH1 staging, HOPT storage, Strict FIFO rule</span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-black/40 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono">
          <span className="text-act font-bold">SAP CODES:</span>
          <span className="text-white/80">LX02 (Stock Audit), LT06 / LT12 (Transfer Order confirmation)</span>
        </div>
      </div>
    );
  }

  if (sceneKitId === 'auric-rec-disposition') {
    return (
      <div className="w-full h-full flex flex-col justify-between p-4 bg-ink text-white rounded-2xl border-2 border-act/40">
        <div className="flex items-center justify-between border-b border-white/20 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#ff6b5e] text-white font-heading font-extrabold text-sm rounded-lg uppercase">
              Stage 4
            </span>
            <span className="font-heading text-xl font-bold tracking-wide">
              Quarantine, RTV & Scrap Disposition
            </span>
          </div>
          <span className="text-xs font-mono text-[#ff6b5e]">NG QUARANTINE</span>
        </div>

        <div className="grid grid-cols-3 gap-3 my-2 text-center">
          <div className="p-3 bg-white/10 rounded-xl border border-white/20 flex flex-col items-center">
            <span className="text-3xl mb-1">🛑</span>
            <span className="text-xs font-mono font-bold text-[#ff6b5e]">NG QUARANTINE</span>
            <span className="text-xs text-white/80 mt-1">Physical isolation of rejected lots into locked area</span>
          </div>
          <div className="p-3 bg-white/10 rounded-xl border border-white/20 flex flex-col items-center">
            <span className="text-3xl mb-1">🔄</span>
            <span className="text-xs font-mono font-bold text-act">AUTO-RTV & DEVIATION</span>
            <span className="text-xs text-white/80 mt-1">Vendor return or "Use As-Is" batch split approval</span>
          </div>
          <div className="p-3 bg-white/10 rounded-xl border border-white/20 flex flex-col items-center">
            <span className="text-3xl mb-1">🗑️</span>
            <span className="text-xs font-mono font-bold text-white/90">SC01 BL SCRAP</span>
            <span className="text-xs text-white/80 mt-1">Physical shredding verification & disposal dispatch</span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-black/40 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono">
          <span className="text-act font-bold">AUTHORIZATION:</span>
          <span className="text-white/80">SUOP ID vendor rework & plant manager sign-off mandatory for scrapping</span>
        </div>
      </div>
    );
  }

  // Module 2: Picking & Packaging Stages
  if (sceneKitId === 'auric-pick-req') {
    return (
      <div className="w-full h-full flex flex-col justify-between p-4 bg-ink text-white rounded-2xl border-2 border-act/40">
        <div className="flex items-center justify-between border-b border-white/20 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-act text-ink font-heading font-extrabold text-sm rounded-lg uppercase">
              Stage 1
            </span>
            <span className="font-heading text-xl font-bold tracking-wide">
              Requisition Trigger & Material Reservation
            </span>
          </div>
          <span className="text-xs font-mono text-[#7cffb0]">PIR / STO</span>
        </div>

        <div className="grid grid-cols-3 gap-3 my-2 text-center">
          <div className="p-3 bg-white/10 rounded-xl border border-white/20 flex flex-col items-center">
            <span className="text-3xl mb-1">📑</span>
            <span className="text-xs font-mono font-bold text-act">JIRA PIR CREATION</span>
            <span className="text-xs text-white/80 mt-1">Part Issuance Report for child parts & battery packs</span>
          </div>
          <div className="p-3 bg-white/10 rounded-xl border border-white/20 flex flex-col items-center">
            <span className="text-3xl mb-1">🔒</span>
            <span className="text-xs font-mono font-bold text-[#7cffb0]">APPROVAL GATE</span>
            <span className="text-xs text-white/80 mt-1">Budget ID check (&gt;₹25,000 or &gt;25 units approval)</span>
          </div>
          <div className="p-3 bg-white/10 rounded-xl border border-white/20 flex flex-col items-center">
            <span className="text-3xl mb-1">📤</span>
            <span className="text-xs font-mono font-bold text-act">SAP STO ORDER</span>
            <span className="text-xs text-white/80 mt-1">ME21N / VL10B outbound delivery order creation</span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-black/40 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono">
          <span className="text-act font-bold">INDIRECT MATERIAL:</span>
          <span className="text-white/80">YMB21 reservation for Central Stores (CM01) to Maintenance (MN01)</span>
        </div>
      </div>
    );
  }

  if (sceneKitId === 'auric-pick-decanting') {
    return (
      <div className="w-full h-full flex flex-col justify-between p-4 bg-ink text-white rounded-2xl border-2 border-act/40">
        <div className="flex items-center justify-between border-b border-white/20 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-act text-ink font-heading font-extrabold text-sm rounded-lg uppercase">
              Stage 2
            </span>
            <span className="font-heading text-xl font-bold tracking-wide">
              Bulk Decanting & Assembly Kitting
            </span>
          </div>
          <span className="text-xs font-mono text-[#ff8a4a]">e-KANBAN RFID</span>
        </div>

        <div className="grid grid-cols-3 gap-3 my-2 text-center">
          <div className="p-3 bg-white/10 rounded-xl border border-white/20 flex flex-col items-center">
            <span className="text-3xl mb-1">🎨</span>
            <span className="text-xs font-mono font-bold text-act">PAINTSHOP ACED</span>
            <span className="text-xs text-white/80 mt-1">Repack bulk FLCs into dedicated internal trolleys</span>
          </div>
          <div className="p-3 bg-white/10 rounded-xl border border-white/20 flex flex-col items-center">
            <span className="text-3xl mb-1">🛵</span>
            <span className="text-xs font-mono font-bold text-[#7cffb0]">VEHICLE MEZZANINE</span>
            <span className="text-xs text-white/80 mt-1">Body parts, brakes, motors grouped by color & VIN</span>
          </div>
          <div className="p-3 bg-white/10 rounded-xl border border-white/20 flex flex-col items-center">
            <span className="text-3xl mb-1">🛒</span>
            <span className="text-xs font-mono font-bold text-act">SUPERMARKET RACKS</span>
            <span className="text-xs text-white/80 mt-1">Standardized kitting bins aligned for milk-run trolleys</span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-black/40 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono">
          <span className="text-act font-bold">SAFETY RULE:</span>
          <span className="text-white/80">Strict visual inspection during decanting for scratches & pin-holes</span>
        </div>
      </div>
    );
  }

  if (sceneKitId === 'auric-pick-delivery') {
    return (
      <div className="w-full h-full flex flex-col justify-between p-4 bg-ink text-white rounded-2xl border-2 border-act/40">
        <div className="flex items-center justify-between border-b border-white/20 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-act text-ink font-heading font-extrabold text-sm rounded-lg uppercase">
              Stage 3
            </span>
            <span className="font-heading text-xl font-bold tracking-wide">
              Line Delivery & Workstation Handoff
            </span>
          </div>
          <span className="text-xs font-mono text-[#7cffb0]">MES VIN FEEDERS</span>
        </div>

        <div className="grid grid-cols-3 gap-3 my-2 text-center">
          <div className="p-3 bg-white/10 rounded-xl border border-white/20 flex flex-col items-center">
            <span className="text-3xl mb-1">📋</span>
            <span className="text-xs font-mono font-bold text-act">FEEDER ASSIGNMENT</span>
            <span className="text-xs text-white/80 mt-1">28 Vehicle Line feeders & 11 Metal/Panel feeders</span>
          </div>
          <div className="p-3 bg-white/10 rounded-xl border border-white/20 flex flex-col items-center">
            <span className="text-3xl mb-1">📱</span>
            <span className="text-xs font-mono font-bold text-[#7cffb0]">SOURCE SCAN</span>
            <span className="text-xs text-white/80 mt-1">HHT barcode scan at supermarket racks & flow bins</span>
          </div>
          <div className="p-3 bg-white/10 rounded-xl border border-white/20 flex flex-col items-center">
            <span className="text-3xl mb-1">🤝</span>
            <span className="text-xs font-mono font-bold text-act">WORKSTATION DROP</span>
            <span className="text-xs text-white/80 mt-1">Scan workstation destination QR to close replenishment</span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-black/40 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono">
          <span className="text-act font-bold">REPLENISHMENT SLA:</span>
          <span className="text-white/80">Never let assembly line buffer drop below 2 complete kits</span>
        </div>
      </div>
    );
  }

  if (sceneKitId === 'auric-pick-reverse') {
    return (
      <div className="w-full h-full flex flex-col justify-between p-4 bg-ink text-white rounded-2xl border-2 border-act/40">
        <div className="flex items-center justify-between border-b border-white/20 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-act text-ink font-heading font-extrabold text-sm rounded-lg uppercase">
              Stage 4
            </span>
            <span className="font-heading text-xl font-bold tracking-wide">
              Empty Bin Handling & Reverse Logistics
            </span>
          </div>
          <span className="text-xs font-mono text-[#ff8a4a]">RETURN DISPATCH</span>
        </div>

        <div className="grid grid-cols-3 gap-3 my-2 text-center">
          <div className="p-3 bg-white/10 rounded-xl border border-white/20 flex flex-col items-center">
            <span className="text-3xl mb-1">🧹</span>
            <span className="text-xs font-mono font-bold text-act">LINE CLEARANCE</span>
            <span className="text-xs text-white/80 mt-1">Continuous pickup of empty bins, FLCs & trolleys</span>
          </div>
          <div className="p-3 bg-white/10 rounded-xl border border-white/20 flex flex-col items-center">
            <span className="text-3xl mb-1">📐</span>
            <span className="text-xs font-mono font-bold text-[#ff6b5e]">STACKING ≤ 5 FT</span>
            <span className="text-xs text-white/80 mt-1">Pallet stacking limit ≤ 5 feet secured with safety belts</span>
          </div>
          <div className="p-3 bg-white/10 rounded-xl border border-white/20 flex flex-col items-center">
            <span className="text-3xl mb-1">🚛</span>
            <span className="text-xs font-mono font-bold text-act">DC GENERATION</span>
            <span className="text-xs text-white/80 mt-1">Delivery Challan & live truck scheduling for vendor return</span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-black/40 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono">
          <span className="text-[#ff6b5e] font-bold">SAFETY PROTOCOL:</span>
          <span className="text-white/80">Unstrapped or over-height stacks (&gt;5 ft) violate factory safety SOP</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center font-heading text-xl text-white">
      Ather AURIC Standard Operating Procedure
    </div>
  );
}
