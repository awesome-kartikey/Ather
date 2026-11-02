# Ather AURIC Mega-Plant: How to Test Every Slice (All Slices in One File)
**Comprehensive Manual for Quality Assurance, Floor Supervisors & Developers**
*Covers All 12 Modules • 91 Operational Slices / Story Scenes • Grounded in Official Ather SOPs*

---
## Table of Contents

- [Module 1: Gate & Dock Operations (9 Slices)](#module-1-c1-s1-gate-dock)
- [Module 2: Stage 2: Receiving & IQC Clearance (9 Slices)](#module-2-c1-s2-iqc-clearance)
- [Module 3: Stage 3: Vehicle & Battery Parts Put-Away (6 Slices)](#module-3-c1-s3-putaway-parts)
- [Module 4: Stage 4: Specialized Battery Cell Put-Away (5 Slices)](#module-4-c1-s4-battery-cell)
- [Module 5: Stage 5: Hazardous Chemicals & Thinners Put-Away (5 Slices)](#module-5-c1-s5-chemicals-thinners)
- [Module 6: Stage 6: Supermarket C-Class Parts Put-Away (MH1) (6 Slices)](#module-6-c1-s6-supermarket-sm)
- [Module 7: Quality Rejections, Quarantine & Disposition (7 Slices)](#module-7-c1-s7)
- [Module 8: Vehicle Line Issuance & Order Picking (9 Slices)](#module-8-c2-s8)
- [Module 9: Paint Shop Line Issuance & Decanting (10 Slices)](#module-9-c2-s9)
- [Module 10: Indirect Material Handling (CM01 to MN01) (6 Slices)](#module-10-c2-s10)
- [Module 11: Production Inspection & Quality PIR (7 Slices)](#module-11-c2-s11)
- [Module 12: Reverse Logistics, Scrap & Empty Bin Loading (12 Slices)](#module-12-c2-s12)
- [Global Test Harness & Edge Cases](#global-test-harness--edge-cases)

---

## Quick Start: Launching the Test Environment

```bash
# 1. Start local Vite development server
pnpm dev
```

Open `http://localhost:5173` (or the active terminal port) in Chrome or Edge.

> **Navigation Note:** In the top navigation HUD of the Story Mode, tap the **Module Selector** pills to immediately jump to any of the 12 Modules. Within each module, scenes proceed sequentially as you complete each slice.


## Module 1: Gate & Dock Operations <a id="module-1-c1-s1-gate-dock"></a>
**Stage ID:** `c1_s1_gate_dock` | **SOP Document:** `XXXX_PRO_001` | **Category:** Category 1: Inbound Logistics & Put-Away Workflows
**Total Slices:** 9 Scenes

### Slice 1: Truck Arrival & Waiting Yard (`c1_s1_sc01_arrival`)
- **Module:** 1 (Gate & Dock Operations) | **Step in Stage:** Scene 1 of 9
- **Interaction Type:** `MCQ` | **XP Reward:** `+100 XP`
- **SOP Mandate:** SOP XXXX_PRO_001 Clause 4.1.1
- **Visual Canvas:** `truck_arrival_gate` | **Video Source:** `/Assets/8%20Sequential%20Scenes/1%20Inbound%20Truck%20Gate%20Arrival/scene_01_gate_arrival.mp4`

#### 1. Scenario & Visual Context
> "The supplier truck reaches the gate. Where does the driver park first?"

#### 2. Exact Test Steps
1. Observe the question card displaying **3 options**.
2. **Correct Action (PASS):** Tap/Click **"In the designated waiting parking area, engine turned off"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+100 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"Drive straight inside and stop next to Dock 04"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> Clause 4.1.1: Driver parks in designated waiting parking area, turns off engine, and proceeds on foot to the security desk with driver credentials.

---

### Slice 2: Document Verification & Desk Sorting (`c1_s1_sc02_doc_sorting`)
- **Module:** 1 (Gate & Dock Operations) | **Step in Stage:** Scene 2 of 9
- **Interaction Type:** `DRAG_DROP` | **XP Reward:** `+100 XP`
- **SOP Mandate:** SOP XXXX_PRO_001 Clause 4.1.1 & 4.1.2
- **Visual Canvas:** `gatehouse_cabin_desk` 

#### 1. Scenario & Visual Context
> "Sort each incoming document to the correct reception desk:"

#### 2. Exact Test Steps
1. Observe the **5 draggable cards** and **2 destination drop zones**.
2. **Correct Action (PASS):** Drag and match each item to its assigned destination:
   - Drag **"Driver's License (DL)"** → Drop into **"Security Desk (Driver & Vehicle)"**
   - Drag **"Vehicle RC Book & Insurance"** → Drop into **"Security Desk (Driver & Vehicle)"**
   - Drag **"Purchase Order (PO)"** → Drop into **"DEO Window (ERP & Shipping)"**
   - Drag **"Advance Shipment Notice (ASN)"** → Drop into **"DEO Window (ERP & Shipping)"**
   - Drag **"Vendor Tax Invoice & Challan"** → Drop into **"DEO Window (ERP & Shipping)"**
3. Click **Confirm / Submit Sorting**.
   - *Expected Result:* All items lock into zones with green checkmarks, +100 XP awarded.

#### 3. SOP Grounding & Learning Point
> Per SOP 4.1.1 & 4.1.2: Security verifies personal/vehicle identity (DL, RC, Insurance) in the logbook. The DEO at the gate window receives shipping papers (PO, ASN, Tax Invoice) to validate in SAP ERP.

---

### Slice 3: SAP Gate Entry & ASN Auto-Fill (`c1_s1_sc03_sap_entry`)
- **Module:** 1 (Gate & Dock Operations) | **Step in Stage:** Scene 3 of 9
- **Interaction Type:** `MCQ` | **XP Reward:** `+100 XP`
- **SOP Mandate:** SOP XXXX_PRO_001 Clause 4.2.1 & 5.1
- **Visual Canvas:** `sap_terminal_screen` 

#### 1. Scenario & Visual Context
> "The DEO enters the vendor invoice in YMM_GATE_ENTRY. What is the role of this transaction, and what happens if the ASN is wrong?"

#### 2. Exact Test Steps
1. Observe the question card displaying **3 options**.
2. **Correct Action (PASS):** Tap/Click **"Validates the ASN and auto-populates data; if wrong, gate entry halts until corrected"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+100 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"Manually bypass the check and issue a slip to keep the truck queue moving"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.2.1 & 5.1: YMM_GATE_ENTRY cross-references the invoice with the vendor's digital ASN to auto-populate vehicle and part details. If the ASN is invalid, the vehicle is placed on 'Hold due to ASN' with zero manual override.

---

### Slice 4: Barcode Pass Printing & Driver Sequence (`c1_s1_sc04_barcode_sequence`)
- **Module:** 1 (Gate & Dock Operations) | **Step in Stage:** Scene 4 of 9
- **Interaction Type:** `SEQUENCE` | **XP Reward:** `+100 XP`
- **SOP Mandate:** SOP XXXX_PRO_001 Clause 4.1.1–4.1.4 & 4.2.2
- **Visual Canvas:** `thermal_printer_tv` 

#### 1. Scenario & Visual Context
> "Arrange the driver's gate entry journey in the correct chronological order:"

#### 2. Exact Test Steps
1. Review the unarranged operational steps.
2. **Correct Action (PASS):** Arrange the steps in the exact chronological SOP order:
   - Step 1: **Park in waiting yard with engine switched off**
   - Step 2: **Present DL, RC & insurance at Security Desk**
   - Step 3: **Submit PO, ASN & invoice to DEO for SAP validation**
   - Step 4: **Collect printed windshield barcode pass (YPR_GATEENTRY)**
   - Step 5: **Drive vehicle to designated Inbound Dock 04**
3. Tap **Verify Sequence**.
   - *Expected Result:* Sequence validated with numerical badges, +100 XP awarded.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.1.1–4.1.4: Driver halts in waiting yard, security verifies credentials, DEO validates shipping data, prints barcode pass via YPR_GATEENTRY, and only then is the vehicle authorized to proceed to the dock.

---

### Slice 5: Inbound Bay & Dock Allocation (`c1_s1_sc05_dock_alloc`)
- **Module:** 1 (Gate & Dock Operations) | **Step in Stage:** Scene 5 of 9
- **Interaction Type:** `HOTSPOT` | **XP Reward:** `+100 XP`
- **SOP Mandate:** SOP XXXX_PRO_001 Clause 4.2.3
- **Visual Canvas:** `dock_blueprint_map` 

#### 1. Scenario & Visual Context
> "The DEO executes YMM_DOCK_ALLOCATE for vehicle assembly parts. Tap the correct allocated bay & dock on the AURIC plant layout:"

#### 2. Exact Test Steps
1. Review the facility blueprint / plant map.
2. **Correct Action (PASS):** Tap the hotspot marker for **"Dock 04: Inbound Bay B (Allocated for Vehicle Parts)"**.
3. Tap **Confirm Bay Allocation**.
   - *Expected Result:* Hotspot pulses emerald green, +100 XP awarded.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.2.3: YMM_DOCK_ALLOCATE assigns warehouse docks based on commodity classification. Vehicle mechanical components are directed to Inbound Bay B (Dock 04), while battery cells must go to Dock 01 and chemicals to isolated annexes.

---

### Slice 6: Dock Arrival & Critical Safety Audit (`c1_s1_sc06_dock_safety`)
- **Module:** 1 (Gate & Dock Operations) | **Step in Stage:** Scene 6 of 9
- **Interaction Type:** `SPOT_ERROR` | **XP Reward:** `+100 XP`
- **SOP Mandate:** SOP XXXX_PRO_001 Clause 4.1.5 (Mandatory Safety Rule)
- **Visual Canvas:** `dock_safety_chocks` | **Video Source:** `/Assets/8%20Sequential%20Scenes/2%20Loading%20Dock%20%26%20Wheel%20Chock%20Safety/scene_02_wheel_chock_safety.mp4`

#### 1. Scenario & Visual Context
> "CRITICAL SAFETY AUDIT: Spot the immediate safety violation before keys are accepted and unloading starts:"

#### 2. Exact Test Steps
1. Inspect the visual staging canvas for non-compliances.
2. **Correct Action (PASS):** Tap/Click on the hazard area: **"Missing Wheel Chocks: Truck rear tires unblocked (Roll-away hazard!)"**.
3. Tap **Confirm Defect / Hazard**.
   - *Expected Result:* Defect flagged with red quarantine border, AURA explains resolution, +100 XP awarded.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.1.5: Before unloading initiates, the engine must be switched off and heavy-duty wheel chocks firmly blocked under rear tires. Unblocked tires can allow trailer creep, causing catastrophic forklift tipping.

---

### Slice 7: Empty Bins Reloading & Departure Gate Exit (`c1_s1_sc07_gate_exit`)
- **Module:** 1 (Gate & Dock Operations) | **Step in Stage:** Scene 7 of 9
- **Interaction Type:** `STOP_GO` | **XP Reward:** `+100 XP`
- **SOP Mandate:** SOP XXXX_PRO_001 Clause 4.1.6.2 & 4.2.4
- **Visual Canvas:** `exit_gatehouse_barrier` 

#### 1. Scenario & Visual Context
> "DECISION GATE: The driver wants to leave with 20 empty FLC bins without a manual Delivery Challan (DC):"

#### 2. Exact Test Steps
1. Review the operational dilemma displayed on the screen.
2. **Correct Action (PASS):** Click the big **🛑 STOP (Halt)** button.
   - *Expected Result:* Button confirms the decision, +100 XP awarded, AURA praises adherence to safety/SOP compliance.
3. **Negative Test (FAIL):** Click the opposite **🟢 GO (Authorize)** button.
   - *Expected Result:* Heart deducted, warning feedback explains the severe risk of bypassing SOP.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.1.6.2 & 4.2.4: Whenever returnable packaging (FLCs, plastic bins, or trolleys) is taken out, an authorized manual Delivery Challan (DC) must be verified and DEO must perform SAP YMM_GATE_EXIT before Security unlocks the departure gate.

---

### Slice 8: ASN Mismatch & Gate Entry Halt Gate (`c1_s1_sc08_asn_discrepancy`)
- **Module:** 1 (Gate & Dock Operations) | **Step in Stage:** Scene 8 of 9
- **Interaction Type:** `STOP_GO` | **XP Reward:** `+110 XP`
- **SOP Mandate:** SOP XXXX_PRO_001 Clause 4.2.1 & Question Bank Q6
- **Visual Canvas:** `gatehouse_cabin_desk` 

#### 1. Scenario & Visual Context
> "DECISION GATE: The physical invoice quantity differs from the digital ASN in SAP:"

#### 2. Exact Test Steps
1. Review the operational dilemma displayed on the screen.
2. **Correct Action (PASS):** Click the big **🛑 STOP (Halt)** button.
   - *Expected Result:* Button confirms the decision, +110 XP awarded, AURA praises adherence to safety/SOP compliance.
3. **Negative Test (FAIL):** Click the opposite **🟢 GO (Authorize)** button.
   - *Expected Result:* Heart deducted, warning feedback explains the severe risk of bypassing SOP.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.2.1 mandates that digital ASN numbers and line items must match the physical invoice 100%. If an ASN is incorrect, gate entry cannot proceed. The Gate Incharge has a 1-hour resolution window to obtain a revised ASN from the supplier.

---

### Slice 9: Maximum Warehouse Capacity Full Protocol (`c1_s1_sc09_max_stock_full`)
- **Module:** 1 (Gate & Dock Operations) | **Step in Stage:** Scene 9 of 9
- **Interaction Type:** `MCQ` | **XP Reward:** `+115 XP`
- **SOP Mandate:** SOP XXXX_PRO_001 Clause 4.2.1 & Question Bank Q7
- **Visual Canvas:** `truck_arrival_gate` 

#### 1. Scenario & Visual Context
> "The maximum stock capacity for this material is full in the warehouse. What must the DEO do?"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"Keep truck in waiting bay until assembly consumes stock and frees pallet positions, then process gate entry"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+115 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"Instruct driver to dump all pallets directly on the dock walking floor to clear the truck quickly"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.2.1 dictates: If warehouse capacity is full, the truck remains safely staged in the waiting parking area. Once internal assembly consumption frees designated pallet positions, the DEO executes the gate entry and allocates an unloading dock.

---


## Module 2: Stage 2: Receiving & IQC Clearance <a id="module-2-c1-s2-iqc-clearance"></a>
**Stage ID:** `c1_s2_iqc_clearance` | **SOP Document:** `SOP for IQC Issuance for AURIC (Doc No: 02_C1_S2)` | **Category:** Category 1: Inbound Logistics & Put-Away Workflows
**Total Slices:** 9 Scenes

### Slice 10: Pallet Offload & GRN Sticker Audit (`c1_s2_sc01_grn_sticker`)
- **Module:** 2 (Stage 2: Receiving & IQC Clearance) | **Step in Stage:** Scene 1 of 9
- **Interaction Type:** `MCQ` | **XP Reward:** `+100 XP`
- **SOP Mandate:** SOP for IQC Issuance for AURIC Clause 4.1 & Clause 5.1
- **Visual Canvas:** `grn_sticker_staging` 

#### 1. Scenario & Visual Context
> "Forklifts have offloaded the pallet into Inbound Staging. You inspect the freshly pasted GRN sticker and spot a large '?' printed on it. What does this symbol mean?"

#### 2. Exact Test Steps
1. Observe the question card displaying **3 options**.
2. **Correct Action (PASS):** Tap/Click **"Non-DOL material: Mandatory 10% sampling and testing by IQC required before put-away."**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+100 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"Damaged packaging: Transit damage detected; immediately tag for scrap."*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.1: A '?' mark on the GRN sticker indicates Non-DOL (Non-Direct-on-Line) material. It cannot be put away into high-rise racks until IQC takes a 10% sample and seals it with 'QC Pass'. Premature put-away leaves warehouse tasks open in SAP EWM.

---

### Slice 11: 10% Lot Statistical Sampling Rule (`c1_s2_sc02_sampling_calc`)
- **Module:** 2 (Stage 2: Receiving & IQC Clearance) | **Step in Stage:** Scene 2 of 9
- **Interaction Type:** `COUNT_STEPPER` | **XP Reward:** `+100 XP`
- **SOP Mandate:** SOP for IQC Issuance for AURIC Clause 4.2 & Question Bank Q12
- **Visual Canvas:** `iqc_sampling_transfer` | **Video Source:** `/Assets/8%20Sequential%20Scenes/3%20Unloading%20%26%2010%25%20IQC%20Inspection%20Split/scene_03_iqc_inspection_split.mp4`

#### 1. Scenario & Visual Context
> "A Non-DOL lot of 10 FLCs has arrived. Under the SOP 10% statistical sampling rule, how many FLC crates must go to IQC?"

#### 2. Exact Test Steps
1. Review the batch size and statistical rule.
2. Formula / Rule: *Calculate based on SOP batch rule (Target: 1)*
3. **Correct Action (PASS):** Use the `+` / `-` stepper buttons to set the count to exactly **1**.
4. Click **Confirm Sample Quantity**.
   - *Expected Result:* Number locks in green, +100 XP awarded.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.2: Inward Non-DOL lots undergo 10% volume statistical sampling. For an inward lot of 10 FLCs, exactly 1 FLC is transferred to IQC staging, while the remaining 9 FLCs wait in unloading staging under quarantine cones until clearance.

---

### Slice 12: Staging Visual Quarantine Demarcation (`c1_s2_sc03_iqc_cones`)
- **Module:** 2 (Stage 2: Receiving & IQC Clearance) | **Step in Stage:** Scene 3 of 9
- **Interaction Type:** `MCQ` | **XP Reward:** `+100 XP`
- **SOP Mandate:** SOP for IQC Issuance for AURIC Clause 4.3 & Flowchart
- **Visual Canvas:** `iqc_cones_staging` 

#### 1. Scenario & Visual Context
> "The 9 remaining FLC crates are waiting in staging during the 2-hour IQC testing window. What mandatory visual containment must be placed around them?"

#### 2. Exact Test Steps
1. Observe the question card displaying **3 options**.
2. **Correct Action (PASS):** Tap/Click **"Yellow 'UNDER IQC' Quarantine Cones: Positioned at pallet corners to signal testing in progress."**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+100 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"Red 'NG REJECTED' Defect Tags: Prematurely label all 9 crates as failed quality scrap."*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.3 & Process Flow: Inward stock pending inspection must be physically demarcated with yellow 'UNDER IQC' cones in the staging area. This visual containment prevents premature put-away and ensures warehouse operators do not feed unapproved parts to the production line.

---

### Slice 13: IQC Sample Handover SLA & Countdown (`c1_s2_sc04_handover_sla`)
- **Module:** 2 (Stage 2: Receiving & IQC Clearance) | **Step in Stage:** Scene 4 of 9
- **Interaction Type:** `MCQ` | **XP Reward:** `+100 XP`
- **SOP Mandate:** SOP for IQC Issuance for AURIC Clause 4.1 & Failure Mode 2
- **Visual Canvas:** `iqc_handover_sla_clock` 

#### 1. Scenario & Visual Context
> "Following GRN label application, what is the strict SLA cutoff time for inbound manpower to hand over Non-DOL samples to the IQC testing room?"

#### 2. Exact Test Steps
1. Observe the question card displaying **3 options**.
2. **Correct Action (PASS):** Tap/Click **"Within 30 minutes after GRN pasting (Mandatory Handover SLA)"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+100 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"Within 2 hours after GRN pasting (Confusion with IQC inspection window)"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.1 & Failure Mode 2: Inbound manpower must hand over Non-DOL samples to IQC within exactly 30 minutes after GRN label pasting. Delaying this handover keeps the Warehouse Order open in SAP EWM, blocking subsequent orders and creating catastrophic stock-outs at the vehicle assembly line.

---

### Slice 14: The 3-Way IQC Outcome & Disposition Protocol (`c1_s2_sc05_iqc_outcomes`)
- **Module:** 2 (Stage 2: Receiving & IQC Clearance) | **Step in Stage:** Scene 5 of 9
- **Interaction Type:** `DRAG_DROP` | **XP Reward:** `+120 XP`
- **SOP Mandate:** SOP for IQC Issuance for AURIC Clause 4.5 & Question Bank Q15
- **Visual Canvas:** `iqc_disposition_workbench` 

#### 1. Scenario & Visual Context
> "Match the Incoming Quality Control (IQC) outcome to the mandatory physical warehouse action:"

#### 2. Exact Test Steps
1. Observe the **4 draggable cards** and **3 destination drop zones**.
2. **Correct Action (PASS):** Drag and match each item to its assigned destination:
   - Drag **"Seal 'QC Pass' on GRN sticker and release for Put-Away"** → Drop into **"QC PASS (Accepted)"**
   - Drag **"Place yellow 'IQC Hold' cone & freeze lot in staging"** → Drop into **"IQC HOLD (Pending)"**
   - Drag **"Attach red 'NG Tag' & log Jira Bug Ticket (Part #, Lot ID)"** → Drop into **"NG REJECTED (Defect)"**
   - Drag **"Move entire lot volume to NG Area (SC01 BL) via NG manpower"** → Drop into **"NG REJECTED (Defect)"**
3. Click **Confirm / Submit Sorting**.
   - *Expected Result:* All items lock into zones with green checkmarks, +120 XP awarded.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.5: Quality disposition requires absolute physical and digital integrity. 'Pass' unlocks the SAP EWM put-away order via the physical QC Pass seal. 'Hold' visually protects the buffer from accidental handling using yellow cones. 'NG' requires a red physical tag, a Jira defect ticket with part number and lot ID, and full transfer of the entire lot volume to quarantine location SC01 BL by designated NG manpower.

---

### Slice 15: IQC Definition & Quality Verification Mandate (`c1_s2_sc06_iqc_definition`)
- **Module:** 2 (Stage 2: Receiving & IQC Clearance) | **Step in Stage:** Scene 6 of 9
- **Interaction Type:** `MCQ` | **XP Reward:** `+100 XP`
- **SOP Mandate:** SOP for IQC Issuance for AURIC Clause 4.1 & Question Bank Q11
- **Visual Canvas:** `iqc_sample_inspection` 

#### 1. Scenario & Visual Context
> "What does IQC stand for, and what is its primary purpose at Ather AURIC?"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"Incoming Quality Control; verifies incoming supplier materials meet engineering specs before stock release"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+100 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"Internal Quantity Count; manually counts packing screws in bins"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.1 establishes Incoming Quality Control (IQC) as the primary quality barrier protecting vehicle assembly from defective supplier parts.

---

### Slice 16: Factory Ramp-Up 100% IQC Inspection Rule (`c1_s2_sc07_six_month_rampup`)
- **Module:** 2 (Stage 2: Receiving & IQC Clearance) | **Step in Stage:** Scene 7 of 9
- **Interaction Type:** `MCQ` | **XP Reward:** `+110 XP`
- **SOP Mandate:** SOP for IQC Issuance for AURIC Clause 4.2 & Question Bank Q14
- **Visual Canvas:** `iqc_sample_inspection` 

#### 1. Scenario & Visual Context
> "In a new factory, during the first 6 months, which inward parts must go to IQC?"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"100% of all inward parts are treated as Non-DOL and must undergo IQC sample inspection"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+110 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"Only high-voltage battery packs while other parts skip inspection"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.2 dictates: In a new factory, for the first 6 months, all inward parts are treated as Non-DOL to build supplier process capability and prevent line stoppages during initial product launch.

---

### Slice 17: End-to-End Receiving & IQC Lifecycle Sequence (`c1_s2_sc08_receiving_sequence`)
- **Module:** 2 (Stage 2: Receiving & IQC Clearance) | **Step in Stage:** Scene 8 of 9
- **Interaction Type:** `SEQUENCE` | **XP Reward:** `+125 XP`
- **SOP Mandate:** SOP for IQC Issuance for AURIC Clauses 4.1 to 4.5 & Question Bank Q17
- **Visual Canvas:** `iqc_staging_cones` 

#### 1. Scenario & Visual Context
> "Put the Non-DOL Receiving and IQC steps in correct chronological order:"

#### 2. Exact Test Steps
1. Review the unarranged operational steps.
2. **Correct Action (PASS):** Arrange the steps in the exact chronological SOP order:
   - Step 1: **Unload pallet from truck at Dock 04 and paste physical GRN barcode label**
   - Step 2: **Segregate 10% sample crate and place yellow 'Under IQC' visual cones on remaining staged lot**
   - Step 3: **Hand over sample crate to IQC test lab within 30-minute SLA and sign the physical logbook**
   - Step 4: **IQC completes inspection within 2 hours and issues final Pass (Green Seal), Hold, or NG tag**
3. Tap **Verify Sequence**.
   - *Expected Result:* Sequence validated with numerical badges, +125 XP awarded.

#### 3. SOP Grounding & Learning Point
> SOP Clauses 4.1 to 4.5 establish the standard operational lifecycle: Unload & GRN label $\to$ 10% Sampling & Cones $\to$ 30-minute Handover $\to$ 2-hour IQC testing and Pass/Hold/NG sealing.

---

### Slice 18: IQC Handover SLA Overrun & Deadlock Prevention (`c1_s2_sc09_sla_overrun_risk`)
- **Module:** 2 (Stage 2: Receiving & IQC Clearance) | **Step in Stage:** Scene 9 of 9
- **Interaction Type:** `MCQ` | **XP Reward:** `+115 XP`
- **SOP Mandate:** SOP for IQC Issuance for AURIC Failure Mode 5.1 & Question Bank Q18
- **Visual Canvas:** `iqc_handover_sla` 

#### 1. Scenario & Visual Context
> "Non-DOL samples are not issued to IQC within the 30-minute SLA. What is the operational risk?"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"The open WH order stays locked in SAP, blocking subsequent warehouse put-away tasks and starving the assembly line"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+115 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"The physical parts magically dissolve after 30 minutes"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP Failure Mode 5.1 establishes: If Non-DOL samples are not issued within 30 minutes, the open WH order blocks subsequent put-away queues, creating dock congestion and triggering vehicle line-starvation alerts.

---


## Module 3: Stage 3: Vehicle & Battery Parts Put-Away <a id="module-3-c1-s3-putaway-parts"></a>
**Stage ID:** `c1_s3_putaway_parts` | **SOP Document:** `Plant Operations Putaway for Vehicle and Battery Parts (Doc No: 03_C1_S3)` | **Category:** Category 1: Inbound Logistics & Put-Away Workflows
**Total Slices:** 6 Scenes

### Slice 19: Warehouse Task Initiation via HU Barcode Scan (`c1_s3_sc01_hu_scan`)
- **Module:** 3 (Stage 3: Vehicle & Battery Parts Put-Away) | **Step in Stage:** Scene 1 of 6
- **Interaction Type:** `MCQ` | **XP Reward:** `+100 XP`
- **SOP Mandate:** SOP for Plant Operations Putaway for Vehicle and Battery Parts Clause 4.1
- **Visual Canvas:** `hu_scan_initiation` 

#### 1. Scenario & Visual Context
> "In GRN staging, what must the MHE operator scan first with the rugged handheld terminal to generate the Put-Away Warehouse Task?"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"Pallet-level Handling Unit (HU) barcode on the GRN sticker (Generates SAP WH Task)"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+100 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"Destination High-Rise Rack bin QR code (Premature: scanned only at drop-off)"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.1: The putaway cycle strictly begins by scanning the pallet-level Handling Unit (HU) label located on the GRN sticker. Scanning the HU barcode creates the active Warehouse (WH) Task in SAP EWM, automatically calculating the designated storage bin and putaway type. Moving pallets without an active WH task causes critical inventory discrepancies and untracked warehouse labor.

---

### Slice 20: Route Segregation: HRR vs Trolley Staging (`c1_s3_sc02_route_segregation`)
- **Module:** 3 (Stage 3: Vehicle & Battery Parts Put-Away) | **Step in Stage:** Scene 2 of 6
- **Interaction Type:** `DRAG_DROP` | **XP Reward:** `+110 XP`
- **SOP Mandate:** SOP for Plant Operations Putaway for Vehicle and Battery Parts Clause 4.2 & Question Bank Q24
- **Visual Canvas:** `route_segregation_junction` 

#### 1. Scenario & Visual Context
> "Where must each incoming container type be routed at the warehouse junction?"

#### 2. Exact Test Steps
1. Observe the **4 draggable cards** and **2 destination drop zones**.
2. **Correct Action (PASS):** Drag and match each item to its assigned destination:
   - Drag **"Blue FLC Pallet (Brake Calipers & Motor Mounts)"** → Drop into **"High Rise Racks (HRR)"**
   - Drag **"Plastic Storage Bins (Hardware & Brackets)"** → Drop into **"High Rise Racks (HRR)"**
   - Drag **"Wheeled Chassis Frame Trolley (Ather 450X)"** → Drop into **"Trolley Staging Area"**
   - Drag **"Wheeled Battery Module Sub-Assembly Trolley"** → Drop into **"Trolley Staging Area"**
3. Click **Confirm / Submit Sorting**.
   - *Expected Result:* All items lock into zones with green checkmarks, +110 XP awarded.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.2: Warehouse route segregation prevents traffic jams and severe structural rack damage. High-Rise Racks (HRR) are engineered strictly for palletized FLC bins stowed by certified reach-trucks. Oversized components arriving on custom wheeled trolleys (such as scooter mainframes and battery packs) are strictly routed to the designated floor Trolley Staging Area for direct tugger delivery to assembly lines.

---

### Slice 21: Destination Bin Marriage & Task Closure (`c1_s3_sc03_bin_marriage`)
- **Module:** 3 (Stage 3: Vehicle & Battery Parts Put-Away) | **Step in Stage:** Scene 3 of 6
- **Interaction Type:** `MCQ` | **XP Reward:** `+110 XP`
- **SOP Mandate:** SOP for Plant Operations Putaway for Vehicle and Battery Parts Clause 4.3 & Failure Mode 2
- **Visual Canvas:** `bin_marriage_lift` | **Video Source:** `/Assets/8%20Sequential%20Scenes/4%20Forklift%20High-Rise%20Rack%20Placement%20%26%20Scan/scene_04_high_rise_pallet_putaway.mp4`

#### 1. Scenario & Visual Context
> "The FLC pallet is resting on shelf beam HRR-B-04-12. What mandatory action must the operator execute to formally conclude the put-away?"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"Scan the destination rack QR code 'HRR-B-04-12' (Marries HU to bin and closes SAP WH Task)"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+110 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"Drive away immediately — SAP detects pallet placement automatically via weight sensors"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.3 & Failure Mode 2: Physical placement without a destination location scan creates ghost inventory. Scanning the rack QR code performs the 'bin marriage' in SAP EWM, officially transitioning the material into available G-stock. Skipping this scan leaves the Warehouse Task open against the operator ID and blocks downstream picking orders.

---

### Slice 22: Failure Mode: Omitted Scan & KPI Impact (`c1_s3_sc04_omitted_scan_risk`)
- **Module:** 3 (Stage 3: Vehicle & Battery Parts Put-Away) | **Step in Stage:** Scene 4 of 6
- **Interaction Type:** `MCQ` | **XP Reward:** `+120 XP`
- **SOP Mandate:** SOP for Plant Operations Putaway for Vehicle and Battery Parts Clause 5.1 & Failure Mode 2 & Question Bank Q22
- **Visual Canvas:** `omitted_scan_hazard` 

#### 1. Scenario & Visual Context
> "An MHE operator placed an FLC pallet into the rack but forgot to scan the destination location QR code before driving away. What happens?"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"The WH task stays open in SAP EWM, stock is not updated, and an overdue task penalizes operator KPI (Zone Leader must trace & fix)"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+120 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"SAP EWM automatically closes the task after 5 minutes using overhead smart cameras"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP Clause 5.1 & Failure Mode 2: MHE operators must never rely on memory or skip the destination location scan. Without the bin scan, the Warehouse Task remains open in SAP EWM, inventory is not available in G-stock, downstream picking tasks fail due to perceived zero-stock, and the overdue task flags on the operator's daily KPI scoreboard. The Putaway Zone Leader must expend labor to audit open tasks, backtrack physical racks, and manually close the task.

---

### Slice 23: Bin Slotting Violation: Bin A vs Bin B (`c1_s3_sc05_bin_slotting_violation`)
- **Module:** 3 (Stage 3: Vehicle & Battery Parts Put-Away) | **Step in Stage:** Scene 5 of 6
- **Interaction Type:** `STOP_GO` | **XP Reward:** `+120 XP`
- **SOP Mandate:** SOP for Plant Operations Putaway for Vehicle and Battery Parts Clause 4.4 & Question Bank Q23
- **Visual Canvas:** `bin_slotting_violation` 

#### 1. Scenario & Visual Context
> "The SAP handheld displays assigned Bin A, but the operator places the pallet into Bin B to save time. What must be done?"

#### 2. Exact Test Steps
1. Review the operational dilemma displayed on the screen.
2. **Correct Action (PASS):** Click the big **🛑 STOP (Halt)** button.
   - *Expected Result:* Button confirms the decision, +120 XP awarded, AURA praises adherence to safety/SOP compliance.
3. **Negative Test (FAIL):** Click the opposite **🟢 GO (Authorize)** button.
   - *Expected Result:* Heart deducted, warning feedback explains the severe risk of bypassing SOP.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.4 & Question Bank Q23: SAP EWM automatically allocates storage bins based on weight capacity, fire safety classification, and picking frequency. Putting material in an arbitrary Bin B leaves the active Warehouse Task unfulfilled because the barcode does not match the system target. The operator must either physically move the pallet to assigned Bin A, or officially request the Putaway Zone Leader to execute an EWM bin re-allocation.

---

### Slice 24: Put-Away Lifecycle Master Sequence (`c1_s3_sc06_putaway_sequence`)
- **Module:** 3 (Stage 3: Vehicle & Battery Parts Put-Away) | **Step in Stage:** Scene 6 of 6
- **Interaction Type:** `SEQUENCE` | **XP Reward:** `+130 XP`
- **SOP Mandate:** SOP for Plant Operations Putaway Clause 4.1 & Question Bank Q21
- **Visual Canvas:** `putaway_sequence_lifecycle` 

#### 1. Scenario & Visual Context
> "Arrange the 5 mandatory put-away steps in the exact operational sequence mandated by SOP Clause 4.1 & Question Bank Q21:"

#### 2. Exact Test Steps
1. Review the unarranged operational steps.
2. **Correct Action (PASS):** Arrange the steps in the exact chronological SOP order:
   - Step 1: **Paste GRN label on incoming pallet (b)**
   - Step 2: **Scan HU barcode to create SAP EWM task (c)**
   - Step 3: **Carry pallet to designated rack location via MHE (d)**
   - Step 4: **Scan destination rack location QR code (a)**
   - Step 5: **Task closes in SAP and inventory posts to active G-stock (e)**
3. Tap **Verify Sequence**.
   - *Expected Result:* Sequence validated with numerical badges, +130 XP awarded.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.1 & Question Bank Q21: The correct workflow is strictly: Paste GRN label -> Scan HU label -> Carry pallet to location -> Scan destination QR -> Task closes and stock updates (b -> c -> d -> a -> e). Scanning the HU generates the task; scanning the rack QR completes the marriage and transitions the parts to ready-for-assembly G-stock.

---


## Module 4: Stage 4: Specialized Battery Cell Put-Away <a id="module-4-c1-s4-battery-cell"></a>
**Stage ID:** `c1_s4_battery_cell` | **SOP Document:** `Plant Operations Putaway for Battery Cell (Doc No: 04_C1_S3)` | **Category:** Category 1: Inbound Logistics & Put-Away Workflows
**Total Slices:** 5 Scenes

### Slice 25: Certified MHE Operator Authorization (`c1_s4_sc01_mhe_auth`)
- **Module:** 4 (Stage 4: Specialized Battery Cell Put-Away) | **Step in Stage:** Scene 1 of 5
- **Interaction Type:** `STOP_GO` | **XP Reward:** `+110 XP`
- **SOP Mandate:** SOP for Plant Operations Putaway for Battery Cell Clause 4.1 & Question Bank Q19
- **Visual Canvas:** `battery_dock_auth` | **Video Source:** `/Assets/8%20Sequential%20Scenes/5%20Battery%20Cell%20Vault%20%26%20Climate%20Inspection/scene_05_battery_vault_climate.mp4`

#### 1. Scenario & Visual Context
> "A general warehouse helper attempts to move an unloaded lithium-ion battery cell pallet using a manual hand pallet truck (HPT) to clear the dock floor. Allow or halt this transfer?"

#### 2. Exact Test Steps
1. Review the operational dilemma displayed on the screen.
2. **Correct Action (PASS):** Click the big **🛑 STOP (Halt)** button.
   - *Expected Result:* Button confirms the decision, +110 XP awarded, AURA praises adherence to safety/SOP compliance.
3. **Negative Test (FAIL):** Click the opposite **🟢 GO (Authorize)** button.
   - *Expected Result:* Heart deducted, warning feedback explains the severe risk of bypassing SOP.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.1: Lithium-ion battery cells are hazardous (UN 3480, Class 9) and highly sensitive to mechanical shocks, vibrations, and drops. The SOP explicitly mandates that cell put-away must be performed EXCLUSIVELY by certified MHE operators with specialized battery safety training. Manual hand pallet trucks lack dampening and tilt stability, presenting severe thermal and fire risks if dropped.

---

### Slice 26: Cleanroom Environmental Thresholds (`c1_s4_sc02_cleanroom_params`)
- **Module:** 4 (Stage 4: Specialized Battery Cell Put-Away) | **Step in Stage:** Scene 2 of 5
- **Interaction Type:** `MCQ` | **XP Reward:** `+110 XP`
- **SOP Mandate:** SOP for Plant Operations Putaway for Battery Cell Clause 4.2 & Question Bank Q20
- **Visual Canvas:** `cleanroom_vault_env` 

#### 1. Scenario & Visual Context
> "Under Ather AURIC SOP Clause 4.2, what are the mandatory environmental thresholds for the Battery Cell Standard Room?"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"Temperature: 20°C – 25°C and Relative Humidity: 60% – 65% RH (Mandatory SOP Standard)"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+110 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"Temperature: 30°C – 35°C and Relative Humidity: 40% – 50% RH (Severe thermal degradation)"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.2: Lithium-ion pouch and cylindrical cells are electrochemically vulnerable to ambient thermal stress and moisture ingress. Temperature must be strictly maintained between 20°C and 25°C, while Relative Humidity must stay locked between 60% and 65%. High humidity causes terminal corrosion and micro-shorts, whereas low humidity increases electrostatic discharge (ESD) risk.

---

### Slice 27: 2-Hour Strict Put-Away Countdown SLA (`c1_s4_sc03_sla_countdown`)
- **Module:** 4 (Stage 4: Specialized Battery Cell Put-Away) | **Step in Stage:** Scene 3 of 5
- **Interaction Type:** `MCQ` | **XP Reward:** `+115 XP`
- **SOP Mandate:** SOP for Plant Operations Putaway for Battery Cell Clause 4.3 & SLA Standard
- **Visual Canvas:** `battery_sla_countdown` 

#### 1. Scenario & Visual Context
> "Under Ather AURIC SOP Clause 4.3, what is the mandatory maximum SLA window for completing battery cell put-away from GRN staging into the standard room?"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"Within 2 Hours (Mandatory SOP SLA to prevent thermal aging & dock bottlenecks)"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+115 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"Within 8 Hours (Anytime before shift conclusion)"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.3 specifies an uncompromising 2-Hour SLA for the entire battery cell put-away process (GRN staging -> MHE transport -> Standard room storage -> Location QR scan & SAP confirmation). Lithium-ion cells are sensitive to ambient warehouse heat and humidity swings. Leaving them on an uncontrolled dock floor impairs long-term cell capacity, causes dock bottlenecks, and breaches plant safety standards.

---

### Slice 28: Environmental Breach Alarm & Containment (`c1_s4_sc04_environmental_breach`)
- **Module:** 4 (Stage 4: Specialized Battery Cell Put-Away) | **Step in Stage:** Scene 4 of 5
- **Interaction Type:** `MCQ` | **XP Reward:** `+120 XP`
- **SOP Mandate:** SOP for Plant Operations Putaway for Battery Cell Clause 5.2 & Failure Mode Control
- **Visual Canvas:** `environmental_breach_alarm` 

#### 1. Scenario & Visual Context
> "While transporting lithium-ion cells into the Standard Room, the wall telemetry flashes an amber alert: Relative Humidity has spiked to 75% (Limit: 60%–65%). What is your mandatory SOP action?"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"Halt pallet entry immediately, keep airlock doors sealed, and report to the Putaway Zone Leader (ZL) and HVAC maintenance team"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+120 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"Ignore the telemetry sensor and rush the cells into the racks before anyone notices"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP Clause 5.2 mandates strict containment in the event of cleanroom climate failure. Battery cells are hyper-hygroscopic at the component level. If humidity surpasses 65% RH, moisture adheres to terminal surfaces, causing accelerated oxidation, short circuits, and thermal runaway. The operator must cease all transfers, isolate the chamber, and allow facilities engineering to restore the HVAC dehumidification system before any further cell placement.

---

### Slice 29: Cell Crate Stacking Limits & Physical Seal Integrity (`c1_s4_sc05_pallet_stacking_integrity`)
- **Module:** 4 (Stage 4: Specialized Battery Cell Put-Away) | **Step in Stage:** Scene 5 of 5
- **Interaction Type:** `STOP_GO` | **XP Reward:** `+120 XP`
- **SOP Mandate:** SOP for Plant Operations Putaway for Battery Cell Clause 4.4 & Quality Handling Standard
- **Visual Canvas:** `battery_stacking_seal` 

#### 1. Scenario & Visual Context
> "An operator attempts to stack battery cell crates 3-high on a storage pallet despite a triggered red ShockWatch impact indicator on the carton. Allow or halt?"

#### 2. Exact Test Steps
1. Review the operational dilemma displayed on the screen.
2. **Correct Action (PASS):** Click the big **🛑 STOP (Halt)** button.
   - *Expected Result:* Button confirms the decision, +120 XP awarded, AURA praises adherence to safety/SOP compliance.
3. **Negative Test (FAIL):** Click the opposite **🟢 GO (Authorize)** button.
   - *Expected Result:* Heart deducted, warning feedback explains the severe risk of bypassing SOP.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.4 dictates strict mechanical integrity safeguards for Class 9 lithium-ion cells. Pallet stacking is limited to a maximum of 2 tiers to avoid compressive deformation of cell anode/cathode layers. Any triggered impact sensor (ShockWatch/TiltWatch) indicates excessive transit g-force, requiring immediate segregation into IQC Quarantine for spectroscopic and impedance analysis.

---


## Module 5: Stage 5: Hazardous Chemicals & Thinners Put-Away <a id="module-5-c1-s5-chemicals-thinners"></a>
**Stage ID:** `c1_s5_chemicals_thinners` | **SOP Document:** `Plant Operations Putaway for Chemicals and Thinners (Doc No: 05_C1_S3)` | **Category:** Category 1: Inbound Logistics & Put-Away Workflows
**Total Slices:** 5 Scenes

### Slice 30: Hazardous Chemical Facility Bypass Routing (`c1_s5_sc01_facility_bypass`)
- **Module:** 5 (Stage 5: Hazardous Chemicals & Thinners Put-Away) | **Step in Stage:** Scene 1 of 5
- **Interaction Type:** `MCQ` | **XP Reward:** `+110 XP`
- **SOP Mandate:** SOP for Plant Operations Putaway for Chemicals and Thinners Clause 4.1 & Question Bank
- **Visual Canvas:** `chemical_bypass_routing` 

#### 1. Scenario & Visual Context
> "A delivery truck arrives with drums of combustible thinners and industrial paints. The driver asks to unload at Dock 01 next to vehicle body panels. Where does Ather SOP Clause 4.1 mandate this vehicle proceed?"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"Bypass the main assembly plant entirely and proceed directly to the detached Chemical Storage Building specified on the Gate Pass"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+110 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"Dock at general Dock 01 so regular warehouse associates can inspect the drums alongside vehicle parts"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.1 specifies: Chemicals, thinners, and paints are hazardous Class 3 flammable liquids stored exclusively in separate designated buildings. The Gate-Entry Pass specifies the exact detached building aligned with the PO and ASN. Delivery trucks proceed directly to the designated chemical building immediately after security gate entry, bypassing main plant facilities entirely to mitigate factory fire and vapor contamination risks.

---

### Slice 31: Chemical PPE & Spill-Containment Inspection (`c1_s5_sc02_ppe_spill_berm`)
- **Module:** 5 (Stage 5: Hazardous Chemicals & Thinners Put-Away) | **Step in Stage:** Scene 2 of 5
- **Interaction Type:** `SPOT_ERROR` | **XP Reward:** `+115 XP`
- **SOP Mandate:** SOP for Plant Operations Putaway for Chemicals and Thinners Clause 4.2 & Safety Guidelines
- **Visual Canvas:** `chemical_unloading_spill` 

#### 1. Scenario & Visual Context
> "Spot the Safety Violation: An operator is unloading 200L flammable thinner drums at Chemical Annex C-04. Which condition violates Ather safety protocols?"

#### 2. Exact Test Steps
1. Inspect the visual staging canvas for non-compliances.
2. **Correct Action (PASS):** Tap/Click on the hazard area: **"Drums unloaded directly onto bare concrete with no secondary spill pallet and no static earthing clamp attached"**.
3. Tap **Confirm Defect / Hazard**.
   - *Expected Result:* Defect flagged with red quarantine border, AURA explains resolution, +115 XP awarded.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.2 strictly mandates that all Class 3 flammable solvent drums must be placed onto secondary spill-containment bund pallets capable of holding at least 110% of drum volume. Furthermore, spark-proof earthing grounding clamps must be affixed to dissipate electrostatic charge generated during fluid movement, preventing static arc ignition in solvent vapor zones.

---

### Slice 32: Flammability Segregation & 2-Hour Put-Away SLA (`c1_s5_sc03_segregation_sla`)
- **Module:** 5 (Stage 5: Hazardous Chemicals & Thinners Put-Away) | **Step in Stage:** Scene 3 of 5
- **Interaction Type:** `DRAG_DROP` | **XP Reward:** `+120 XP`
- **SOP Mandate:** SOP for Plant Operations Putaway for Chemicals and Thinners Clause 4.3 & 2-Hour SLA Standard
- **Visual Canvas:** `chemical_segregation_matrix` 

#### 1. Scenario & Visual Context
> "Segregate incoming chemicals into their designated storage bays according to Ather SOP Clause 4.3 and the 2-Hour SLA limit:"

#### 2. Exact Test Steps
1. Observe the **4 draggable cards** and **3 destination drop zones**.
2. **Correct Action (PASS):** Drag and match each item to its assigned destination:
   - Drag **"Thinner & Ketone Solvents (Class 3)"** → Drop into **"Bay 1: Flammables (Class 3)"**
   - Drag **"Chassis Topcoat Paints & Resins (Class 3)"** → Drop into **"Bay 1: Flammables (Class 3)"**
   - Drag **"Peroxide Hardener & Catalyst (Class 5.1)"** → Drop into **"Bay 2: Oxidizers (Class 5.1)"**
   - Drag **"Phosphoric Pre-Treatment Acid (Class 8)"** → Drop into **"Bay 3: Corrosives (Class 8)"**
3. Click **Confirm / Submit Sorting**.
   - *Expected Result:* All items lock into zones with green checkmarks, +120 XP awarded.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.3 mandates strict chemical segregation according to global dangerous goods matrices and factory insurance compliance. Flammable liquids (Class 3) must never be staged in the same containment sump as oxidizing reagents (Class 5.1), because oxidizers release nascent oxygen that will trigger spontaneous ignition of volatile organic vapors. Furthermore, the entire putaway cycle must finish within the 2-Hour SLA to avoid loading dock congestion and minimize ambient vapor exposure.

---

### Slice 33: DEO Manual GRN Generation & ERP Stock Posting (`c1_s5_sc04_deo_grn_posting`)
- **Module:** 5 (Stage 5: Hazardous Chemicals & Thinners Put-Away) | **Step in Stage:** Scene 4 of 5
- **Interaction Type:** `MCQ` | **XP Reward:** `+110 XP`
- **SOP Mandate:** SOP for Plant Operations Putaway for Chemicals and Thinners Clause 4.4 & Question Bank Q25
- **Visual Canvas:** `chemical_deo_posting` 

#### 1. Scenario & Visual Context
> "After a chemical delivery truck is unloaded and physically verified at Annex C-04, who is responsible for creating the Goods Receipt Note (GRN) in SAP?"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"Data Entry Operator (DEO) for Chemicals and Thinners (Generates GRN & updates SAP stock)"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+110 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"The put-away forklift operator (Performs physical handling and stowage only)"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.4 establishes strict separation of physical and digital custody: Putaway personnel handle unloading, secondary spill bund staging, and static earthing verification. Following successful physical verification, the Data Entry Operator (DEO) generates the Goods Receipt Note (GRN) for the inward lot and updates system inventory stock in SAP EWM upon putaway conclusion.

---

### Slice 34: Static Bonding Clamp & Flammable Vapor Flash Fire Prevention (`c1_s5_sc05_static_bonding_clamp`)
- **Module:** 5 (Stage 5: Hazardous Chemicals & Thinners Put-Away) | **Step in Stage:** Scene 5 of 5
- **Interaction Type:** `STOP_GO` | **XP Reward:** `+125 XP`
- **SOP Mandate:** SOP for Plant Operations Putaway for Chemicals and Thinners Clause 4.5 & Static Electricity Protocol
- **Visual Canvas:** `static_bonding_clamp` 

#### 1. Scenario & Visual Context
> "An associate prepares to loosen a 200L solvent drum bung for QC sampling without attaching the static bonding grounding clamp. Allow or halt?"

#### 2. Exact Test Steps
1. Review the operational dilemma displayed on the screen.
2. **Correct Action (PASS):** Click the big **🛑 STOP (Halt)** button.
   - *Expected Result:* Button confirms the decision, +125 XP awarded, AURA praises adherence to safety/SOP compliance.
3. **Negative Test (FAIL):** Click the opposite **🟢 GO (Authorize)** button.
   - *Expected Result:* Heart deducted, warning feedback explains the severe risk of bypassing SOP.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.5 & Safety Directive: Volatile thinner vapors ignite at extremely low minimum ignition energy (<0.2 mJ). Friction from wrench threads against drum steel or personnel triboelectric charge can create sparks exceeding 10 mJ. Earthing clamps bond the drum to the copper plant ground grid, neutralizing static potential before any seal is cracked. Skipping this step constitutes an immediate Tier-1 fire safety violation.

---


## Module 6: Stage 6: Supermarket C-Class Parts Put-Away (MH1) <a id="module-6-c1-s6-supermarket-sm"></a>
**Stage ID:** `c1_s6_supermarket_sm` | **SOP Document:** `SOP for Supermarket Put-Away SM (Doc No: 06_C1_S3)` | **Category:** Category 1: Inbound Logistics & Put-Away Workflows
**Total Slices:** 6 Scenes

### Slice 35: QC Pass Green Seal Verification at MH1 Desk (`c1_s6_sc01_qc_pass_seal`)
- **Module:** 6 (Stage 6: Supermarket C-Class Parts Put-Away (MH1)) | **Step in Stage:** Scene 1 of 6
- **Interaction Type:** `STOP_GO` | **XP Reward:** `+110 XP`
- **SOP Mandate:** SOP for Supermarket Put-Away (SM) Clause 4.1 & Question Bank Q26
- **Visual Canvas:** `supermarket_mh1_seal` 

#### 1. Scenario & Visual Context
> "A Non-DOL lot of small fasteners arrives at the MH1 Supermarket desk. The GRN sticker has no green 'QC Pass' seal attached. Allow or halt put-away into supermarket racks?"

#### 2. Exact Test Steps
1. Review the operational dilemma displayed on the screen.
2. **Correct Action (PASS):** Click the big **🛑 STOP (Halt)** button.
   - *Expected Result:* Button confirms the decision, +110 XP awarded, AURA praises adherence to safety/SOP compliance.
3. **Negative Test (FAIL):** Click the opposite **🟢 GO (Authorize)** button.
   - *Expected Result:* Heart deducted, warning feedback explains the severe risk of bypassing SOP.

#### 3. SOP Grounding & Learning Point
> SOP-PUTAWAY-SM Clause 4.1 explicitly mandates: 'For Non-DOL parts: verify QC Pass seal/sticker is present on GRN label; if not available, do not proceed with putaway.' For DOL parts, a DOL sticker is attached. Non-DOL lots without a QC Pass seal are still legally under quality quarantine. Moving them into active production flow risks incorporating out-of-spec or uninspected fasteners into critical scooter subsystems.

---

### Slice 36: Physical Sampling Count vs SAP LX02 Discrepancy Escalation (`c1_s6_sc02_count_discrepancy`)
- **Module:** 6 (Stage 6: Supermarket C-Class Parts Put-Away (MH1)) | **Step in Stage:** Scene 2 of 6
- **Interaction Type:** `MCQ` | **XP Reward:** `+115 XP`
- **SOP Mandate:** SOP for Supermarket Put-Away (SM) Clause 4.2 & Question Bank Q27
- **Visual Canvas:** `supermarket_count_audit` 

#### 1. Scenario & Visual Context
> "The SAP LX02 dump indicates 100 pieces for an inward C-class lot, but physical sampling at MH1 reveals only 92 pieces. What must the operator do?"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"Halt put-away immediately for that material and escalate the discrepancy to the Supermarket Zone Leader (ZL)"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+115 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"Strike through '100' on the printed SAP slip, write '92' with a pen, and stow into the rack"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP-PUTAWAY-SM Clause 4.2 states: 'Perform physical count of parts at MH1 staging area in sampling manner as per defined lot. Compare SAP Dump quantity against physical quantity. If discrepancy: immediately escalate to Zone Leader and halt process for that material.' Discrepancies point to vendor short-supply or transit theft. Stowing unverified quantities inflates ERP records with ghost inventory and causes sudden workstation stock-outs. The Zone Leader investigates and executes formal vendor debit notes before stock clearance.

---

### Slice 37: Gravity Flow FIFO Roller Rack Put-Away (`c1_s6_sc03_gravity_flow_fifo`)
- **Module:** 6 (Stage 6: Supermarket C-Class Parts Put-Away (MH1)) | **Step in Stage:** Scene 3 of 6
- **Interaction Type:** `SEQUENCE` | **XP Reward:** `+120 XP`
- **SOP Mandate:** SOP for Supermarket Put-Away (SM) Clause 4.3 & Question Bank Q28
- **Visual Canvas:** `gravity_flow_fifo` 

#### 1. Scenario & Visual Context
> "Arrange the 4 steps of Supermarket Gravity Flow Rack Put-Away in the strictly mandated SOP sequence to guarantee FIFO stock rotation:"

#### 2. Exact Test Steps
1. Review the unarranged operational steps.
2. **Correct Action (PASS):** Arrange the steps in the exact chronological SOP order:
   - Step 1: **1. Scan destination supermarket rack location QR code on the REAR loading beam**
   - Step 2: **2. Insert verified fastener boxes exclusively into the REAR entry lane of the roller track**
   - Step 3: **3. Allow 3.5° gravity roller incline to glide the new boxes forward behind existing stock**
   - Step 4: **4. Verify at front picking face that the oldest batch remains frontmost for line kitters (FIFO Guarantee)**
3. Tap **Verify Sequence**.
   - *Expected Result:* Sequence validated with numerical badges, +120 XP awarded.

#### 3. SOP Grounding & Learning Point
> SOP-PUTAWAY-SM Clause 4.3 mandates dual-access gravity flow roller racks (3.5-degree incline). New inventory is strictly loaded into the REAR access lane. Gravity automatically moves newly loaded crates forward until they rest behind existing stock. Assembly line kitters pick exclusively from the FRONT face. This physical layout mechanically enforces 100% FIFO without operator guesswork, preventing fastener surface oxidation, anti-rust oil drying, and obsolete engineering revisions reaching vehicle sub-assemblies.

---

### Slice 38: Bin Card Updating & e-Kanban Replenishment Trigger (`c1_s6_sc04_bin_replenishment`)
- **Module:** 6 (Stage 6: Supermarket C-Class Parts Put-Away (MH1)) | **Step in Stage:** Scene 4 of 6
- **Interaction Type:** `MCQ` | **XP Reward:** `+125 XP`
- **SOP Mandate:** SOP for Supermarket Put-Away (SM) Clause 4.4 & 4.5 and Shift Handover Governance
- **Visual Canvas:** `supermarket_bin_kanban` 

#### 1. Scenario & Visual Context
> "Fastener Bin SM-04-B has hit its safety MIN stock level of 2 boxes (200 pcs). What must the Supermarket operator execute immediately?"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"Update the physical Bin Card (Date, In/Out, Balance: 2) AND scan the e-Kanban barcode to auto-generate a SAP replenishment Transfer Order from High-Rise Bulk Storage (MH2)"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+125 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"Wait until the bin reaches completely 0 boxes so you don't call forklift operators unnecessarily"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP-PUTAWAY-SM Clause 4.4 & 4.5 mandates maintaining physical Bin Cards at each bin location to log every transaction (Date, In/Out Qty, Balance, Operator signature). When physical inventory touches the MIN mark (safety buffer), scanning the e-Kanban barcode instantly generates a SAP Transfer Order (LT06) pulling bulk stock from High-Rise Racks (MH2) to MH1 before line starvation occurs. Borrowing across part numbers or waiting until 0 causes sudden line stops, model mix-ups, and severe assembly defects.

---

### Slice 39: Line Pressure vs Discrepancy Integrity Stop/Go (`c1_s6_sc05_line_pressure_stop_go`)
- **Module:** 6 (Stage 6: Supermarket C-Class Parts Put-Away (MH1)) | **Step in Stage:** Scene 5 of 6
- **Interaction Type:** `STOP_GO` | **XP Reward:** `+120 XP`
- **SOP Mandate:** SOP for Supermarket Put-Away (SM) Clause 4.2 & Discrepancy Integrity Standard
- **Visual Canvas:** `line_pressure_discrepancy` 

#### 1. Scenario & Visual Context
> "MH1 count is 92 pcs (SAP expected: 100 pcs). Under urgent line-stoppage pressure, the line feeder demands you sign off 100 pcs immediately. Allow or Halt?"

#### 2. Exact Test Steps
1. Review the operational dilemma displayed on the screen.
2. **Correct Action (PASS):** Click the big **🛑 STOP (Halt)** button.
   - *Expected Result:* Button confirms the decision, +120 XP awarded, AURA praises adherence to safety/SOP compliance.
3. **Negative Test (FAIL):** Click the opposite **🟢 GO (Authorize)** button.
   - *Expected Result:* Heart deducted, warning feedback explains the severe risk of bypassing SOP.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.2 mandates strict zero-tolerance for inventory falsification. When physical counts do not match SAP quantities, the operator must immediately halt put-away for that material and notify the Zone Leader. Yielding to line pressure distorts plant inventory accuracy, hides vendor shortages, and precipitates unrecoverable line outages downstream.

---

### Slice 40: Supermarket Storage Classification (A vs C Class Parts) (`c1_s6_sc06_supermarket_classification`)
- **Module:** 6 (Stage 6: Supermarket C-Class Parts Put-Away (MH1)) | **Step in Stage:** Scene 6 of 6
- **Interaction Type:** `MCQ` | **XP Reward:** `+110 XP`
- **SOP Mandate:** SOP for Supermarket Put-Away (SM) Clause 1.1 & Question Bank Q28
- **Visual Canvas:** `supermarket_classification_bins` 

#### 1. Scenario & Visual Context
> "Which categories of parts are stored in Supermarket racks at the Ather AURIC Plant?"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"Small C-class items (Fasteners, clips, bolts, grommets, O-rings checked at MH1 first)"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+110 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"Heavy A-class structural parts (Scooter mainframes, battery packs, electric motors)"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP-PUTAWAY-SM Clause 1.1 & Question Bank Q28: Supermarkets are high-density, high-turnover picking buffers engineered specifically for small C-class components (bolts, nuts, washers, electrical grommets, clips). These parts are verified for quantity at the MH1 staging area before stowing into gravity roller flow racks. A-class structural components are staged in High-Rise Racks or dedicated floor trolley lanes, and chemicals are strictly segregated in the detached chemical annex.

---


## Module 7: Quality Rejections, Quarantine & Disposition <a id="module-7-c1-s7"></a>
**Stage ID:** `c1_s7` | **SOP Document:** `07_C1_S4_NG_RTV & 08_C1_S4_NG_Scrap` | **Category:** Category 1: Inbound Logistics & Put-Away Workflows
**Total Slices:** 7 Scenes

### Slice 41: Defective Sample Detection & Entire Lot Quarantine (`c1_s7_sc01_entire_lot_quarantine`)
- **Module:** 7 (Quality Rejections, Quarantine & Disposition) | **Step in Stage:** Scene 1 of 7
- **Interaction Type:** `MCQ` | **XP Reward:** `+125 XP`
- **SOP Mandate:** SOP for IQC Issuance and Clearance at AURIC Clause 4.1 & SOP for NG-RTV Clause 4.1 / Question Bank Q31 & Q32
- **Visual Canvas:** `iqc_lot_quarantine` 

#### 1. Scenario & Visual Context
> "When IQC finds 2 defective burnt connectors in a 10-piece sample from a 1,000-piece lot, what materials must be moved to the NG Quarantine area?"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"The 2 defective samples AND the entire remaining lot volume (all 1,000 connectors) must move to the NG Quarantine area"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+125 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"Only the 2 defective burnt samples move to NG; put away the other 998 uninspected connectors directly into assembly racks"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP-IQC-AURIC & SOP-NG-RTV Clause 4.1 strictly mandate: 'If provided samples got rejected during inspection, the IQC inspector will attach an NG tag and raise a ticket to NG through JIRA. Those samples along with the whole lot move to NG area by NG manpower.' Statistical quality sampling proves that defect risk is shared across the entire manufacturing batch. Isolating only the 2 bad samples while releasing the uninspected bulk into vehicle assembly risks severe electrical fires and roadside power loss!

---

### Slice 42: Red Tagging, QC Stickers & JIRA Defect Logging (`c1_s7_sc02_jira_red_tag`)
- **Module:** 7 (Quality Rejections, Quarantine & Disposition) | **Step in Stage:** Scene 2 of 7
- **Interaction Type:** `STOP_GO` | **XP Reward:** `+120 XP`
- **SOP Mandate:** SOP for NG - RTV Clause 4.2 & Question Bank Q34 & Q35
- **Visual Canvas:** `red_tag_jira_logging` 

#### 1. Scenario & Visual Context
> "A rejected lot carries a Red Tag, but the QC sticker is missing and the JIRA ticket has no Bug ID ('Unknown Cause'). Can the NG team collect it?"

#### 2. Exact Test Steps
1. Review the operational dilemma displayed on the screen.
2. **Correct Action (PASS):** Click the big **🛑 STOP (Halt)** button.
   - *Expected Result:* Button confirms the decision, +120 XP awarded, AURA praises adherence to safety/SOP compliance.
3. **Negative Test (FAIL):** Click the opposite **🟢 GO (Authorize)** button.
   - *Expected Result:* Heart deducted, warning feedback explains the severe risk of bypassing SOP.

#### 3. SOP Grounding & Learning Point
> SOP for NG - RTV Clause 4.2 mandates that every rejected component must carry TWO physical identifiers before logistics collection: a Red Tag AND a QC sticker. Simultaneously, the digital JIRA ticket must have status 'QC Done: Fail' accompanied by a registered Bug ID and verified supplier defect root cause. If the Bug ID is missing or cause is marked 'Unknown', the NG team must strictly refuse collection and wait up to 2 days for SQA (Supplier Quality Assurance) or MQA to investigate and update the ticket. Collecting untracked parts creates untraceable ghost inventory in quarantine cage SC01 BL and renders vendor warranty debit notes legally void!

---

### Slice 43: Quarantine Cage Storage SC01 BL & Root Cause Segregation (`c1_s7_sc03_quarantine_transfer`)
- **Module:** 7 (Quality Rejections, Quarantine & Disposition) | **Step in Stage:** Scene 3 of 7
- **Interaction Type:** `DRAG_DROP` | **XP Reward:** `+130 XP`
- **SOP Mandate:** SOP for NG - RTV Clause 4.3 & Question Bank Q36 & Q37
- **Visual Canvas:** `quarantine_cage_segregation` 

#### 1. Scenario & Visual Context
> "Drag each rejected lot to its correct dedicated containment bay inside Quarantine Cage SC01 BL based on its defect root cause:"

#### 2. Exact Test Steps
1. Observe the **3 draggable cards** and **3 destination drop zones**.
2. **Correct Action (PASS):** Drag and match each item to its assigned destination:
   - Drag **"Battery harness with loose contact crimps manufactured out-of-spec by supplier"** → Drop into **"undefined"**
   - Drag **"Carton of headlamp lenses waterlogged by rain through a torn 3PL truck tarpaulin"** → Drop into **"undefined"**
   - Drag **"Ather 450X side fairing cracked after being dropped from an assembly line trolley"** → Drop into **"undefined"**
3. Click **Confirm / Submit Sorting**.
   - *Expected Result:* All items lock into zones with green checkmarks, +130 XP awarded.

#### 3. SOP Grounding & Learning Point
> SOP for NG - RTV Clause 4.3 mandates: 'Parts are physically segregated in the NG area strictly based on the cause of rejection: Vendor Manufacturing Defects, Transit Damage, or In-House Handling Rejections.' Each category has completely different commercial and legal accountability: Vendor defects are billed via SQA debit notes to suppliers; transit damage is claimed against third-party logistics insurance policies; and in-house handling rejections are charged to plant scrap cost centers. Mixing causes leads to rejected warranty claims and incorrect SAP inventory financial postings.

---

### Slice 44: The 4-Way Material Disposition Filter (`c1_s7_sc04_disposition_filter`)
- **Module:** 7 (Quality Rejections, Quarantine & Disposition) | **Step in Stage:** Scene 4 of 7
- **Interaction Type:** `DRAG_DROP` | **XP Reward:** `+135 XP`
- **SOP Mandate:** SOP for NG - RTV Clause 4.4 & SOP for NG - Scrap Clause 4.1
- **Visual Canvas:** `disposition_filter_mrb` 

#### 1. Scenario & Visual Context
> "Sort the 4 quarantined material cases into their legally authorized disposition routes under Ather SOP 07_C1_S4:"

#### 2. Exact Test Steps
1. Observe the **4 draggable cards** and **4 destination drop zones**.
2. **Correct Action (PASS):** Drag and match each item to its assigned destination:
   - Drag **"500 Cast Swingarms with unmachined axle holes due to supplier CNC tooling offset"** → Drop into **"undefined"**
   - Drag **"50 Sub-assembly harnesses with misaligned plastic clips easily re-seated with an approved jig"** → Drop into **"undefined"**
   - Drag **"200 Internal battery trays with cosmetic primer shade variation inside sealed chassis (Zero structural/safety effect)"** → Drop into **"undefined"**
   - Drag **"3 Punctured lithium-ion cell packs with internal short circuits that cannot be salvaged or shipped back"** → Drop into **"undefined"**
3. Click **Confirm / Submit Sorting**.
   - *Expected Result:* All items lock into zones with green checkmarks, +135 XP awarded.

#### 3. SOP Grounding & Learning Point
> SOP for NG - RTV Clause 4.4 defines the strict 4-way filter. Supplier manufacturing discrepancies qualify for Auto-RTV with immediate debit notes. Fixable discrepancies undergo documented internal rework and must undergo 100% re-inspection by IQC before stock entry. Cosmetic deviations require formal Engineering Deviation approval signed by the Chief Technical Officer and Head of Quality. Dangerous, hazardous, or unrepairable materials require joint Production & Finance approval to move into Scrapyard SC01 BL for verified industrial shredding.

---

### Slice 45: Scrap Shredding Verification & Weighbridge Gate Exit (`c1_s7_sc05_scrap_weighbridge_exit`)
- **Module:** 7 (Quality Rejections, Quarantine & Disposition) | **Step in Stage:** Scene 5 of 7
- **Interaction Type:** `SEQUENCE` | **XP Reward:** `+140 XP`
- **SOP Mandate:** SOP for NG - Scrap (08_C1_S4) Clause 4.1 to 4.5 & Category 2 Long SOP Section 7
- **Visual Canvas:** `scrap_shredder_weighbridge` 

#### 1. Scenario & Visual Context
> "Arrange the 4 steps of the Ather Scrap & Vendor Weighbridge Exit lifecycle in the strictly mandated SOP sequence:"

#### 2. Exact Test Steps
1. Review the unarranged operational steps.
2. **Correct Action (PASS):** Arrange the steps in the exact chronological SOP order:
   - Step 1: **1. Secure signed Finance and Production Scrap Approval Note, transition JIRA to 'To be Scrapped', and move stock to SC01 BL in SAP**
   - Step 2: **2. Physically transfer rejected parts to Scrapyard and execute witnessed industrial twin-shaft mechanical shredding**
   - Step 3: **3. Upload destruction photos and disposal certificates into JIRA tickets and transition status to 'Scrapped'**
   - Step 4: **4. Weigh empty vendor truck (Tare), load shredded scrap, weigh full truck (Gross), and obtain Finance Delivery Challan for gate exit**
3. Tap **Verify Sequence**.
   - *Expected Result:* Sequence validated with numerical badges, +140 XP awarded.

#### 3. SOP Grounding & Learning Point
> SOP for NG - Scrap mandates an unbroken chain of custody for scrapped assets: (1) Finance and Production sign-off prevents unauthorized write-offs; (2) Mechanical shredding guarantees rejected battery connectors, structural frames, and branded body panels can never re-enter grey replacement markets or cause consumer safety hazards; (3) JIRA photo proof legally completes internal audit trails; (4) Weighbridge dual measurement (Tare vs Gross) confirms exact tonnage to ensure zero pilferage before Finance signs the final outbound Delivery Challan.

---

### Slice 46: Visual Floor Management: 'IQC Hold' vs 'NG' Identification Cone (`c1_s7_sc06_visual_cone_iqc_hold`)
- **Module:** 7 (Quality Rejections, Quarantine & Disposition) | **Step in Stage:** Scene 6 of 7
- **Interaction Type:** `MCQ` | **XP Reward:** `+115 XP`
- **SOP Mandate:** SOP for IQC Issuance and Clearance at AURIC Clause 3.2 & Question Bank Q33
- **Visual Canvas:** `visual_cone_iqc_hold` 

#### 1. Scenario & Visual Context
> "IQC inspection is delayed and an inward lot is waiting in staging. Which cone do you place on the pallet?"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"“IQC Hold” Cone (Yellow/Amber: Indicates pending quality decision, not confirmed defective)"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+115 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"“NG” Cone (Red: Reserved exclusively for officially rejected lots with confirmed failure)"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP Clause 3.2 & Question Bank Q33: Color-coded visual management cones are vital on the busy AURIC receiving dock to communicate material status at a glance without reading paperwork. The 'IQC Hold' cone (Yellow/Amber) clearly designates that material is in an indeterminate state pending testing, calibration, or metallurgy lab results. Staging operators must not move 'Hold' pallets. Placing an 'NG' cone prematurely is a protocol violation because the parts may be fully conformant once tested.

---

### Slice 47: JIRA Digital Workflow: 'QC Done: Fail' to 'Quality Failed' & Grand Graduation (`c1_s7_sc07_jira_workflow_transitions`)
- **Module:** 7 (Quality Rejections, Quarantine & Disposition) | **Step in Stage:** Scene 7 of 7
- **Interaction Type:** `MCQ` | **XP Reward:** `+130 XP`
- **SOP Mandate:** SOP for NG - RTV Clause 4.3 & Question Bank Q36
- **Visual Canvas:** `jira_status_graduation` 

#### 1. Scenario & Visual Context
> "After NG parts are put away in the NG caged storage area (SC01 BL), the JIRA status transitions from “QC Done: Fail” to:"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"“Quality Failed” (Awaiting Material Review Board disposition decision)"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+130 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"“Scrapped” (Premature: Requires Finance & Production destruction sign-off)"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP for NG - RTV Clause 4.3 & Question Bank Q36: Digital JIRA status transitions maintain exact synchronization with physical plant movements. When the NG logistics team picks up rejected material from the dock, the ticket reads 'QC Done: Fail'. As soon as the material is physically scanned and stowed into caged storage SC01 BL, the JIRA status transitions to 'Quality Failed'. Dispositions like 'Scrapped' or 'Returned to Vendor' occur strictly downstream after formal MRB and Finance commercial authorizations.

---


## Module 8: Vehicle Line Issuance & Order Picking <a id="module-8-c2-s8"></a>
**Stage ID:** `c2_s8` | **SOP Document:** `01_C2_S1_Line_Issuance_Vehicle` | **Category:** Category 2: Outbound Line Feed, Material Transfers & Governance
**Total Slices:** 9 Scenes

### Slice 48: MES Trigger & Digital WH Task Activation (`c2_s8_sc01_mes_wh_task`)
- **Module:** 8 (Vehicle Line Issuance & Order Picking) | **Step in Stage:** Scene 1 of 9
- **Interaction Type:** `MCQ` | **XP Reward:** `+120 XP`
- **SOP Mandate:** SOP for Line Issuance Vehicle Plant Clause 4.1 & Category 2 Stage Guide
- **Visual Canvas:** `c2_mes_wh_task` 

#### 1. Scenario & Visual Context
> "Under SOP Clause 4.1, how does the Line Feeder receive picking instructions, and what must be verified before proceeding?"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"MES auto-creates a WH task on the HHT based on VIN consumption, specifying exact Part Description, Source Location (HRR/Flow Rack/Trolley Area), and Replenishment Qty"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+120 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"The assembly supervisor writes part numbers on a whiteboard at the end of the shift for feeders to copy down on scrap paper"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP for Line Issuance Vehicle Plant Clause 4.1 mandates: 'The material picking task will be created by MES according to the VIN consumption. The individual feeder will receive the picklist through a WH order & WH task in the HHT device provided to him. The WH task will consist of part description, part location in either HRR, Flow rack, Trolley area, and replenishment quantity.' MES synchronization ensures just-in-time material flow, prevents line starvation, and guarantees assembly traceability against vehicle VIN numbers.

---

### Slice 49: Source Location QR Scan & Blind Quantity Reveal (`c2_s8_sc02_source_qr_scan`)
- **Module:** 8 (Vehicle Line Issuance & Order Picking) | **Step in Stage:** Scene 2 of 9
- **Interaction Type:** `SEQUENCE` | **XP Reward:** `+125 XP`
- **SOP Mandate:** SOP for Line Issuance Vehicle Plant Clause 4.1 & Failure Mode 5.2
- **Visual Canvas:** `c2_source_qr_reveal` 

#### 1. Scenario & Visual Context
> "Under SOP Clause 4.1, arrange the mandatory 4-step sequence a Line Feeder must follow when executing a picking task:"

#### 2. Exact Test Steps
1. Review the unarranged operational steps.
2. **Correct Action (PASS):** Arrange the steps in the exact chronological SOP order:
   - Step 1: **Receive MES picking task on HHT specifying Part Number, Replenishment Qty & Source Rack Location**
   - Step 2: **Arrive at exact source rack beam and scan physical QR code to unlock the blind picking quantity**
   - Step 3: **Pick verified quantity from that bin and scan mobile trolley QR barcode to marry trolley with picklist**
   - Step 4: **Feed parts to workstation rack and scan destination QR code on the line beam to close WH task in MES**
3. Tap **Verify Sequence**.
   - *Expected Result:* Sequence validated with numerical badges, +125 XP awarded.

#### 3. SOP Grounding & Learning Point
> SOP for Line Issuance Vehicle Plant Clause 4.1 strictly specifies: 'Once the feeder reaches the source location he must scan the QR present at the location to acknowledgement, then only the picking quantity will be displayed on the device. Then the line feeder must pick the material from that particular location only along with the correct number of quantities as mentioned.' Blind quantity gating is an essential poka-yoke (mistake-proofing) barrier that halts picking from adjacent wrong bins containing different model harnesses or obsolete engineering revisions.

---

### Slice 50: Trolley QR Marriage & Supermarket Lane Verification (`c2_s8_sc03_trolley_marriage`)
- **Module:** 8 (Vehicle Line Issuance & Order Picking) | **Step in Stage:** Scene 3 of 9
- **Interaction Type:** `STOP_GO` | **XP Reward:** `+130 XP`
- **SOP Mandate:** SOP for Line Issuance Vehicle Plant Failure Modes 5.1 & 5.2
- **Visual Canvas:** `c2_trolley_marriage` 

#### 1. Scenario & Visual Context
> "DECISION GATE: Can the line feeder move un-scanned materials directly to the assembly line?"

#### 2. Exact Test Steps
1. Review the operational dilemma displayed on the screen.
2. **Correct Action (PASS):** Click the big **🛑 STOP (Halt)** button.
   - *Expected Result:* Button confirms the decision, +130 XP awarded, AURA praises adherence to safety/SOP compliance.
3. **Negative Test (FAIL):** Click the opposite **🟢 GO (Authorize)** button.
   - *Expected Result:* Heart deducted, warning feedback explains the severe risk of bypassing SOP.

#### 3. SOP Grounding & Learning Point
> SOP for Line Issuance Vehicle Plant Failure Mode 5.1 & 5.2 strictly defines: 'Milk Runner does not scan Trolley QR before starting picks — trolley not married to picklist; parts move to line without system traceability. If operator directly moves material without confirming quantity, WH Order/Task remains open. Material physically reaches the line but system transfer is incomplete, creating phantom inventory and triggering false line-starvation alerts.' Furthermore, picking from a supermarket lane without scanning the lane QR code risks loading wrong revision parts, halting the main assembly line. Zone Leader and Shift Incharge must backtrack, return the trolley, and issue a non-conformance warning.

---

### Slice 51: Workstation Line-Side Delivery & Empty Asset Reverse Loop (`c2_s8_sc04_workstation_delivery`)
- **Module:** 8 (Vehicle Line Issuance & Order Picking) | **Step in Stage:** Scene 4 of 9
- **Interaction Type:** `SPOT_ERROR` | **XP Reward:** `+140 XP`
- **SOP Mandate:** SOP for Line Issuance Vehicle Plant Clause 4.2 & Failure Mode 5.3
- **Visual Canvas:** `c2_workstation_delivery` | **Video Source:** `/Assets/8%20Sequential%20Scenes/7%20Milk%20Run%20Line%20Delivery%20%26%20Station%20Drop-off/scene_07_milk_run_delivery.mp4`

#### 1. Scenario & Visual Context
> "SPOT THE VIOLATIONS: Inspect Workstation 08. Which two conditions violate Ather Line-Feeding and Shopfloor Safety SOPs?"

#### 2. Exact Test Steps
1. Inspect the visual staging canvas for non-compliances.
2. **Correct Action (PASS):** Tap/Click on the hazard area: **"Empty mobile trolley abandoned across the yellow pedestrian fire exit corridor"**.
3. Tap **Confirm Defect / Hazard**.
   - *Expected Result:* Defect flagged with red quarantine border, AURA explains resolution, +140 XP awarded.

#### 3. SOP Grounding & Learning Point
> SOP for Line Issuance Vehicle Plant Clause 4.2 & Failure Mode 5.3 establishes: 'After picking and feeding material to destination workstation, feeder scans QR code at line-side destination to close WH task. Closing WH task marks feeding of material completed, confirms stock deduction, and allows feeder to resume the next task. Separate manpower collects empty bins and trolleys from line side to move them to empty segregation area. If not collected, empty assets choke the gangway, block emergency exits, and starve upstream decanting of return containers.' Scanning the destination QR completes the dual-scan traceability handshake.

---

### Slice 52: Over-Picking Prohibition Stop/Go (Pick 12 vs 15 on Rack) (`c2_s8_sc05_overpicking_prohibition`)
- **Module:** 8 (Vehicle Line Issuance & Order Picking) | **Step in Stage:** Scene 5 of 9
- **Interaction Type:** `STOP_GO` | **XP Reward:** `+120 XP`
- **SOP Mandate:** SOP for Line Issuance Vehicle Plant Clause 4.1 & Question Bank Q29
- **Visual Canvas:** `overpicking_prohibition_gate` 

#### 1. Scenario & Visual Context
> "The HHT screen says 'Pick 12 pieces'. You see 15 on the rack bin. Take 15 to save a return trip?"

#### 2. Exact Test Steps
1. Review the operational dilemma displayed on the screen.
2. **Correct Action (PASS):** Click the big **🛑 STOP (Halt)** button.
   - *Expected Result:* Button confirms the decision, +120 XP awarded, AURA praises adherence to safety/SOP compliance.
3. **Negative Test (FAIL):** Click the opposite **🟢 GO (Authorize)** button.
   - *Expected Result:* Heart deducted, warning feedback explains the severe risk of bypassing SOP.

#### 3. SOP Grounding & Learning Point
> SOP for Line Issuance Vehicle Plant Clause 4.1 & Question Bank Q29: Feeders must strictly adhere to the exact pick quantity specified by the MES algorithm. Picking unallocated stock depletes safety stock reserves designated for parallel picking waves, creates inventory variances on cycle count audits, and results in cluttered, unergonomic line-side workstations.

---

### Slice 53: Line Feeder Part Ownership & Anti-Duplication Rule (`c2_s8_sc06_feeder_part_ownership`)
- **Module:** 8 (Vehicle Line Issuance & Order Picking) | **Step in Stage:** Scene 6 of 9
- **Interaction Type:** `MCQ` | **XP Reward:** `+115 XP`
- **SOP Mandate:** SOP for Line Issuance Vehicle Plant Clause 4.1 & Question Bank Q22
- **Visual Canvas:** `feeder_anti_duplication` 

#### 1. Scenario & Visual Context
> "Under Ather Plant SOP Clause 4.1 & Question Bank Q22, can two line feeders carry the same part to the assembly line?"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"No — Every feeder has their own unique parts divided by station so no part is fed twice (Q22)"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+115 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"Yes — Whichever feeder is fastest should grab whatever parts they see on the rack"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.1 & Question Bank Q22 enforces single-point line feeding accountability: Material feeding routes are strictly segregated by part category and workstation zone. Dividing parts uniquely among certified feeders ensures that no part is duplicate-fed, preventing line congestion and maintaining clean, traceable WH order execution.

---

### Slice 54: Handheld Blind Quantity Troubleshooting (`c2_s8_sc07_handheld_troubleshooting`)
- **Module:** 8 (Vehicle Line Issuance & Order Picking) | **Step in Stage:** Scene 7 of 9
- **Interaction Type:** `MCQ` | **XP Reward:** `+110 XP`
- **SOP Mandate:** SOP for Line Issuance Vehicle Plant Clause 4.1 & Question Bank Q21
- **Visual Canvas:** `handheld_blind_quantity_unlock` 

#### 1. Scenario & Visual Context
> "You cannot see the picking quantity on the handheld terminal screen. Why? (Question Bank Q21)"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"You have not scanned the source location QR code yet (No scan, no quantity poka-yoke)"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+110 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"The rugged handheld terminal is broken and needs replacement by IT support"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.1 & Question Bank Q21: The picking quantity remains hidden until the feeder physically scans the source bin QR barcode. This eliminates memory picking errors, guarantees physical presence at the specified bin, and prevents associates from grabbing parts from adjacent racks.

---

### Slice 55: Wrong Supermarket Lane Picking Violation (`c2_s8_sc08_wrong_lane_violation`)
- **Module:** 8 (Vehicle Line Issuance & Order Picking) | **Step in Stage:** Scene 8 of 9
- **Interaction Type:** `MCQ` | **XP Reward:** `+120 XP`
- **SOP Mandate:** SOP for Line Issuance Vehicle Plant Failure Mode 5.2 & Question Bank Q23
- **Visual Canvas:** `wrong_supermarket_lane_violation` 

#### 1. Scenario & Visual Context
> "You pick from the wrong supermarket lane without scanning the lane QR code. What happens? (Question Bank Q23)"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"The correct part's task stays open, a material alert shows at the line, and the ZL must return the wrong trolley and retrain you (Q23)"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+120 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"Nothing happens — all supermarket lanes hold interchangeable screws and bolts"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP Failure Mode 5.2 & Question Bank Q23: Picking from an incorrect supermarket lane without scanning the lane QR creates a dual disaster: the assigned WH task remains open on the feeder's ID, and mismatched parts arrive at the assembly line station, triggering an emergency Poka-Yoke material mismatch alarm. The Zone Leader must trace the error, swap the incorrect trolley, and record a non-conformance infraction against the feeder.

---

### Slice 56: The 5-Step Order Picking Standard Operating Lifecycle (`c2_s8_sc09_five_step_picking_lifecycle`)
- **Module:** 8 (Vehicle Line Issuance & Order Picking) | **Step in Stage:** Scene 9 of 9
- **Interaction Type:** `SEQUENCE` | **XP Reward:** `+135 XP`
- **SOP Mandate:** SOP for Line Issuance Vehicle Plant Clause 4.1 & Question Bank Q20
- **Visual Canvas:** `five_step_picking_lifecycle` 

#### 1. Scenario & Visual Context
> "Arrange the 5 feeder steps in the strictly mandated order under SOP Clause 4.1 & Question Bank Q20:"

#### 2. Exact Test Steps
1. Review the unarranged operational steps.
2. **Correct Action (PASS):** Arrange the steps in the exact chronological SOP order:
   - Step 1: **Scan source location QR code on rack beam to unlock blind quantity (b)**
   - Step 2: **Pick the exact shown quantity from that location only (c)**
   - Step 3: **Move mobile trolley safely to the destination workstation rack (d)**
   - Step 4: **Scan destination location QR code on the line beam to close WH task (a)**
   - Step 5: **Confirm task closure and start the next MES WH task on the handheld (e)**
3. Tap **Verify Sequence**.
   - *Expected Result:* Sequence validated with numerical badges, +135 XP awarded.

#### 3. SOP Grounding & Learning Point
> SOP for Line Issuance Vehicle Plant Clause 4.1 & Question Bank Q20: The standard sequence is strictly: (b) Scan source location QR -> (c) Pick shown quantity -> (d) Move to workstation -> (a) Scan destination QR -> (e) Start next WH task. Scanning the destination QR closes the open task in MES, posts inventory consumption against the vehicle VIN, and clears the operator's queue for the next wave.

---


## Module 9: Paint Shop Line Issuance & Decanting <a id="module-9-c2-s9"></a>
**Stage ID:** `c2_s9` | **SOP Document:** `02_C2_S1_Line_Issuance_Paint_Shop & 03_C2_S2_Decanting_Paint_Shop` | **Category:** Category 2: Outbound Line Feed, Material Transfers & Governance
**Total Slices:** 10 Scenes

### Slice 57: ACED Metal Parts Trolley Issuance & Feeder Matrix (`c2_s9_sc01_aced_trolley_issuance`)
- **Module:** 9 (Paint Shop Line Issuance & Decanting) | **Step in Stage:** Scene 1 of 10
- **Interaction Type:** `MCQ` | **XP Reward:** `+130 XP`
- **SOP Mandate:** SOP for Line Issuance Paint-Shop Clause 4.1 & Category 2 Stage Guide
- **Visual Canvas:** `c2_aced_trolley_issuance` | **Video Source:** `/Assets/8%20Sequential%20Scenes/6%20Bulk%20Decanting%20(FLC%20to%20Assembly%20Trolley)/scene_06_bulk_decanting_trolley.mp4`

#### 1. Scenario & Visual Context
> "Under SOP 02_C2_S1, how are ACED metal parts formatted in the storage area and distributed across line feeders?"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"Inwarded in trolley format with 7–9 metal parts stored in the trolley area; distributed across 28 feeders where each feeder handles unique SKUs and no two feeders share the same part"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+130 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"Dumped in a mixed pile on the dock floor where any available worker grabs whatever metal piece they find first"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP for Line Issuance Paint-Shop Clause 4.1 establishes: 'All line feeders have unique parts distributed among 28 feeders, meant to be issued at particular workstations for ACED and paint-line. ACED parts are inwarded in trolley format; a total of 7–9 metal parts are stored in the trolley area.' Distributing unique, non-overlapping SKUs across 28 feeders prevents workstation starvation and eliminates part cross-contamination during electrodeposition dipping.

---

### Slice 58: 2-Pallet Decanting Buffer & e-Kanban RFID Trigger (`c2_s9_sc02_twobin_ekanban`)
- **Module:** 9 (Paint Shop Line Issuance & Decanting) | **Step in Stage:** Scene 2 of 10
- **Interaction Type:** `COUNT_STEPPER` | **XP Reward:** `+135 XP`
- **SOP Mandate:** SOP for Decanting Processes Paint-Shop Clause 4.1 & Failure Mode 5.2
- **Visual Canvas:** `c2_twobin_ekanban` 

#### 1. Scenario & Visual Context
> "Under SOP 03_C2_S2 Clause 4.1, how many buffer pallet positions must the Decanting Zone Leader maintain for each body part (e.g. Tail Side Panels)?"

#### 2. Exact Test Steps
1. Review the batch size and statistical rule.
2. Formula / Rule: *Calculate based on SOP batch rule (Target: 2)*
3. **Correct Action (PASS):** Use the `+` / `-` stepper buttons to set the count to exactly **2**.
4. Click **Confirm Sample Quantity**.
   - *Expected Result:* Number locks in green, +135 XP awarded.

#### 3. SOP Grounding & Learning Point
> SOP for Decanting Processes Paint-Shop Clause 4.1 & Failure Mode 5.2 mandates: 'In decanting area, each body-part allocated two pallet positions for decanting. Decanting ZL must maintain 2 pallet/bin quantity of each body-part each time; to replenish, trigger kanban through device. If Zone Incharge does not generate e-Kanban RFID tag when bin depletes, both bins deplete, causing line stoppage.' The 2-bin buffer ensures that while Bin 2 is actively feeding the paint line, the MHE operator has sufficient SLA time to pull replacement FLCs from High-Rise Racks.

---

### Slice 59: The 100% Full Trolley Capacity Mandate (`c2_s9_sc03_trolley_capacity_rule`)
- **Module:** 9 (Paint Shop Line Issuance & Decanting) | **Step in Stage:** Scene 3 of 10
- **Interaction Type:** `STOP_GO` | **XP Reward:** `+140 XP`
- **SOP Mandate:** SOP for Decanting Processes Paint-Shop Failure Mode 5.1
- **Visual Canvas:** `c2_trolley_capacity` 

#### 1. Scenario & Visual Context
> "DECISION GATE: Can the decanting operator dispatch a partially filled trolley (24/30 panels) to the paint line?"

#### 2. Exact Test Steps
1. Review the operational dilemma displayed on the screen.
2. **Correct Action (PASS):** Click the big **🛑 STOP (Halt)** button.
   - *Expected Result:* Button confirms the decision, +140 XP awarded, AURA praises adherence to safety/SOP compliance.
3. **Negative Test (FAIL):** Click the opposite **🟢 GO (Authorize)** button.
   - *Expected Result:* Heart deducted, warning feedback explains the severe risk of bypassing SOP.

#### 3. SOP Grounding & Learning Point
> SOP for Decanting Processes Paint-Shop Failure Mode 5.1 dictates: 'The decanting operator does not refill the trolley completely / partly fills the trolley. Decanting operator must fill trolley completely before moving to ACED and paint line. Zone Leader must check before trolley is fed to line. Mandatory check while moving trolley to paint/ACED line eliminates possibility of partial trolley being moved.' Partially filled trolleys disrupt paint booth takt times, cause erratic conveyor loading, and lead to premature line starvation.

---

### Slice 60: Closed-Loop Order Closure & Wrong Part Reverse Protocol (`c2_s9_sc04_wrong_part_return`)
- **Module:** 9 (Paint Shop Line Issuance & Decanting) | **Step in Stage:** Scene 4 of 10
- **Interaction Type:** `SEQUENCE` | **XP Reward:** `+145 XP`
- **SOP Mandate:** SOP for Decanting Processes Paint-Shop Failure Modes 5.3 & 5.4
- **Visual Canvas:** `c2_wrong_part_return` 

#### 1. Scenario & Visual Context
> "Under SOP 03_C2_S2 Failure Modes 5.3 & 5.4, arrange the 4 mandatory steps to recover from a wrong part delivery without locking SAP EWM:"

#### 2. Exact Test Steps
1. Review the unarranged operational steps.
2. **Correct Action (PASS):** Arrange the steps in the exact chronological SOP order:
   - Step 1: **Cancel the erroneous e-Kanban WH task in SAP EWM immediately to halt the invalid pick**
   - Step 2: **Create Return WH Task in SAP EWM to return wrongly issued parts (TCP) back to High-Rise Racks (HRR)**
   - Step 3: **Trigger new replenishment WH task for the correct material (Tail Side Panels) to supply the line**
   - Step 4: **Perform dual-scanning (pickup & drop) to officially close the WH order before opening subsequent tasks**
3. Tap **Verify Sequence**.
   - *Expected Result:* Sequence validated with numerical badges, +145 XP awarded.

#### 3. SOP Grounding & Learning Point
> SOP for Decanting Processes Paint-Shop Failure Modes 5.3 & 5.4 establishes: 'If e-Kanban triggers for wrong part, cancellation of WH task must be done. Zone leader creates WH task for return of wrongly issued parts, along with WH task for correct material replenishment. MHE operator completes replenishment task and then return task. Furthermore, scanning of picking and feeding must be done to close WH order. If MHE operator misses scanning, WH order will not close, halting subsequent tasks in SAP EWM.' Closed-loop scanning maintains inventory ledger precision and prevents system deadlocks.

---

### Slice 61: Decanting Definition & Handling Unit (HU) Transformation (`c2_s9_sc05_decanting_definition`)
- **Module:** 9 (Paint Shop Line Issuance & Decanting) | **Step in Stage:** Scene 5 of 10
- **Interaction Type:** `MCQ` | **XP Reward:** `+115 XP`
- **SOP Mandate:** SOP for Decanting Processes Paint-Shop Clause 4.1 & Question Bank Q10
- **Visual Canvas:** `decanting_definition_hu` 

#### 1. Scenario & Visual Context
> "Under SOP 03_C2_S2 & Question Bank Q10, what is 'Decanting'?"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"Moving parts from big supplier containers into standard internal trolleys (Supplier HU closed, internal HU created) (Q10)"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+115 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"Throwing away damaged cardboard packaging into the scrapyard"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.1 & Question Bank Q10: Large returnable Foldable Large Containers (FLCs) are too heavy and bulky for line-side assembly. Decanting unpacks vendor materials into lean, ergonomic wheeled trolleys sized specifically for plant conveyor racks. The ERP system closes the external supplier Handling Unit (HU) and generates an internal tracking barcode, maintaining 100% inventory custody.

---

### Slice 62: FLC-to-Trolley Batch Calculation (90 Brakes, Trolley Capacity 30) (`c2_s9_sc06_flc_batch_calculation`)
- **Module:** 9 (Paint Shop Line Issuance & Decanting) | **Step in Stage:** Scene 6 of 10
- **Interaction Type:** `COUNT_STEPPER` | **XP Reward:** `+115 XP`
- **SOP Mandate:** SOP for Decanting Processes Paint-Shop Clause 4.2 & Question Bank Q12
- **Visual Canvas:** `flc_trolley_batch_calculation` 

#### 1. Scenario & Visual Context
> "A brake FLC contains 90 brakes. The trolley holds 30. How many full trolleys from one FLC? (Question Bank Q12)"

#### 2. Exact Test Steps
1. Review the batch size and statistical rule.
2. Formula / Rule: *Calculate based on SOP batch rule (Target: 3)*
3. **Correct Action (PASS):** Use the `+` / `-` stepper buttons to set the count to exactly **3**.
4. Click **Confirm Sample Quantity**.
   - *Expected Result:* Number locks in green, +115 XP awarded.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.2 & Question Bank Q12: 90 brakes / 30 per trolley = 3 full trolleys. Decanting SOP requires strict full-batch completion. Loading exactly 30 parts per trolley maintains standard conveyor balancing, prevents ergonomic strain, and ensures seamless kanban replenishment.

---

### Slice 63: Multi-Color Production Wave Task Splitting (20 Black + 10 Red) (`c2_s9_sc07_variant_wave_task_splitting`)
- **Module:** 9 (Paint Shop Line Issuance & Decanting) | **Step in Stage:** Scene 7 of 10
- **Interaction Type:** `MCQ` | **XP Reward:** `+120 XP`
- **SOP Mandate:** SOP for Line Issuance Paint-Shop Clause 4.2 & Question Bank Q13
- **Visual Canvas:** `variant_wave_task_splitting` 

#### 1. Scenario & Visual Context
> "The production plan is 20 black + 10 red vehicles. How many WH tasks are generated in the WH order? (Question Bank Q13)"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"2 Tasks — One task to pick 20 black parts and one to pick 10 red parts (Separate SKUs) (Q13)"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+120 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"1 Combined Task — Feeders should mix black and red parts in the same trolley"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.2 & Question Bank Q13: In SAP EWM, warehouse orders group picking tasks by Bill of Materials (BOM) item numbers. Because Space Black and True Red side panels have separate part numbers, the system creates exactly two distinct Warehouse Tasks within the WH Order. This ensures strict color batch integrity and prevents feeding wrong-colored panels to robotic spray arms.

---

### Slice 64: Supermarket Rack Replenishment Ownership (`c2_s9_sc08_supermarket_rack_ownership`)
- **Module:** 9 (Paint Shop Line Issuance & Decanting) | **Step in Stage:** Scene 8 of 10
- **Interaction Type:** `MCQ` | **XP Reward:** `+110 XP`
- **SOP Mandate:** SOP for Line Issuance Paint-Shop Clause 4.1 & Question Bank Q19
- **Visual Canvas:** `supermarket_rack_replenishment_zl` 

#### 1. Scenario & Visual Context
> "Who keeps the paint-shop supermarket rack for body parts filled? (Question Bank Q19)"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"The Decanting Zone Leader (The supermarket rack is the source location for the paint line) (Q19)"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+110 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"The Main Gate security guards during their lunch break"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.1 & Question Bank Q19: The paint-shop supermarket flow rack represents the single point of failure between warehouse storage and active conveyor painting. The Decanting Zone Leader (ZL) owns buffer health, monitors consumption rates, and triggers timely replenishment to ensure paint operators never experience starvation delays.

---

### Slice 65: Empty Body-Part Trolley Reverse Logistics Loop (`c2_s9_sc09_empty_trolley_reverse_loop`)
- **Module:** 9 (Paint Shop Line Issuance & Decanting) | **Step in Stage:** Scene 9 of 10
- **Interaction Type:** `MCQ` | **XP Reward:** `+115 XP`
- **SOP Mandate:** SOP for Line Issuance Paint-Shop Clause 4.3 & Question Bank Q25
- **Visual Canvas:** `empty_trolley_reverse_loop` 

#### 1. Scenario & Visual Context
> "After feeding a body-part trolley in the paint shop, where does the empty trolley go? (Question Bank Q25)"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"To the Decant Area (Reloaded for the next WH wave) (Q25)"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+115 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"To the supplier gate to be taken away by delivery trucks"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.3 & Question Bank Q25: Mobile trolleys are specialized closed-loop internal handling assets engineered specifically for Ather painted components. Once offloaded at the paint booth, the feeder routes the empty trolley back to the Decanting Area immediately. This maintains uninterrupted asset turnaround and ensures decanting operators always have empty trolleys ready to receive incoming parts.

---

### Slice 66: Paint-Shop Unit of Movement (Whole Trolley vs Single Piece) (`c2_s9_sc10_whole_trolley_movement`)
- **Module:** 9 (Paint Shop Line Issuance & Decanting) | **Step in Stage:** Scene 10 of 10
- **Interaction Type:** `MCQ` | **XP Reward:** `+130 XP`
- **SOP Mandate:** SOP for Line Issuance Paint-Shop Clause 4.2 & Question Bank Q27
- **Visual Canvas:** `whole_trolley_movement_gate` 

#### 1. Scenario & Visual Context
> "A paint-shop WH task asks for a body part. What do you move to the paint-work line? (Question Bank Q27)"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"The whole trolley of that body part from the supermarket rack (Scan rack QR, move trolley, scan dest QR) (Q27)"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+130 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"Only one single loose piece carried by hand"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.2 & Question Bank Q27 dictates: Paint shop feeding is strictly standardized by mobile trolley unit loads. Handlers must never carry loose body parts by hand, which damages delicate Class-A plastic surfaces. The operator scans the supermarket rack QR, transports the whole trolley, and scans the destination station QR to officially complete the task in MES.

---


## Module 10: Indirect Material Handling (CM01 to MN01) <a id="module-10-c2-s10"></a>
**Stage ID:** `c2_s10` | **SOP Document:** `10_C2_S1_Indirect_Material_Handling` | **Category:** Category 2: Outbound Line Feed, Material Transfers & Governance
**Total Slices:** 6 Scenes

### Slice 67: The 'No Reservation, No Material' Security Rule (`c2_s10_sc01_no_reservation_gate`)
- **Module:** 10 (Indirect Material Handling (CM01 to MN01)) | **Step in Stage:** Scene 1 of 6
- **Interaction Type:** `STOP_GO` | **XP Reward:** `+140 XP`
- **SOP Mandate:** SOP for Indirect Material Handling Auric Clause 4.1 & Failure Mode 5.1
- **Visual Canvas:** `c2_indirect_no_reservation` 

#### 1. Scenario & Visual Context
> "DECISION GATE: Can indirect consumables or maintenance spares be physically issued based on a verbal request from a shop supervisor?"

#### 2. Exact Test Steps
1. Review the operational dilemma displayed on the screen.
2. **Correct Action (PASS):** Click the big **🛑 STOP (Halt)** button.
   - *Expected Result:* Button confirms the decision, +140 XP awarded, AURA praises adherence to safety/SOP compliance.
3. **Negative Test (FAIL):** Click the opposite **🟢 GO (Authorize)** button.
   - *Expected Result:* Heart deducted, warning feedback explains the severe risk of bypassing SOP.

#### 3. SOP Grounding & Learning Point
> SOP 10_C2_S1 establishes that indirect materials directly impact factory operational expenditure (OpEx). Without a validated SAP reservation number or JIRA PPE ticket, the ERP cannot assign the expense to the requesting department's Cost Center in Controlling (CO). Verbal handovers lead to physical stockouts for critical maintenance while leaving phantom stock recorded in Central Stores (CM01).

---

### Slice 68: SAP Stock Movement CM01 to MN01 via Transaction YMB21 (`c2_s10_sc02_sap_ymb21_transfer`)
- **Module:** 10 (Indirect Material Handling (CM01 to MN01)) | **Step in Stage:** Scene 2 of 6
- **Interaction Type:** `MCQ` | **XP Reward:** `+145 XP`
- **SOP Mandate:** SOP for Indirect Material Handling Auric Clause 4.2
- **Visual Canvas:** `c2_sap_ymb21_transfer` 

#### 1. Scenario & Visual Context
> "Under SOP 10_C2_S1 Clause 4.2, what is the SAP transaction code and storage location route for indirect maintenance spares?"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"T-Code YMB21; Material Transfer Posting from Central Indirect Stores (CM01) to Maintenance Location (MN01) against Cost Center"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+145 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"T-Code MIGO; Direct unrestricted goods issue from Vehicle Staging (PS01) to Scrap Cage (SC01)"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP 10_C2_S1 Clause 4.2 dictates: 'When a department requires indirect materials, they raise a request via SAP. For materials handled in SAP, the 1CODE used is YMB21... initiating a Material Transfer Posting from CM01 to the MN01 storage location. A reservation number is generated upon saving the request with the specific part number and quantity.' This ensures real-time stock deduction from CM01 and accurate consumption debiting in MN01.

---

### Slice 69: Requisition Slip Audit & Cost Center Verification Gate (`c2_s10_sc03_mrs_cost_center_audit`)
- **Module:** 10 (Indirect Material Handling (CM01 to MN01)) | **Step in Stage:** Scene 3 of 6
- **Interaction Type:** `SPOT_ERROR` | **XP Reward:** `+150 XP`
- **SOP Mandate:** SOP for Indirect Material Handling Auric Failure Mode 5.1
- **Visual Canvas:** `c2_mrs_cost_center_audit` 

#### 1. Scenario & Visual Context
> "SPOT THE DEFECT: Which critical field on this Material Requisition Slip violates SOP 10_C2_S1 Failure Mode 5.1 and blocks stock issuance?"

#### 2. Exact Test Steps
1. Inspect the visual staging canvas for non-compliances.
2. **Correct Action (PASS):** Tap/Click on the hazard area: **"Cost Center field is BLANK / UNASSIGNED (Violates SAP CO Expense Allocation)"**.
3. Tap **Confirm Defect / Hazard**.
   - *Expected Result:* Defect flagged with red quarantine border, AURA explains resolution, +150 XP awarded.

#### 3. SOP Grounding & Learning Point
> SOP 10_C2_S1 Failure Mode 5.1 strictly establishes: 'The Indirect Stores operator must cross-reference the reservation document against the requesting individual's credentials and verify that the target Cost Center/Storage Location matches the reservation details before executing the Goods Issue.' If the Cost Center is blank, the transaction will fail financial reconciliation in SAP Controlling (CO), and the warehouse operator will be held accountable for inventory discrepancy.

---

### Slice 70: Physical Tracking Sheet & Handover Protocol (`c2_s10_sc04_physical_handover_protocol`)
- **Module:** 10 (Indirect Material Handling (CM01 to MN01)) | **Step in Stage:** Scene 4 of 6
- **Interaction Type:** `SEQUENCE` | **XP Reward:** `+160 XP`
- **SOP Mandate:** SOP for Indirect Material Handling Auric Clauses 4.2, 4.4 & Failure Mode 5.2
- **Visual Canvas:** `c2_indirect_handover_protocol` 

#### 1. Scenario & Visual Context
> "SEQUENCE CHALLENGE: Arrange the 4 standard operating procedure steps for issuing indirect maintenance spares into the correct chronological order."

#### 2. Exact Test Steps
1. Review the unarranged operational steps.
2. **Correct Action (PASS):** Arrange the steps in the exact chronological SOP order:
   - Step 1: **1. Audit SAP YMB21 Reservation Hard Copy & Cost Center**
   - Step 2: **2. Execute System Stock Transfer from CM01 to MN01 in SAP**
   - Step 3: **3. Physically Hand Over Inspected Spares to Maintenance Person**
   - Step 4: **4. Record System Document Number & Sign Offline Tracking Log**
3. Tap **Verify Sequence**.
   - *Expected Result:* Sequence validated with numerical badges, +160 XP awarded.

#### 3. SOP Grounding & Learning Point
> SOP 10_C2_S1 strictly mandates the two-step inventory synchronization rule: 'Indirect Stores must complete the systematic movement (Warehouse Task / Transfer Posting from CM01 to MN01) in SAP first. Parts are physically issued to maintenance personnel only after the system transaction is finalized.' Immediately following physical handover, the document number and recipient signature must be archived in the physical tracking register to maintain a tamper-proof audit trail.

---

### Slice 71: Safety Shoes & PPE JIRA Ticket Requirement Stop/Go (`c2_s10_sc05_ppe_jira_ticket_mandate`)
- **Module:** 10 (Indirect Material Handling (CM01 to MN01)) | **Step in Stage:** Scene 5 of 6
- **Interaction Type:** `STOP_GO` | **XP Reward:** `+125 XP`
- **SOP Mandate:** SOP for Indirect Material Handling Auric Clause 4.1 & Question Bank Q29
- **Visual Canvas:** `ppe_jira_ticket_mandate` 

#### 1. Scenario & Visual Context
> "An associate requests safety shoes and a jacket presenting only an informal handwritten note without a JIRA ticket. Allow or halt? (Question Bank Q29)"

#### 2. Exact Test Steps
1. Review the operational dilemma displayed on the screen.
2. **Correct Action (PASS):** Click the big **🛑 STOP (Halt)** button.
   - *Expected Result:* Button confirms the decision, +125 XP awarded, AURA praises adherence to safety/SOP compliance.
3. **Negative Test (FAIL):** Click the opposite **🟢 GO (Authorize)** button.
   - *Expected Result:* Heart deducted, warning feedback explains the severe risk of bypassing SOP.

#### 3. SOP Grounding & Learning Point
> SOP 10_C2_S1 Clause 4.1 & Question Bank Q29 establishes: 'For SAP-managed maintenance spares, users must present a valid SAP YMB21 reservation hard copy; for uniforms, safety shoes, and specialized PPE, a validated JIRA ticket is required prior to physical handover.' JIRA tracks individual employee entitlement cycles (e.g. 1 pair of shoes per 12 months) and links the asset directly to employee payroll and EHS audit records.

---

### Slice 72: Indirect Stores Reorder Point (ROP) & Purchase Requisition (ME51N) (`c2_s10_sc06_reorder_point_pr`)
- **Module:** 10 (Indirect Material Handling (CM01 to MN01)) | **Step in Stage:** Scene 6 of 6
- **Interaction Type:** `MCQ` | **XP Reward:** `+120 XP`
- **SOP Mandate:** SOP for Indirect Material Handling Auric Clause 4.5 & Procurement Governance
- **Visual Canvas:** `reorder_point_pr_generation` 

#### 1. Scenario & Visual Context
> "When indirect consumables drop below Reorder Point (ROP) in CM01, what is the mandatory SAP workflow to replenish stock?"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"Generate a Purchase Requisition (PR) in SAP via T-Code ME51N against the approved department Cost Center (Clause 4.5)"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+120 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"Send a warehouse associate to a local retail market with petty cash to buy grease cans"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP 10_C2_S1 Clause 4.5 mandates systematic reorder governance: Central Stores (CM01) tracks continuous Reorder Point (ROP) thresholds. When consumption drops inventory below minimum safety buffers, the Store Executive raises a formal Purchase Requisition via SAP ME51N. Procurement then converts the PR into a Purchase Order (PO) to guarantee contracted vendor pricing, quality compliance, and timely delivery.

---


## Module 11: Production Inspection & Quality PIR <a id="module-11-c2-s11"></a>
**Stage ID:** `c2_s11` | **SOP Document:** `05_C2_S3_PIR_AURIC` | **Category:** Category 2: Outbound Line Feed, Material Transfers & Governance
**Total Slices:** 7 Scenes

### Slice 73: JIRA PIR Initiation & Budget ID Mandate (`c2_s11_sc01_jira_budget_id`)
- **Module:** 11 (Production Inspection & Quality PIR) | **Step in Stage:** Scene 1 of 7
- **Interaction Type:** `STOP_GO` | **XP Reward:** `+140 XP`
- **SOP Mandate:** SOP for PIR AURIC Clause 4.1 & Failure Mode 5.2
- **Visual Canvas:** `c2_jira_budget_id` 

#### 1. Scenario & Visual Context
> "DECISION GATE: Can warehouse personnel pick or issue materials when the JIRA PIR ticket is missing a Budget ID?"

#### 2. Exact Test Steps
1. Review the operational dilemma displayed on the screen.
2. **Correct Action (PASS):** Click the big **🛑 STOP (Halt)** button.
   - *Expected Result:* Button confirms the decision, +140 XP awarded, AURA praises adherence to safety/SOP compliance.
3. **Negative Test (FAIL):** Click the opposite **🟢 GO (Authorize)** button.
   - *Expected Result:* Heart deducted, warning feedback explains the severe risk of bypassing SOP.

#### 3. SOP Grounding & Learning Point
> SOP for PIR AURIC Clause 4.1 & Failure Mode 5.2 strictly defines: 'Items requested under the PIR process are considered non-returnable and are charged directly to the requester's Budget ID. Warehouse picker/packer must verify JIRA ticket for dual approvals and valid Budget ID before picking. Failure Point — Issuing Parts Without Budget ID: Material picked and issued without attached Budget ID prevents financial consumption posting and expense charging, resulting in unallocated company write-offs.' Strict financial poka-yoke gates protect plant operational budgets.

---

### Slice 74: Dual Approval Thresholds: Value & Quantity (`c2_s11_sc02_pir_approvals`)
- **Module:** 11 (Production Inspection & Quality PIR) | **Step in Stage:** Scene 2 of 7
- **Interaction Type:** `DRAG_DROP` | **XP Reward:** `+145 XP`
- **SOP Mandate:** SOP for PIR AURIC Clause 4.2 & Failure Mode 5.1
- **Visual Canvas:** `c2_pir_dual_approval` 

#### 1. Scenario & Visual Context
> "APPROVAL ROUTING: Match each emergency PIR request ticket to its mandatory authorization authority under SOP 05_C2_S3 Clause 4.2."

#### 2. Exact Test Steps
1. Observe the **3 draggable cards** and **3 destination drop zones**.
2. **Correct Action (PASS):** Drag and match each item to its assigned destination:
   - Drag **"PIR-A: 2x Battery Packs (Value: ₹1,10,000, Qty: 2)"** → Drop into **"Product Owner (> ₹25,000 Value)"**
   - Drag **"PIR-B: 50x Brake Levers (Value: ₹18,000, Qty: 50)"** → Drop into **"Production Planning (> 25 Units)"**
   - Drag **"PIR-C: 4x Sensor Harnesses (Value: ₹3,200, Qty: 4)"** → Drop into **"Standard Store Issue (Below Thresholds)"**
3. Click **Confirm / Submit Sorting**.
   - *Expected Result:* All items lock into zones with green checkmarks, +145 XP awarded.

#### 3. SOP Grounding & Learning Point
> SOP for PIR AURIC Clause 4.2 & Failure Mode 5.1 explicitly mandates: 'Obtain Product Owner authorization whenever total PIR valuation surpasses INR 25,000. Mandate Planning team approval if any single part quantity exceeds 25 Nos (UoM). Failure Point — High-Value/Bulk Parts Issued Without Approval: Issuing parts, complete batteries, or vehicles without mandatory leadership sign-offs leads to budget overruns and assembly line shortages. Corrective Action: Enforce automated approval gates in JIRA before warehouse assignment.' Dual threshold controls safeguard both budget and production material availability.

---

### Slice 75: The 4:00 PM Dispatch SLA Cutoff Clock (`c2_s11_sc03_pir_cutoff_clock`)
- **Module:** 11 (Production Inspection & Quality PIR) | **Step in Stage:** Scene 3 of 7
- **Interaction Type:** `MCQ` | **XP Reward:** `+145 XP`
- **SOP Mandate:** SOP for PIR AURIC Clause 4.2 & Failure Mode 5.1
- **Visual Canvas:** `c2_pir_cutoff_clock` 

#### 1. Scenario & Visual Context
> "Under SOP 05_C2_S3 Clause 4.2 & Failure Mode 5.1, how does the 4:00 PM daily cutoff determine PIR outbound dispatch timelines?"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"PIR tickets approved prior to 4:00 PM are dispatched same-day; tickets approved after the 4:00 PM daily cutoff are automatically queued for picking and dispatch on the next working day"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+145 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"Warehouse operators are forced to work until midnight to pack every late ticket immediately regardless of carrier cutoff"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP for PIR AURIC Clause 4.2 & Failure Mode 5.1 explicitly defines: 'Track and complete all necessary approvals prior to 4:00 PM daily cutoff to meet same-day or next-working-day SLA. PIRs approved before 4:00 PM on a standard working day are dispatched or issued same day. Requests cleared after 4:00 PM are automatically scheduled for the next working day. Failure Point — Missed 4 PM Cutoff & Delayed Dispatches: Approvals cleared late in the shift miss transport carrier connections; strict adherence to the 4 PM cutoff eliminates dock congestion and guarantees reliable logistics scheduling.' Setting an uncompromised 4 PM gate prevents shift handover chaos.

---

### Slice 76: SAP STO Processing & E-Way Bill Gate Compliance (`c2_s11_sc04_sap_sto_compliance`)
- **Module:** 11 (Production Inspection & Quality PIR) | **Step in Stage:** Scene 4 of 7
- **Interaction Type:** `MCQ` | **XP Reward:** `+150 XP`
- **SOP Mandate:** SOP for PIR AURIC Clause 4.3 & Failure Mode 5.4
- **Visual Canvas:** `c2_sap_sto_compliance` 

#### 1. Scenario & Visual Context
> "Under SOP 05_C2_S3 Clause 4.3 and Failure Mode 5.4, what documentation kit is legally required to authorize outbound material gate exit?"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"A complete 3-part documentation kit: Printed SAP Invoice (YPR_STO / ZSTO or ZGST), manual Delivery Challan (DC), and a mandatory Government E-Way Bill"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+150 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"A warm handshake and verbal promise from the truck driver that the parts are legitimate"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP for PIR AURIC Clause 4.3 & Failure Mode 5.4 mandates: 'Gate Control, E-Way Bill & Transport Compliance Failures — Failure Point: Shipments loaded and sent to material gate without required transport documentation result in security holds and severe regulatory penalties under GST transport laws. Corrective Action: Mandate full documentation kit before vehicle loading. Generate E-Way Bill (mandatory for all outbound shipments regardless of financial value) alongside manual Delivery Challan (DC) and printed SAP Invoice (YPR_STO via ZSTO/ZGST).' Security boom barriers remain locked down until every legal document is validated.

---

### Slice 77: PIR Destination Routing Actions (Same Location vs IBC vs Vendor) (`c2_s11_sc05_pir_destination_routing`)
- **Module:** 11 (Production Inspection & Quality PIR) | **Step in Stage:** Scene 5 of 7
- **Interaction Type:** `DRAG_DROP` | **XP Reward:** `+135 XP`
- **SOP Mandate:** SOP for PIR AURIC Clause 4.3 & Question Bank Q8
- **Visual Canvas:** `pir_destination_routing_matrix` 

#### 1. Scenario & Visual Context
> "Match each PIR destination to its mandatory operational action under Question Bank Q8:"

#### 2. Exact Test Steps
1. Observe the **3 draggable cards** and **3 destination drop zones**.
2. **Correct Action (PASS):** Drag and match each item to its assigned destination:
   - Drag **"Pick, pack, and consume directly against the Budget ID in SAP (Q8)"** → Drop into **"Same Location (Internal Plant)"**
   - Drag **"Raise Stock Transport Order (STO PO) in SAP along with picking (Q8)"** → Drop into **"IBC (Inter-Branch / Another Plant)"**
   - Drag **"Consume against Budget ID, make manual Delivery Challan (DC), dispatch (Q8)"** → Drop into **"Vendor / Supplier Dispatch"**
3. Click **Confirm / Submit Sorting**.
   - *Expected Result:* All items lock into zones with green checkmarks, +135 XP awarded.

#### 3. SOP Grounding & Learning Point
> SOP for PIR AURIC Clause 4.3 & Question Bank Q8: Material issued under PIR must follow strict legal and tax routing: internal plant consumption is settled directly against the department Budget ID; inter-branch transfers to other plants require a formal SAP Stock Transport Order (STO PO) to track inter-plant custody; and vendor returns/dispatches require manual Delivery Challans (DC) with registered tax invoice numbers.

---

### Slice 78: SAP Billing Document Types (ZSTO Intra-State vs ZGST Inter-State) (`c2_s11_sc06_sap_billing_document_types`)
- **Module:** 11 (Production Inspection & Quality PIR) | **Step in Stage:** Scene 6 of 7
- **Interaction Type:** `MCQ` | **XP Reward:** `+140 XP`
- **SOP Mandate:** SOP for PIR AURIC Clause 4.3 & Question Bank Q31
- **Visual Canvas:** `sap_billing_types_matrix` 

#### 1. Scenario & Visual Context
> "In SAP billing transaction VF01, how are document types ZSTO and ZGST applied under Question Bank Q31?"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"ZSTO: Tax-free stock transfer inside the same state; ZGST: Taxable transfer to another state requiring an e-Invoice (Q31)"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+140 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"ZSTO is for international ocean exports; ZGST is for scrapped wooden pallets"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.3 & Question Bank Q31: Indian GST legislation requires precise classification of stock transfers. In SAP transaction VF01, ZSTO is used for intra-state transfers within the same GSTIN/State boundary where IGST is zero. ZGST applies to inter-state shipments crossing state lines, requiring formal tax calculation, GST e-Invoice generation, and portal IRN clearance.

---

### Slice 79: JIRA PIR Lifecycle Ticket Closure & Proof of Handover (`c2_s11_sc07_pir_ticket_closure`)
- **Module:** 11 (Production Inspection & Quality PIR) | **Step in Stage:** Scene 7 of 7
- **Interaction Type:** `MCQ` | **XP Reward:** `+140 XP`
- **SOP Mandate:** SOP for PIR AURIC Clause 4.4 & Question Bank Q32
- **Visual Canvas:** `pir_ticket_closure_handover` 

#### 1. Scenario & Visual Context
> "The PIR parts have been dispatched. What officially closes the PIR process? (Question Bank Q32)"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"Update transit details in JIRA, attach the signed receipt (Proof of Handover), and set status to “Closed” (Q32)"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+140 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"Nothing — once the truck drives away, the warehouse associate can forget about it"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.4 & Question Bank Q32: A dispatched PIR is not concluded until proof of custody is uploaded. The operator must record vehicle numbers, driver contact, and tracking details in JIRA, upload the signed Lorry Receipt (LR) / Proof of Handover (PoH), and officially transition the status to 'Closed'. Leaving tickets open after physical dispatch creates ghost inventory discrepancies during quarterly financial audits.

---


## Module 12: Reverse Logistics, Scrap & Empty Bin Loading <a id="module-12-c2-s12"></a>
**Stage ID:** `c2_s12` | **SOP Document:** `06_C2_S4_NG_RTV, 07_C2_S4_NG_Scrap & 08_C2_S4_Empty_Bin_Collection` | **Category:** Category 2: Outbound Line Feed, Material Transfers & Governance
**Total Slices:** 12 Scenes

### Slice 80: Empty Container Collection & Defect Inspection (`c2_s12_sc01_defective_container_spotting`)
- **Module:** 12 (Reverse Logistics, Scrap & Empty Bin Loading) | **Step in Stage:** Scene 1 of 12
- **Interaction Type:** `SPOT_ERROR` | **XP Reward:** `+145 XP`
- **SOP Mandate:** SOP-EMPTYBIN COLLECTION AND LOADING Auric Clause 4.1
- **Visual Canvas:** `c2_empty_bin_stacking` 

#### 1. Scenario & Visual Context
> "SPOT THE DEFECT: Which returnable plastic container has physical damage or foreign contamination that prevents pallet stacking?"

#### 2. Exact Test Steps
1. Inspect the visual staging canvas for non-compliances.
2. **Correct Action (PASS):** Tap/Click on the hazard area: **"Ather Blue Tote #450X: Cracked Lower Corner Ribs with Sharp Metal Swarf Chips Inside"**.
3. Tap **Confirm Defect / Hazard**.
   - *Expected Result:* Defect flagged with red quarantine border, AURA explains resolution, +145 XP awarded.

#### 3. SOP Grounding & Learning Point
> SOP-EMPTYBIN COLLECTION AND LOADING Auric Clause 4.1 specifies that empty returnable packaging must be verified for structural cleanliness and physical integrity. Shipping cracked or foreign-object-contaminated (FOD) totes back to vendors risks severe surface scratching and mounting boss deformation on incoming precision parts, while compromised base ribs increase pallet toppling hazards during truck transit.

---

### Slice 81: Supplier 3-Day SLA & 'Use As It Is' Deviation Route (`c2_s12_sc02_rtv_deviation`)
- **Module:** 12 (Reverse Logistics, Scrap & Empty Bin Loading) | **Step in Stage:** Scene 2 of 12
- **Interaction Type:** `MCQ` | **XP Reward:** `+150 XP`
- **SOP Mandate:** SOP for NG - RTV Clauses 4.2 to 4.5
- **Visual Canvas:** `c2_rtv_deviation` 

#### 1. Scenario & Visual Context
> "Line assembly is starved for handlebar sleeves with a minor cosmetic tint flaw. Under SOP 06_C2_S4 Clauses 4.4 & 4.5, what is the mandatory approval and SAP stock conversion sequence for a 'Use As It Is' deviation?"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"Product Owner approves JIRA Deviation → Status 'Deviation Accepted' → WH moves stock to QI in SAP & updates 'Available for Build' → IQC posts QI to UR (Unrestricted)"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+150 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"Line Supervisor verbally signs off on the shop floor → Warehouse immediately issues parts from NG blocked cage straight to the assembly workstations without SAP postings"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP for NG - RTV Clause 4.2 specifies that all supplier-caused defects automatically receive the 'RTV' disposition in JIRA with a 3-Day SLA. Clause 4.4 explicitly mandates: 'Product owner is to either approve or reject the Deviation request after going through the problem and justification mentioned in the JIRA Deviation Ticket.' Under Clause 4.5, upon securing 'Deviation Accepted' status, Warehouse moves material to staging and transfers stock in SAP to QI (Quality Inspection), updating JIRA to 'Deviated: Available for Build'. The IQC team then executes the final SAP movement from QI to UR (Unrestricted) for vehicle assembly. No shop supervisor or vendor has the authority to bypass this chain of custody.

---

### Slice 82: Empty Bin Stacking, 5-Foot Height Limit & Gangway Clearance (`c2_s12_sc03_empty_bin_stacking`)
- **Module:** 12 (Reverse Logistics, Scrap & Empty Bin Loading) | **Step in Stage:** Scene 3 of 12
- **Interaction Type:** `STOP_GO` | **XP Reward:** `+145 XP`
- **SOP Mandate:** SOP-EMPTYBIN COLLECTION AND LOADING Auric Clause 4.1
- **Visual Canvas:** `c2_empty_bin_stacking` 

#### 1. Scenario & Visual Context
> "DECISION GATE: Can an operator stack empty plastic bins higher than 5 feet (operator height) to conserve shop floor gangway space?"

#### 2. Exact Test Steps
1. Review the operational dilemma displayed on the screen.
2. **Correct Action (PASS):** Click the big **🛑 STOP (Halt)** button.
   - *Expected Result:* Button confirms the decision, +145 XP awarded, AURA praises adherence to safety/SOP compliance.
3. **Negative Test (FAIL):** Click the opposite **🟢 GO (Authorize)** button.
   - *Expected Result:* Heart deducted, warning feedback explains the severe risk of bypassing SOP.

#### 3. SOP Grounding & Learning Point
> SOP-EMPTYBIN COLLECTION AND LOADING Auric Clause 4.1 sets the gold standard for material handling ergonomics and safety: 'Strictly ensure that the stacking of bins does not exceed the height of the operator (5 feet) to maintain visibility and prevent tipping. Also he must put the belt around the bins to avoid tripping & falling of parts.' Over-stacking obscures the driver's forward visibility when operating a pallet truck and shifts the center of gravity dangerously upward, making cornering prone to tip-overs. Empty bin sweeps must happen every 30 minutes to manage volume without compromising the 5-foot height ceiling.

---

### Slice 83: Reverse Truck Loading, Delivery Challan & Grand Finale (`c2_s12_sc04_reverse_truck_loading`)
- **Module:** 12 (Reverse Logistics, Scrap & Empty Bin Loading) | **Step in Stage:** Scene 4 of 12
- **Interaction Type:** `SEQUENCE` | **XP Reward:** `+160 XP`
- **SOP Mandate:** SOP for NG - RTV Clause 4.10 & SOP-EMPTYBIN Clause 4.2
- **Visual Canvas:** `c2_reverse_truck_loading` | **Video Source:** `/Assets/8%20Sequential%20Scenes/8%20Empty%20Bin%20Stacking%20%26%20Strapping/scene_08_empty_bin_strapping.mp4`

#### 1. Scenario & Visual Context
> "DISPATCH SEQUENCE: Arrange the 4 standard operating procedure steps for reverse truck loading and factory gate clearance into the correct chronological order."

#### 2. Exact Test Steps
1. Review the unarranged operational steps.
2. **Correct Action (PASS):** Arrange the steps in the exact chronological SOP order:
   - Step 1: **1. Verify Segregated Empty Bins (≤ 5 Ft) & Red-Tagged RTV Crates**
   - Step 2: **2. Generate SAP Delivery Challan (DC) & Mandatory E-Way Bill**
   - Step 3: **3. Transporter Signs Lorry Receipt (LR) Proof of Handover (PoH)**
   - Step 4: **4. Attach PoH to JIRA Ticket & Update to 'Returned to Vendor'**
3. Tap **Verify Sequence**.
   - *Expected Result:* Sequence validated with numerical badges, +160 XP awarded.

#### 3. SOP Grounding & Learning Point
> SOP for NG - RTV Clause 4.10 explicitly mandates: 'Transporters issue an LR detailing box counts and quantities as Proof of Handover (PoH)... Attach PoH/PoD documents to the batch JIRA ticket for audit tracking and transition the JIRA status to Returned to vendor post physical movement.' Along with SOP 08_C2_S4, materials cannot leave Ather premises without a legally binding SAP Delivery Challan (DC), mandatory E-Way Bill, and verified physical strapping. Completing this closed-loop sequence maintains 100% financial audit compliance and eliminates phantom stock across all Ather Energy plant facilities.

---

### Slice 84: Line-Side Empty Bin Abandonment Violation (`c2_s12_sc05_gangway_choke_prevention`)
- **Module:** 12 (Reverse Logistics, Scrap & Empty Bin Loading) | **Step in Stage:** Scene 5 of 12
- **Interaction Type:** `STOP_GO` | **XP Reward:** `+125 XP`
- **SOP Mandate:** SOP-EMPTYBIN COLLECTION AND LOADING Clause 4.1 & Question Bank Q26
- **Visual Canvas:** `line_side_gangway_choke` 

#### 1. Scenario & Visual Context
> "Empty trolleys and bins are left abandoned at the line side walkway. Allow or halt? (Question Bank Q26)"

#### 2. Exact Test Steps
1. Review the operational dilemma displayed on the screen.
2. **Correct Action (PASS):** Click the big **🛑 STOP (Halt)** button.
   - *Expected Result:* Button confirms the decision, +125 XP awarded, AURA praises adherence to safety/SOP compliance.
3. **Negative Test (FAIL):** Click the opposite **🟢 GO (Authorize)** button.
   - *Expected Result:* Heart deducted, warning feedback explains the severe risk of bypassing SOP.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.1 & Question Bank Q26: Leaving empty containers at the line side chokes active assembly gangways, obstructs yellow fire escape pathways, and creates physical bottlenecks. Dedicated empty bin collectors managed by the Empty Collection Zone Leader must sweep lines every 30 minutes to move containers to the segregation area for supplier truck turnaround.

---

### Slice 85: Supplier 3-Day SLA Breach & Courier Debit Note (`c2_s12_sc06_supplier_sla_courier_debit`)
- **Module:** 12 (Reverse Logistics, Scrap & Empty Bin Loading) | **Step in Stage:** Scene 6 of 12
- **Interaction Type:** `MCQ` | **XP Reward:** `+135 XP`
- **SOP Mandate:** SOP for NG - RTV Clause 4.3 & Question Bank Q34
- **Visual Canvas:** `supplier_sla_courier_debit` 

#### 1. Scenario & Visual Context
> "The supplier does not arrange pick-up of rejected RTV parts within 3 working days. What does the warehouse do? (Question Bank Q34)"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"Send the parts by commercial courier, debit shipping cost to supplier, and attach debit note PDF to JIRA (Q34)"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+135 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"Wait indefinitely until the supplier decides to send a truck months later"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.3 & Question Bank Q34 establishes an ironclad 3-day SLA: If the supplier fails to arrange pickup within 3 working days of JIRA notification, the warehouse dispatches the parts via commercial courier. The freight expense is debited to the supplier via SAP commercial debit note, with the courier consignment note attached to the ticket.

---

### Slice 86: The 'Use As Is' Deviation Lifecycle Sequence (`c2_s12_sc07_use_as_is_sequence`)
- **Module:** 12 (Reverse Logistics, Scrap & Empty Bin Loading) | **Step in Stage:** Scene 7 of 12
- **Interaction Type:** `SEQUENCE` | **XP Reward:** `+140 XP`
- **SOP Mandate:** SOP for NG - RTV Clause 4.5 & Question Bank Q36
- **Visual Canvas:** `use_as_is_sequence_lifecycle` 

#### 1. Scenario & Visual Context
> "Put the 4 steps of the “Use As Is” deviation lifecycle into the exact SOP sequence (Question Bank Q36):"

#### 2. Exact Test Steps
1. Review the unarranged operational steps.
2. **Correct Action (PASS):** Arrange the steps in the exact chronological SOP order:
   - Step 1: **JIRA Ticket approved by Product Owner shows “Deviation Accepted” (a)**
   - Step 2: **Warehouse moves parts to staging, SAP stock to QI, JIRA updated to “Deviated: Available for Build” (b)**
   - Step 3: **IQC conducts verification audit and executes system transfer from QI to UR in SAP (c)**
   - Step 4: **Parts are physically issued and fed to the vehicle assembly line (d)**
3. Tap **Verify Sequence**.
   - *Expected Result:* Sequence validated with numerical badges, +140 XP awarded.

#### 3. SOP Grounding & Learning Point
> SOP for NG - RTV Clause 4.5 & Question Bank Q36 strictly mandates: a -> b -> c -> d. Deviation approval alone does not permit assembly use; warehouse personnel first physically stage the parts and move stock to QI (Quality Inspection). IQC must then perform final verification and post the goods movement into UR (Unrestricted stock) before line feeding occurs.

---

### Slice 87: Reworked Parts Direct-to-Line Prohibition (`c2_s12_sc08_reworked_parts_inspection`)
- **Module:** 12 (Reverse Logistics, Scrap & Empty Bin Loading) | **Step in Stage:** Scene 8 of 12
- **Interaction Type:** `STOP_GO` | **XP Reward:** `+135 XP`
- **SOP Mandate:** SOP for NG - RTV Clause 4.6 & Question Bank Q37
- **Visual Canvas:** `reworked_parts_tightened_inspection` 

#### 1. Scenario & Visual Context
> "Reworked parts come back from repair. Can they go straight to the assembly line? (Question Bank Q37)"

#### 2. Exact Test Steps
1. Review the operational dilemma displayed on the screen.
2. **Correct Action (PASS):** Click the big **🛑 STOP (Halt)** button.
   - *Expected Result:* Button confirms the decision, +135 XP awarded, AURA praises adherence to safety/SOP compliance.
3. **Negative Test (FAIL):** Click the opposite **🟢 GO (Authorize)** button.
   - *Expected Result:* Heart deducted, warning feedback explains the severe risk of bypassing SOP.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.6 & Question Bank Q37: Reworked materials represent prior failures and carry residual structural or dimensional risk. They can never bypass quality gates. SAP stock must be re-posted to QI (Quality Inspection), JIRA updated to 'Rework Done', and IQC must perform a mandatory 1.5x tightened sampling inspection before any transfer to Unrestricted stock is authorized.

---

### Slice 88: Non-Supplier Scrap Sign-Off Protocol (`c2_s12_sc09_non_supplier_scrap_protocol`)
- **Module:** 12 (Reverse Logistics, Scrap & Empty Bin Loading) | **Step in Stage:** Scene 9 of 12
- **Interaction Type:** `MCQ` | **XP Reward:** `+135 XP`
- **SOP Mandate:** SOP for NG - Scrap Clause 4.1 & Question Bank Q38
- **Visual Canvas:** `scrap_approval_signoff_gate` 

#### 1. Scenario & Visual Context
> "What is mandatory before non-supplier rejected parts are scrapped? (Question Bank Q38)"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"Written approval from Production/Functional Head and an authorized Scrap Approval Note (Q38)"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+135 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"A casual verbal OK from any associate on the floor"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.1 & Question Bank Q38: Scrapping plant assets impacts factory financial balance sheets. For non-vendor in-house defects, formal authorization requires a signed Scrap Approval Note from the Functional Head and Finance. Only upon receiving this document can the warehouse transfer inventory to the SAP scrap storage location (SC01), move parts to the shredder yard, and update JIRA to 'Scrapped'.

---

### Slice 89: Empty Bin Segregation & Supplier Truck Docking Dashboard (`c2_s12_sc10_empty_bin_segregation_dashboard`)
- **Module:** 12 (Reverse Logistics, Scrap & Empty Bin Loading) | **Step in Stage:** Scene 10 of 12
- **Interaction Type:** `DRAG_DROP` | **XP Reward:** `+130 XP`
- **SOP Mandate:** SOP-EMPTYBIN COLLECTION AND LOADING Clause 4.2 & Question Bank Q40
- **Visual Canvas:** `empty_bin_truck_dashboard` 

#### 1. Scenario & Visual Context
> "How do you sort empty bins in the segregation area, and route them to docked trucks? (Question Bank Q40)"

#### 2. Exact Test Steps
1. Observe the **2 draggable cards** and **2 destination drop zones**.
2. **Correct Action (PASS):** Drag and match each item to its assigned destination:
   - Drag **"Grey Heavy-Duty Totes with Caliper Mold Inserts (Supplier 1042)"** → Drop into **"Bay A: Supplier 1042 (Brake Calipers & Mounts)"**
   - Drag **"Blue Returnable Plastic Trays with Foam Dividers (Supplier 2088)"** → Drop into **"Bay B: Supplier 2088 (Plastic Body Panels & Fairings)"**
3. Click **Confirm / Submit Sorting**.
   - *Expected Result:* All items lock into zones with green checkmarks, +130 XP awarded.

#### 3. SOP Grounding & Learning Point
> SOP Clause 4.2 & Question Bank Q40: Returnable packaging assets are custom-engineered for specific component geometries and owned by designated Tier-1 suppliers. Segregating bins strictly by supplier ID and part number in marked bays prevents cross-contamination. Operators cross-reference the plant's live Supplier Truck Docking Dashboard to route the correct empty assets to the matching docked transport truck.

---

### Slice 90: Recalled Material Re-Inspection Disposition (`c2_s12_sc11_recalled_material_disposition`)
- **Module:** 12 (Reverse Logistics, Scrap & Empty Bin Loading) | **Step in Stage:** Scene 11 of 12
- **Interaction Type:** `MCQ` | **XP Reward:** `+140 XP`
- **SOP Mandate:** SOP for Plant Quality Containment Clause 5.1 & Question Bank Q41
- **Visual Canvas:** `recalled_material_reinspection` 

#### 1. Scenario & Visual Context
> "A recalled lot of parts fails quality re-inspection. What happens under Ather SOP? (Question Bank Q41)"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"Stock moves to Blocked in SAP, NG team moves it to NG area, and the RTV process starts (Q41)"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+140 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"It goes straight back to Unrestricted stock to avoid causing assembly line delays"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> SOP Quality Containment Clause 5.1 & Question Bank Q41: When material recalled from the shopfloor fails re-inspection, it is immediately locked in SAP as Blocked Stock. The NG logistics team physically moves the entire lot to the Caged Quarantine Store SC01 BL, where the standard RTV (Return To Vendor) debit-note process is initiated. If it had passed re-inspection, it would have been restored to Unrestricted stock.

---

### Slice 91: AURIC Plant Grandmaster Graduation: Zero Defect Traceability (`c2_s12_sc12_grandmaster_graduation`)
- **Module:** 12 (Reverse Logistics, Scrap & Empty Bin Loading) | **Step in Stage:** Scene 12 of 12
- **Interaction Type:** `MCQ` | **XP Reward:** `+200 XP`
- **SOP Mandate:** Ather AURIC Plant M002 Master Warehouse Operating Doctrine & Zero-Defect Quality Policy
- **Visual Canvas:** `grandmaster_celebration_fireworks` 

#### 1. Scenario & Visual Context
> "What core operational principle unites all 12 modules of the Ather AURIC Plant M002 Warehouse System?"

#### 2. Exact Test Steps
1. Observe the question card displaying **4 options**.
2. **Correct Action (PASS):** Tap/Click **"Uncompromising Dual-Verification: Every physical movement must be married to real-time digital scans (SAP EWM, MES, JIRA) ensuring zero defect leakage & 100% VIN traceability"**.
   - *Expected Result:* Option highlights green, AURA mascot shows thumbs-up (`success`), awards **+200 XP**, and enables the **Continue** button.
3. **Negative Test (FAIL):** Tap any distractor, e.g., *"Speed at all costs: Bypass all barcode scans and paperwork whenever the assembly line is running behind schedule"*.
   - *Expected Result:* Card turns red, 1 Heart deducted (from 3), AURA mascot switches to alarm pose (`warning`), and corrective SOP feedback explains why.

#### 3. SOP Grounding & Learning Point
> The foundational doctrine of Ather AURIC Plant M002 is zero defect escape through airtight dual-verification. Physical custody and digital system state must remain 100% synchronized at all times across all stages: Gate Entry, IQC Inspection, Storage Bin Marriage, Battery Climate Control, Chemical Isolation, Supermarket FIFO, Caged Quarantine, MES Line Picking, Paint Decanting, Indirect Stores, Quality PIR, and Reverse Logistics. This disciplined execution guarantees world-class electric vehicle safety, reliability, and manufacturing excellence.

---

## Global Test Harness & Edge Cases

### 1. Trilingual Language Switcher
- **Action:** Tap the `EN`, `HI`, or `MR` language pills at the top right of the Story HUD.
- **Verification:** All question prompts, option labels, mascot dialogues, buttons, and SOP explanations must update instantly without page reload.

### 2. Audio & Spoken Voiceover
- **Action:** Tap the speaker icon on the AURA mascot card.
- **Verification:** Plays the authentic Neerja voiceover clip (if available) or falls back to Web SpeechSynthesis in the chosen language (`en-IN`, `hi-IN`, `mr-IN`).

### 3. Heart Depletion & Stage Restart
- **Action:** Intentionally answer incorrectly 3 times to consume all 3 hearts.
- **Verification:** Modal triggers: *"Shift Interrupted — SOP Violation Limit Reached"*. Allows restarting the stage with full hearts.

### 4. Touch Target Calibration (≥ 64px)
- **Action:** Open Chrome DevTools in Mobile Device Mode (e.g. Pixel 7 / iPhone 14).
- **Verification:** All option buttons, stepper counters, drag handles, and navigation pills measure ≥ 64px height for rugged floor terminal usability.

### 5. 100% Offline PWA Mode
- **Action:** In Chrome DevTools → Network tab, select **Offline**, then refresh the page.
- **Verification:** App loads instantly from Service Worker cache; all 12 modules and visual fallbacks operate with zero network access.
