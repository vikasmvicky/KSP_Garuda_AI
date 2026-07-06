import { useState, useEffect } from 'react'
import CrimeMap from './CrimeMap.jsx'
import CyberChart from './CyberChart.jsx'
import NetworkGraph from './NetworkGraph.jsx'

function App() {
  const predictiveStats = [
    { title: "Total Crimes (Month)", value: "3,847", change: "+12.3%", isPositive: false },
    { title: "AI Predicted (Next Mo)", value: "4,210", change: "+9.4%", isPositive: false },
    { title: "Detection Rate", value: "67.2%", change: "+3.1%", isPositive: true },
    { title: "Active Hotspots", value: "23", change: "+5 this week", isPositive: false },
    { title: "Anomalies Flagged", value: "7", change: "+3 yesterday", isPositive: false },
    { title: "Repeat Offenders", value: "142", change: "-5%", isPositive: true }
  ]

  const anomalyPool = [
    { area: "Jayanagar & JP Nagar", crime: "Chain Snatching", spike: "247%", severity: "CRITICAL" },
    { area: "Koramangala 4th Block", crime: "Vehicle Theft", spike: "120%", severity: "HIGH" },
    { area: "Indiranagar 12th Main", crime: "Cyber Fraud (ATM Skimming)", spike: "350%", severity: "CRITICAL" },
    { area: "Whitefield ITPL Area", crime: "Snatching", spike: "85%", severity: "MODERATE" },
    { area: "HSR Layout Sector 2", crime: "Burglary (Day)", spike: "190%", severity: "HIGH" }
  ]

  const [patrols, setPatrols] = useState(2)
  const [nightHours, setNightHours] = useState(2)
  const [isDeployed, setIsDeployed] = useState(false)
  
  const [activeAnomaly, setActiveAnomaly] = useState(0)
  const [secondsAgo, setSecondsAgo] = useState(0)

  useEffect(() => {
    const anomalyTimer = setInterval(() => {
      setActiveAnomaly(prev => (prev + 1) % anomalyPool.length)
      setSecondsAgo(0)
      setIsDeployed(false)
    }, 8000)

    const secondTimer = setInterval(() => {
      setSecondsAgo(prev => prev + 1)
    }, 1000)

    return () => {
      clearInterval(anomalyTimer)
      clearInterval(secondTimer)
    }
  }, [])

  const handleDeploy = () => {
    setIsDeployed(true)
  }

  const currentThreat = anomalyPool[activeAnomaly]

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white flex overflow-hidden font-sans">
      
      {/* LEFT SIDEBAR */}
      <div className="w-60 bg-[#0f1420] border-r border-gray-800/50 p-4 flex flex-col">
        <h2 className="text-cyan-400 font-extrabold mb-8 text-xl tracking-wider flex items-center gap-2">
          <span className="bg-cyan-500 text-black rounded-md w-6 h-6 flex items-center justify-center text-xs font-black">K</span>
          KSP INTEL
        </h2>
        
        <button className="text-left px-3 py-2 text-gray-500 hover:text-gray-300 mb-1 text-sm">Overview</button>
        <button className="text-left px-3 py-2 bg-cyan-500/10 border-l-4 border-cyan-400 rounded-r-md text-cyan-300 mb-1 text-sm font-medium">Command Dashboard</button>
        <button className="text-left px-3 py-2 text-gray-500 hover:text-gray-300 mb-1 text-sm">Network Analysis</button>
        <button className="text-left px-3 py-2 text-gray-500 hover:text-gray-300 mb-1 text-sm">Cyber Deep-Dive</button>

        <div className="mt-auto border-t border-gray-800/50 pt-4 text-[10px] text-gray-700">
          <p>SYSTEM v2.4.1</p>
          <p>LIVE STREAM: ACTIVE</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col">
        
        {/* TOP NAV */}
        <div className="h-14 bg-[#0f1420] border-b border-gray-800/50 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-bold tracking-wider text-gray-300">COMMAND DASHBOARD</h1>
            <div className="bg-gray-800 text-gray-400 text-xs px-3 py-1 rounded flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"></span>
              Bengaluru Urban
            </div>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 p-6 overflow-y-auto">
          
          {/* DYNAMIC ANOMALY BANNER */}
          {!isDeployed ? (
            <div className={`rounded-lg p-4 mb-6 flex items-center gap-4 border ${
              currentThreat.severity === 'CRITICAL' ? 'bg-red-900/20 border-red-500/50' : 
              currentThreat.severity === 'HIGH' ? 'bg-orange-900/20 border-orange-500/50' : 
              'bg-yellow-900/20 border-yellow-500/50'
            }`}>
              <div className={`text-white text-xs font-bold px-3 py-1 rounded animate-pulse ${
                currentThreat.severity === 'CRITICAL' ? 'bg-red-600' : 
                currentThreat.severity === 'HIGH' ? 'bg-orange-600' : 'bg-yellow-600'
              }`}>
                {currentThreat.severity} ANOMALY
              </div>
              <p className="text-sm">
                <span className={currentThreat.severity === 'CRITICAL' ? 'text-red-300' : 'text-orange-300'}>
                  {currentThreat.crime} in <span className="font-bold text-white">{currentThreat.area}</span> spiked {currentThreat.spike}. 
                </span>
                <span className="text-gray-500 ml-2">Detected {secondsAgo}s ago</span>
              </p>
            </div>
          ) : (
            <div className="bg-emerald-900/20 border border-emerald-500/50 rounded-lg p-4 mb-6 flex items-center gap-4">
              <div className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded">DEPLOYMENT ACTIVE</div>
              <p className="text-emerald-300 text-sm">
                Patrol units dispatched to {currentThreat.area}. AI is recalculating 30-day forecast... Anomaly mitigation in progress.
              </p>
            </div>
          )}

          {/* PREDICTIVE SUMMARY CARDS */}
          <div className="grid grid-cols-6 gap-4 mb-6">
            {predictiveStats.map((stat, index) => (
              <div key={index} className="bg-[#111827] border border-gray-800/50 p-4 rounded-lg">
                <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">{stat.title}</p>
                <h2 className="text-2xl font-bold font-mono text-white">{stat.value}</h2>
                <p className={`text-xs mt-2 font-medium ${stat.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.change}
                </p>
              </div>
            ))}
          </div>

          {/* ROW 1: MAP + WHAT-IF SCENARIO */}
          <div className="grid grid-cols-5 gap-6 mb-6">
            
            <div className="col-span-3 bg-[#111827] border border-gray-800/50 rounded-lg overflow-hidden" style={{ height: '400px' }}>
              <CrimeMap />
            </div>

            <div className="col-span-2 bg-[#111827] border border-gray-800/50 rounded-lg p-5 flex flex-col">
              <h3 className="text-xs font-bold text-cyan-400 mb-4 tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></span>
                AI DEPLOYMENT SCENARIO
              </h3>
              
              <div className="flex-1 space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Add Patrol Vehicles</span>
                    <span className="text-white font-bold">+{patrols}</span>
                  </div>
                  <input type="range" min="0" max="10" value={patrols} onChange={(e) => setPatrols(e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"/>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Night Patrol (Hours)</span>
                    <span className="text-white font-bold">+{nightHours}hrs</span>
                  </div>
                  <input type="range" min="0" max="8" value={nightHours} onChange={(e) => setNightHours(e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"/>
                </div>

                <div className="bg-black/30 rounded p-4 border border-cyan-500/20 mt-4">
                  <p className="text-[10px] text-gray-500 uppercase mb-2">30-Day Forecasted Impact</p>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Crimes Reduced</span>
                    <span className="text-green-400 font-bold">-{Math.floor(patrols * 4 + nightHours * 3)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Hotspots Cooled</span>
                    <span className="text-green-400 font-bold">-{Math.floor(patrols + nightHours * 0.5)}</span>
                  </div>
                </div>
              </div>

              <button onClick={handleDeploy} className="w-full mt-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-emerald-600/20 transition-colors text-sm tracking-wide">
                {isDeployed ? "DEPLOYMENT SENT ✓" : "GENERATE DEPLOYMENT RECOMMENDATION"}
              </button>
            </div>
          </div>

          {/* ROW 2: STATION SCORES + NETWORK GRAPH */}
          <div className="grid grid-cols-2 gap-6">
            
            <div className="bg-[#111827] border border-gray-800/50 rounded-lg p-5">
              <h3 className="text-xs font-bold text-gray-400 mb-4 tracking-wider">STATION PERFORMANCE HEALTH SCORE</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Koramangala PS", score: "8.4/10", detection: "78%", color: "text-green-400" },
                  { name: "Indiranagar PS", score: "7.1/10", detection: "65%", color: "text-yellow-400" },
                  { name: "Jayanagar PS", score: "4.2/10", detection: "42%", color: "text-red-400" },
                  { name: "JP Nagar PS", score: "3.9/10", detection: "38%", color: "text-red-400" }
                ].map((station, index) => (
                  <div key={index} className="bg-black/30 rounded p-4 border border-gray-800/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-300 font-medium">{station.name}</span>
                      <span className={`text-lg font-bold font-mono ${station.color}`}>{station.score}</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${station.color.replace('text-', 'bg-')}`} style={{width: station.detection}}></div>
                    </div>
                    <p className="text-[10px] text-gray-600 mt-1">Detection Rate: {station.detection}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#111827] border border-gray-800/50 rounded-lg p-4" style={{ height: '280px' }}>
              <NetworkGraph />
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default App