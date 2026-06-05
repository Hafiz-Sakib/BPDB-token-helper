import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { Zap, Clipboard, RefreshCw } from 'lucide-react';

import { parseMessage } from './utils/parseMessage';
import TokenCard from './components/TokenCard';
import MetaPanel from './components/MetaPanel';
import ProgressBar from './components/ProgressBar';
import HowToPanel from './components/HowToPanel';
import SuccessScreen from './components/SuccessScreen';

const SAMPLE = `Successful!Your BPDBprepaid
Prepaid Token is
0009-1238-5758-5698-8998,5342-5289-0474-8599-5126,6355-9412-8148-7543-5442,2318-6245-8781-1330-8425,0485-9948-1083-9372-9651,2340-1868-9252-3756-2445,7007-6996-5908-0967-6646,0917-3074-1127-3725-7454,6353-3780-6986-0096-2328,0474-4120-4424-6100-5107,2672-1466-9045-8482-5641,SqNo:-1~9 for offline Meter
No:10311094233,Vending
Amt:2000.0,Enrg Cost:
1705.99,Total Charge:294.01,Meter
Rent 1P:40,Demand
Charge:168,VAT:95.24,Rebate:-9.23.`;

export default function App() {
  const [rawText, setRawText] = useState('');
  const [tokens, setTokens] = useState([]);
  const [meta, setMeta] = useState(null);
  const [doneSet, setDoneSet] = useState(new Set());
  const [activeIdx, setActiveIdx] = useState(0);
  const [parsed, setParsed] = useState(false);
  const [allDone, setAllDone] = useState(false);

  const handleParse = useCallback(() => {
    if (!rawText.trim()) {
      toast.error('বার্তা খালি! কপি করা SMS বা টোকেন বার্তা পেস্ট করুন।');
      return;
    }
    const result = parseMessage(rawText);
    if (result.tokens.length === 0) {
      toast.error('কোনো টোকেন খুঁজে পাওয়া যায়নি। বার্তাটি পুনরায় চেক করুন।');
      return;
    }
    setTokens(result.tokens);
    setMeta(result.meta);
    setDoneSet(new Set());
    setActiveIdx(0);
    setAllDone(false);
    setParsed(true);
    toast.success(`${result.tokens.length}টি টোকেন পাওয়া গেছে!`, { icon: '⚡' });
  }, [rawText]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setRawText(text);
      toast.success('ক্লিপবোর্ড থেকে পেস্ট হয়েছে');
    } catch {
      toast.error('ক্লিপবোর্ড অ্যাক্সেস করা যায়নি। ম্যানুয়ালি পেস্ট করুন।');
    }
  };

  const handleSample = () => {
    setRawText(SAMPLE);
    toast('নমুনা বার্তা লোড হয়েছে', { icon: '📋' });
  };

  const handleMarkDone = (idx) => {
    const next = new Set(doneSet);
    next.add(idx);
    setDoneSet(next);
    if (next.size === tokens.length) {
      setAllDone(true);
      toast.success('সব টোকেন সম্পন্ন! 🎉', { duration: 4000 });
    } else {
      const nextActive = idx + 1 < tokens.length ? idx + 1 : idx;
      setActiveIdx(nextActive);
      toast(`টোকেন ${idx + 1} সম্পন্ন ✓`, { icon: '✅' });
    }
  };

  const handleReset = () => {
    setParsed(false);
    setTokens([]);
    setMeta(null);
    setDoneSet(new Set());
    setActiveIdx(0);
    setAllDone(false);
    setRawText('');
  };

  const doneCount = doneSet.size;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse 70% 55% at 20% -5%, rgba(30,58,138,0.35) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 80% 10%, rgba(22,163,74,0.18) 0%, transparent 60%), linear-gradient(180deg,#001020 0%,#001b2a 100%)',
      backgroundImage: `
        radial-gradient(ellipse 70% 55% at 20% -5%, rgba(30,58,138,0.35) 0%, transparent 65%),
        radial-gradient(ellipse 60% 50% at 80% 10%, rgba(22,163,74,0.18) 0%, transparent 60%),
        linear-gradient(180deg, #001020 0%, #001b2a 100%)
      `,
      paddingBottom: 60,
    }}>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#07243a',
            color: '#fff',
            border: '1px solid rgba(22,163,74,0.3)',
            fontFamily: 'Hind Siliguri, sans-serif',
            fontSize: 14,
          },
        }}
      />

      {/* Pitch grid overlay */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(22,163,74,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(22,163,74,0.018) 1px, transparent 1px)',
        backgroundSize: '72px 72px',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 640, margin: '0 auto', padding: '0 16px' }}>

        {/* ── HEADER ── */}
        <motion.header
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          style={{ textAlign: 'center', padding: '40px 0 28px' }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            style={{ fontSize: 52, marginBottom: 12, display: 'block' }}
          >⚡</motion.div>

          <h1 style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontWeight: 900, fontSize: 'clamp(26px,6vw,38px)',
            textTransform: 'uppercase', letterSpacing: '-0.01em',
            background: 'linear-gradient(135deg,#22c55e 0%,#16a34a 50%,#86efac 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: 6,
          }}>
            BPDB প্রিপেইড টোকেন
          </h1>
          <p style={{
            fontFamily: 'Hind Siliguri, sans-serif',
            fontSize: 14, color: '#64748b',
          }}>
            টোকেন বার্তা পেস্ট করুন — সহজে একটি একটি করে দিন
          </p>

          {/* Live dot */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 12 }}>
            <motion.div
              animate={{ boxShadow: ['0 0 0px rgba(22,163,74,0.4)','0 0 14px rgba(22,163,74,0.8)','0 0 0px rgba(22,163,74,0.4)'] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }}
            />
            <span style={{ fontSize: 11, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>
              Bangladesh Power Development Board
            </span>
          </div>
        </motion.header>

        {/* ── INPUT SECTION ── */}
        <AnimatePresence mode="wait">
          {!parsed && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <HowToPanel />

              {/* Textarea card */}
              <div style={{
                background: 'var(--card)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 20,
                padding: '20px',
                marginBottom: 16,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{
                    fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 13,
                    textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8',
                  }}>
                    টোকেন বার্তা
                  </span>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <motion.button whileTap={{ scale: 0.95 }} onClick={handlePaste}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 5,
                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 8, padding: '5px 10px', cursor: 'pointer',
                        color: '#94a3b8', fontSize: 12, fontFamily: 'Hind Siliguri',
                      }}>
                      <Clipboard size={12} /> পেস্ট
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.95 }} onClick={handleSample}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 5,
                        background: 'rgba(22,163,74,0.08)', border: '1px solid rgba(22,163,74,0.2)',
                        borderRadius: 8, padding: '5px 10px', cursor: 'pointer',
                        color: '#4ade80', fontSize: 12, fontFamily: 'Hind Siliguri',
                      }}>
                      নমুনা দেখুন
                    </motion.button>
                  </div>
                </div>

                <textarea
                  value={rawText}
                  onChange={e => setRawText(e.target.value)}
                  placeholder="এখানে আপনার BPDB/DESCO/REB প্রিপেইড টোকেন SMS বা বার্তাটি পেস্ট করুন..."
                  style={{
                    width: '100%', minHeight: 160,
                    background: 'rgba(8,38,61,0.9)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 12, padding: '12px 14px',
                    color: '#e2e8f0', fontSize: 13, lineHeight: 1.7,
                    fontFamily: 'Hind Siliguri, JetBrains Mono, sans-serif',
                    resize: 'vertical', outline: 'none',
                    transition: 'border-color 0.25s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(22,163,74,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(22,163,74,0.5)' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleParse}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg,#15803d,#16a34a)',
                  border: 'none', borderRadius: 14,
                  padding: '15px 24px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  color: '#fff', fontWeight: 700, fontSize: 16,
                  fontFamily: 'Hind Siliguri, sans-serif',
                  cursor: 'pointer', letterSpacing: '0.02em',
                }}
              >
                <Zap size={18} />
                টোকেন বিশ্লেষণ করুন
              </motion.button>
            </motion.div>
          )}

          {parsed && (
            <motion.div
              key="tokens"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Reset button */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleReset}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10, padding: '7px 14px',
                  color: '#94a3b8', fontSize: 12, cursor: 'pointer',
                  fontFamily: 'Hind Siliguri', marginBottom: 20,
                }}
              >
                <RefreshCw size={13} /> নতুন বার্তা
              </motion.button>

              {/* Meta panel */}
              {meta && <MetaPanel meta={meta} />}

              {/* Progress */}
              {!allDone && tokens.length > 1 && (
                <ProgressBar done={doneCount} total={tokens.length} />
              )}

              {/* Token cards or success */}
              {allDone ? (
                <SuccessScreen total={tokens.length} onReset={handleReset} />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {tokens.map((token, i) => (
                    <TokenCard
                      key={i}
                      token={token}
                      index={i}
                      total={tokens.length}
                      isActive={i === activeIdx && !doneSet.has(i)}
                      isDone={doneSet.has(i)}
                      onDone={handleMarkDone}
                      onActivate={setActiveIdx}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            textAlign: 'center', marginTop: 48,
            paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <p style={{ fontSize: 11, color: '#334155', fontFamily: 'Hind Siliguri' }}>
            BPDB প্রিপেইড টোকেন সহায়ক • অনানুষ্ঠানিক টুল
          </p>
          <p style={{ fontSize: 10, color: '#1e293b', marginTop: 4 }}>
            Made with ⚡ for Bangladeshi electricity consumers
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
