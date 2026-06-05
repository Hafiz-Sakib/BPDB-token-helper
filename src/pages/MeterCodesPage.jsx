import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";

const CODES = [
  { code: "800", meaning: "মোট বিদ্যুৎ ব্যবহারের পরিমাণ" },
  { code: "801", meaning: "বর্তমান ব্যালেন্সের (টাকা) পরিমাণ" },
  { code: "802", meaning: "বর্তমান তারিখ দেখা" },
  { code: "803", meaning: "বর্তমান সময় দেখা" },
  { code: "804", meaning: "মিটারের সিরিয়াল নাম্বার" },
  { code: "806", meaning: "রিলে সংযোগ বিচ্ছিন্নের কারণ" },
  { code: "807", meaning: "মিটারের অবস্থা দেখা" },
  { code: "808", meaning: "বর্তমান সংযুক্ত লোড" },
  { code: "809", meaning: "ট্যারিফের সূচক দেখা" },
  { code: "810", meaning: "ইমার্জেন্সি ব্যালেন্সের পরিমাণ" },
  { code: "811", meaning: "ইমার্জেন্সি ব্যালেন্স সচল (Activate) করতে" },
  { code: "812", meaning: "সংকেত (Alarm) বন্ধ করা" },
  { code: "813", meaning: "কত দিনের বিদ্যুতের ব্যবহার" },
  { code: "814", meaning: "বর্তমান মাসের বিদ্যুৎ ব্যবহারের পরিমাণ" },
  { code: "815", meaning: "সর্বশেষ রিচার্জের তারিখ" },
  { code: "816", meaning: "সর্বশেষ রিচার্জের সময়" },
  { code: "817", meaning: "সর্বশেষ রিচার্জের পরিমাণ" },
  { code: "819", meaning: "বিদ্যুৎ বন্ধের সময়" },
  { code: "820", meaning: "গত মাসের বিদ্যুৎ ব্যবহারের পরিমাণ" },
  { code: "821", meaning: "গত মাসের পরিমাণ" },
  { code: "822", meaning: "গত দুই মাসের বিদ্যুৎ ব্যবহারের পরিমাণ" },
  { code: "823", meaning: "গত দুই মাসের বিদ্যুৎ ব্যবহার" },
  { code: "824", meaning: "গত তিন মাসের বিদ্যুৎ ব্যবহারের পরিমাণ" },
  { code: "825", meaning: "গত তিন মাসের বিদ্যুৎ ব্যবহার" },
  { code: "830", meaning: "গত ট্যারিফ চেঞ্জ কোড" },
  { code: "869", meaning: "সর্বোচ্চ পাওয়ার লোড" },
  { code: "870", meaning: "A ফেইজ ভোল্টেজ" },
  { code: "875", meaning: "A ফেইজ কারেন্ট" },
  { code: "877", meaning: "A ফেইজ পাওয়ার" },
  { code: "878", meaning: "বর্তমান ট্যারিফের মূল্য" },
  { code: "880", meaning: "বর্তমান ইউটিলিটির তথ্য" },
  { code: "886", meaning: "B ফেইজ কারেন্ট" },
  { code: "888", meaning: "সিস্টেম স্ট্যাটাস তথ্য" },
  { code: "889", meaning: "বর্তমান টেম্পারেচার সীমান্ত" },
  { code: "895", meaning: "ক্রেডিট মোডে কাজ করা যাবে" },
  { code: "896", meaning: "বর্তমান মোডে কাজ করা যাবে না" },
  { code: "897", meaning: "ক্রেডিট মোডে কাজ করার সংখ্যা" },
  { code: "898", meaning: "ক্রেডিট মোড থেকে ক্রয়ের সময়" },
  { code: "899", meaning: "মিটারের লগ তথ্য" },
  { code: "900", meaning: "ক্রেডিট মোড তথ্য" },
  { code: "920", meaning: "সার্ভার হটলাইন নম্বর" },
  { code: "921", meaning: "ব্যবহৃত হটলাইন নম্বর" },
  { code: "923", meaning: "বর্তমান মাসের ব্যবহৃত টাকা" },
  { code: "924", meaning: "গত দুই মাসের ব্যবহৃত টাকা" },
  { code: "925", meaning: "গত তিন মাসের ব্যবহৃত টাকা" },
  { code: "926", meaning: "গত চার মাসের ব্যবহৃত টাকা" },
  { code: "927", meaning: "গত পাঁচ মাসের ব্যবহৃত টাকা" },
  { code: "928", meaning: "গত ছয় মাসের ব্যবহৃত টাকা" },
  { code: "981", meaning: "জরুরি অতিরিক্ত টাকার পরিমাণ" },
];

const SPECIAL_NOTES = [
  {
    label: "ইমার্জেন্সি ব্যালেন্স",
    desc: "ব্যালেন্স শেষ হলে 811 চাপুন — সীমিত ইমার্জেন্সি বিদ্যুৎ পাবেন। পরের রিচার্জ থেকে কেটে নেওয়া হবে। 810 চেপে বাকি পরিমাণ দেখুন।",
  },
  {
    label: "কোড দেওয়ার নিয়ম",
    desc: "মিটারের কীপ্যাডে কোড টাইপ করুন তারপর Enter বা # বাটন চাপুন। ডিসপ্লেতে ফলাফল দেখাবে।",
  },
  {
    label: "⚠️ কোড 806 গুরুত্বপূর্ণ",
    desc: "মিটার বন্ধ হলে 806 ডায়াল করুন, স্ক্রিনের ছবি তুলুন এবং বিদ্যুৎ অফিসে দেখান — তারা unlock টোকেন দেবে।",
  },
];

const HIGHLIGHT = ["810", "811", "806", "801"];

export default function MeterCodesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = CODES.filter(
    (c) =>
      c.code.includes(search) ||
      c.meaning.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div
      style={{
        position: "relative",
        zIndex: 1,
        maxWidth: "min(900px, 96vw)",
        margin: "0 auto",
        padding: "0 clamp(12px, 3vw, 28px)",
      }}
    >
      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          padding: "clamp(24px,5vw,44px) 0 clamp(16px,3vw,24px)",
          textAlign: "center",
        }}
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 10,
            padding: "8px 16px",
            color: "#94a3b8",
            fontSize: "0.88rem",
            cursor: "pointer",
            fontFamily: "Hind Siliguri, sans-serif",
            marginBottom: 24,
            width: "fit-content",
          }}
        >
          <ArrowLeft size={14} /> হোমে ফিরুন
        </motion.button>

        <div style={{ fontSize: "clamp(32px,7vw,50px)", marginBottom: 10 }}>
          🔢
        </div>
        <h1
          style={{
            fontFamily: "Hind Siliguri, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.4rem, 5vw, 2.2rem)",
            background:
              "linear-gradient(135deg,#22c55e 0%,#16a34a 50%,#86efac 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: 8,
            lineHeight: 1.2,
          }}
        >
          মিটার শর্ট কোড
        </h1>
        <p
          style={{
            fontFamily: "Hind Siliguri, sans-serif",
            fontSize: "var(--fs-base)",
            color: "#64748b",
            lineHeight: 1.6,
            maxWidth: 500,
            margin: "0 auto",
          }}
        >
          BPDB প্রিপেইড মিটারে বিভিন্ন তথ্য দেখার জন্য শর্ট কোড সমূহ
        </p>
      </motion.header>

      {/* Special notes */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(260px,100%), 1fr))",
          gap: 12,
          marginBottom: 28,
        }}
      >
        {SPECIAL_NOTES.map((n, i) => (
          <div
            key={i}
            style={{
              background:
                i === 2 ? "rgba(244,197,66,0.06)" : "rgba(22,163,74,0.07)",
              border: `1px solid ${i === 2 ? "rgba(244,197,66,0.25)" : "rgba(22,163,74,0.2)"}`,
              borderRadius: 14,
              padding: "14px 16px",
            }}
          >
            <div
              style={{
                fontFamily: "Hind Siliguri, sans-serif",
                fontWeight: 700,
                fontSize: "0.88rem",
                color: i === 2 ? "#fbbf24" : "#22c55e",
                marginBottom: 5,
              }}
            >
              {i !== 2 ? "💡 " : ""}
              {n.label}
            </div>
            <div
              style={{
                fontFamily: "Hind Siliguri, sans-serif",
                fontSize: "0.82rem",
                color: "#94a3b8",
                lineHeight: 1.6,
              }}
            >
              {n.desc}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ position: "relative", marginBottom: 20 }}
      >
        <Search
          size={16}
          style={{
            position: "absolute",
            left: 14,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#475569",
            pointerEvents: "none",
          }}
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="কোড বা বিবরণ দিয়ে খুঁজুন..."
          style={{
            width: "100%",
            background: "rgba(7,36,58,0.9)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12,
            padding: "11px 14px 11px 40px",
            color: "#e2e8f0",
            fontSize: "var(--fs-base)",
            fontFamily: "Hind Siliguri, sans-serif",
            outline: "none",
            transition: "border-color 0.2s",
            boxSizing: "border-box",
          }}
          onFocus={(e) => (e.target.style.borderColor = "rgba(22,163,74,0.5)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
        />
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        style={{
          background: "rgba(7,36,58,0.8)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "80px 1fr",
            background: "rgba(22,163,74,0.12)",
            borderBottom: "1px solid rgba(22,163,74,0.2)",
            padding: "12px 16px",
            gap: 12,
          }}
        >
          <div
            style={{
              fontFamily: "Hind Siliguri, sans-serif",
              fontWeight: 700,
              fontSize: "0.85rem",
              color: "#22c55e",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            কোড
          </div>
          <div
            style={{
              fontFamily: "Hind Siliguri, sans-serif",
              fontWeight: 700,
              fontSize: "0.85rem",
              color: "#22c55e",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            তথ্যের অর্থ
          </div>
        </div>

        {filtered.length === 0 ? (
          <div
            style={{
              padding: "32px 16px",
              textAlign: "center",
              fontFamily: "Hind Siliguri, sans-serif",
              color: "#475569",
            }}
          >
            কোনো ফলাফল পাওয়া যায়নি
          </div>
        ) : (
          filtered.map((row, i) => {
            const isHighlight = HIGHLIGHT.includes(row.code);
            return (
              <motion.div
                key={row.code}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.012 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr",
                  gap: 12,
                  padding: "11px 16px",
                  borderBottom:
                    i < filtered.length - 1
                      ? "1px solid rgba(255,255,255,0.04)"
                      : "none",
                  background: isHighlight
                    ? "rgba(244,197,66,0.04)"
                    : i % 2 === 0
                      ? "transparent"
                      : "rgba(255,255,255,0.015)",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(22,163,74,0.07)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = isHighlight
                    ? "rgba(244,197,66,0.04)"
                    : i % 2 === 0
                      ? "transparent"
                      : "rgba(255,255,255,0.015)")
                }
              >
                <div
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: isHighlight ? "#fbbf24" : "#4ade80",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {row.code}
                </div>
                <div
                  style={{
                    fontFamily: "Hind Siliguri, sans-serif",
                    fontSize: "0.9rem",
                    color: isHighlight ? "#fde68a" : "#cbd5e1",
                    display: "flex",
                    alignItems: "center",
                    lineHeight: 1.5,
                  }}
                >
                  {row.meaning}
                </div>
              </motion.div>
            );
          })
        )}
      </motion.div>

      <p
        style={{
          textAlign: "center",
          marginTop: 16,
          fontFamily: "Hind Siliguri, sans-serif",
          fontSize: "0.78rem",
          color: "#334155",
        }}
      >
        মোট {filtered.length} টি কোড দেখানো হচ্ছে
      </p>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          textAlign: "center",
          marginTop: 40,
          paddingTop: 20,
          borderTop: "1px solid rgba(255,255,255,0.05)",
          paddingBottom: 20,
        }}
      >
        <p
          style={{
            fontSize: "var(--fs-sm)",
            color: "#334155",
            fontFamily: "Hind Siliguri, sans-serif",
          }}
        >
          Made with ❤️ by{" "}
          <a
            href="https://hafizsakib.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#22c55e",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Mohammad Hafizur Rahman Sakib
          </a>
        </p>
      </motion.footer>
    </div>
  );
}
