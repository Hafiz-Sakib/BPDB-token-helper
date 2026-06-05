import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const steps = [
  { num: 1, bn: 'মিটারে 889 টাইপ করে Enter চাপুন', en: 'Check current TSN (Token Sequence Number)' },
  { num: 2, bn: 'মিটারে দেখানো TSN অনুযায়ী টোকেন ক্রম ঠিক করুন', en: 'Match token order with TSN shown' },
  { num: 3, bn: 'প্রতিটি টোকেন আলাদাভাবে ২০ ডিজিট ইনপুট করুন', en: 'Enter each 20-digit token one by one' },
  { num: 4, bn: 'প্রতিটি টোকেনের পর Enter বাটন চাপুন', en: 'Press Enter after each token' },
  { num: 5, bn: 'GOOD বা SUCCESS দেখালে পরের টোকেন দিন', en: 'Proceed when meter shows GOOD/SUCCESS' },
  { num: 6, bn: 'REJECT দেখালে টোকেনটি আবার সাবধানে দিন', en: 'Re-enter token carefully if REJECT shown' },
];

export default function HowToPanel() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginBottom: 20 }}>
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', padding: '13px 18px',
          background: 'rgba(7,36,58,0.85)',
          border: '1px solid rgba(22,163,74,0.25)',
          borderRadius: open ? '16px 16px 0 0' : 16,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'pointer', color: '#fff',
          fontFamily: 'Hind Siliguri, sans-serif',
          fontSize: 'var(--fs-base)', fontWeight: 600,
          transition: 'border-radius 0.3s',
        }}
      >
        <span>📋 টোকেন দেওয়ার নিয়ম</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.28 }}>
          <ChevronDown size={18} color="#22c55e" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              background: 'rgba(7,36,58,0.7)',
              border: '1px solid rgba(22,163,74,0.18)',
              borderTop: 'none', borderRadius: '0 0 16px 16px',
              padding: 'clamp(14px,3vw,20px)',
            }}>
              {steps.map((s, i) => (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.055 }}
                  style={{
                    display: 'flex', gap: 12, alignItems: 'flex-start',
                    marginBottom: i < steps.length - 1 ? 15 : 0,
                  }}
                >
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg,#15803d,#22c55e)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 'var(--fs-xs)', fontWeight: 800,
                    fontFamily: 'Barlow Condensed, sans-serif',
                    marginTop: 2,
                  }}>{s.num}</div>
                  <div>
                    <div style={{
                      fontSize: 'var(--fs-base)',
                      color: '#e2e8f0',
                      fontFamily: 'Hind Siliguri, sans-serif',
                      lineHeight: 1.55,
                    }}>
                      {s.bn}
                    </div>
                    <div style={{
                      fontSize: 'var(--fs-xs)', color: '#475569',
                      fontFamily: 'JetBrains Mono, monospace', marginTop: 2,
                    }}>
                      {s.en}
                    </div>
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{
                  marginTop: 18, padding: '11px 14px',
                  background: 'rgba(244,197,66,0.08)',
                  border: '1px solid rgba(244,197,66,0.25)',
                  borderRadius: 10,
                  fontSize: 'var(--fs-sm)',
                  color: '#fbbf24',
                  fontFamily: 'Hind Siliguri, sans-serif',
                  lineHeight: 1.65,
                }}
              >
                ⚠️ <strong>সতর্কতা:</strong> টোকেনগুলো অবশ্যই ক্রম অনুযায়ী (Sequence) দিতে হবে।
                এলোমেলো দিলে মিটার গ্রহণ নাও করতে পারে।
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
