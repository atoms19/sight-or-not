import { motion } from "framer-motion";
import { Zap } from "lucide-react";
// Animated particles for the energy orb - blue AND green colors
function EnergyParticle({ delay, duration, radius, size }: { delay: number; duration: number; radius: number; size: number }) {
  const colors = ["bg-blue-400", "bg-green-400", "bg-emerald-400", "bg-blue-500"];
  const colorClass = colors[Math.floor(delay * 10) % colors.length];
  
  return (
    <motion.div
      className={`absolute rounded-full ${colorClass}`}
      style={{
        width: size,
        height: size,
        left: "50%",
        top: "50%",
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
      animate={{
        x: [0, Math.cos(delay * Math.PI * 2) * radius, 0],
        y: [0, Math.sin(delay * Math.PI * 2) * radius, 0],
        opacity: [0.2, 1, 0.2],
        scale: [0.5, 1.2, 0.5],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
    />
  );
}

// Orbital ring component with atom-like electron
function OrbitalRing({ radius, duration, clockwise = true, opacity = 0.3, color = "blue" }: { radius: number; duration: number; clockwise?: boolean; opacity?: number; color?: "blue" | "green" }) {
  const borderColor = color === "blue" ? "border-blue-500" : "border-green-500";
  const dotColor = color === "blue" ? "bg-blue-400" : "bg-green-400";
  const glowColor = color === "blue" ? "rgba(59, 130, 246, 0.6)" : "rgba(34, 197, 94, 0.6)";
  
  return (
    <motion.div
      className={`absolute rounded-full border ${borderColor}`}
      style={{
        width: radius * 2,
        height: radius * 2,
        left: "50%",
        top: "50%",
        marginLeft: -radius,
        marginTop: -radius,
        opacity,
      }}
      animate={{
        rotate: clockwise ? 360 : -360,
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {/* Orbiting electron/atom */}
      <motion.div
        className={`absolute w-3 h-3 rounded-full ${dotColor}`}
        style={{
          top: -6,
          left: "50%",
          marginLeft: -6,
          boxShadow: `0 0 12px 3px ${glowColor}`,
        }}
      />
    </motion.div>
  );
}

// Main energy orb visualization - blue AND green gradient
export function Atom() {
  const particles = Array.from({ length: 16 }, (_, i) => ({
    delay: i * 0.25,
    duration: 3 + Math.random() * 2,
    radius: 70 + Math.random() * 50,
    size: 3 + Math.random() * 5,
  }));

  return (
    <div className="relative w-96 h-96 flex items-center justify-center">
      {/* Glow effect - blue and green */}
      <div className="absolute w-56 h-56 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute w-40 h-40 rounded-full bg-green-500/25 blur-2xl" />
      <div className="absolute w-32 h-32 rounded-full bg-emerald-400/20 blur-xl" />
      
      {/* Orbital rings - alternating blue and green */}
      <OrbitalRing radius={160} duration={25} clockwise={true} opacity={0.15} color="blue" />
      <OrbitalRing radius={130} duration={18} clockwise={false} opacity={0.2} color="green" />
      <OrbitalRing radius={100} duration={12} clockwise={true} opacity={0.3} color="blue" />
      <OrbitalRing radius={70} duration={8} clockwise={false} opacity={0.35} color="green" />
      
      {/* Floating particles */}
      {particles.map((p, i) => (
        <EnergyParticle key={i} {...p} />
      ))}
      
      {/* Core - blue to green gradient */}
      <motion.div
        className="relative z-10 w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 via-emerald-500 to-green-500 flex items-center justify-center"
        style={{
          boxShadow: "0 0 80px 20px rgba(34, 197, 94, 0.3), 0 0 40px 10px rgba(59, 130, 246, 0.3)",
        }}
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Zap className="w-12 h-12 text-white" />
      </motion.div>
      
      {/* Pulsing rings from core - alternating colors */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full border ${i % 2 === 0 ? 'border-green-400/40' : 'border-blue-400/40'}`}
          style={{
            width: 112,
            height: 112,
          }}
          animate={{
            scale: [1, 3],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: i * 1.2,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

