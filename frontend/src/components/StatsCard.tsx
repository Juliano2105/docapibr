import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  colorClass?: string;
}

export default function StatsCard({ title, value, icon, trend, colorClass = "text-blue-accent" }: StatsCardProps) {
  return (
    <div className="bg-dark-surface border border-white/5 rounded-2xl p-6 shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-dark-text-muted text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold">{value}</h3>
          {trend && (
            <p className="text-sm mt-2 font-medium bg-green-500/10 text-green-400 px-2 py-0.5 rounded w-max">
              {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-dark-bg ${colorClass}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
