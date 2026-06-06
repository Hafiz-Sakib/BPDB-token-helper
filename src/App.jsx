import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import TokensPage from "./pages/TokensPage";
import MeterCodesPage from "./pages/MeterCodesPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: "100vh",
          background: `
            radial-gradient(ellipse 70% 55% at 20% -5%, rgba(30,58,138,0.35) 0%, transparent 65%),
            radial-gradient(ellipse 60% 50% at 80% 10%, rgba(22,163,74,0.18) 0%, transparent 60%),
            linear-gradient(180deg, #001020 0%, #001b2a 100%)
          `,
          paddingBottom: 60,
          fontFamily: "Hind Siliguri, sans-serif",
        }}
      >
        {/* Toast offset:
            - desktop: badge is fixed top-right (14px), toast top-center no conflict → 16px fine
            - mobile: badge renders inline in layout, toast at top-center needs to clear it (~90px) */}
        <Toaster
          position="top-center"
          containerStyle={{ top: 16 }}
          toastOptions={{
            style: {
              background: "#07243a",
              color: "#fff",
              border: "1px solid rgba(22,163,74,0.3)",
              fontFamily: "Hind Siliguri, sans-serif",
              fontSize: "var(--fs-base)",
              maxWidth: "calc(100vw - 32px)",
            },
          }}
        />
        <div
          style={{
            position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
            backgroundImage:
              "linear-gradient(rgba(22,163,74,0.018) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(22,163,74,0.018) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tokens" element={<TokensPage />} />
          <Route path="/meter-codes" element={<MeterCodesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
