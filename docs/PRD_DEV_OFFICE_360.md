# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Virtual Office Live AI Squad: "DevOffice-360"
### 3D Multi-Agent Observability & Interactive Virtual Tech Office

**Version:** 1.1.0  
**Stack:** Next.js 15 (App Router, Static Export) + Three.js + React Three Fiber (`@react-three/fiber`) + Drei + Tailwind CSS + shadcn/ui  
**Target Runtime:** Static Nginx Alpine Container (< 15MB RAM idle, 0% CPU, no dev server)  
**Author:** Lead AI Architect (Autonomous Squad)

---

## 1. Executive Summary & Core Value

**DevOffice-360** adalah platform observabilitas dan visualisasi 3D real-time yang mensimulasikan lingkungan kantor tim software engineering otonom (*virtual tech office*). 

Ketika Anda memberikan prompt atau instruksi fitur/bug fix melalui chat Telegram, dashboard ini menampilkan representasi **digital twin** hidup:
1. Denah lantai kantor 3D interaktif (*camera rotatable / orbit controls via Three.js*).
2. Karakter manusia 3D low-poly dengan pakaian tematik berbeda untuk masing-masing peran.
3. Aliran data visual (sinar partikel 3D melengkung) saat agent saling berkolaborasi (misal: Backend melempar API contract ke Frontend).
4. Monitor komputer bercahaya sesuai status kerja masing-masing agent (*Idle = Hijau, Thinking = Kuning, Working = Cyan, QA Testing = Ungu, Bug Alert = Merah*).

---

## 2. Personas, Workstations & Karakteristik Pakaian

| Role Agent | Nama & Karakter | Konsep Workstation 3D | Ciri Khas Pakaian & Avatar |
|---|---|---|---|
| **Architect / PM** | **Ken** (Lead Orchestrator) | Meja Command Center di tengah belakang, multi-monitor display, papan arsitektur. | **Navy Dark Blazer**, kemeja putih, lanyard kartu ID tech, rambut slick rapi. |
| **Backend Engineer** | **Alex** (Core Engine) | Workstation sisi kiri, dual monitor vertikal, miniature Server Rack mini berkedip hijau. | **Emerald Tech Hoodie**, celana jogger gelap, sneakers techie. |
| **Frontend Engineer** | **Elena** (Artisan & UI) | Workstation sisi kanan, color swatch screen, tablet sketsa desain antarmuka. | **Rose Pastel / Coral Jacket**, kacamata stylish, gaya rambut modern. |
| **QA Automation Tester** | **Maya** (Guardian) | Workstation sisi depan, CI/CD runner matrix screen, headset gaming dengan mic. | **Violet / Purple Tech Vest**, kaos hitam, headset audio tester besar. |

---

## 3. UI/UX ASCII PREVIEW (DESAIN COCKPIT LENGKAP)

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ ⚡ DevOffice-360  [3D Live Squad]                  [🟢 AI PIPELINE READY]    │ <-- Top Sticky Header
├─────────────────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ 3D VIRTUAL SQUAD OFFICE FLOOR                     [🖱️ Orbit / Drag View] │ │
│ │                                                                         │ │
│ │                             [ 👔 KEN (PM) ]                             │ │
│ │                       Navy Blazer • Command Desk                        │ │
│ │                                    │                                    │ │
│ │                  ┌─────────────────┴─────────────────┐                  │ │
│ │     ⚡ Sinar Data: Handshake             ⚡ Sinar Data: Handshake        │ │
│ │     PRD & DB Migration Specs            API Contract & DTO Truth        │ │
│ │                  ▼                                   ▼                  │ │
│ │       [ ⚙️ ALEX (BACKEND) ]                 [ 🎨 ELENA (FRONTEND) ]       │ │
│ │   Emerald Hoodie • Server Rack          Rose Jacket • UI Design Bay     │ │
│ │                  │                                   │                  │ │
│ │                  └─────────────────┬─────────────────┘                  │ │
│ │                                    ▼                                    │ │
│ │                             [ 🔍 MAYA (QA) ]                            │ │
│ │                       Violet Vest • Headset Tester                      │ │
│ │                         Playwright Matrix Screen                        │ │
│ │                                                                         │ │
│ │ 3D Room: Dark Slate Floor • Ambient Cyan Glow • Dual Monitors • Chairs  │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ ⌨️ CHAT PROMPT DISPATCHER (SIMULATE TURN)       [SQUAD STATUS: READY]    │ │
│ │ ┌────────────────────────────────────────────────────────┐ ┌──────────┐ │ │
│ │ │ Masukkan prompt (contoh: "Bangun endpoint MFA + UI")...│ │  KIRIM   │ │ │
│ │ └────────────────────────────────────────────────────────┘ └──────────┘ │ │
│ │ Preset: [✨ Feature: MFA Auth + UI]  [🐛 Bug Fix: Data Scope Isolation]   │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐ │
│ │ 👔 KEN (LEAD)  │ │ ⚙️ ALEX (BE)    │ │ 🎨 ELENA (FE)  │ │ 🔍 MAYA (QA)   │ │
│ │ Status: IDLE   │ │ Status: WORKING│ │ Status: WORKING│ │ Status: TESTING│ │
│ │ PRs: 12        │ │ Schema & DTO   │ │ shadcn Dialog  │ │ 12/12 PASS     │ │
│ │ Outfit: Blazer │ │ Outfit: Hoodie │ │ Outfit: Jacket │ │ Outfit: Vest   │ │
│ └────────────────┘ └────────────────┘ └────────────────┘ └────────────────┘ │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ 📜 LIVE SQUAD INTER-COMMUNICATION & ACTIVITY STREAM          [4 Events] │ │
│ │ • [BE] Alex: DTO created: POST /api/v1/auth/mfa/verify. Validated.      │ │
│ │ • [FE] Elena: Generated responsive dialog with clean shadcn tokens.     │ │
│ │ • [QA] Maya: Executed 12/12 Playwright assertions: All tests PASS.      │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Alur Interaksi & State Machine (Chat ke Visual 3D)

1. **Prompt Diberikan di Chat**:
   - Anda memberikan perintah di chat Telegram ini.
   - Status **Ken (PM)** berubah menjadi `THINKING` (lampu kuning di atas kepalanya menyala, membedah PRD).
2. **Handshake PM ➔ Backend**:
   - Sinar laser 3D menghubungkan meja Ken dan meja Alex.
   - Alex beralih ke mode `WORKING` (mengetik di keyboard, monitor menyala cyan, server rack mini berkedip hijau).
3. **Handshake Backend ➔ Frontend**:
   - Alex mempublikasikan API Contract / Swagger DTO.
   - Sinar laser 3D melengkung dari meja Alex ke meja Elena.
   - Elena merakit komponen UI shadcn, form dialog, dan state management.
4. **Handshake Frontend ➔ QA Automation**:
   - Elena mengirim build artifact ke meja Maya.
   - Maya beralih ke mode `TESTING` (layar matrix runner ungu menyala, menjalankan skrip Playwright).
5. **Sprint Selesai**:
   - Seluruh meja menyala hijau (`SUCCESS`), data handshake berhenti, dan log aktivitas tercatat rapi di feed bawah.

---

## 5. Standar Teknis & Best Practice (skills.sh: `r3f-best-practices`)

- **Bebas Memory Leak**: Tidak memanggil `setState` di dalam render loop Three.js (`useFrame`).
- **SSR-Safe**: Canvas di-import secara dinamis dengan `{ ssr: false }` untuk mencegah error Next.js server render.
- **Ultra Lightweight VPS Footprint**:
  - Dihosting menggunakan Nginx Alpine statis dari folder `out/`.
  - Memory consumption di VPS < 15MB RAM dan 0% CPU saat idle.
- **Port Mapping**:
  - Siap diikat ke port publik Coolify (misal: `3060:80`) dan dipetakan ke subdomain Dahono (misal: `dev.abyte.my.id`).
