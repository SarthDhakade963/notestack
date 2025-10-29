"use client";

const PARTICLE_COUNT = 20;

export function FloatingParticles() {
  const particles = [...Array(PARTICLE_COUNT)].map((_, i) => ({
    left: `${(i * 5) % 100}%`,
    top: `${(i * 7) % 100}%`,
    delay: `${(i * 0.25) % 5}s`,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}
