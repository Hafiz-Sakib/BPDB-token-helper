import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

// counterapi.dev V1 — no auth, no signup, free, CORS-friendly
// Namespace: bpdb-token-helper | Counter: visitors
const API_UP = "https://api.counterapi.dev/v1/bpdb-token-helper/visitors/up";
const API_GET = "https://api.counterapi.dev/v1/bpdb-token-helper/visitors";

export default function VisitorCounter() {
  const [count, setCount] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const alreadyCounted = sessionStorage.getItem("bpdb_counted");
    (async () => {
      try {
        const url = alreadyCounted ? API_GET : API_UP;
        const res = await fetch(url);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setCount(data.count ?? data.value ?? 0);
        if (!alreadyCounted) sessionStorage.setItem("bpdb_counted", "1");
      } catch {
        setError(true);
      }
    })();
  }, []);

  if (error || count === null) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      title="মোট ভিজিটর"
      style={{
        position: "fixed",
        top: 14,
        right: 16,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: "rgba(7,36,58,0.88)",
        border: "1px solid rgba(22,163,74,0.28)",
        borderRadius: 24,
        padding: "5px 12px 5px 8px",
        backdropFilter: "blur(12px)",
        cursor: "default",
        boxShadow: "0 2px 16px rgba(0,0,0,0.4)",
      }}
    >
      {/* Pulsing icon */}
      <motion.div
        animate={{ scale: [1, 1.18, 1] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "rgba(22,163,74,0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Users size={13} color="#22c55e" />
      </motion.div>

      <div
        style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}
      >
        <span
          style={{
            fontFamily: "Barlow Condensed, sans-serif",
            fontWeight: 700,
            fontSize: 14,
            color: "#22c55e",
            letterSpacing: "0.04em",
          }}
        >
          {count.toLocaleString()}
        </span>
        <span
          style={{
            fontFamily: "Hind Siliguri, sans-serif",
            fontSize: 9,
            color: "#475569",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          ভিজিটর
        </span>
      </div>
    </motion.div>
  );
}
