import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, RotateCcw } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const [sparks, setSparks] = useState([]);

  useEffect(() => {
    const items = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2.5 + Math.random() * 2,
      size: 3 + Math.random() * 5,
    }));
    setSparks(items);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "24px clamp(16px, 4vw, 40px)",
        textAlign: "center",
      }}
    >
      {/* Floating spark particles */}
      {sparks.map((s) => (
        <motion.div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: "rgba(34,197,94,0.6)",
            pointerEvents: "none",
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.4, 0.5],
            y: [0, -24, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: s.duration,
            delay: s.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(22,163,74,0.025) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(22,163,74,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 520,
          width: "100%",
        }}
      >
        {/* 404 Number */}
        <motion.div
          style={{
            fontFamily: "Barlow Condensed, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(72px, 20vw, 130px)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            background:
              "linear-gradient(135deg,#22c55e 0%,#16a34a 40%,#86efac 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            display: "inline-block",
          }}
          animate={{
            textShadow: [
              "0 0 0px transparent",
              "0 0 40px rgba(34,197,94,0.2)",
              "0 0 0px transparent",
            ],
          }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        >
          404
        </motion.div>

        {/* Glitch bar */}
        <motion.div
          style={{
            height: 3,
            background:
              "linear-gradient(90deg,transparent,#22c55e,transparent)",
            borderRadius: 2,
            margin: "10px auto 20px",
            width: "55%",
          }}
          animate={{ scaleX: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />

        {/* Bangla title */}
        <h1
          style={{
            fontFamily: "Hind Siliguri, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.2rem, 5vw, 1.8rem)",
            color: "#e2e8f0",
            marginBottom: 10,
            lineHeight: 1.3,
          }}
        >
          পেজটি পাওয়া যায়নি!
        </h1>
        <p
          style={{
            fontFamily: "Hind Siliguri, sans-serif",
            fontSize: "clamp(0.88rem, 3.5vw, 1rem)",
            color: "#64748b",
            lineHeight: 1.7,
            marginBottom: 32,
          }}
        >
          আপনি যে পেজটি খুঁজছেন সেটি মুছে ফেলা হয়েছে অথবা কখনও ছিল না।
          <br />
          BPDB টোকেন হেল্পার ব্যবহার করতে হোমপেজে ফিরে যান।
        </p>

        {/* BPDB pulse badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          style={{
            background: "rgba(4,24,42,0.85)",
            border: "1px solid rgba(22,163,74,0.2)",
            borderRadius: 16,
            padding: "14px 20px",
            marginBottom: 28,
            backdropFilter: "blur(12px)",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0px rgba(22,163,74,0.4)",
                "0 0 12px rgba(22,163,74,0.8)",
                "0 0 0px rgba(22,163,74,0.4)",
              ],
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#22c55e",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "Barlow Condensed, sans-serif",
              fontSize: "clamp(0.72rem,3vw,0.82rem)",
              color: "#475569",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            Bangladesh Power Development Board
          </span>
        </motion.div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <motion.button
            whileHover={{
              scale: 1.04,
              boxShadow: "0 8px 32px rgba(22,163,74,0.45)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "linear-gradient(135deg,#15803d,#16a34a)",
              border: "none",
              borderRadius: 12,
              padding: "12px 24px",
              color: "#fff",
              fontWeight: 700,
              fontSize: "clamp(0.88rem, 3.5vw, 1rem)",
              fontFamily: "Hind Siliguri, sans-serif",
              cursor: "pointer",
              letterSpacing: "0.02em",
            }}
          >
            <Home size={18} /> হোমপেজে যান
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.history.back()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(7,36,58,0.9)",
              border: "1px solid rgba(22,163,74,0.25)",
              borderRadius: 12,
              padding: "12px 22px",
              color: "#4ade80",
              fontWeight: 600,
              fontSize: "clamp(0.88rem, 3.5vw, 1rem)",
              fontFamily: "Hind Siliguri, sans-serif",
              cursor: "pointer",
              letterSpacing: "0.02em",
              transition: "border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(22,163,74,0.55)";
              e.currentTarget.style.background = "rgba(22,163,74,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(22,163,74,0.25)";
              e.currentTarget.style.background = "rgba(7,36,58,0.9)";
            }}
          >
            <RotateCcw size={16} /> পেছনে যান
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
