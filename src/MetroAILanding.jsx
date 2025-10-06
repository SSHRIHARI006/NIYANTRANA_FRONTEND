import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

const MetroAILanding = ({ onNavigateToDashboard }) => {
  const [hoveredStat, setHoveredStat] = useState(null);
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true });

  // Three.js metro line animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const lines = [];
    
    // Create metro lines
    for (let i = 0; i < 3; i++) {
      lines.push({
        y: (canvas.height / 4) * (i + 1),
        offset: Math.random() * 100,
        speed: 0.3 + Math.random() * 0.3,
        opacity: 0.05 + Math.random() * 0.1
      });
    }
    
    let animationId;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      lines.forEach((line, index) => {
        ctx.strokeStyle = `rgba(255, 255, 255, ${line.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([15, 8]);
        ctx.lineDashOffset = line.offset;
        
        ctx.beginPath();
        ctx.moveTo(-100, line.y);
        ctx.lineTo(canvas.width + 100, line.y);
        ctx.stroke();
        
        line.offset -= line.speed;
        if (line.offset < -23) line.offset = 0;
        
        // Add stations (dots)
        for (let x = 120; x < canvas.width - 120; x += 180) {
          ctx.fillStyle = `rgba(255, 255, 255, ${line.opacity + 0.2})`;
          ctx.beginPath();
          ctx.arc(x, line.y, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  const stats = [
    { label: "Total Fleet Size", value: "25", change: "Fixed", gradient: "from-blue-500 to-blue-600" },
    { label: "Daily Service Runs", value: "15", change: "Optimized", gradient: "from-green-500 to-green-600" },
    { label: "Standby Trains", value: "5", change: "Ready", gradient: "from-yellow-500 to-yellow-600" },
    { label: "AI Predictions", value: "99.2%", change: "Accurate", gradient: "from-purple-500 to-purple-600" }
  ];

  const features = [
    {
      title: "AI-Powered Optimization",
      description: "Advanced MILP algorithm optimizes train assignments using failure risk, mileage, and branding requirements.",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Real-Time Monitoring",
      description: "Live dashboard with real-time train status, location tracking, and performance metrics.",
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      title: "Predictive Maintenance",
      description: "Machine learning models predict maintenance needs to prevent failures and optimize schedules.",
      gradient: "from-orange-500/20 to-red-500/20"
    },
    {
      title: "Multi-Objective Optimization",
      description: "Balances multiple constraints including cost, efficiency, passenger demand, and resource availability.",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Smart Resource Allocation",
      description: "Intelligent allocation of trains and crew members based on real-time demand and operational requirements.",
      gradient: "from-indigo-500/20 to-blue-500/20"
    },
    {
      title: "Cost & Efficiency Analytics",
      description: "Comprehensive reporting and analytics to track performance metrics and operational costs.",
      gradient: "from-teal-500/20 to-green-500/20"
    }
  ];



  const techSpecs = [
    { label: "Algorithm", value: "Mixed Integer Linear Programming (MILP)", color: "blue" },
    { label: "Prediction Accuracy", value: "99.2%", color: "green" },
    { label: "Real-time Processing", value: "<2 seconds", color: "yellow" },
    { label: "Integration", value: "Full API compatibility", color: "purple" },
    { label: "Scalability", value: "Supports 100+ trains", color: "pink" },
    { label: "Uptime", value: "99.9% guaranteed", color: "indigo" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 font-sans">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image - Full visibility */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/bg.png)' }}
        />
        
        {/* Animated Metro Lines Overlay (optional canvas effect) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-5 opacity-30"
        />


        {/* Central Content Area with Blur Effect */}
        <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
          {/* Blur overlay only for the central content area */}
          <div className="absolute inset-0 -mx-12 -my-16 z-0 bg-gradient-to-r from-black/40 via-black/30 to-black/40 backdrop-blur-sm rounded-3xl"></div>
          <div className="absolute inset-0 -mx-12 -my-16 z-5 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-3xl"></div>
          
          <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight" style={{ textShadow: '0 0 4px rgba(0, 0, 0, 0.6), 0 0 8px rgba(0, 0, 0, 0.4), 1px 1px 2px rgba(0, 0, 0, 0.5)' }}>
              Fleet Optimization &
              <br />
              <span className="text-white">
                Resource Tracking Engine
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed">
              Revolutionary MILP-powered platform delivering 99.2% prediction accuracy 
              for intelligent train fleet management and operational excellence
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center mb-16"
          >
            <Button 
              onClick={onNavigateToDashboard}
              className="px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 backdrop-blur-sm border-0"
            >
              Go To Dashboard
            </Button>
          </motion.div>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/80 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Real-Time Operations Dashboard
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Monitor your entire metro fleet with our advanced AI-powered analytics platform
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left side: 2x2 matrix of boxes */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredStat(index)}
                  onMouseLeave={() => setHoveredStat(null)}
                  className={`relative p-6 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer overflow-hidden ${
                    hoveredStat === index ? 'scale-105' : ''
                  }`}
                  style={{
                    border: '3px solid',
                    borderImage: `linear-gradient(135deg, ${
                      index === 0 ? '#3b82f6, #2563eb' :
                      index === 1 ? '#10b981, #059669' :
                      index === 2 ? '#eab308, #ca8a04' :
                      '#8b5cf6, #7c3aed'
                    }) 1`
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className="relative z-10">
                    <div className="text-5xl font-bold text-gray-800 mb-2 group-hover:text-white transition-colors duration-500">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 font-medium mb-2 group-hover:text-white/90 transition-colors duration-500">
                      {stat.label}
                    </div>
                    <Badge className="bg-green-100 text-green-600 group-hover:bg-white/20 group-hover:text-white transition-colors duration-500">
                      {stat.change}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Right side: Sign image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex-1 flex justify-center items-center"
            >
              <img 
                src="/sign.png" 
                alt="Dashboard Sign" 
                className="max-w-full h-auto object-contain"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* Background Image - Same as hero */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/bg.png)' }}
        />
        
        {/* Complete Blur Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 via-black/50 to-black/60 backdrop-blur-md"></div>
        
        <div className="max-w-7xl mx-auto relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Advanced AI Capabilities
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Cutting-edge technology stack designed for modern metro operations
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 cursor-pointer relative overflow-hidden"
              >
                <motion.div variants={itemVariants}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {feature.description}
                    </p>
                    <div className="mt-6 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full group-hover:w-16 transition-all duration-300"></div>
                  </div>
                </motion.div>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      

      {/* Technical Specifications */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Technical Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built on enterprise-grade infrastructure with proven reliability
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {techSpecs.map((spec, index) => (
              <Card
                key={index}
                className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer relative overflow-hidden"
              >
                <motion.div variants={itemVariants}>
                  <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-${spec.color}-400 to-${spec.color}-600 group-hover:w-2 transition-all duration-300`}></div>
                  <div className="pl-6">
                    <div className="text-gray-500 text-sm font-medium mb-2 uppercase tracking-wide">
                      {spec.label}
                    </div>
                    <div className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                      {spec.value}
                    </div>
                  </div>
                </motion.div>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Ready to Transform Your Metro Operations?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Join the future of intelligent transportation with our AI-powered optimization platform.
            </p>
            <div className="flex justify-center">
              <Button 
                onClick={onNavigateToDashboard}
                className="px-12 py-4 bg-white text-blue-600 text-lg font-semibold rounded-full hover:bg-blue-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0"
              >
                Go to Dashboard
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MetroAILanding;