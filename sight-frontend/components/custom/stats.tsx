import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Live stat display
function LiveStat({ value, label, suffix }: { value: string; label: string; suffix?: string }) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-3xl font-bold text-white">
        {value}
        {suffix && <span className="text-green-400 text-xl ml-1">{suffix}</span>}
      </div>
      <div className="text-sm text-neutral-400 mt-1">{label}</div>
    </motion.div>
  );
}

export function Stats(){

  const [currentPower, setCurrentPower] = useState(2847);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPower(prev => prev + Math.floor(Math.random() * 20) - 10);
    }, 2000);
    return () => clearInterval(interval);
  }, []);


 return <motion.div 
              className="flex gap-12 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <LiveStat value={currentPower.toLocaleString()} label="Active Watts" suffix="W" />
              <LiveStat value="847" label="Buildings Connected" />
              <LiveStat value="24.7" label="MWh Saved Today" suffix="%" />
            </motion.div>

}

