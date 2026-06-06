import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { RefreshCw } from "lucide-react";
import TokenCard from "../components/TokenCard";
import MetaPanel from "../components/MetaPanel";
import ProgressBar from "../components/ProgressBar";
import SuccessScreen from "../components/SuccessScreen";
import { Check } from "lucide-react";

export default function TokensPage() {
  const navigate = useNavigate();
  const [tokens, setTokens] = useState([]);
  const [meta, setMeta] = useState(null);
  const [doneSet, setDoneSet] = useState(new Set());
  const [activeIdx, setActiveIdx] = useState(0);
  const [allDone, setAllDone] = useState(false);

  useEffect(() => {
    const t = sessionStorage.getItem("bpdb_tokens");
    const m = sessionStorage.getItem("bpdb_meta");
    if (!t) {
      navigate("/");
      return;
    }
    setTokens(JSON.parse(t));
    setMeta(m ? JSON.parse(m) : null);
  }, [navigate]);

  const handleMarkDone = (idx) => {
    const next = new Set(doneSet);
    next.add(idx);
    setDoneSet(next);
    if (next.size === tokens.length) {
      setAllDone(true);
      toast.success("সব টোকেন দেওয়া হয়েছে! 🎉", { duration: 4000 });
    } else {
      const nextActive = idx + 1 < tokens.length ? idx + 1 : idx;
      setActiveIdx(nextActive);
      toast(`টোকেন ${idx + 1} দেওয়া কমপ্লিট`, {
        icon: <Check size={16} color="#22c55e" strokeWidth={6.5} />,
      });
    }
  };

  const handleReset = () => {
    sessionStorage.removeItem("bpdb_tokens");
    sessionStorage.removeItem("bpdb_meta");
    navigate("/");
  };

  const doneCount = doneSet.size;

  if (tokens.length === 0) return null;

  return (
    <div
      style={{
        position: "relative",
        zIndex: 1,
        maxWidth: "min(1100px, 96vw)",
        margin: "0 auto",
        padding: "0 clamp(12px, 3vw, 32px)",
      }}
    >
      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          textAlign: "center",
          padding: "clamp(28px,5vw,48px) 0 clamp(16px,3vw,24px)",
        }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          style={{
            fontSize: "clamp(36px,7vw,52px)",
            marginBottom: 10,
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
            fontSize: "clamp(1.4rem, 5vw, 2.2rem)",
            background:
              "linear-gradient(135deg,#22c55e 0%,#16a34a 50%,#86efac 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: 6,
            lineHeight: 1.2,
          }}
        >
          BPDB টোকেন তালিকা
        </h1>
        <p
          style={{
            fontFamily: "Hind Siliguri, sans-serif",
            fontSize: "var(--fs-base)",
            color: "#64748b",
          }}
        >
          মোট {tokens.length} টি টোকেন পাওয়া গেছে
        </p>
      </motion.header>

      {/* Reset button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleReset}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 10,
          padding: "clamp(7px,1.5vw,10px) clamp(12px,2.5vw,18px)",
          color: "#94a3b8",
          fontSize: "var(--fs-sm)",
          cursor: "pointer",
          fontFamily: "Hind Siliguri, sans-serif",
          marginBottom: 22,
        }}
      >
        <RefreshCw size={14} /> নতুন এসএমএস দিন
      </motion.button>

      {/* Progress bar */}
      {!allDone && tokens.length > 1 && (
        <ProgressBar done={doneCount} total={tokens.length} />
      )}

      {/* Token cards or success */}
      <AnimatePresence mode="wait">
        {allDone ? (
          <SuccessScreen total={tokens.length} onReset={handleReset} />
        ) : (
          <motion.div
            key="tokens"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/*
              auto-fill with minmax(300px, 1fr):
              - mobile: 1 col (full width)
              - tablet: 2 cols
              - desktop: 3 cols
            */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
                gap: 14,
              }}
            >
              {tokens.map((token, i) => (
                <TokenCard
                  key={i}
                  token={token}
                  index={i}
                  total={tokens.length}
                  isActive={i === activeIdx && !doneSet.has(i)}
                  isDone={doneSet.has(i)}
                  onDone={handleMarkDone}
                  onActivate={(idx) => {
                    if (idx === activeIdx) setActiveIdx(idx);
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Billing info */}
      {meta && !allDone && (
        <div style={{ marginTop: 28 }}>
          <MetaPanel meta={meta} />
        </div>
      )}

      {/* Footer */}
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
