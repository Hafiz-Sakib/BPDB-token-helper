# ⚡ BPDB প্রিপেইড টোকেন সহায়ক

A React web app that helps Bangladeshi prepaid electricity meter users easily enter their 20-digit tokens one by one — without losing track.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Install & Run

```bash
npm install
npm start
```

Opens at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

---

## 📱 How to Use

1. **Copy** your BPDB prepaid token SMS
2. **Paste** it into the text area
3. Press **"টোকেন বিশ্লেষণ করুন"** — all tokens are extracted automatically
4. Enter each **highlighted** 20-digit token into your meter → press Enter on meter
5. When meter shows **GOOD/SUCCESS**, tap **"দেওয়া হয়েছে"** to move to the next
6. Billing info is shown below the tokens for reference

---

## 🔑 Meter Tips

| Display | Meaning |
|---|---|
| `GOOD` / `SUCCESS` | Token accepted ✅ |
| `REJECT` | Re-enter carefully ❌ |

- Press **889 + Enter** on meter to check current Token Sequence Number (TSN)
- Always enter tokens **in order**

---

## 🛠 Tech Stack

| Package | Purpose |
|---|---|
| React 18 | UI framework |
| Framer Motion | Animations |
| react-hot-toast | Notifications |
| lucide-react | Icons |

### Fonts
- **Hind Siliguri** — All Bengali & body text
- **Barlow Condensed** — Display headings
- **JetBrains Mono** — Token digit groups

---

## 📂 Project Structure

```
src/
├── App.jsx                   Main app (state, layout, footer)
├── index.js                  Entry point
├── index.css                 CSS variables, keyframes, responsive scaling
├── utils/
│   └── parseMessage.js       Robust SMS parser — isolates tokens strictly
└── components/
    ├── TokenCard.jsx          Individual token card (copy, mark done)
    ├── MetaPanel.jsx          Billing breakdown (shown below tokens)
    ├── ProgressBar.jsx        Visual progress tracker
    ├── HowToPanel.jsx         Collapsible instructions
    └── SuccessScreen.jsx      Completion celebration
```

---

## 👨‍💻 Author

Made with ❤️ by [Mohammad Hafizur Rahman Sakib](https://hafizsakib.vercel.app/)

---

## 📄 License

MIT
