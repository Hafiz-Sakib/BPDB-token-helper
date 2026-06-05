import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

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

  if (count === null) return null;

  const badge = (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.35 }}
      title="মোট ভিজিটর"
      style={{
        position: "fixed",
        top: 14,
        right: 14,
        zIndex: 9999,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        background: "rgba(4,24,42,0.92)",
        border: "1px solid rgba(22,163,74,0.35)",
        borderRadius: 10,
        padding: "8px 12px",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow:
          "0 4px 24px rgba(0,0,0,0.55), 0 0 0 1px rgba(22,163,74,0.07), inset 0 1px 0 rgba(255,255,255,0.04)",
        cursor: "default",
        userSelect: "none",
      }}
    >
      {/* Pulse dot */}
      <div style={{ position: "relative", width: 8, height: 8, flexShrink: 0 }}>
        <motion.div
          animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ repeat: Infinity, duration: 2.6, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: "50%",
            background: "rgba(22,163,74,0.5)",
          }}
        />
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#22c55e",
          }}
        />
      </div>

      {/* Text block */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 1,
        }}
      >
        <span
          style={{
            fontFamily: "Hind Siliguri, sans-serif",
            fontWeight: 700,
            fontSize: 15,
            lineHeight: 1,
            color: "#22c55e",
          }}
        >
          {count.toLocaleString()}
        </span>
        <span
          style={{
            fontFamily: "Hind Siliguri, sans-serif",
            fontWeight: 500,
            fontSize: 10,
            lineHeight: 1,
            color: "#4a7a5a",
            whiteSpace: "nowrap",
          }}
        >
          জন ভিজিট করেছেন
        </span>
      </div>

      {/* Icon */}
      <Users size={14} color="rgba(34,197,94,0.5)" strokeWidth={2} />
    </motion.div>
  );

  return createPortal(badge, document.body);
}
