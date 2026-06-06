import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

const API_UP = "https://api.counterapi.dev/v1/bpdb-token-helper/visitors/up";

export function useVisitorCount() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const isLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (isLocal) {
      setCount(999);
      return;
    }

    (async () => {
      try {
        const res = await fetch(API_UP, { cache: "no-store" });
        const data = await res.json();
        const val =
          typeof data?.count === "number"
            ? data.count
            : typeof data?.value === "number"
              ? data.value
              : typeof data?.hits === "number"
                ? data.hits
                : null;
        if (val !== null) setCount(val);
      } catch {
        // API down — don't show broken badge
      }
    })();
  }, []);

  return count;
}

// Inline badge — placed directly in layout (not a portal)
export default function VisitorCounter() {
  const count = useVisitorCount();

  if (count === null) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.35 }}
      title="মোট ভিজিটর"
      style={{
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 9,
        background: "rgba(4,24,42,0.93)",
        border: "1px solid rgba(22,163,74,0.35)",
        borderRadius: 10,
        padding: "8px 13px 8px 11px",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow:
          "0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
        cursor: "default",
        userSelect: "none",
      }}
    >
      {/* Live pulse dot */}
      <div style={{ position: "relative", width: 10, height: 10, flexShrink: 0 }}>
        <motion.div
          animate={{ scale: [1, 2.0, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "rgba(22,163,74,0.4)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "#22c55e",
          }}
        />
      </div>

      {/* Number + label */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <span
          style={{
            fontFamily: "'Hind Siliguri', sans-serif",
            fontWeight: 700,
            fontSize: 17,
            lineHeight: "20px",
            color: "#22c55e",
            whiteSpace: "nowrap",
          }}
        >
          {count.toLocaleString()}
        </span>
        <span
          style={{
            fontFamily: "'Hind Siliguri', sans-serif",
            fontWeight: 600,
            fontSize: 13,
            lineHeight: "14px",
            color: "#4a7a5a",
            whiteSpace: "nowrap",
          }}
        >
          জন ভিজিট করেছেন
        </span>
      </div>

      {/* Icon */}
      <Users
        size={16}
        color="rgba(34,197,94,0.45)"
        strokeWidth={2}
        style={{ flexShrink: 0 }}
      />
    </motion.div>
  );
}
