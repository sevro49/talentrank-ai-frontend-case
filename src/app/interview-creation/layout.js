"use client";

import React, { Suspense } from "react";
import FormControls from "../../components/FormControls";
import Header from "../../components/Header";

// Yüklenme sırasında gösterilecek içerik
const LoadingFallback = () => {
  return <div style={{ textAlign: "center", padding: "20px" }}>Loading content...</div>;
};

export default function InterviewCreationLayout({ children }) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <div>
        <Header />
        <main style={{ padding: "20px" }}>{children}</main>
        <FormControls />
      </div>
    </Suspense>
  );
}
