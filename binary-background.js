/* ================= BINARY BACKGROUND ================= */
(function () {
  const canvas = document.getElementById("binary-canvas");
  const ctx = canvas.getContext("2d");
  let particles = [];
  let clicks = [];
  let energy = 0;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  function initParticles() {
    particles = [];
    const count = Math.floor((canvas.width * canvas.height) / 7000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        char: Math.random() > 0.5 ? "1" : "0",
        baseOpacity: Math.random() * 0.3 + 0.06,
        visible: true,
        flickerTimer: Math.random() * 80,
        glitchX: 0,
        glitchTimer: 0,
        size: Math.random() > 0.65 ? 13 : 9,
      });
    }
  }
  initParticles();

  window.addEventListener("click", (e) => {
    const cx = e.clientX;
    const cy = e.clientY;

    const nearby = particles
      .map((p) => ({ p, dist: Math.hypot(p.x - cx, p.y - cy) }))
      .filter((d) => d.dist < 260)
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 10);

    const connections = [];
    nearby.forEach(({ p }) => {
      connections.push({ x1: cx, y1: cy, x2: p.x, y2: p.y, kind: "spoke" });
    });
    for (let i = 0; i < nearby.length; i++) {
      for (let j = i + 1; j < nearby.length; j++) {
        if (Math.random() > 0.45) {
          connections.push({
            x1: nearby[i].p.x, y1: nearby[i].p.y,
            x2: nearby[j].p.x, y2: nearby[j].p.y,
            kind: "web",
          });
        }
      }
    }

    clicks.push({ x: cx, y: cy, time: Date.now(), connections });
    energy = Math.min(energy + 0.5, 4);
  });

  let lastTime = performance.now();

  function animate(timestamp) {
    const dt = Math.min(timestamp - lastTime, 50);
    lastTime = timestamp;

    energy = Math.max(0, energy - 0.008);
    const speedMult = 1 + energy * 2.2;
    const flickerRate = 1 + energy * 3;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.x += p.vx * speedMult;
      p.y += p.vy * speedMult;
      if (p.x < -20) p.x = canvas.width + 20;
      if (p.x > canvas.width + 20) p.x = -20;
      if (p.y < -20) p.y = canvas.height + 20;
      if (p.y > canvas.height + 20) p.y = -20;

      p.flickerTimer += flickerRate * (dt / 16);
      if (p.flickerTimer > 40 + Math.random() * 60) {
        p.flickerTimer = 0;
        p.visible = Math.random() > 0.25;
        if (Math.random() > 0.85) p.char = Math.random() > 0.5 ? "1" : "0";
      }

      p.glitchTimer -= dt;
      if (p.glitchTimer <= 0) {
        p.glitchTimer = 200 + Math.random() * 800;
        p.glitchX = Math.random() > 0.93 ? (Math.random() - 0.5) * 12 : 0;
      }

      if (!p.visible) return;

      const opacity = Math.min(1, p.baseOpacity + energy * 0.15);
      ctx.font = `${p.size}px "Courier New", monospace`;

      if (p.glitchX !== 0) {
        ctx.fillStyle = `rgba(200,64,42,${opacity * 0.5})`;
        ctx.fillText(p.char, p.x + p.glitchX + 3, p.y);
        ctx.fillStyle = `rgba(200,169,110,${opacity * 0.3})`;
        ctx.fillText(p.char, p.x + p.glitchX - 3, p.y);
      }
      ctx.fillStyle = `rgba(200,64,42,${opacity})`;
      ctx.fillText(p.char, p.x + p.glitchX, p.y);
    });

    const now = Date.now();
    clicks = clicks.filter((c) => now - c.time < 1800);

    clicks.forEach((click) => {
      const t = (now - click.time) / 1800;
      const fade = 1 - t;

      [{ r: t * 320, color: "200,64,42", base: 0.4 },
       { r: t * 190, color: "232,130,74", base: 0.28 },
       { r: t * 90,  color: "200,169,110", base: 0.2 }]
        .forEach(({ r, color, base }) => {
          ctx.beginPath();
          ctx.arc(click.x, click.y, r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${color},${fade * base})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });

      click.connections.forEach((conn) => {
        ctx.beginPath();
        ctx.moveTo(conn.x1, conn.y1);
        ctx.lineTo(conn.x2, conn.y2);
        if (conn.kind === "spoke") {
          ctx.strokeStyle = `rgba(200,64,42,${fade * 0.65})`;
          ctx.lineWidth = 1;
        } else {
          ctx.strokeStyle = `rgba(232,130,74,${fade * 0.32})`;
          ctx.lineWidth = 0.5;
        }
        ctx.stroke();
      });

      ctx.beginPath();
      ctx.arc(click.x, click.y, 4 * fade, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,64,42,${fade})`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
})();