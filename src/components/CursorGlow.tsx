/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleMouseEnterInteractive = () => setHovered(true);
    const handleMouseLeaveInteractive = () => setHovered(false);

    window.addEventListener("pointermove", handleMouseMove);
    document.body.addEventListener("pointerleave", handleMouseLeave);
    window.addEventListener("pointerdown", handleMouseDown);
    window.addEventListener("pointerup", handleMouseUp);

    // Initial attach for clickable items
    const attachListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'button, a, input, textarea, select, [role="button"], .interactive-glow'
      );
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnterInteractive);
        el.addEventListener("mouseleave", handleMouseLeaveInteractive);
      });
    };

    // Observe changes to attach dynamically loaded content
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    attachListeners();

    return () => {
      window.removeEventListener("pointermove", handleMouseMove);
      document.body.removeEventListener("pointerleave", handleMouseLeave);
      window.removeEventListener("pointerdown", handleMouseDown);
      window.removeEventListener("pointerup", handleMouseUp);
      observer.disconnect();
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      {/* Dynamic Cursor Spot */}
      <div
        id="cursor-dot"
        className={`fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2 bg-white ${
          clicked ? "scale-75" : hovered ? "scale-200" : "scale-100"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      {/* Infinite Subtle Background Glow Shadow */}
      <div
        id="cursor-glow-halo"
        className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-0 opacity-15 mix-blend-screen transition-transform duration-500 ease-out -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,_var(--color-sky-500)_0%,rgba(0,0,0,0)_70%)]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
}
