import { motion } from 'framer-motion';
import { cn } from '../../lib/utils.ts';

interface GaugeChartProps {
  value: number;
  label: string;
  color?: string;
  size?: number;
  className?: string;
}

export default function GaugeChart({
  value,
  label,
  color = '#3b82f6',
  size = 120,
  className,
}: GaugeChartProps) {
  const clampedValue = Math.max(0, Math.min(100, value));

  // SVG params for semi-circle gauge
  const centerX = size / 2;
  const centerY = size / 2 + 10;
  const radius = size / 2 - 14;
  const strokeWidth = 10;

  // Arc path (180 degrees, from left to right)
  const startAngle = Math.PI;
  const endAngle = 0;
  const valueAngle = startAngle - (clampedValue / 100) * Math.PI;

  // Arc helpers
  const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => ({
    x: cx + r * Math.cos(angle),
    y: cy - r * Math.sin(angle),
  });

  const arcStart = polarToCartesian(centerX, centerY, radius, startAngle);
  const arcEnd = polarToCartesian(centerX, centerY, radius, endAngle);
  const arcValueEnd = polarToCartesian(centerX, centerY, radius, valueAngle);

  // Background arc (full semi-circle)
  const bgPath = `M ${arcStart.x} ${arcStart.y} A ${radius} ${radius} 0 0 1 ${arcEnd.x} ${arcEnd.y}`;

  // Value arc
  const largeArcFlag = clampedValue > 50 ? 1 : 0;
  const valuePath = `M ${arcStart.x} ${arcStart.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${arcValueEnd.x} ${arcValueEnd.y}`;

  // Needle position
  const needleLength = radius - 6;
  const needleTip = polarToCartesian(centerX, centerY, needleLength, valueAngle);

  // Color gradient based on value
  const getValueColor = () => {
    if (clampedValue >= 90) return '#10b981';
    if (clampedValue >= 70) return color;
    if (clampedValue >= 50) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <svg width={size} height={size / 2 + 28} viewBox={`0 0 ${size} ${size / 2 + 28}`}>
        {/* Background arc */}
        <path
          d={bgPath}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Value arc */}
        <motion.path
          d={valuePath}
          fill="none"
          stroke={getValueColor()}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />

        {/* Needle */}
        <motion.line
          x1={centerX}
          y1={centerY}
          x2={needleTip.x}
          y2={needleTip.y}
          stroke="#374151"
          strokeWidth={2}
          strokeLinecap="round"
          initial={{ x2: arcStart.x, y2: arcStart.y }}
          animate={{ x2: needleTip.x, y2: needleTip.y }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />

        {/* Center dot */}
        <circle cx={centerX} cy={centerY} r={4} fill="#374151" />

        {/* Value text */}
        <text
          x={centerX}
          y={centerY + 20}
          textAnchor="middle"
          className="fill-gray-800 font-bold"
          style={{ fontSize: size > 100 ? 16 : 12 }}
        >
          {clampedValue.toFixed(1)}%
        </text>
      </svg>
      <p className="text-xs text-gray-500 font-medium mt-1 text-center">{label}</p>
    </div>
  );
}
