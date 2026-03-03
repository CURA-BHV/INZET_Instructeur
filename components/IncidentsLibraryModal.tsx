
import React, { useState } from 'react';
import { CHALLENGE_INCIDENTS, TEAMS } from '../constants';
import { TeamState, TeamColor } from '../types';
import { X, Search, CheckCircle, Info, CheckSquare, Square, Users, Zap, Swords, ChevronRight } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activeTeam?: TeamState;
  allTeams: Record<TeamColor, TeamState>;
  onCompleteChallenge?: (incidentId: number, challenger: TeamColor, opponent: TeamColor, challengerCorrect: boolean, opponentCorrect: boolean) => void;
}

const IncidentsLibraryModal: React.FC<Props> = ({ isOpen, onClose, activeTeam, allTeams, onCompleteChallenge }) => {
  const [filter, setFilter] = useState('');
  const [challengingIncidentId, setChallengingIncidentId] = useState<number | null>(null);
  const [selectedOpponent, setSelectedOpponent] = useState<TeamColor | null>(null);
  const [challengerCorrect, setChallengerCorrect] = useState<boolean>(false);
  const [opponentCorrect, setOpponentCorrect] = useState<boolean>(false);

  if (!isOpen) return null;

  const filteredIncidents = CHALLENGE_INCIDENTS.filter(inc =>
    inc.title.toLowerCase().includes(filter.toLowerCase()) ||
    inc.scenario.toLowerCase().includes(filter.toLowerCase()) ||
    inc.id.toString().includes(filter)
  );

  const activeTeamConfig = activeTeam ? TEAMS[activeTeam.color] : null;
  const activeOtherTeams = (Object.values(allTeams) as TeamState[]).filter(t => t.active && t.color !== activeTeam?.color);

  const handleStartChallenge = (id: number) => {
    setChallengingIncidentId(id);
    setSelectedOpponent(null);
    setChallengerCorrect(false);
    setOpponentCorrect(false);
  };

  const handleFinishChallenge = () => {
    if (challengingIncidentId && activeTeam && selectedOpponent && onCompleteChallenge) {
      onCompleteChallenge(challengingIncidentId, activeTeam.color, selectedOpponent, challengerCorrect, opponentCorrect);
      setChallengingIncidentId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="p-6 bg-red-600 flex justify-between items-center shrink-0">
          <div className="text-white">
            <h2 className="text-2xl font-rockwell font-bold flex items-center gap-2">
              <Swords size={24} /> Incident Uitdagingen
            </h2>
            <p className="opacity-90 mt-1 font-sans">Daag andere teams uit en verdien grondstoffen</p>
          </div>
          <div className="flex items-center gap-4">
             {activeTeam && (
               <div className="bg-white/20 px-4 py-2 rounded-xl flex items-center gap-2 text-white border border-white/20">
                  <Users size={18} />
                  <span className="font-bold">Uitdager: Team {activeTeamConfig?.name}</span>
               </div>
             )}
             <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
             >
                <X size={24} />
             </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50 font-sans">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Zoek scenario op titel of inhoud..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          <div className="grid grid-cols-1 gap-10">
            {filteredIncidents.map((inc) => {
              const isCurrentlyChallenging = challengingIncidentId === inc.id;

              return (
                <div
                  key={inc.id}
                  className={`bg-white rounded-3xl border transition-all duration-300 shadow-sm overflow-hidden flex flex-col min-h-[300px] relative ${
                    isCurrentlyChallenging ? 'border-blue-500 ring-4 ring-blue-100' : 'border-slate-200'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row h-full">
                    {/* Left Side: ID & Action */}
                    <div className={`lg:w-28 p-6 flex flex-col items-center border-b lg:border-b-0 lg:border-r shrink-0 transition-colors ${
                        isCurrentlyChallenging ? 'bg-blue-50 border-blue-200' : 'bg-slate-100 border-slate-200'
                    }`}>
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl shadow-md mb-8 transition-colors ${
                        isCurrentlyChallenging ? 'bg-blue-600 text-white' : 'bg-red-600 text-white'
                        }`}>
                        {inc.id}
                        </div>

                        {!isCurrentlyChallenging && activeTeam && (
                        <button
                            onClick={() => handleStartChallenge(inc.id)}
                            className="w-full flex flex-col items-center gap-2 p-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all shadow-lg active:scale-95"
                        >
                            <Swords size={28} />
                            <span className="text-[10px] font-black uppercase text-center leading-tight">
                            Start<br/>Uitdaging
                            </span>
                        </button>
                        )}

                        {isCurrentlyChallenging && (
                           <button
                             onClick={() => setChallengingIncidentId(null)}
                             className="text-[10px] font-black uppercase text-slate-400 hover:text-red-600 transition-colors mt-auto"
                           >
                             Annuleren
                           </button>
                        )}
                    </div>

                    {/* Right Side: Flow */}
                    <div className="flex-1 p-8 space-y-6">
                        <div className="space-y-4">
                           <div className="flex items-center justify-between gap-4">
                              <h3 className={`text-2xl font-rockwell font-bold leading-tight ${
                                 isCurrentlyChallenging ? 'text-blue-700' : 'text-slate-800'
                              }`}>
                                 {isCurrentlyChallenging && <Zap size={20} className="inline mr-2 -mt-1" />}
                                 {inc.title}
                              </h3>
                              {isCurrentlyChallenging && (
                                 <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 animate-pulse">
                                    Actieve Uitdaging
                                 </div>
                              )}
                           </div>

                           <div className={`p-5 bg-amber-50 rounded-2xl border border-amber-100 italic text-slate-700 leading-relaxed shadow-inner`}>
                              <span className="not-italic font-black text-[10px] text-amber-600 uppercase tracking-widest block mb-2">Scenario:</span>
                              "{inc.scenario}"
                           </div>
                        </div>

                        {isCurrentlyChallenging && (
                           <div className="animate-in slide-in-from-top-4 duration-300 pt-4 border-t border-slate-200">
                              <div className="space-y-8">
                                 {/* Step 1: Select Opponent */}
                                 <section className="space-y-4">
                                    <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-400 tracking-widest">
                                       <span className="bg-slate-200 w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-slate-500">1</span>
                                       Kies een tegenstander
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                       {activeOtherTeams.map(t => (
                                          <button
                                            key={t.color}
                                            onClick={() => setSelectedOpponent(t.color)}
                                            className={`px-4 py-2 rounded-xl border-2 font-bold transition-all ${
                                               selectedOpponent === t.color
                                                ? 'bg-blue-600 border-blue-600 text-white shadow-md scale-105'
                                                : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'
                                            }`}
                                          >
                                             Team {TEAMS[t.color].name}
                                          </button>
                                       ))}
                                    </div>
                                 </section>

                                 {/* Step 2: Questions & Results */}
                                 {selectedOpponent && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-2">
                                       {/* Challenger Question */}
                                       <div className="p-6 rounded-3xl bg-white border-2 border-slate-100 shadow-sm relative overflow-hidden flex flex-col">
                                          <div className="absolute top-0 right-0 px-3 py-1 text-[8px] font-black text-white uppercase tracking-tighter rounded-bl-xl" style={{ backgroundColor: activeTeamConfig?.hex }}>
                                             Uitdaging door {activeTeamConfig?.name}
                                          </div>
                                          <p className="text-xs font-black text-slate-400 uppercase mb-3">Vraag 1 (Uitdager)</p>
                                          <p className="font-bold text-slate-800 mb-4">{inc.q1.question}</p>

                                          <div className="space-y-2 mb-6 flex-1">
                                             {inc.q1.options.map((opt, i) => (
                                                <div key={i} className={`p-2 rounded-lg text-sm border ${
                                                   opt === inc.q1.correctAnswer ? 'bg-green-50 border-green-200 text-green-800 font-bold' : 'bg-slate-50 border-slate-100 text-slate-600'
                                                }`}>
                                                   {opt}
                                                   {opt === inc.q1.correctAnswer && <span className="ml-2 text-[10px] uppercase opacity-60">(Juist)</span>}
                                                </div>
                                             ))}
                                          </div>

                                          <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-auto">
                                             <button
                                                onClick={() => setChallengerCorrect(true)}
                                                className={`flex-1 py-3 rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2 transition-all ${challengerCorrect ? 'bg-green-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                                             >
                                                {challengerCorrect ? <CheckSquare size={16} /> : <Square size={16} />} Goed (+1 kaart)
                                             </button>
                                             <button
                                                onClick={() => setChallengerCorrect(false)}
                                                className={`px-4 py-3 rounded-xl font-black text-xs uppercase transition-all ${!challengerCorrect ? 'bg-red-50 text-red-400 border border-red-100' : 'text-slate-300'}`}
                                             >
                                                Fout
                                             </button>
                                          </div>
                                       </div>

                                       {/* Opponent Question */}
                                       <div className="p-6 rounded-3xl bg-white border-2 border-slate-100 shadow-sm relative overflow-hidden flex flex-col">
                                          <div className="absolute top-0 right-0 px-3 py-1 text-[8px] font-black text-white uppercase tracking-tighter rounded-bl-xl" style={{ backgroundColor: TEAMS[selectedOpponent].hex }}>
                                             Verdediging door {TEAMS[selectedOpponent].name}
                                          </div>
                                          <p className="text-xs font-black text-slate-400 uppercase mb-3">Vraag 2 (Tegenstander)</p>
                                          <p className="font-bold text-slate-800 mb-4">{inc.q2.question}</p>

                                          <div className="space-y-2 mb-6 flex-1">
                                             {inc.q2.options.map((opt, i) => (
                                                <div key={i} className={`p-2 rounded-lg text-sm border ${
                                                   opt === inc.q2.correctAnswer ? 'bg-green-50 border-green-200 text-green-800 font-bold' : 'bg-slate-50 border-slate-100 text-slate-600'
                                                }`}>
                                                   {opt}
                                                   {opt === inc.q2.correctAnswer && <span className="ml-2 text-[10px] uppercase opacity-60">(Juist)</span>}
                                                </div>
                                             ))}
                                          </div>

                                          <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-auto">
                                             <button
                                                onClick={() => setOpponentCorrect(true)}
                                                className={`flex-1 py-3 rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2 transition-all ${opponentCorrect ? 'bg-green-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                                             >
                                                {opponentCorrect ? <CheckSquare size={16} /> : <Square size={16} />} Goed (+2 kaarten)
                                             </button>
                                             <button
                                                onClick={() => setOpponentCorrect(false)}
                                                className={`px-4 py-3 rounded-xl font-black text-xs uppercase transition-all ${!opponentCorrect ? 'bg-red-50 text-red-400 border border-red-100' : 'text-slate-300'}`}
                                             >
                                                Fout
                                             </button>
                                          </div>
                                       </div>
                                    </div>
                                 )}

                                 {/* Step 3: Confirm */}
                                 {selectedOpponent && (
                                    <button
                                       onClick={handleFinishChallenge}
                                       className="w-full py-5 rounded-2xl bg-blue-600 text-white font-rockwell font-black text-xl shadow-xl hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-3"
                                    >
                                       Voltooi Uitdaging & Deel Kaarten Uit <ChevronRight />
                                    </button>
                                 )}
                              </div>
                           </div>
                        )}
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredIncidents.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">Geen incidenten gevonden voor deze zoekopdracht.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-white border-t border-slate-100 text-center shrink-0">
            <p className="text-xs text-slate-400 flex items-center justify-center gap-1 font-medium italic">
                <Info size={14} /> Bij een goed antwoord ontvangt de Uitdager 1 kaart en de Tegenstander 2 kaarten naar keuze.
            </p>
        </div>
      </div>
    </div>
  );
};

export default IncidentsLibraryModal;
