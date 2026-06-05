import React from 'react';
import { motion } from 'framer-motion';
import { Zap, CreditCard, Receipt, Tag, Percent, Gift } from 'lucide-react';

const MetaRow = ({ icon: Icon, label, value, color = '#cbd5e1', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -16 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.35 }}
    style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '10px 0',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: 30, height: 30, borderRadius: 8,
        background: 'rgba(22,163,74,0.1)',
        border: '1px solid rgba(22,163,74,0.18)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#22c55e',
      }}>
        <Icon size={14} />
      </div>
      <span style={{ fontSize: 13, color: '#94a3b8', fontFamily: 'Hind Siliguri, sans-serif' }}>
        {label}
      </span>
    </div>
    <span style={{ fontSize: 14, fontWeight: 700, color, fontFamily: 'JetBrains Mono, monospace' }}>
      {value}
    </span>
  </motion.div>
);

export default function MetaPanel({ meta }) {
  if (!meta) return null;

  const rows = [
    meta.meterNo     && { icon: Zap,      label: 'মিটার নম্বর',    value: meta.meterNo,                     color: '#60a5fa' },
    meta.vendingAmt  && { icon: CreditCard,label: 'মোট পরিশোধ',    value: `৳ ${meta.vendingAmt.toFixed(2)}`,  color: '#f4c542' },
    meta.energyCost  && { icon: Zap,       label: 'বিদ্যুৎ খরচ',   value: `৳ ${meta.energyCost.toFixed(2)}`,  color: '#4ade80' },
    meta.totalCharge && { icon: Receipt,   label: 'মোট চার্জ',      value: `৳ ${meta.totalCharge.toFixed(2)}`, color: '#fb923c' },
    meta.meterRent   && { icon: Tag,       label: 'মিটার ভাড়া',    value: `৳ ${meta.meterRent.toFixed(0)}`,   color: '#cbd5e1' },
    meta.demandCharge&& { icon: Receipt,   label: 'ডিমান্ড চার্জ', value: `৳ ${meta.demandCharge.toFixed(0)}`,color: '#cbd5e1' },
    meta.vat         && { icon: Percent,   label: 'ভ্যাট',          value: `৳ ${meta.vat.toFixed(2)}`,         color: '#a78bfa' },
    meta.rebate      && { icon: Gift,      label: 'ছাড় (রিবেট)',   value: `৳ ${meta.rebate.toFixed(2)}`,      color: '#34d399' },
  ].filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'var(--card)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 20,
        padding: '20px 22px',
        marginBottom: 24,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'rgba(244,197,66,0.12)',
          border: '1px solid rgba(244,197,66,0.28)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18,
        }}>⚡</div>
        <div>
          <div style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontWeight: 800, fontSize: 15, textTransform: 'uppercase',
            letterSpacing: '0.08em', color: '#f4c542',
          }}>
            বিলের বিবরণ
          </div>
          {meta.seqStart !== undefined && (
            <div style={{ fontSize: 11, color: '#64748b' }}>
              Token Sequence: {meta.seqStart} ~ {meta.seqEnd}
            </div>
          )}
        </div>
      </div>

      {rows.map((row, i) => (
        <MetaRow key={i} delay={i * 0.05} {...row} />
      ))}
    </motion.div>
  );
}
