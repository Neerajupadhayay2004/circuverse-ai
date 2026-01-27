import { motion } from 'framer-motion';
import { TrendingUp, Leaf, Zap, Recycle, BarChart3, Globe, Activity } from 'lucide-react';
import { useGlobalStats } from '@/hooks/useGlobalStats';

export function GlobalStatsPanel() {
  const { stats, loading } = useGlobalStats();

  if (loading || !stats) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-32 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 animate-pulse"
          />
        ))}
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Analyses',
      value: stats.totalSubmissions.toLocaleString(),
      icon: BarChart3,
      gradient: 'from-emerald-500 to-green-500',
      bgGradient: 'from-emerald-500/20 to-green-500/10',
    },
    {
      label: 'CO₂ Saved',
      value: `${(stats.totalCO2Saved / 1000).toFixed(1)}t`,
      icon: Leaf,
      gradient: 'from-green-500 to-teal-500',
      bgGradient: 'from-green-500/20 to-teal-500/10',
    },
    {
      label: 'Energy Saved',
      value: `${(stats.totalEnergySaved / 1000).toFixed(1)}MWh`,
      icon: Zap,
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-500/20 to-orange-500/10',
    },
    {
      label: 'Avg Circular Score',
      value: `${stats.avgCircularScore}%`,
      icon: Recycle,
      gradient: 'from-cyan-500 to-blue-500',
      bgGradient: 'from-cyan-500/20 to-blue-500/10',
    },
  ];

  return (
    <section className="py-12 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20">
              <Globe className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">Global Impact Dashboard</h2>
              <p className="text-sm text-emerald-300/60">Real-time environmental metrics</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-300">Live</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.bgGradient} border border-white/10 p-4 md:p-6`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <div className={`inline-flex p-2 rounded-xl bg-gradient-to-br ${stat.gradient} mb-3`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              
              <p className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs md:text-sm text-white/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Waste Type Distribution */}
        {stats.wasteTypeDistribution.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Waste Type Distribution
            </h3>
            
            <div className="space-y-3">
              {stats.wasteTypeDistribution.map((item, index) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/80">{item.name}</span>
                    <span className="text-emerald-400">{item.count} ({item.percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
