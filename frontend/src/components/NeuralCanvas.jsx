import { useEffect, useRef } from "react";

/**
 * NeuralCanvas – an interactive particle-network background that evokes
 * a "Data Science / AI" aesthetic.  Pure HTML5 Canvas, zero dependencies.
 */

const NODE_COLOR = "rgba(104, 230, 214, 0.6)";
const BRIGHT_COLOR = "rgba(255, 195, 143, 0.5)";
const LINE_COLOR_R = 104;
const LINE_COLOR_G = 182;
const LINE_COLOR_B = 255;
const LINE_MAX_ALPHA = 0.12;

const CONNECTION_DIST = 150;
const ATTRACT_DIST = 200;
const ATTRACT_STRENGTH = 0.012;
const DRIFT_SPEED = 0.3;
const BROWNIAN_FORCE = 0.15;

const DESKTOP_COUNT = 70; // 60-80 range mid-point
const MOBILE_COUNT = 30;
const BRIGHT_RATIO = 0.08; // ~8 % of nodes glow orange

function isTouchDevice() {
  return window.matchMedia("(pointer: coarse)").matches;
}

function createNodes(count, w, h) {
  const nodes = [];
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * DRIFT_SPEED,
      vy: (Math.random() - 0.5) * DRIFT_SPEED,
      r: 2 + Math.random(), // 2-3 px radius
      bright: Math.random() < BRIGHT_RATIO,
    });
  }
  return nodes;
}

export default function NeuralCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w = window.innerWidth;
    let h = window.innerHeight;
    const touch = isTouchDevice();
    let nodes = createNodes(touch ? MOBILE_COUNT : DESKTOP_COUNT, w, h);

    const mouse = { x: -9999, y: -9999 };

    /* ---- sizing ---- */
    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    }
    resize();
    window.addEventListener("resize", resize);

    /* ---- mouse tracking (desktop only) ---- */
    function onMouseMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    function onMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }
    if (!touch) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseleave", onMouseLeave);
    }

    /* ---- animation loop ---- */
    let rafId;

    function frame() {
      ctx.clearRect(0, 0, w, h);

      /* update positions */
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Brownian jitter
        n.vx += (Math.random() - 0.5) * BROWNIAN_FORCE;
        n.vy += (Math.random() - 0.5) * BROWNIAN_FORCE;

        // Clamp speed
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (speed > DRIFT_SPEED) {
          n.vx = (n.vx / speed) * DRIFT_SPEED;
          n.vy = (n.vy / speed) * DRIFT_SPEED;
        }

        // Mouse attraction (desktop)
        if (!touch) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < ATTRACT_DIST && dist > 1) {
            n.vx += (dx / dist) * ATTRACT_STRENGTH * (ATTRACT_DIST - dist);
            n.vy += (dy / dist) * ATTRACT_STRENGTH * (ATTRACT_DIST - dist);
          }
        }

        n.x += n.vx;
        n.y += n.vy;

        // Wrap around edges with padding
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
      }

      /* draw connections */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = LINE_MAX_ALPHA * (1 - dist / CONNECTION_DIST);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${LINE_COLOR_R},${LINE_COLOR_G},${LINE_COLOR_B},${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      /* draw nodes */
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.bright ? BRIGHT_COLOR : NODE_COLOR;
        ctx.fill();
      }

      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);

    /* ---- cleanup ---- */
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      if (!touch) {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
}
