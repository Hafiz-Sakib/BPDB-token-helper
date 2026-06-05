# ⚡ BPDB প্রিপেইড টোকেন সহায়ক

A React web app that helps Bangladeshi prepaid electricity meter users easily enter their 20-digit tokens one by one, without losing track of which ones have been entered.

---

## 🎯 Why This Exists

When BPDB (or DESCO/REB) changes electricity tariffs, prepaid meter users receive **multiple 20-digit tokens** in a single SMS. Entering them correctly — in the right sequence, one at a time — is error-prone and confusing.

This app:
- Parses the full SMS message and **extracts all tokens automatically**
- Displays each token in a clear **XXXX-XXXX-XXXX-XXXX-XXXX** grouped format
- Highlights which token to enter **right now**
- Lets you mark each token as done and move to the next
- Shows billing breakdown (amount paid, energy cost, VAT, rebate, etc.)
- Tracks your progress with a visual progress bar

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm start
```

App will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

---

## 📱 How to Use

1. **Copy your BPDB token SMS** (the one with multiple tokens like `0009-1238-...`)
2. **Paste it** into the text area (or use the Paste button)
3. Press **"টোকেন বিশ্লেষণ করুন"** (Analyze Tokens)
4. The app shows your billing info and all tokens, with the **first token highlighted**
5. Enter that 20-digit token into your meter → press Enter on the meter
6. When meter shows **GOOD / SUCCESS**, click **"দেওয়া হয়েছে"** (Done) in the app
7. Repeat for each token in order

---

## 🔑 Token Entry Tips

| Meter Display | Meaning |
|---|---|
| `GOOD` / `SUCCESS` | Token accepted ✅ |
| `REJECT` | Token rejected — re-enter carefully ❌ |

- Enter **889** on your meter and press Enter to check the current Token Sequence Number (TSN)
- Always enter tokens **in order** (Token 1 → 2 → 3 …)
- Each token is **exactly 20 digits**

---

## 🛠 Tech Stack

| Package | Purpose |
|---|---|
| React 18 | UI framework |
| Framer Motion | Animations & transitions |
| react-hot-toast | Toast notifications |
| lucide-react | Icons |
| Tailwind CSS (via inline styles) | Theming |

### Fonts
- **Hind Siliguri** — Bengali text
- **Barlow Condensed** — Display / headings
- **JetBrains Mono** — Token digits

---

## 🎨 Design

Follows a deep navy + electric green + gold theme inspired by the uploaded CSS design system:
- Background: `#001b2a` (deep ocean)
- Accent: `#16a34a` (electric green)
- Highlight: `#f4c542` (gold — active token)
- Cards with glassmorphism inner glow
- Animated orbs, pulse effects, staggered card entrances

---

## 📂 Project Structure

```
src/
├── App.jsx                  # Main app with state management
├── index.js                 # Entry point
├── index.css                # CSS variables & keyframe animations
├── utils/
│   └── parseMessage.js      # SMS parser — extracts tokens & billing info
└── components/
    ├── TokenCard.jsx         # Individual token display with copy/done actions
    ├── MetaPanel.jsx         # Billing breakdown panel
    ├── ProgressBar.jsx       # Visual progress tracker
    ├── HowToPanel.jsx        # Collapsible instructions panel
    └── SuccessScreen.jsx     # Completion celebration screen
```

---

## 🌐 Supported Utilities

The parser is designed to work with messages from:
- **BPDB** (Bangladesh Power Development Board)
- **DESCO** (Dhaka Electric Supply Company)
- **REB** / PBS (Rural Electricity Board)

As long as the message contains comma-separated groups of digits forming 20-digit tokens, the parser will work.

---

## 📄 License

MIT — Free to use, modify, and distribute.
