import React from 'react';
import { motion } from 'framer-motion';

export default function SuccessScreen({ total, onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      style={{
        textAlign: 'center', padding: '48px 24px',
        background: 'rgba(22,163,74,0.06)',
        border: '1px solid rgba(22,163,74,0.35)',
        borderRadius: 24,
        marginTop: 8,
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ fontSize: 64, marginBottom: 16 }}
      >
        ⚡
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          fontFamily: 'Barlow Condensed, sans-serif',
          fontWeight: 900, fontSize: 32, textTransform: 'uppercase',
          letterSpacing: '0.04em',
          background: 'linear-gradient(135deg,#22c55e,#86efac)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: 10,
        }}
      >
        সব টোকেন সম্পন্ন!
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ color: '#94a3b8', fontSize: 14, fontFamily: 'Hind Siliguri', marginBottom: 28 }}
      >
        {total}টি টোকেন সফলভাবে মিটারে দেওয়া হয়েছে।
        আপনার মিটার এখন আপডেট হয়ে গেছে।
      </motion.p>

      {/* Particle dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 28 }}>
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -12, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.12, ease: 'easeInOut' }}
            style={{
              width: 8, height: 8, borderRadius: '50%',
              background: i % 2 === 0 ? '#22c55e' : '#f4c542',
            }}
          />
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.04, boxShadow: '0 8px 28px rgba(22,163,74,0.4)' }}
        whileTap={{ scale: 0.97 }}
        onClick={onReset}
        style={{
          background: 'linear-gradient(135deg,#15803d,#16a34a)',
          border: 'none', borderRadius: 14,
          padding: '12px 28px',
          color: '#fff', fontWeight: 700, fontSize: 14,
          fontFamily: 'Hind Siliguri, sans-serif',
          cursor: 'pointer',
        }}
      >
        নতুন টোকেন বার্তা দিন
      </motion.button>
    </motion.div>
  );
}
