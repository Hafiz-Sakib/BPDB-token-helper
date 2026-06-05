import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

// Always UP — counterapi.dev is idempotent enough for page views
const API_UP = "https://api.counterapi.dev/v1/bpdb-token-helper/visitors/up";

export default function VisitorCounter() {
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
        // v1 returns { count: N, namespace: ..., name: ... }
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

  // Hide only if API failed completely
  if (count === null) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.35 }}
      title="মোট ভিজিটর"
      style={{
        position: "fixed",
        top: 12,
        right: 12,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: 5,
        background: "rgba(4,24,42,0.93)",
        border: "1px solid rgba(22,163,74,0.38)",
        borderRadius: 20,
        padding: "4px 10px 4px 6px",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow: "0 2px 20px rgba(0,0,0,0.5), 0 0 0 1px rgba(22,163,74,0.08)",
        cursor: "default",
        userSelect: "none",
      }}
    >
      {/* Pulse ring + icon */}
      <div
        style={{ position: "relative", width: 22, height: 22, flexShrink: 0 }}
      >
        <motion.div
          animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "easeOut" }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "1.5px solid rgba(22,163,74,0.5)",
          }}
        />
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "rgba(22,163,74,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Users size={12} color="#22c55e" strokeWidth={2.2} />
        </div>
      </div>

      <div
        style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}
      >
        <span
          style={{
            fontFamily: "Barlow Condensed, monospace",
            fontWeight: 700,
            fontSize: "clamp(12px, 2.5vw, 15px)",
            color: "#22c55e",
            letterSpacing: "0.03em",
            minWidth: 24,
          }}
        >
          {count.toLocaleString()}
        </span>
        <span
          style={{
            fontFamily: "sans-serif",
            fontSize: "clamp(7px, 1.5vw, 9px)",
            color: "#4a6a5a",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            fontWeight: 600,
          }}
        >
          ভিজিটর
        </span>
      </div>
    </motion.div>
  );
}
