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
          width: '100%', padding: '12px 18px',
          background: 'rgba(7,36,58,0.8)',
          border: '1px solid rgba(22,163,74,0.25)',
          borderRadius: open ? '16px 16px 0 0' : 16,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'pointer', color: '#fff',
          fontFamily: 'Hind Siliguri, sans-serif', fontSize: 14, fontWeight: 600,
          transition: 'border-radius 0.3s',
        }}
      >
        <span>📋 টোকেন দেওয়ার নিয়ম</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={16} color="#22c55e" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              background: 'rgba(7,36,58,0.6)',
              border: '1px solid rgba(22,163,74,0.18)',
              borderTop: 'none',
              borderRadius: '0 0 16px 16px',
              padding: '16px 18px',
            }}>
              {steps.map((s, i) => (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  style={{
                    display: 'flex', gap: 12, alignItems: 'flex-start',
                    marginBottom: i < steps.length - 1 ? 14 : 0,
                  }}
                >
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg,#15803d,#22c55e)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 800, fontFamily: 'Barlow Condensed',
                    marginTop: 1,
                  }}>{s.num}</div>
                  <div>
                    <div style={{ fontSize: 14, color: '#e2e8f0', fontFamily: 'Hind Siliguri', lineHeight: 1.5 }}>
                      {s.bn}
                    </div>
                    <div style={{ fontSize: 11, color: '#475569', fontFamily: 'JetBrains Mono', marginTop: 2 }}>
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
                  marginTop: 16, padding: '10px 14px',
                  background: 'rgba(244,197,66,0.08)',
                  border: '1px solid rgba(244,197,66,0.25)',
                  borderRadius: 10, fontSize: 12,
                  color: '#fbbf24', fontFamily: 'Hind Siliguri',
                  lineHeight: 1.6,
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
