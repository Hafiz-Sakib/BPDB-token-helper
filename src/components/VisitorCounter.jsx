import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

// Uses countapi.xyz - free public hit counter, no auth needed
// Namespace: bpdb-token-helper, key: visitors
const NAMESPACE = "bpdb-token-helper";
const KEY = "unique-visitors-v1";

export default function VisitorCounter() {
  const [count, setCount] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Only hit the counter once per session so refreshes don't inflate count
    const alreadyCounted = sessionStorage.getItem("bpdb_counted");

    const fetchCount = async () => {
      try {
        if (!alreadyCounted) {
          // Increment on first visit this session
          const res = await fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`);
          const data = await res.json();
          setCount(data.value);
          sessionStorage.setItem("bpdb_counted", "1");
        } else {
          // Just read current value
          const res = await fetch(`https://api.countapi.xyz/get/${NAMESPACE}/${KEY}`);
          const data = await res.json();
          setCount(data.value);
        }
      } catch {
        setError(true);
      }
    };

    fetchCount();
  }, []);

  if (error || count === null) return null;

  const formatted = count?.toLocaleString("bn-BD") ?? "০";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      style={{
        position: "fixed",
        top: 14,
        right: 16,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: "rgba(7,36,58,0.85)",
        border: "1px solid rgba(22,163,74,0.25)",
        borderRadius: 24,
        padding: "5px 12px 5px 8px",
        backdropFilter: "blur(10px)",
        cursor: "default",
      }}
      title="মোট ভিজিটর"
    >
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
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
        <Users size={12} color="#22c55e" />
      </motion.div>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
        <span
          style={{
            fontFamily: "Barlow Condensed, sans-serif",
            fontWeight: 700,
            fontSize: 13,
            color: "#22c55e",
            letterSpacing: "0.04em",
          }}
        >
          {count?.toLocaleString()}
        </span>
        <span
          style={{
            fontFamily: "Hind Siliguri, sans-serif",
            fontSize: 9,
            color: "#475569",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          ভিজিটর
        </span>
      </div>
    </motion.div>
  );
}
