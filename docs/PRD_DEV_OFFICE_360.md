# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Virtual Office Live AI Squad: "DevOffice-360"
### 3D Multi-Agent Observability: Interactive Workstation, Dynamic Jobdesk Laptop Typing, and Idle Coffee Break Simulation

**Version:** 1.2.0  
**Stack:** Next.js 15 (Static Export `output: 'export'`) + Three.js + React Three Fiber (`@react-three/fiber`) + Drei + Tailwind CSS + shadcn/ui  
**Runtime & Infra:** Nginx Alpine Container (< 15MB RAM idle, 0% CPU, No dev server on VPS)  
**Author:** Lead AI Architect (Autonomous Squad)

---

## 1. Executive Summary & Core Concept

**DevOffice-360** adalah antarmuka visualisasi 3D real-time berorientasi status agen (*agent state-driven 3D office observability*). 

Sistem ini merefleksikan aktivitas nyata tim AI autonomous ke dalam ruang kerja virtual isometrik:
1. **Dynamic Task-Active State (Sibuk Mengetik Laptop Sesuai Jobdesk)**:
   - Ketika ada task yang dialokasikan, agen terkait langsung bersandar maju ke laptopnya (*typing pose*).
   - Tangan/lengan agen beranimasi mengetik di atas keyboard laptop.
   - Layar monitor/laptop menyala terang dengan warna neon spesifik peran dan menampilkan efek live text streaming sesuai spesialisasi kerjanya.
2. **Idle State (Diam Sambil Minum Kopi Hangat)**:
   - Ketika tidak ada task yang sedang dikerjakan (IDLE / standby), agen bersandar santai di kursinya.
   - Laptop tertutup atau meredup (*sleep mode*).
   - Agen memegang/mengangkat cangkir kopi (*steaming coffee mug*) ke arah mulut secara berkala, menikmati waktu istirahat tanpa aktivitas ketikan.
3. **Data Laser Beam Inter-Agent**:
   - Aliran partikel sinar 3D melengkung berpindah dari satu meja ke meja lain saat terjadi serah-terima artefak (PM ➔ Backend ➔ Frontend ➔ QA).

---

## 2. Model Interaksi Perilaku 3D (Dual-State: Task vs Coffee)

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│                    DUAL-STATE 3D CHARACTER BEHAVIOR                          │
├────────────────────────────────────────┬─────────────────────────────────────┤
│   STATE A: ACTIVE TASK (WORKING)       │   STATE B: NO TASK (IDLE / RELAX)   │
├────────────────────────────────────────┼─────────────────────────────────────┤
│ • Pose: Condong ke depan (lean-in 15°) │ • Pose: Duduk tegak santai/bersandar│
│ • Tangan: Animasi mengetik cepat di    │ • Tangan: Mengangkat cangkir kopi ke│
│   keyboard laptop (procedural typing)  │   arah wajah (animasi sipping cup)  │
│ • Laptop: Layar terbuka 105°, LED neon │ • Laptop: Layar redup/standby mode  │
│   glow aktif sesuai peran              │ • Cangkir Kopi: Partikel uap hangat │
│ • Layar Laptop: Matrix/code stream     │   (steam plume) di atas mug keramik │
│ • Lampu Status: Sinar fokus kerja aktif│ • Lampu Status: Ambient redup hangat│
└────────────────────────────────────────┴─────────────────────────────────────┘
```

---

## 3. Personas, Workstations & Jobdesk Laptop Actions

| Role Agent | Nama & Pakaian | Workstation Setup | Tampilan Laptop & Aksi Saat Ada Task | Aksi Saat Idle (Tanpa Task) |
|---|---|---|---|---|
| **Lead / PM** | **Ken**<br>• Navy Blazer<br>• Kemeja Putih<br>• ID Lanyard | Command Desk tengah, dual wide monitor, papan sprint | Mengetik breakdown user prompt, menyusun tiket Jira/PRD, melempar spesifikasi teknis ke tim backend. | Bersandar rileks di kursi ergonomis, menyeruput kopi hitam (*espresso cup*). |
| **Backend** | **Alex**<br>• Emerald Hoodie<br>• Jogger Pants<br>• Sneaker Tech | Pod kiri, Server Rack mini berkedip, monitor vertikal | Mengetik cepat DTO NestJS, query Prisma, database migration, dan validasi token auth. | Meletakkan tangan santai di meja, memegang tumbler kopi hijau, mengamati server idle. |
| **Frontend** | **Elena**<br>• Rose Jacket<br>• Kacamata UI<br>• Rambut Modern | Pod kanan, color palette swatch, tablet grafis | Mengetik komponen JSX/shadcn, menyusun layout Tailwind responsif, dan menguji interaksi visual. | Duduk santai menikmati kopi latte dalam mug pink pastel sambil melihat referensi desain. |
| **QA Tester** | **Maya**<br>• Violet Tech Vest<br>• Headset Audio<br>• Dark Tees | Pod depan, Playwright test dashboard, status bar | Mengetik skrip assertion E2E, menekan run test suite, memverifikasi status code HTTP 200/201. | Mendengarkan musik di headset sambil memegang cangkir kopi ungu hangat. |

---

## 4. UI/UX ASCII PREVIEW (DESAIN COCKPIT OBSERVABILITAS)

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ ⚡ DevOffice-360  [3D Live Squad Virtual Observability]    [🟢 SYSTEM ONLINE] │
├─────────────────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ 3D VIRTUAL SQUAD OFFICE FLOOR                     [🖱️ Orbit / Rotate / Zoom]│ │
│ │                                                                         │ │
│ │                             [ 👔 KEN (PM) ]                             │ │
│ │                         Navy Blazer • Command Desk                      │ │
│ │                   [Animasi: Mengetik Tiket & PRD Specs]                 │ │
│ │                                    │                                    │ │
│ │                  ┌─────────────────┴─────────────────┐                  │ │
│ │         ⚡ Sinar Laser PRD Specs             ⚡ Sinar Laser UI Tokens    │ │
│ │                  ▼                                   ▼                  │ │
│ │       [ ⚙️ ALEX (BACKEND) ]                 [ 🎨 ELENA (FRONTEND) ]       │ │
│ │   Emerald Hoodie • Server Rack          Rose Jacket • UI Canvas Desk    │ │
│ │  [Animasi: Mengetik API Endpoint]     [Animasi: Mengetik shadcn UI JSX] │ │
│ │                  │                                   │                  │ │
│ │                  └─────────────────┬─────────────────┘                  │ │
│ │                                    ▼                                    │ │
│ │                             [ 🔍 MAYA (QA) ]                            │ │
│ │                       Violet Vest • Headset Tester                      │ │
│ │                  [Animasi: Mengetik Playwright Tests]                   │ │
│ │                                                                         │ │
│ │ * Catatan: Ketika task selesai, karakter berhenti mengetik & minum kopi │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ ⌨️ PROMPT CONTROLLER / TASK DISPATCHER          [STATUS: READY FOR INPUT]│ │
│ │ ┌────────────────────────────────────────────────────────┐ ┌──────────┐ │ │
│ │ │ Masukkan prompt instruksi (atau klik preset simulasi)...│ │  KIRIM   │ │ │
│ │ └────────────────────────────────────────────────────────┘ └──────────┘ │ │
│ │ Quick Simulation Presets:                                               │ │
│ │ [✨ Fitur Baru: Auth MFA + UI]  [🐛 Bug Fix: Query Timeout]  [☕ Set All IDLE]│ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐ │
│ │ 👔 KEN (LEAD)  │ │ ⚙️ ALEX (BE)    │ │ 🎨 ELENA (FE)  │ │ 🔍 MAYA (QA)   │ │
│ │ Aksi: TYPING   │ │ Aksi: TYPING   │ │ Aksi: COFFEE   │ │ Aksi: COFFEE   │ │
│ │ Task: Specs    │ │ Task: Endpoint │ │ Task: Standby  │ │ Task: Standby  │ │
│ │ Laptop: [ON]   │ │ Laptop: [ON]   │ │ Laptop: [OFF]  │ │ Laptop: [OFF]  │ │
│ │ Mug: [Di Meja] │ │ Mug: [Di Meja] │ │ Mug: [SIPIING] │ │ Mug: [SIPPING] │ │
│ └────────────────┘ └────────────────┘ └────────────────┘ └────────────────┘ │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ 📜 REAL-TIME WORKFLOW & ACTIVITY TELEMETRY FEED              [Live Stream]│ │
│ │ [15:42:01] 👔 Ken: Dispatched task specs to Alex (Backend).               │ │
│ │ [15:42:03] ⚙️ Alex: Active typing on NestJS controller. Elena on coffee.  │ │
│ │ [15:42:07] 🎨 Elena: Finished UI preview. Now relaxing with latte.       │ │
│ │ [15:42:10] 🔍 Maya: Suite passed 100%. Enjoying coffee break with team. │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Implementasi Teknis Animasi Tangan & Kopi (Three.js / R3F)

Mengikuti skill **`r3f-best-practices`**, implementasi animasi memanfaatkan mutasi ref langsung di dalam `useFrame` tanpa memicu re-render React:

1. **Animasi Mengetik Laptop (`status === 'WORKING' | 'TESTING'`):**
   ```tsx
   // Menggerakkan lengan dan tangan kiri-kanan bergantian di atas keyboard
   useFrame((state) => {
     if (isWorking) {
       const t = state.clock.getElapsedTime() * 12;
       leftHandRef.current.position.y = baseY + Math.sin(t) * 0.04;
       rightHandRef.current.position.y = baseY + Math.cos(t) * 0.04;
       spineRef.current.rotation.x = 0.25; // Condong maju ke laptop
       laptopScreenRef.current.material.emissiveIntensity = 0.8 + Math.sin(t * 2) * 0.2;
     }
   });
   ```

2. **Animasi Minum Kopi (`status === 'IDLE'`):**
   ```tsx
   // Menarik tangan memegang cangkir ke arah mulut secara berkala
   useFrame((state) => {
     if (isIdle) {
       const t = state.clock.getElapsedTime() * 1.5;
       const sipCycle = Math.sin(t);
       spineRef.current.rotation.x = -0.08; // Bersandar rileks ke belakang
       if (sipCycle > 0.4) {
         // Mengangkat mug kopi ke dekat kepala
         coffeeArmRef.current.position.y = handY + (sipCycle - 0.4) * 0.35;
         coffeeArmRef.current.rotation.z = -0.4;
       } else {
         // Cangkir kembali diletakkan di samping meja
         coffeeArmRef.current.position.y = handY;
         coffeeArmRef.current.rotation.z = 0;
       }
       laptopScreenRef.current.material.emissiveIntensity = 0.1; // Laptop standby/redup
     }
   });
   ```

---

## 6. Deployment & Runtime Constraints

- **Build Mode**: Next.js 15 Static Export (`next build` -> `out/`).
- **Container**: Nginx Alpine multi-stage runner.
- **Resource Footprint**: < 15MB RAM idle, 0% CPU (aman dan tidak membebani VPS).
- **Port Mapping**: Port host `3060` terhubung ke Coolify dan siap diarahkan ke subdomain Dahono (misal: `dev.abyte.my.id`).
