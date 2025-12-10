
import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  pulseSpeed: number;
}

const BackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 70; // Slightly increased count
    const connectionDistance = 160;
    const mouseDistance = 220; // Increased interaction range

    let mouse = { x: -1000, y: -1000 };
    let time = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY + window.scrollY; // Account for scroll
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 2 + 1;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4, // Slower base movement
          vy: (Math.random() - 0.5) * 0.4,
          size: size,
          baseSize: size,
          pulseSpeed: Math.random() * 0.05 + 0.02,
        });
      }
    };

    const draw = () => {
      const isDark = document.documentElement.classList.contains('dark');
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Styles based on theme
      const particleColor = isDark ? 'rgba(47, 129, 247, 0.6)' : 'rgba(47, 129, 247, 0.45)'; // GitHub Accent
      const lineColor = isDark ? 'rgba(208, 215, 222, 0.12)' : 'rgba(87, 96, 106, 0.12)';

      time += 0.05;

      // Update and draw particles
      particles.forEach((p, i) => {
        // Movement
        p.x += p.vx;
        p.y += p.vy;

        // Pulsating Size Effect
        p.size = p.baseSize + Math.sin(time * p.pulseSpeed) * 0.5;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Mouse interaction (Repel with damping)
        const dx = mouse.x - p.x;
        const dy = (mouse.y - window.scrollY) - p.y; // Adjust mouse Y for fixed canvas
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseDistance) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouseDistance - distance) / mouseDistance;
          // Stronger repel force
          const directionX = forceDirectionX * force * 3; 
          const directionY = forceDirectionY * force * 3;

          p.x -= directionX;
          p.y -= directionY;
        }

        // Draw Particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0, p.size), 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        // Draw Connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist2 < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = lineColor;
            // Opacity creates depth
            ctx.lineWidth = (1 - dist2 / connectionDistance) * 0.8; 
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resizeCanvas);
    
    // Initial setup
    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
      style={{ opacity: 0.85 }}
    />
  );
};

export default BackgroundAnimation;
