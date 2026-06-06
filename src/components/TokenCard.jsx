import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ChevronRight } from "lucide-react";
import { formatToken } from "../utils/parseMessage";

export default function TokenCard({
  token,
  index,
  total,
  isActive,
  isDone,
  onDone,
  onActivate,
}) {
  const [copied, setCopied] = useState(false);
  const [floaters, setFloaters] = useState([]);

  const formatted = formatToken(token);
  const groups = formatted.split("-");

  const handleCopy = async (e) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(token);
    setCopied(true);
    const id = Date.now();
    setFloaters((f) => [...f, { id }]);
    setTimeout(() => setFloaters((f) => f.filter((x) => x.id !== id)), 1000);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMarkDone = (e) => {
    e.stopPropagation();
    // Serial enforcement: only the currently active token can be marked done
    if (!isActive) return;
    onDone(index);
  };

  const borderColor = isDone
    ? "rgba(22,163,74,0.55)"
    : isActive
      ? "rgba(244,197,66,0.55)"
      : "rgba(255,255,255,0.06)";

  const bgColor = isDone
    ? "rgba(22,163,74,0.10)"
    : isActive
      ? "rgba(244,197,66,0.07)"
      : "rgba(7,36,58,0.95)";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.38,
        delay: index * 0.055,
        ease: [0.4, 0, 0.2, 1],
      }}
      onClick={() => !isDone && isActive && onActivate(index)}
      style={{
        position: "relative",
        background: bgColor,
        border: `1px solid ${borderColor}`,
        borderRadius: 16,
        padding: "14px",
        cursor: isDone ? "default" : isActive ? "pointer" : "default",
        transition: "background 0.3s, border-color 0.3s",
        overflow: "visible",
      }}
      whileHover={isActive && !isDone ? { scale: 1.012, y: -2 } : {}}
    >
      {/* Floating copy confirmation */}
      <AnimatePresence>
        {floaters.map((f) => (
          <motion.span
            key={f.id}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -50 }}
            exit={{}}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: -10,
              right: 54,
              fontSize: "0.78rem",
              fontWeight: 700,
              color: "#22c55e",
              pointerEvents: "none",
              zIndex: 99,
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            ✓ copied
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Done shimmer */}
      {isDone && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.35 }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 16,
            background: "rgba(22,163,74,0.04)",
            transformOrigin: "left",
            pointerEvents: "none",
          }}
        />
      )}

      {/* ── Top row: badge/label + action buttons ── */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 12,
          gap: 8,
        }}
      >
        {/* Badge + label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            minWidth: 0,
            flexShrink: 1,
          }}
        >
          <motion.div
            animate={
              isActive && !isDone
                ? {
                    boxShadow: [
                      "0 0 0px rgba(244,197,66,0.3)",
                      "0 0 14px rgba(244,197,66,0.7)",
                      "0 0 0px rgba(244,197,66,0.3)",
                    ],
                  }
                : {}
            }
            transition={{ repeat: Infinity, duration: 1.8 }}
            style={{
              width: 30,
              height: 30,
              flexShrink: 0,
              borderRadius: "50%",
              background: isDone
                ? "linear-gradient(135deg,#15803d,#22c55e)"
                : isActive
                  ? "linear-gradient(135deg,#d4a017,#f4c542)"
                  : "rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Barlow Condensed, sans-serif",
              fontWeight: 800,
              fontSize: "0.85rem",
              color: isDone || isActive ? "#fff" : "#64748b",
            }}
          >
            {isDone ? "✓" : index + 1}
          </motion.div>

          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: "0.78rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: isDone ? "#22c55e" : isActive ? "#f4c542" : "#64748b",
              }}
            >
              {isDone
                ? "✅ সঠিকভাবে দেওয়া হয়েছে"
                : isActive
                  ? "← এখন এই টোকেনটি দিন"
                  : `টোকেন নং ${index + 1} / ${total}`}
            </div>
            {!isDone && !isActive && (
              <div style={{ fontSize: "0.72rem", color: "#334155" }}>
                পরে দিন
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            flexShrink: 0,
          }}
        >
          {/* Copy icon button */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={handleCopy}
            title="ডিজিট কপি করুন"
            style={{
              background: copied
                ? "rgba(22,163,74,0.2)"
                : "rgba(255,255,255,0.05)",
              border: `1px solid ${copied ? "rgba(22,163,74,0.5)" : "rgba(255,255,255,0.1)"}`,
              borderRadius: 8,
              width: 34,
              height: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: copied ? "#22c55e" : "#94a3b8",
              transition: "all 0.2s",
              alignSelf: "flex-end",
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </motion.button>

          {/* Mark done button — SERIAL ONLY: disabled unless this is the active token */}
          {!isDone && (
            <motion.button
              whileTap={isActive ? { scale: 0.9 } : {}}
              onClick={handleMarkDone}
              disabled={!isActive}
              title={!isActive ? "আগের টোকেন আগে দিন" : ""}
              style={{
                background: isActive
                  ? "rgba(22,163,74,0.15)"
                  : "rgba(255,255,255,0.02)",
                border: `1px solid ${isActive ? "rgba(22,163,74,0.4)" : "rgba(255,255,255,0.04)"}`,
                borderRadius: 8,
                padding: "5px 8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
                cursor: isActive ? "pointer" : "not-allowed",
                color: isActive ? "#4ade80" : "#2d3f50",
                fontSize: "0.75rem",
                fontWeight: 700,
                fontFamily: "Hind Siliguri, sans-serif",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
                minWidth: 0,
                opacity: isActive ? 1 : 0.35,
              }}
            >
              ✓ দেওয়া হলে এখানে ক্লিক করুন ! <ChevronRight size={11} />
            </motion.button>
          )}
        </div>
      </div>

      {/* ── Token digit groups ── */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
          alignItems: "center",
          fontFamily: "JetBrains Mono, monospace",
        }}
      >
        {groups.map((group, gi) => (
          <React.Fragment key={gi}>
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.055 + gi * 0.04, duration: 0.28 }}
              style={{
                display: "inline-block",
                background: isDone
                  ? "rgba(22,163,74,0.12)"
                  : isActive
                    ? "rgba(244,197,66,0.10)"
                    : "rgba(255,255,255,0.05)",
                border: `1px solid ${isDone ? "rgba(22,163,74,0.22)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 7,
                padding: "6px 10px",
                fontSize: "clamp(13px, 2.8vw, 18px)",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: isDone ? "#4ade80" : isActive ? "#fbbf24" : "#e2e8f0",
                lineHeight: 1,
              }}
            >
              {group}
            </motion.span>
            {gi < 4 && (
              <span
                style={{
                  color: "#2d4a5e",
                  fontSize: "1rem",
                  fontWeight: 700,
                  userSelect: "none",
                }}
              >
                —
              </span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Instruction hint */}
      {isActive && !isDone && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.28 }}
          style={{
            marginTop: 10,
            fontSize: "0.82rem",
            color: "#fbbf24",
            fontFamily: "Hind Siliguri, sans-serif",
            lineHeight: 1.5,
          }}
        >
          ⌨️ এই ২০টি সংখ্যা মিটারে দিন → Enter চাপুন → তারপর "দেওয়া হয়েছে"
          বাটনে ক্লিক করুন!
        </motion.p>
      )}

      {/* Lock hint for non-active cards */}
      {!isActive && !isDone && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.28 }}
          style={{
            marginTop: 20,
            fontSize: "0.75rem",
            color: "#DC2626",
            fontFamily: "Hind Siliguri, sans-serif",
            lineHeight: 1.4,
          }}
        >
          🔒 টোকেনগুলো সিরিয়াল অনুযায়ী দিন !
        </motion.p>
      )}
    </motion.div>
  );
}
