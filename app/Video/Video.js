"use client";

import { useState, useEffect } from "react";

export default function Video() {
  const [showVideo, setShowVideo] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [videoSrc, setVideoSrc] = useState("/intro.mp4");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // ✔️ اذا كان الفيديو اشتغل قبل — ما يعيد يشتغل
    const hasPlayed = localStorage.getItem("introPlayed");
    if (hasPlayed) return;

    const updateVideoSrc = () => {
      const isMobile = window.innerWidth <= 768;
      setVideoSrc(isMobile ? "/44.mp4" : "/intro.mp4");
    };

    updateVideoSrc();
    setShowVideo(true);

    const fadeTimer = setTimeout(() => setFadeOut(true), 4000);
    const hideTimer = setTimeout(() => {
      setShowVideo(false);

      // ✔️ نخزن علامة الفيديو اشتغل مرة
      localStorage.setItem("introPlayed", "true");
    }, 4000);

    window.addEventListener("resize", updateVideoSrc);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
      window.removeEventListener("resize", updateVideoSrc);
    };
  }, []);

  if (!showVideo) return null;

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black z-[999] transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <video src={videoSrc} autoPlay muted className="w-full h-full object-cover" />
    </div>
  );
}
