import { motion } from "framer-motion";
import { Activity, BarChart3, Cpu, Shield } from "lucide-react";


const features = [
  {
    icon: Activity,
    title: "Real-time Monitoring",
    description: "Track energy consumption across all nodes instantly",
  },
  {
    icon: Cpu,
    title: "Edge AI Processing",
    description: "On-device intelligence for zero-latency decisions",
  },
  {
    icon: Shield,
    title: "Anomaly Detection",
    description: "AI-powered alerts for unusual patterns",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description: "Predictive insights to optimize consumption",
  },
];




export default function FeaturesList(){

  return <motion.div 
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{feature.title}</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
}
