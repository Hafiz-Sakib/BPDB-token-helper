import React, { useState, useRef } from "react";
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
      onClick={() => !isDone && onActivate(index)}
      style={{
        position: "relative",
        background: bgColor,
        border: `1px solid ${borderColor}`,
        borderRadius: 16,
        padding: "clamp(14px,3vw,20px)",
        cursor: isDone ? "default" : "pointer",
        transition: "background 0.3s, border-color 0.3s",
        overflow: "visible",
      }}
      whileHover={!isDone ? { scale: 1.012, y: -2 } : {}}
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
              fontSize: "var(--fs-xs)",
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

      {/* Done shimmer overlay */}
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

      {/* ── Top row ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
          gap: 8,
        }}
      >
        {/* Badge + label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            minWidth: 0,
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
              width: 32,
              height: 32,
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
              fontSize: "var(--fs-sm)",
              color: isDone || isActive ? "#fff" : "#64748b",
            }}
          >
            {isDone ? "✓" : index + 1}
          </motion.div>

          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: "var(--fs-xs)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: isDone ? "#22c55e" : isActive ? "#f4c542" : "#64748b",
                whiteSpace: "nowrap",
              }}
            >
              {isDone
                ? "✅ সম্পন্ন"
                : isActive
                  ? "← এখন দিন"
                  : `টোকেন ${index + 1} / ${total}`}
            </div>
            {!isDone && !isActive && (
              <div style={{ fontSize: "var(--fs-xs)", color: "#334155" }}>
                পরে দিন
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
          {/* Copy */}
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
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: copied ? "#22c55e" : "#94a3b8",
              transition: "all 0.2s",
            }}
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
          </motion.button>

          {/* Mark done */}
          {!isDone && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleMarkDone}
              style={{
                background: isActive
                  ? "rgba(22,163,74,0.15)"
                  : "rgba(255,255,255,0.04)",
                border: `1px solid ${isActive ? "rgba(22,163,74,0.4)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 8,
                padding: "0 12px",
                height: 36,
                display: "flex",
                alignItems: "center",
                gap: 4,
                cursor: "pointer",
                color: isActive ? "#4ade80" : "#475569",
                fontSize: "var(--fs-xs)",
                fontWeight: 700,
                fontFamily: "Hind Siliguri, sans-serif",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              ✓ দেওয়া হয়েছে <ChevronRight size={13} />
            </motion.button>
          )}
        </div>
      </div>

      {/* ── Token digit groups ── */}
      <div
        style={{
          display: "flex",
          gap: "clamp(4px,1vw,8px)",
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
                borderRadius: 8,
                padding: "clamp(5px,1.2vw,9px) clamp(7px,1.8vw,13px)",
                fontSize: "clamp(15px,3.5vw,20px)",
                fontWeight: 700,
                letterSpacing: "0.12em",
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
                  fontSize: "var(--fs-md)",
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

      {/* Instruction hint for active token */}
      {isActive && !isDone && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.28 }}
          style={{
            marginTop: 12,
            fontSize: "var(--fs-sm)",
            color: "#fbbf24",
            fontFamily: "Hind Siliguri, sans-serif",
            lineHeight: 1.6,
          }}
        >
          ⌨️ এই ২০টি সংখ্যা মিটারে দিন → Enter চাপুন → তারপর "দেওয়া হয়েছে"
          বাটনে ক্লিক করুন!
        </motion.p>
      )}
    </motion.div>
  );
}
