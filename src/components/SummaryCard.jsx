import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/* ---------------- CountUp (Improved) ---------------- */
function CountUp({ target, duration = 1200 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let frameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = Math.floor(progress * target);

      setCount(value);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [target, duration]);

  return <span>₹{count.toLocaleString("en-IN")}</span>;
}

/* ---------------- Summary Card ---------------- */
function SummaryCard({
  title,
  amount,
  icon: Icon,
  color = "bg-blue-500",
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.03 }}
      className="glass p-8 rounded-2xl flex flex-col gap-5 transition-shadow hover:shadow-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-gray-400 text-sm font-medium tracking-wide">
          {title}
        </p>

        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={18} className="text-white" />
        </div>
      </div>

      {/* Amount */}
      <div className="text-3xl font-bold text-white tracking-tight">
        <CountUp target={amount} />
      </div>

      {/* Bottom accent */}
      <div className={`h-1 rounded-full ${color} opacity-70`} />
    </motion.div>
  );
}

export default SummaryCard;