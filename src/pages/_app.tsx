import React, { useEffect } from "react";
import { Suspense } from "react";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// font awesome 6
import "public/font-awesome/css/all.min.css";

// custom icons
import "public/glyphter/css/photodit.css";

// aos
import AOS from "aos";
import "aos/dist/aos.css";

// main css
import "@/styles/main.scss";

// admin css
import "@/styles/admin.css";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...pageProps} />
    </Suspense>
  );
}
