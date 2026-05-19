
import React from 'react';
import { TEAMS, BUILDING_COSTS, RESOURCE_CONFIG } from '../constants';
import { TeamState, Resource } from '../types';
import { Route, DoorOpen, ShieldCheck, Sword } from 'lucide-react';

interface Props {
  teamState: TeamState;
  onStartChallenge: () => void;
  onUpdateCount: (field: 'routeLength' | 'doorCount' | 'extinguisherCount', val: number) => void;
}

interface ResourceHexProps {
  resource: Resource;
  amount: number;
}

const ResourceHex: React.FC<ResourceHexProps> = ({ resource, amount }) => {
  const config = RESOURCE_CONFIG[resource];
  const Icon = config.icon;
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div 
        className={`hexagon w-8 h-9 flex items-center justify-center text-white shadow-sm ${config.color}`}
        title={config.label}
      >
        <Icon size={14} />
      </div>
      <span className="text-[10px] font-black text-slate-600">x{amount}</span>
    </div>
  );
};

const CostRow = ({ costs }: { costs: Array<{ resource: Resource; amount: number }> }) => (
  <div className="flex gap-2 mt-1">
    {costs.map((c, i) => (
      <ResourceHex key={i} resource={c.resource} amount={c.amount} />
    ))}
  </div>
);

const TeamCard: React.FC<Props> = ({ 
  teamState, 
  onStartChallenge,
  onUpdateCount
}) => {
  const teamConfig = TEAMS[teamState.color];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 flex flex-col h-full transform transition-all hover:shadow-2xl">
      {/* Header */}
      <div 
        className="p-6 relative overflow-hidden"
        style={{ backgroundColor: teamConfig.hex }}
      >
        <div className="relative z-10">
            <h2 className={`text-3xl font-black tracking-tight font-serif ${teamConfig.textColor}`}>
            Team {teamConfig.name}
            </h2>
            <span className={`text-xs font-bold opacity-80 uppercase tracking-widest ${teamConfig.textColor}`}>
            Statusoverzicht
            </span>
        </div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
      </div>

      {/* Incident Duel Section */}
      <div className="p-6">
        <div className="p-4 rounded-xl border-2 border-indigo-100 bg-indigo-50/50">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700">
                    <Sword size={20} />
                </div>
                <div>
                    <p className="font-black text-indigo-900 uppercase text-xs">Duel om de inzetmiddelen</p>
                </div>
            </div>
            
            <button
                onClick={onStartChallenge}
                className="w-full py-4 rounded-xl bg-slate-900 text-white font-black uppercase text-sm tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-md active:scale-95 font-serif"
            >
                Team Uitdagen
            </button>
            <p className="text-[9px] text-center mt-3 text-slate-400 font-bold uppercase tracking-tighter">Win tokens door een incident op te lossen</p>
        </div>
      </div>

      {/* Building Tracking */}
      <div className="bg-slate-50 border-t border-slate-200 flex-1">
        {/* Route */}
        <div className="p-4 border-b border-slate-200">
            <div className="flex justify-between items-start mb-2">
                <label className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-1 mt-1">
                    <Route size={10} /> Vluchtroute
                </label>
                <CostRow costs={BUILDING_COSTS.route} />
            </div>
            <div className="flex items-center justify-between bg-white rounded-lg p-1 border border-slate-200">
                <button 
                    onClick={() => onUpdateCount('routeLength', teamState.routeLength - 1)}
                    className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-slate-600 font-bold"
                >-</button>
                <span className="font-mono font-black text-lg text-slate-800">{teamState.routeLength}</span>
                <button 
                    onClick={() => onUpdateCount('routeLength', teamState.routeLength + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-slate-600 font-bold"
                >+</button>
            </div>
        </div>

        {/* Door */}
        <div className="p-4 border-b border-slate-200">
            <div className="flex justify-between items-start mb-2">
                <label className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-1 mt-1">
                    <DoorOpen size={10} /> Deur Upgrade
                </label>
                <CostRow costs={BUILDING_COSTS.door} />
            </div>
            <div className="flex items-center justify-between bg-white rounded-lg p-1 border border-slate-200">
                <button 
                    onClick={() => onUpdateCount('doorCount', teamState.doorCount - 1)}
                    className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-slate-600 font-bold"
                >-</button>
                <span className="font-mono font-black text-lg text-slate-800">{teamState.doorCount}</span>
                <button 
                    onClick={() => onUpdateCount('doorCount', teamState.doorCount + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-slate-600 font-bold"
                >+</button>
            </div>
        </div>

        {/* Fire Extinguisher */}
        <div className="p-4">
            <div className="flex justify-between items-start mb-2">
                <label className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-1 mt-1">
                    <ShieldCheck size={10} /> Brandblusser
                </label>
                <CostRow costs={BUILDING_COSTS.brandblusser} />
            </div>
            <div className="flex items-center justify-between bg-white rounded-lg p-1 border border-slate-200">
                <button 
                    onClick={() => onUpdateCount('extinguisherCount', teamState.extinguisherCount - 1)}
                    className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-slate-600 font-bold"
                >-</button>
                <span className="font-mono font-black text-lg text-slate-800">{teamState.extinguisherCount}</span>
                <button 
                    onClick={() => onUpdateCount('extinguisherCount', teamState.extinguisherCount + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-slate-600 font-bold"
                >+</button>
            </div>
            <p className="text-[9px] text-right font-black text-green-600 uppercase mt-1 italic">Strategisch bouwen voor titels</p>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
