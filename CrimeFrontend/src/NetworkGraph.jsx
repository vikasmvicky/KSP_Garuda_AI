import { useRef, useState } from 'react'
import ForceGraph2D from 'react-force-graph-2d'

const graphData = {
  nodes: [
    { id: "Suspect A (Raju)", type: "suspect", val: 10 },
    { id: "Suspect B (Kiran)", type: "suspect", val: 8 },
    { id: "Suspect C (Priya)", type: "suspect", val: 6 },
    { id: "Account XYZ", type: "asset", val: 5 },
    { id: "Account ABC", type: "asset", val: 5 },
    { id: "Phone 9876...", type: "asset", val: 4 },
    { id: "Bengaluru City", type: "location", val: 12 },
    { id: "Mysuru City", type: "location", val: 8 },
    { id: "Victim 1", type: "victim", val: 3 },
    { id: "Victim 2", type: "victim", val: 3 },
  ],
  links: [
    { source: "Suspect A (Raju)", target: "Suspect B (Kiran)" },
    { source: "Suspect A (Raju)", target: "Suspect C (Priya)" },
    { source: "Suspect B (Kiran)", target: "Account XYZ" },
    { source: "Suspect C (Priya)", target: "Account ABC" },
    { source: "Suspect A (Raju)", target: "Phone 9876..." },
    { source: "Suspect A (Raju)", target: "Bengaluru City" },
    { source: "Suspect B (Kiran)", target: "Mysuru City" },
    { source: "Suspect A (Raju)", target: "Victim 1" },
    { source: "Suspect B (Kiran)", target: "Victim 2" },
    { source: "Account XYZ", target: "Account ABC" },
  ]
}

function NetworkGraph() {
  const fgRef = useRef();
  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());

  const handleNodeClick = (node) => {
    const connectedNodeIds = new Set();
    const connectedLinks = new Set();
    
    graphData.links.forEach(link => {
      if (link.source.id === node.id) {
        connectedNodeIds.add(link.target.id);
        connectedLinks.add(link);
      } else if (link.target.id === node.id) {
        connectedNodeIds.add(link.source.id);
        connectedLinks.add(link);
      }
    });
    connectedNodeIds.add(node.id);
    
    setHighlightNodes(connectedNodeIds);
    setHighlightLinks(connectedLinks);
  };

  return (
    <div className="h-full w-full flex flex-col">
      <h3 className="text-sm font-bold text-gray-400 mb-2 tracking-wider flex items-center gap-2">
        LINK ANALYSIS: CYBER FRAUD SYNDICATE
        <span className="text-[10px] font-normal text-cyan-400 bg-cyan-900/30 px-2 py-0.5 rounded animate-pulse">CLICK A NODE TO ISOLATE</span>
      </h3>
      
      <div className="flex-1 bg-black/30 rounded-lg border border-gray-800/50 overflow-hidden">
        <ForceGraph2D
          ref={fgRef}
          graphData={graphData}
          nodeLabel="id"
          nodeAutoColorBy="type"
          nodeVal="val"
          backgroundColor="#00000000"
          onNodeClick={handleNodeClick}
          nodeCanvasObjectMode={() => 'replace'}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.id;
            const fontSize = 12 / globalScale;
            ctx.font = `bold ${fontSize}px Sans-Serif`;
            const textWidth = ctx.measureText(label).width;
            const bgWidth = textWidth + fontSize * 1.2;
            const bgHeight = fontSize * 2;
            
            let alpha = 0.9;
            if (highlightNodes.size > 0 && !highlightNodes.has(node.id)) {
              alpha = 0.1;
            }

            ctx.globalAlpha = alpha;
            ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
            ctx.fillRect(node.x - bgWidth / 2, node.y - bgHeight / 2, bgWidth, bgHeight);
            
            ctx.strokeStyle = node.color;
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#e2e8f0';
            ctx.fillText(label, node.x, node.y);
            ctx.globalAlpha = 1;
          }}
          linkCanvasObjectMode={() => 'after'}
          linkCanvasObject={(link, ctx) => {
            // THE SAFETY NET: Don't draw if the math isn't ready yet!
            if (!link.source.x || !link.target.x) return; 

            let alpha = 0.3;
            if (highlightLinks.has(link)) {
              alpha = 1;
            } else if (highlightLinks.size > 0) {
              alpha = 0.05;
            }
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(link.source.x, link.source.y);
            ctx.quadraticCurveTo(link.source.x, link.target.y, link.target.x, link.target.y);
            ctx.stroke();
          }}
        />
      </div>
    </div>
  )
}

export default NetworkGraph