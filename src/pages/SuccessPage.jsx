import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import MetaPanel from "../components/MetaPanel";

export default function SuccessPage() {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [meta, setMeta]   = useState(null);

  useEffect(() => {
    const t = sessionStorage.getItem("bpdb_tokens");
    const m = sessionStorage.getItem("bpdb_meta");
    if (!t) { navigate("/"); return; }
    setTotal(JSON.parse(t).length);
    setMeta(m ? JSON.parse(m) : null);
  }, [navigate]);

  const handleReset = () => {
    sessionStorage.removeItem("bpdb_tokens");
    sessionStorage.removeItem("bpdb_meta");
    navigate("/");
  };

  return (
    <div style={{
      position: "relative", zIndex: 1,
      maxWidth: "min(860px, 96vw)",
      margin: "0 auto",
      padding: "0 clamp(12px,3vw,32px) 60px",
    }}>
      {/* Success hero */}
      <motion.div
        initial={{ opacity: 0, scale: 0.82 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        style={{
          textAlign: "center",
          padding: "clamp(32px,6vw,56px) clamp(16px,4vw,32px)",
          background: "rgba(22,163,74,0.06)",
          border: "1px solid rgba(22,163,74,0.35)",
          borderRadius: 24,
          marginTop: 32,
          marginBottom: 28,
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontSize: 64, marginBottom: 16 }}
        >
          ⚡
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            fontFamily: "Hind Siliguri, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
            background: "linear-gradient(135deg,#22c55e,#86efac)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: 10,
          }}
        >
          আপনি সফলভাবে সব টোকেন মিটারে দিয়েছেন!
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            color: "#94a3b8",
            fontSize: "var(--fs-base)",
            fontFamily: "Hind Siliguri, sans-serif",
            marginBottom: 28,
            lineHeight: 1.65,
          }}
        >
          {total} টি টোকেন সফলভাবে মিটারে দেওয়া হয়েছে।
          <br />
          আপনার মিটার এখন ব্যালেন্স আপডেট হয়ে গেছে! ৮০১ ডায়াল করে ব্যালেন্স চেক
          করুন!
        </motion.p>

        {/* Bouncing dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 28 }}>
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -12, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.12, ease: "easeInOut" }}
              style={{
                width: 9, height: 9, borderRadius: "50%",
                background: i % 2 === 0 ? "#22c55e" : "#f4c542",
              }}
            />
          ))}
        </div>

        {/* New SMS button */}
        <motion.button
          whileHover={{ scale: 1.04, boxShadow: "0 8px 28px rgba(22,163,74,0.4)" }}
          whileTap={{ scale: 0.97 }}
          onClick={handleReset}
          style={{
            background: "linear-gradient(135deg,#15803d,#16a34a)",
            border: "none",
            borderRadius: 14,
            padding: "clamp(10px,2vw,14px) clamp(24px,4vw,36px)",
            color: "#fff",
            fontWeight: 700,
            fontSize: "var(--fs-md)",
            fontFamily: "Hind Siliguri, sans-serif",
            cursor: "pointer",
            display: "block",
            margin: "0 auto 16px",
          }}
        >
          নতুন টোকেন এর এসএমএস দিন
        </motion.button>

        {/* Issues link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Link
            to="/issues"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "#fb923c",
              fontSize: "var(--fs-sm)",
              fontFamily: "Hind Siliguri, sans-serif",
              fontWeight: 600,
              textDecoration: "none",
              borderBottom: "1px dashed rgba(251,146,60,0.4)",
              paddingBottom: 2,
              transition: "color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#fdba74"}
            onMouseLeave={e => e.currentTarget.style.color = "#fb923c"}
          >
            ⚠️ টাকা মিটারে যোগ হয়নি?
          </Link>
        </motion.div>
      </motion.div>

      {/* Billing details */}
      {meta && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <MetaPanel meta={meta} />
        </motion.div>
      )}

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        style={{
          textAlign: "center",
          marginTop: 40,
          paddingTop: 24,
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <p style={{
          fontSize: "var(--fs-sm)", color: "#475569",
          fontFamily: "Hind Siliguri, sans-serif", marginBottom: 6,
        }}>
          • BPDB প্রিপেইড টোকেন হেল্পার • সহজে টোকেন মিটারে ইনপুট দিন •
        </p>
        <p style={{
          fontSize: "var(--fs-sm)", color: "#334155",
          fontFamily: "Hind Siliguri, sans-serif",
        }}>
          Made with ❤️ by{" "}
          <a
            href="https://hafizsakib.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#22c55e", textDecoration: "none",
              fontWeight: 700, borderBottom: "1px solid rgba(22,163,74,0.4)",
            }}
          >
            Mohammad Hafizur Rahman Sakib
          </a>
        </p>
      </motion.footer>
    </div>
  );
}
