import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";

export default function IssuesPage() {
  const navigate = useNavigate();
  const [input889, setInput889] = useState("");

  const rawTokens = sessionStorage.getItem("bpdb_tokens");
  const rawMeta = sessionStorage.getItem("bpdb_meta");
  const tokens = rawTokens ? JSON.parse(rawTokens) : null;
  const meta = rawMeta ? JSON.parse(rawMeta) : null;

  // Build BPDB seq → our card# map
  // Our card #1 = seqStart (e.g. -1), card #2 = seqStart+1, etc.
  const seqStart = meta?.seqStart ?? -1; // default assume -1 if not parsed

  // Given 889 output (last completed BPDB seq), find next card#
  const getNextCard = (val) => {
    const num = parseInt(val);
    if (isNaN(num)) return null;
    // next BPDB seq = num + 1
    // card# = (nextSeq - seqStart) + 1
    const nextSeq = num + 1;
    const cardNo = nextSeq - seqStart + 1;
    if (tokens && cardNo > tokens.length) return { done: true };
    if (cardNo < 1) return { cardNo: 1 }; // restart from beginning
    return { cardNo };
  };

  const result = input889 !== "" ? getNextCard(input889) : null;

  const card = {
    background: "rgba(7,36,58,0.85)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 18,
    padding: "clamp(16px,3vw,22px)",
    marginBottom: 14,
  };

  return (
    <div
      style={{
        position: "relative",
        zIndex: 1,
        maxWidth: "min(600px, 96vw)",
        margin: "0 auto",
        padding: "0 clamp(12px,3vw,32px) 60px",
      }}
    >
      {/* Back */}
      <motion.button
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => navigate(-1)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: 10,
          padding: "8px 16px",
          color: "#94a3b8",
          fontSize: "var(--fs-sm)",
          cursor: "pointer",
          fontFamily: "Hind Siliguri, sans-serif",
          marginTop: 28,
          marginBottom: 24,
        }}
      >
        <ArrowLeft size={14} /> ফিরে যান
      </motion.button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: "center", marginBottom: 28 }}
      >
        <div style={{ fontSize: 48, marginBottom: 8 }}>⚡</div>
        <h1
          style={{
            fontFamily: "Hind Siliguri, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.3rem,5vw,1.8rem)",
            background: "linear-gradient(135deg,#f4c542,#fb923c)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: 6,
            lineHeight: 1.2,
          }}
        >
          টাকা মিটারে যোগ হয়নি?
        </h1>
        <p
          style={{
            fontFamily: "Hind Siliguri, sans-serif",
            color: "#64748b",
            fontSize: "var(--fs-sm)",
          }}
        >
          নিচের ধাপ অনুসরণ করুন
        </p>
      </motion.div>

      {/* Step 1 — 889 checker */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          ...card,
          border: "1px solid rgba(244,197,66,0.3)",
          background: "rgba(244,197,66,0.04)",
        }}
      >
        <h2
          style={{
            fontFamily: "Hind Siliguri, sans-serif",
            fontWeight: 800,
            fontSize: "var(--fs-md)",
            color: "#f4c542",
            marginTop: 0,
            marginBottom: 12,
          }}
        >
          ধাপ ১ — মিটারে 889 টাইপ করে Enter দিন
        </h2>
        <p
          style={{
            fontFamily: "Hind Siliguri, sans-serif",
            color: "#94a3b8",
            fontSize: "var(--fs-sm)",
            marginBottom: 16,
            lineHeight: 1.6,
          }}
        >
          মিটারের স্ক্রিনে যে সংখ্যা দেখাবে সেটি নিচে লিখুন (মাইনাস আসলে সেটিসহ
          টাইপ করুন) :
        </p>

        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              background: "#0a1a2a",
              border: "2px solid #f4c542",
              borderRadius: 10,
              padding: "6px 16px",
              fontFamily: "JetBrains Mono, monospace",
              fontWeight: 900,
              fontSize: 22,
              color: "#f4c542",
              letterSpacing: "0.1em",
            }}
          >
            889
          </div>
          <span style={{ color: "#475569", fontWeight: 700 }}>→ Enter →</span>
          <input
            type="number"
            value={input889}
            onChange={(e) => setInput889(e.target.value)}
            placeholder="?"
            style={{
              width: 72,
              padding: "8px 12px",
              background: "#071e30",
              border: "2px solid rgba(96,165,250,0.4)",
              borderRadius: 10,
              fontFamily: "JetBrains Mono, monospace",
              fontWeight: 900,
              fontSize: 20,
              color: "#93c5fd",
              textAlign: "center",
              outline: "none",
            }}
          />
        </div>

        {/* Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: result.done
                ? "rgba(22,163,74,0.1)"
                : "rgba(96,165,250,0.08)",
              border: `1px solid ${result.done ? "rgba(22,163,74,0.3)" : "rgba(96,165,250,0.3)"}`,
              borderRadius: 12,
              padding: "14px 16px",
            }}
          >
            {result.done ? (
              <p
                style={{
                  fontFamily: "Hind Siliguri, sans-serif",
                  color: "#4ade80",
                  fontWeight: 700,
                  fontSize: "var(--fs-base)",
                  margin: 0,
                }}
              >
                ✅ সব টোকেন ইনপুট হয়ে গেছে! ব্যালেন্স চেক করতে ৮০১ ডায়াল করুন।
              </p>
            ) : (
              <p
                style={{
                  fontFamily: "Hind Siliguri, sans-serif",
                  color: "#93c5fd",
                  fontWeight: 700,
                  fontSize: "var(--fs-base)",
                  margin: 0,
                  lineHeight: 1.65,
                }}
              >
                👉 আপনাকে এখন{" "}
                <span
                  style={{
                    background: "rgba(96,165,250,0.15)",
                    border: "1px solid rgba(96,165,250,0.4)",
                    borderRadius: 8,
                    padding: "2px 10px",
                    fontSize: "1.15em",
                    color: "#60a5fa",
                  }}
                >
                  টোকেন সিরিয়াল #{result.cardNo}
                </span>{" "}
                থেকে শুরু করতে হবে।
                <br />
                <span
                  style={{
                    color: "#64748b",
                    fontSize: "var(--fs-sm)",
                    fontWeight: 400,
                  }}
                >
                  আমাদের অ্যাপে কার্ড #{result.cardNo} খুঁজে সেখান থেকে ইনপুট
                  দিন।
                </span>
              </p>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Step 2 — How to input */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={card}
      >
        <h2
          style={{
            fontFamily: "Hind Siliguri, sans-serif",
            fontWeight: 800,
            fontSize: "var(--fs-md)",
            color: "#f4c542",
            marginTop: 0,
            marginBottom: 14,
          }}
        >
          ধাপ ২ — টোকেন ইনপুট করুন
        </h2>

        {[
          {
            icon: <CheckCircle size={15} color="#22c55e" />,
            text: "মিটারে ২০ ডিজিটের টোকেন টাইপ করুন, তারপর Enter চাপুন।",
          },
          {
            icon: <CheckCircle size={15} color="#22c55e" />,
            text: "SUCCESS দেখালে → পরের টোকেন দিন।",
          },
          {
            icon: <XCircle size={15} color="#f87171" />,
            text: "REJECT দেখালে → টোকেন ও ক্রম চেক করুন, আবার চেষ্টা করুন।",
          },
        ].map(({ icon, text }, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              marginBottom: 10,
            }}
          >
            <div style={{ flexShrink: 0, marginTop: 2 }}>{icon}</div>
            <p
              style={{
                fontFamily: "Hind Siliguri, sans-serif",
                fontSize: "var(--fs-sm)",
                color: "#94a3b8",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              {text}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Warning */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        style={{
          background: "rgba(220,38,38,0.06)",
          border: "1px solid rgba(220,38,38,0.2)",
          borderRadius: 14,
          padding: "14px 18px",
          marginBottom: 14,
        }}
      >
        <p
          style={{
            fontFamily: "Hind Siliguri, sans-serif",
            color: "#f87171",
            fontSize: "var(--fs-sm)",
            margin: 0,
            lineHeight: 1.6,
            fontWeight: 600,
          }}
        >
          ⚠️ ভুল ক্রমে ইনপুট করলে টোকেন REJECT হয়। ব্যালেন্স শেষ হওয়ার আগেই সব
          টোকেন দিন।
        </p>
      </motion.div>

      {/* Back button */}
      <div style={{ textAlign: "center", marginTop: 10 }}>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate(tokens ? "/tokens" : "/")}
          style={{
            background: "linear-gradient(135deg,#15803d,#16a34a)",
            border: "none",
            borderRadius: 12,
            padding: "12px 28px",
            color: "#fff",
            fontWeight: 700,
            fontSize: "var(--fs-md)",
            fontFamily: "Hind Siliguri, sans-serif",
            cursor: "pointer",
          }}
        >
          {tokens ? "← টোকেন পেজে ফিরে যান" : "← হোমে ফিরে যান"}
        </motion.button>
      </div>
    </div>
  );
}
