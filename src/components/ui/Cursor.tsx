"use client";

import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const pos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let rafId: number;
    let cx = -100, cy = -100;

    const animate = () => {
      cx += (pos.current.x - cx) * 0.18;
      cy += (pos.current.y - cy) * 0.18;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor]")) setHovering(true);
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor]")) setHovering(false);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference will-change-transform"
      style={{
        width: hovering ? 36 : 10,
        height: hovering ? 36 : 10,
        background: "rgba(255,255,255,0.88)",
        transition: "width 0.22s cubic-bezier(0.22,1,0.36,1), height 0.22s cubic-bezier(0.22,1,0.36,1)",
      }}
    />
  );
}
