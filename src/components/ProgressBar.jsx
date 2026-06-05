import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressBar({ done, total }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'var(--card)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 16,
        padding: '16px 20px',
        marginBottom: 20,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 13, color: '#94a3b8', fontFamily: 'Hind Siliguri' }}>
          অগ্রগতি
        </span>
        <span style={{
          fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 16,
          color: pct === 100 ? '#22c55e' : '#f4c542',
        }}>
          {done}/{total} টোকেন — {pct}%
        </span>
      </div>

      {/* Track */}
      <div style={{
        height: 8, borderRadius: 99,
        background: 'rgba(255,255,255,0.06)',
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: pct === 100
              ? 'linear-gradient(90deg, #15803d, #22c55e)'
              : 'linear-gradient(90deg, #d4a017, #f4c542)',
            borderRadius: 99,
            boxShadow: pct === 100
              ? '0 0 12px rgba(22,163,74,0.6)'
              : '0 0 12px rgba(244,197,66,0.5)',
          }}
        />
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', gap: 4, marginTop: 10, flexWrap: 'wrap' }}>
        {Array.from({ length: total }).map((_, i) => (
          <motion.div
            key={i}
            animate={i < done ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
            style={{
              width: 10, height: 10, borderRadius: '50%',
              background: i < done
                ? '#22c55e'
                : i === done
                ? '#f4c542'
                : 'rgba(255,255,255,0.1)',
              boxShadow: i < done ? '0 0 6px rgba(22,163,74,0.7)' : undefined,
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
