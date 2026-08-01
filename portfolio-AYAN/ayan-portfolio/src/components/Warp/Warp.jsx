import { useEffect, useRef } from "react";
import "./Warp.scss";
export default function WarpSpeed() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();

    let xMod = 0;
    let yMod = 0;
    let warpSpeed = 0;

    const setWarp = (on) => (warpSpeed = on ? 1 : 0);

    function Star() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.c = 0;
    }

    Star.prototype.updateColor = function () {
      this.c = Math.min(255, this.c + 5);
    };

    Star.prototype.updatePos = function () {
      const speedMult = warpSpeed ? 0.028 : 0.02;

      const cx = w / 2;
      const cy = h / 2;

      this.x += xMod + (this.x - cx) * speedMult;
      this.y += yMod + (this.y - cy) * speedMult;

      this.updateColor();

      if (this.x > w || this.x < 0) {
        this.x = Math.random() * w;
        this.c = 0;
      }
      if (this.y > h || this.y < 0) {
        this.y = Math.random() * h;
        this.c = 0;
      }
    };

    const STAR_COUNT = 200;
    const stars = Array.from({ length: STAR_COUNT }, () => new Star());

    const onKeyDown = (e) => {
      const code = e.keyCode || e.which;

      switch (code) {
        case 32: // space
          setWarp(true);
          break;
        case 37: // left
          xMod = Math.min(6, xMod + 0.3);
          break;
        case 38: // up
          yMod = Math.min(6, yMod + 0.3);
          break;
        case 39: // right
          xMod = Math.max(-6, xMod - 0.3);
          break;
        case 40: // down
          yMod = Math.max(-6, yMod - 0.3);
          break;
        default:
          return;
      }
      e.preventDefault();
    };

    const onKeyUp = (e) => {
      const code = e.keyCode || e.which;

      switch (code) {
        case 32:
          setWarp(false);
          break;
        case 37:
        case 39:
          xMod = 0;
          break;
        case 38:
        case 40:
          yMod = 0;
          break;
        default:
          return;
      }
      e.preventDefault();
    };

    const onMouseDown = (e) => {
      if (e.button !== 0) return;
      setWarp(true);
    };

    const onMouseUp = (e) => {
      if (e.button !== 0) return;
      setWarp(false);
    };

    const onTouchStart = (e) => {
      e.preventDefault();
      setWarp(true);
    };
    const onTouchEnd = () => setWarp(false);

    const draw = () => {
      if (warpSpeed === 0) {
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillRect(0, 0, w, h);
      }

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const c = s.c;

        if (warpSpeed) {
          ctx.fillStyle = `rgb(${c},${Math.floor(c * 0.45)},0)`;
        } else {
          ctx.fillStyle = `rgb(${c},${c},${c})`;
        }

        const size = c / 128;
        ctx.fillRect(s.x, s.y, size, size);
        s.updatePos();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    window.addEventListener("keydown", onKeyDown, { passive: false });
    window.addEventListener("keyup", onKeyUp, { passive: false });
    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div className="warp-wrap">
      <canvas ref={canvasRef} className="warp-canvas" />
    </div>
  );
}
