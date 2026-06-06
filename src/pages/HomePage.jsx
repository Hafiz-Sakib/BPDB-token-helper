import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Zap, Clipboard, Binary } from "lucide-react";
import HowToPanel from "../components/HowToPanel";
import { parseMessage } from "../utils/parseMessage";
import VisitorCounter from "../components/VisitorCounter";

const SAMPLE = `Successful!Your BPDBprepaid
Prepaid Token is
0009-1238-5758-5698-8998,5342-5289-0474-8599-5126,6355-9412-8148-7543-5442,2318-6245-8781-1330-8425,0485-9948-1083-9372-9651,2340-1868-9252-3756-2445,7007-6996-5908-0967-6646,0917-3074-1127-3725-7454,6353-3780-6986-0096-2328,0474-4120-4424-6100-5107,2672-1466-9045-8482-5641,SqNo:-1~9 for offline Meter
No:10311094233,Vending
Amt:2000.0,Enrg Cost:
1705.99,Total Charge:294.01,Meter
Rent 1P:40,Demand
Charge:168,VAT:95.24,Rebate:-9.23.`;

const card = {
  background: "var(--card)",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 20,
};

export default function HomePage() {
  const [rawText, setRawText] = useState("");
  const navigate = useNavigate();

  const handleParse = () => {
    if (!rawText.trim()) {
      toast.error("এসএমএস বক্স ফাঁকা ! কপি করা SMS বা টোকেন বার্তা পেস্ট করুন।");
      return;
    }
    const result = parseMessage(rawText);
    if (result.tokens.length === 0) {
      toast.error("আপনার পেস্ট করা মেসেজ থেকে কোনো টোকেন খুঁজে পাওয়া যায়নি। আবার চেষ্টা করুন!");
      return;
    }
    sessionStorage.setItem("bpdb_tokens", JSON.stringify(result.tokens));
    sessionStorage.setItem("bpdb_meta", JSON.stringify(result.meta));
    toast.success(`${result.tokens.length} টি টোকেন আলাদা করা হয়েছে!`, { icon: "⚡" });
    navigate("/tokens");
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setRawText(text);
      toast.success("ক্লিপবোর্ড থেকে পেস্ট হয়েছে");
    } catch {
      toast.error("ক্লিপবোর্ড অ্যাক্সেস করা যায়নি। ম্যানুয়ালি পেস্ট করুন।");
    }
  };

  const handleSample = () => {
    setRawText(SAMPLE);
    toast("স্যাম্পল এসএমএস লোড হয়েছে", { icon: "📋" });
  };

  return (
    <div
      style={{
        position: "relative",
        zIndex: 1,
        maxWidth: "min(680px, 96vw)",
        margin: "0 auto",
        padding: "0 clamp(12px, 3vw, 24px)",
      }}
    >
      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          textAlign: "center",
          padding: "clamp(28px,5vw,48px) 0 clamp(20px,4vw,32px)",
          position: "relative",
        }}
      >
        {/* VISITOR BADGE — top-right of header, hardcoded */}
        <div
          style={{
            position: "absolute",
            top: "clamp(12px, 3vw, 18px)",
            right: 0,
            zIndex: 10,
          }}
        >
          <VisitorCounter />
        </div>

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          style={{
            fontSize: "clamp(40px,8vw,58px)",
            marginBottom: 12,
            display: "block",
            lineHeight: 1,
          }}
        >
          ⚡
        </motion.div>

        <h1
          style={{
            fontFamily: "Hind Siliguri, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.7rem, 6vw, 2.6rem)",
            background: "linear-gradient(135deg,#22c55e 0%,#16a34a 50%,#86efac 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: 8,
            lineHeight: 1.2,
          }}
        >
          BPDB প্রিপেইড টোকেন
        </h1>

        <p
          style={{
            fontFamily: "Hind Siliguri, sans-serif",
            fontSize: "var(--fs-base)",
            color: "#64748b",
            lineHeight: 1.6,
          }}
        >
          টোকেন এর এসএমএস পেস্ট করুন — সহজে ২০ ডিজিট করে মিটারে ইনপুট দিন!
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginTop: 12,
          }}
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0px rgba(22,163,74,0.4)",
                "0 0 14px rgba(22,163,74,0.8)",
                "0 0 0px rgba(22,163,74,0.4)",
              ],
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#22c55e",
            }}
          />
          <span
            style={{
              fontSize: "var(--fs-xs)",
              color: "#475569",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              fontWeight: 700,
              fontFamily: "Barlow Condensed, sans-serif",
            }}
          >
            Bangladesh Power Development Board
          </span>
        </div>
      </motion.header>

      {/* INPUT SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38 }}
      >
        <HowToPanel />

        <div style={{ ...card, padding: "clamp(16px,3vw,22px)", marginBottom: 16 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <span
              style={{
                fontFamily: "Hind Siliguri, sans-serif",
                fontWeight: 700,
                fontSize: "var(--fs-sm)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#94a3b8",
              }}
            >
              টোকেন বার্তা পেস্ট করুন
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handlePaste}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  padding: "6px 12px",
                  cursor: "pointer",
                  color: "#94a3b8",
                  fontSize: "var(--fs-sm)",
                  fontFamily: "Hind Siliguri, sans-serif",
                }}
              >
                <Clipboard size={14} /> পেস্ট
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleSample}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  background: "rgba(22,163,74,0.08)",
                  border: "1px solid rgba(22,163,74,0.2)",
                  borderRadius: 8,
                  padding: "6px 12px",
                  cursor: "pointer",
                  color: "#4ade80",
                  fontSize: "var(--fs-sm)",
                  fontFamily: "Hind Siliguri, sans-serif",
                }}
              >
                স্যাম্পল দেখুন !
              </motion.button>
            </div>
          </div>

          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="এখানে আপনার BPDB/DESCO/REB প্রিপেইড টোকেন এসএমএস টা পেস্ট করুন..."
            style={{
              width: "100%",
              minHeight: "clamp(130px,25vw,180px)",
              background: "rgba(8,38,61,0.9)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: "clamp(10px,2vw,14px) clamp(12px,2.5vw,16px)",
              color: "#e2e8f0",
              fontSize: "var(--fs-base)",
              lineHeight: 1.7,
              fontFamily: "Hind Siliguri, JetBrains Mono, sans-serif",
              resize: "none",
              outline: "none",
              transition: "border-color 0.25s",
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.target.style.borderColor = "rgba(22,163,74,0.5)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(22,163,74,0.5)" }}
          whileTap={{ scale: 0.98 }}
          onClick={handleParse}
          style={{
            width: "100%",
            background: "linear-gradient(135deg,#15803d,#16a34a)",
            border: "none",
            borderRadius: 14,
            padding: "clamp(13px,2.5vw,17px) 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            color: "#fff",
            fontWeight: 700,
            fontSize: "var(--fs-md)",
            fontFamily: "Hind Siliguri, sans-serif",
            cursor: "pointer",
            letterSpacing: "0.02em",
          }}
        >
          <Zap size={20} />
          টোকেন আলাদা করুন!
        </motion.button>

        {/* Meter Codes button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/meter-codes")}
          style={{
            width: "100%",
            marginTop: 12,
            background: "rgba(7,36,58,0.9)",
            border: "1px solid rgba(22,163,74,0.25)",
            borderRadius: 14,
            padding: "clamp(11px,2vw,14px) 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            color: "#4ade80",
            fontWeight: 600,
            fontSize: "var(--fs-base)",
            fontFamily: "Hind Siliguri, sans-serif",
            cursor: "pointer",
            letterSpacing: "0.02em",
            transition: "border-color 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(22,163,74,0.55)";
            e.currentTarget.style.background = "rgba(22,163,74,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(22,163,74,0.25)";
            e.currentTarget.style.background = "rgba(7,36,58,0.9)";
          }}
        >
          <Binary size={18} />
          মিটার এর শর্ট কোড দেখুন
        </motion.button>
      </motion.div>

      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          textAlign: "center",
          marginTop: 48,
          paddingTop: 24,
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <p
          style={{
            fontSize: "var(--fs-sm)",
            color: "#475569",
            fontFamily: "Hind Siliguri, sans-serif",
            marginBottom: 6,
          }}
        >
          • BPDB প্রিপেইড টোকেন হেল্পার • সহজে টোকেন মিটারে ইনপুট দিন •
        </p>
        <p
          style={{
            fontSize: "var(--fs-sm)",
            color: "#334155",
            fontFamily: "Hind Siliguri, sans-serif",
          }}
        >
          Made with ❤️ by{" "}
          <a
            href="https://hafizsakib.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#22c55e",
              textDecoration: "none",
              fontWeight: 700,
              borderBottom: "1px solid rgba(22,163,74,0.4)",
            }}
          >
            Mohammad Hafizur Rahman Sakib
          </a>
        </p>
      </motion.footer>
    </div>
  );
}
