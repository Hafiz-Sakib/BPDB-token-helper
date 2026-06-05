import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import TokensPage from "./pages/TokensPage";
import MeterCodesPage from "./pages/MeterCodesPage";
import VisitorCounter from "./components/VisitorCounter";

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
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#07243a",
              color: "#fff",
              border: "1px solid rgba(22,163,74,0.3)",
              fontFamily: "Hind Siliguri, sans-serif",
              fontSize: "var(--fs-base)",
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
        <VisitorCounter />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tokens" element={<TokensPage />} />
          <Route path="/meter-codes" element={<MeterCodesPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
