import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ChevronRight } from 'lucide-react';
import { formatToken } from '../utils/parseMessage';

export default function TokenCard({ token, index, total, isActive, isDone, onDone, onActivate }) {
  const [copied, setCopied] = useState(false);
  const [floaters, setFloaters] = useState([]);
  const cardRef = useRef(null);

  const formatted = formatToken(token);
  const groups = formatted.split('-');

  const handleCopy = async (e) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(token);
    setCopied(true);
    // Spawn floating "+copied" particle
    const id = Date.now();
    setFloaters(f => [...f, { id, x: Math.random() * 40 - 20 }]);
    setTimeout(() => setFloaters(f => f.filter(x => x.id !== id)), 1000);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMarkDone = (e) => {
    e.stopPropagation();
    onDone(index);
  };

  const statusColor = isDone
    ? 'rgba(22,163,74,0.18)'
    : isActive
    ? 'rgba(244,197,66,0.10)'
    : 'rgba(7,36,58,0.95)';

  const borderColor = isDone
    ? 'rgba(22,163,74,0.55)'
    : isActive
    ? 'rgba(244,197,66,0.55)'
    : 'rgba(255,255,255,0.06)';

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}
      onClick={() => !isDone && onActivate(index)}
      style={{
        position: 'relative',
        background: statusColor,
        border: `1px solid ${borderColor}`,
        borderRadius: 16,
        padding: '16px 18px',
        cursor: isDone ? 'default' : 'pointer',
        transition: 'all 0.3s ease',
        overflow: 'visible',
      }}
      whileHover={!isDone ? { scale: 1.015, y: -2 } : {}}
    >
      {/* Floating copy confirmations */}
      <AnimatePresence>
        {floaters.map(f => (
          <motion.span
            key={f.id}
            initial={{ opacity: 1, y: 0, x: f.x }}
            animate={{ opacity: 0, y: -50 }}
            exit={{}}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: -10,
              right: 50,
              fontSize: 12,
              fontWeight: 700,
              color: '#22c55e',
              pointerEvents: 'none',
              zIndex: 99,
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            ✓ copied
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Done overlay shimmer */}
      {isDone && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            position: 'absolute', inset: 0, borderRadius: 16,
            background: 'rgba(22,163,74,0.06)',
            transformOrigin: 'left',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Top row: index + status badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <motion.div
            animate={isActive && !isDone ? { boxShadow: ['0 0 0px rgba(244,197,66,0.4)', '0 0 16px rgba(244,197,66,0.7)', '0 0 0px rgba(244,197,66,0.4)'] } : {}}
            transition={{ repeat: Infinity, duration: 1.8 }}
            style={{
              width: 30, height: 30,
              borderRadius: '50%',
              background: isDone
                ? 'linear-gradient(135deg,#15803d,#22c55e)'
                : isActive
                ? 'linear-gradient(135deg,#d4a017,#f4c542)'
                : 'rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 800,
              fontSize: 14,
              color: isDone || isActive ? '#fff' : '#64748b',
            }}
          >
            {isDone ? '✓' : index + 1}
          </motion.div>
          <span style={{
            fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: isDone ? '#22c55e' : isActive ? '#f4c542' : '#64748b',
          }}>
            {isDone ? 'সম্পন্ন' : isActive ? '← এখন দিন' : `টোকেন ${index + 1}/${total}`}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 6 }}>
          {/* Copy button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleCopy}
            style={{
              background: copied ? 'rgba(22,163,74,0.2)' : 'rgba(255,255,255,0.06)',
              border: `1px solid ${copied ? 'rgba(22,163,74,0.5)' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: 8, width: 32, height: 32,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: copied ? '#22c55e' : '#94a3b8',
              transition: 'all 0.2s',
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </motion.button>

          {/* Done button */}
          {!isDone && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleMarkDone}
              style={{
                background: isActive ? 'rgba(22,163,74,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${isActive ? 'rgba(22,163,74,0.4)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 8, padding: '4px 10px', height: 32,
                display: 'flex', alignItems: 'center', gap: 4,
                cursor: 'pointer',
                color: isActive ? '#4ade80' : '#475569',
                fontSize: 11, fontWeight: 700,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              ✓ দেওয়া হয়েছে <ChevronRight size={12} />
            </motion.button>
          )}
        </div>
      </div>

      {/* Token digits — grouped display */}
      <div style={{
        display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center',
        fontFamily: 'JetBrains Mono, monospace',
      }}>
        {groups.map((group, gi) => (
          <React.Fragment key={gi}>
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.06 + gi * 0.05, duration: 0.3 }}
              style={{
                display: 'inline-block',
                background: isDone
                  ? 'rgba(22,163,74,0.12)'
                  : isActive
                  ? 'rgba(244,197,66,0.10)'
                  : 'rgba(255,255,255,0.05)',
                border: `1px solid ${isDone ? 'rgba(22,163,74,0.25)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 8,
                padding: '6px 10px',
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: isDone ? '#4ade80' : isActive ? '#fbbf24' : '#e2e8f0',
                lineHeight: 1,
              }}
            >
              {group}
            </motion.span>
            {gi < 4 && (
              <span style={{ color: '#334155', fontSize: 14, fontWeight: 700 }}>—</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Instruction text for active */}
      {isActive && !isDone && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          style={{
            marginTop: 10, fontSize: 12,
            color: '#fbbf24', fontFamily: 'Hind Siliguri, sans-serif',
            lineHeight: 1.6,
          }}
        >
          ⌨️ এই ২০টি সংখ্যা মিটারে দিন → Enter চাপুন → তারপর "দেওয়া হয়েছে" চাপুন
        </motion.p>
      )}
    </motion.div>
  );
}
