<div align="center">

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Orbitron&size=32&duration=3000&pause=1000&color=00F2FE&center=true&vCenter=true&multiline=true&width=700&height=80&lines=🛡️+SECUREACCESS+AI;Visitor+Management+System" alt="SecureAccess AI" />

<br/>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-%2361DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-7-%23646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-%2306B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-%23FF4D4D?style=for-the-badge&logo=framer&logoColor=white" />
  <img src="https://img.shields.io/badge/AI_Powered-No_API_Key-%2300F2FE?style=for-the-badge&logo=openai&logoColor=white" />
</p>

<p align="center">
  <strong>A next-generation, AI-powered visitor management system with real-time biometric simulation, smart check-in, and live security intelligence — all without a single external API key.</strong>
</p>

<br/>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" />

</div>

<br/>

## 🌌 Overview

**SecureAccess AI** is a cutting-edge **Visitor Management System** built with a sleek cyberpunk-inspired dark UI. It seamlessly combines AI-powered visitor analysis, biometric face scan simulation, real-time sentiment detection, and a live security intelligence dashboard — all running entirely in the browser with **zero backend** and **zero API keys**.

> 🎯 Built for modern offices, campuses, and facilities that demand both security and style.

<br/>

## ✨ Features

<table>
<tr>
<td width="50%">

### 🤖 AI Engine (No API Key)
- Intelligent **risk analysis** per visitor
- **Sentiment simulation** (Confident, Neutral, Hurried, Patient)
- Unique auto-generated **ID tokens** for every visitor
- Smart **purpose-based insights** engine
- First-time vs. frequent visitor detection

### 🧬 SmartScan Module
- Simulated **biometric face scan** animation
- Real-time scanning progress with confidence score
- Animated **scan line** effect
- Thermal sensor data simulation (`°F`)
- Instant check-in with visitor history update

</td>
<td width="50%">

### 📊 Dashboard
- Live **stats cards** with trend indicators
- Real-time **recent check-in feed**
- **AI Predictions panel** with zone status
- System power gauge with animated progress bar
- Visitor initials avatar generation

### 📋 Visitor Logs
- Searchable, filterable visitor history
- Status badges: `Checked In`, `In Progress`, `Checked Out`
- Visitor ID token display
- Sentiment tag visualization
- Full check-in timeline

</td>
</tr>
</table>

<br/>

## 🎨 UI/UX Highlights

```
🌑  Deep Space Dark Mode     (#0a0b10 background)
🔵  Cyber Cyan Accents       (#00f2fe brand-primary)
💎  Glassmorphism Cards      (backdrop-blur + transparency)
⚡  Framer Motion Animations (page transitions & micro-animations)
🕸️  Cyber Grid Background    (CSS linear-gradient mesh)
✨  Animated Scan Effect      (CSS keyframe scan animation)
```

<br/>

## 🗂️ Project Structure

```
jyoti/
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx    # 📊 Main overview dashboard
│   │   ├── Sidebar.jsx      # 🗂️  Navigation sidebar
│   │   ├── SmartScan.jsx    # 🧬  AI face scan & check-in
│   │   └── VisitorLogs.jsx  # 📋  Visitor history & logs
│   ├── utils/
│   │   └── aiEngine.js      # 🤖  AI simulation engine
│   ├── App.jsx              # 🏠 Root application + routing
│   ├── App.css              # 💄 App-level styles
│   ├── index.css            # 🎨 Global design system (Tailwind)
│   └── main.jsx             # ⚡ Entry point
├── index.html               # 🌐 HTML template
├── vite.config.js           # ⚙️  Vite configuration
├── package.json             # 📦 Dependencies
└── README.md                # 📖 You are here!
```

<br/>

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** `v18+`
- **npm** `v9+`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Kkukiii/Vistor-management-system-.git

# 2. Navigate into the project directory
cd Vistor-management-system-

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at: **[http://localhost:5173](http://localhost:5173)**

<br/>

### Build for Production

```bash
npm run build
```

The optimized output will be in the `dist/` folder.

<br/>

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| ⚛️ **React** | 19 | UI Framework |
| ⚡ **Vite** | 7 | Build Tool & Dev Server |
| 🎨 **Tailwind CSS** | 4 | Utility-first Styling |
| 🎞️ **Framer Motion** | 12 | Animations & Transitions |
| 🖼️ **Lucide React** | 0.56 | Icon Library |
| 🎊 **Canvas Confetti** | 1.9 | Check-in Celebration Effect |

<br/>

## 🤖 How the AI Engine Works

The AI is entirely **simulated client-side** — no external API is needed.

```js
// aiEngine.js — simplified overview
export const analyzeVisitor = (visitorData) => {
  // 1. Detect if first-time or frequent visitor
  // 2. Analyze purpose (delivery, maintenance, interview...)
  // 3. Randomly simulate sentiment (Confident / Neutral / Patient / Hurried)
  // 4. Generate a unique ID token (e.g., V-A9X2K7)
  return { riskLevel, insights, sentiment, idToken, timestamp };
};

export const simulateFaceScan = () => {
  // Simulates a 2.5-second biometric face scan
  // Returns: confidence score, biometric hash, matchFound
};
```

<br/>

## 📸 Screenshots

| Dashboard | SmartScan | Visitor Logs |
|---|---|---|
| System overview with live stats | AI-powered biometric check-in | Searchable history with filters |

<br/>

## 🔮 Future Roadmap

- [ ] 🔗 Real biometric API integration
- [ ] 🔥 Firebase / Supabase backend for persistent logs
- [ ] 📧 Email/SMS notifications on check-in
- [ ] 📱 Mobile-responsive layout
- [ ] 🗃️ Export visitor logs to CSV/PDF
- [ ] 🔐 Admin authentication portal
- [ ] 🌍 Multi-location / multi-zone support
- [ ] 📷 Real webcam integration for face scan

<br/>

