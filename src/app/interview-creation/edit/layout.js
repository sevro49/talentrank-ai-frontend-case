"use client";

import React, { Suspense } from "react";

// Yüklenme sırasında gösterilecek içerik (dilersen özelleştirebilirsin)
const LoadingFallback = () => {
  return <div style={{ textAlign: "center", padding: "20px" }}>Loading step1...</div>;
};

export default function Layout({ children }) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <div style={{ padding: "20px" }}>
        {children}
      </div>
    </Suspense>
  );
}
