
import React, { useState } from 'react';
import { TeamState, TeamColor } from '../types';
import { TEAMS, CHALLENGE_INCIDENTS } from '../constants';
import { X, Sword, Check, UserPlus, Trophy, AlertCircle, Star, Circle, CheckCircle2, XCircle, RotateCcw, Send } from 'lucide-react';

interface Props {
  challenger: TeamState;
  activeTeams: TeamState[];
  onClose: () => void;
  onComplete: (challengerCorrect: boolean, opponentCorrect: boolean, opponentColor: TeamColor) => void;
}

const ChallengeModal: React.FC<Props> = ({ challenger, activeTeams, onClose, onComplete }) => {
  const [step, setStep] = useState<'choose' | 'question' | 'result'>('choose');
  const [opponentColor, setOpponentColor] = useState<TeamColor | null>(null);
  const [challengerCorrect, setChallengerCorrect] = useState<boolean>(false);
  const [opponentCorrect, setOpponentCorrect] = useState<boolean>(false);
  
  const [selectedQ1, setSelectedQ1] = useState<string | null>(null);
  const [selectedQ2, setSelectedQ2] = useState<string | null>(null);
  const [confirmedQ1, setConfirmedQ1] = useState<boolean>(false);
  const [confirmedQ2, setConfirmedQ2] = useState<boolean>(false);
  
  // Select a random incident
  const incident = React.useMemo(() => 
    CHALLENGE_INCIDENTS[Math.floor(Math.random() * CHALLENGE_INCIDENTS.length)],
  []);

  const challengerConfig = TEAMS[challenger.color];
  const opponents = activeTeams.filter(t => t.color !== challenger.color);

  const handleOptionSelect = (question: 'q1' | 'q2', option: string) => {
    if (question === 'q1') {
      setSelectedQ1(option);
      setConfirmedQ1(false); // Reset confirmation if choice changes
    } else {
      setSelectedQ2(option);
      setConfirmedQ2(false); // Reset confirmation if choice changes
    }
  };

  const confirmAnswer = (question: 'q1' | 'q2') => {
    if (question === 'q1' && selectedQ1) {
      setChallengerCorrect(selectedQ1 === incident.q1.correctAnswer);
      setConfirmedQ1(true);
    } else if (question === 'q2' && selectedQ2) {
      setOpponentCorrect(selectedQ2 === incident.q2.correctAnswer);
      setConfirmedQ2(true);
    }
  };

  const handleFinish = () => {
    if (opponentColor) {
      onComplete(challengerCorrect, opponentCorrect, opponentColor);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300 font-sans">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden transform animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 p-6 flex justify-between items-center border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500 rounded-lg text-white">
              <Sword size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-tighter font-serif">Team Uitdaging</h2>
              <p className="text-slate-400 text-xs font-bold uppercase">Duel om de inzetmiddelen</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-slate-400 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 max-h-[80vh] overflow-y-auto">
          {step === 'choose' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-800 font-serif">Wie daag je uit?</h3>
                <p className="text-slate-500">Kies een team om de strijd mee aan te gaan.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {opponents.length > 0 ? opponents.map(team => (
                  <button
                    key={team.color}
                    onClick={() => {
                      setOpponentColor(team.color);
                      setStep('question');
                    }}
                    className="flex items-center gap-4 p-5 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all group text-left"
                  >
                    <div className="w-12 h-12 rounded-full shadow-inner flex items-center justify-center" style={{ backgroundColor: TEAMS[team.color].hex }}>
                       <UserPlus size={24} className={TEAMS[team.color].textColor} />
                    </div>
                    <div>
                      <span className="block text-lg font-black text-slate-800 uppercase tracking-tight font-serif">Team {TEAMS[team.color].name}</span>
                      <span className="text-xs font-bold text-slate-400 uppercase">Uitdagen</span>
                    </div>
                  </button>
                )) : (
                  <div className="col-span-full p-8 text-center bg-slate-100 rounded-2xl text-slate-400 italic">
                    Geen andere actieve teams beschikbaar...
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 'question' && opponentColor && (
            <div className="space-y-6">
              <div className="p-5 bg-amber-50 rounded-2xl border-2 border-amber-100">
                <div className="flex items-center gap-3 mb-2">
                  <AlertCircle className="text-amber-600" size={20} />
                  <h4 className="font-black text-amber-900 uppercase text-xs">Incident Scenario</h4>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-1 font-serif">{incident.title}</h3>
                <p className="text-slate-700 leading-relaxed italic text-sm">"{incident.scenario}"</p>
              </div>

              {/* CHALLENGER QUESTION */}
              <div className="p-6 rounded-2xl border-2 border-slate-100 bg-slate-50 relative">
                <div className="absolute -top-3 left-4 px-3 py-1 bg-white border border-slate-200 rounded-full flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: challengerConfig.hex }}></div>
                   <span className="text-[10px] font-black uppercase text-slate-600">Vraag 1: Uitdager ({challengerConfig.name})</span>
                </div>
                <div className="space-y-4 pt-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-slate-800 leading-snug">{incident.q1.question}</h4>
                    {selectedQ1 && !confirmedQ1 && <button onClick={() => setSelectedQ1(null)} className="text-[10px] text-slate-400 hover:text-indigo-600 font-bold uppercase flex items-center gap-1 transition-colors"><RotateCcw size={10} /> Reset</button>}
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {incident.q1.options.map((opt, i) => {
                      const isSelected = selectedQ1 === opt;
                      const isCorrect = opt === incident.q1.correctAnswer;
                      const showFeedback = confirmedQ1;
                      
                      let btnStyle = "border-slate-200 bg-white text-slate-600 hover:border-indigo-300";
                      
                      if (showFeedback) {
                        if (isCorrect) {
                            btnStyle = isSelected ? "border-green-500 bg-green-50 text-green-800 ring-2 ring-green-100" : "border-green-200 bg-green-50/50 text-green-700/60";
                        } else if (isSelected) {
                            btnStyle = "border-red-500 bg-red-50 text-red-800 ring-2 ring-red-100";
                        } else {
                            btnStyle = "border-slate-100 bg-white text-slate-300 opacity-60";
                        }
                      } else if (isSelected) {
                        btnStyle = "border-indigo-500 bg-indigo-50 text-indigo-800 ring-2 ring-indigo-100";
                      }

                      return (
                        <button 
                          key={i}
                          disabled={confirmedQ1}
                          onClick={() => handleOptionSelect('q1', opt)}
                          className={`flex items-center gap-3 p-3.5 rounded-xl border-2 text-sm font-bold text-left transition-all ${btnStyle}`}
                        >
                          {showFeedback ? (
                            isCorrect ? <CheckCircle2 size={18} className={`shrink-0 ${isSelected ? 'text-green-600' : 'text-green-300'}`} /> : 
                            isSelected ? <XCircle size={18} className="shrink-0 text-red-600" /> : <Circle size={18} className="shrink-0 text-slate-200" />
                          ) : (
                            isSelected ? <CheckCircle2 size={18} className="shrink-0 text-indigo-500" /> : <Circle size={18} className="shrink-0 text-slate-300" />
                          )}
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {selectedQ1 && !confirmedQ1 && (
                    <button 
                      onClick={() => confirmAnswer('q1')}
                      className="w-full mt-2 py-3 bg-indigo-600 text-white rounded-xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-700 animate-in slide-in-from-top-2 duration-300"
                    >
                      <Send size={14} /> Antwoord indienen
                    </button>
                  )}
                </div>
              </div>

              {/* OPPONENT QUESTION */}
              <div className="p-6 rounded-2xl border-2 border-slate-100 bg-slate-50 relative">
                <div className="absolute -top-3 left-4 px-3 py-1 bg-white border border-slate-200 rounded-full flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: TEAMS[opponentColor].hex }}></div>
                   <span className="text-[10px] font-black uppercase text-slate-600">Vraag 2: Uitgedaagde ({TEAMS[opponentColor].name})</span>
                </div>
                <div className="space-y-4 pt-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-slate-800 leading-snug">{incident.q2.question}</h4>
                    {selectedQ2 && !confirmedQ2 && <button onClick={() => setSelectedQ2(null)} className="text-[10px] text-slate-400 hover:text-indigo-600 font-bold uppercase flex items-center gap-1 transition-colors"><RotateCcw size={10} /> Reset</button>}
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {incident.q2.options.map((opt, i) => {
                      const isSelected = selectedQ2 === opt;
                      const isCorrect = opt === incident.q2.correctAnswer;
                      const showFeedback = confirmedQ2;
                      
                      let btnStyle = "border-slate-200 bg-white text-slate-600 hover:border-indigo-300";
                      
                      if (showFeedback) {
                        if (isCorrect) {
                            btnStyle = isSelected ? "border-green-500 bg-green-50 text-green-800 ring-2 ring-green-100" : "border-green-200 bg-green-50/50 text-green-700/60";
                        } else if (isSelected) {
                            btnStyle = "border-red-500 bg-red-50 text-red-800 ring-2 ring-red-100";
                        } else {
                            btnStyle = "border-slate-100 bg-white text-slate-300 opacity-60";
                        }
                      } else if (isSelected) {
                        btnStyle = "border-indigo-500 bg-indigo-50 text-indigo-800 ring-2 ring-indigo-100";
                      }

                      return (
                        <button 
                          key={i}
                          disabled={confirmedQ2}
                          onClick={() => handleOptionSelect('q2', opt)}
                          className={`flex items-center gap-3 p-3.5 rounded-xl border-2 text-sm font-bold text-left transition-all ${btnStyle}`}
                        >
                          {showFeedback ? (
                            isCorrect ? <CheckCircle2 size={18} className={`shrink-0 ${isSelected ? 'text-green-600' : 'text-green-300'}`} /> : 
                            isSelected ? <XCircle size={18} className="shrink-0 text-red-600" /> : <Circle size={18} className="shrink-0 text-slate-200" />
                          ) : (
                            isSelected ? <CheckCircle2 size={18} className="shrink-0 text-indigo-500" /> : <Circle size={18} className="shrink-0 text-slate-300" />
                          )}
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {selectedQ2 && !confirmedQ2 && (
                    <button 
                      onClick={() => confirmAnswer('q2')}
                      className="w-full mt-2 py-3 bg-indigo-600 text-white rounded-xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-700 animate-in slide-in-from-top-2 duration-300"
                    >
                      <Send size={14} /> Antwoord indienen
                    </button>
                  )}
                </div>
              </div>

              <button
                onClick={() => setStep('result')}
                disabled={!confirmedQ1 || !confirmedQ2}
                className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl font-serif ${
                  confirmedQ1 && confirmedQ2 
                  ? 'bg-slate-900 text-white hover:bg-slate-800' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Resultaat Bekijken
              </button>
            </div>
          )}

          {step === 'result' && opponentColor && (
            <div className="space-y-8 py-4">
              <div className="text-center">
                <div className="inline-block p-4 bg-yellow-100 rounded-full text-yellow-600 mb-4 animate-bounce">
                  <Trophy size={48} />
                </div>
                <h3 className="text-3xl font-black text-slate-800 uppercase font-serif">Strijd Voltooid!</h3>
                <p className="text-slate-500">De resultaten zijn berekend.</p>
              </div>

              <div className="grid gap-4">
                {/* Challenger Reward Display */}
                <div className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${challengerCorrect ? 'border-green-200 bg-green-50' : 'border-slate-100 bg-slate-50 opacity-60'}`}>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: challengerConfig.hex }}>{challengerConfig.name[0]}</div>
                     <div>
                       <span className="block font-black text-slate-800 uppercase text-[10px]">Team {challengerConfig.name} (Uitdager)</span>
                       <span className={`text-xs font-bold ${challengerCorrect ? 'text-green-600' : 'text-red-500'}`}>{challengerCorrect ? 'Correct!' : 'Fout antwoord'}</span>
                     </div>
                  </div>
                  {challengerCorrect ? (
                    <div className="flex items-center gap-2 bg-yellow-400 px-3 py-1 rounded-full text-[10px] font-black text-yellow-900 shadow-sm animate-in zoom-in-50">
                      <Star size={12} fill="currentColor" />
                      1x KEUZE TOKEN
                    </div>
                  ) : (
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-xs sm:text-sm font-black text-red-600 uppercase tracking-tight animate-in shake duration-300">GEEN TOKENS VERDIEND</span>
                      <button onClick={() => { setConfirmedQ1(false); setStep('question'); }} className="text-[8px] font-black text-indigo-600 uppercase border-b border-indigo-600">Correctie nodig?</button>
                    </div>
                  )}
                </div>

                {/* Opponent Reward Display */}
                <div className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${opponentCorrect ? 'border-green-200 bg-green-50' : 'border-slate-100 bg-slate-50 opacity-60'}`}>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: TEAMS[opponentColor].hex }}>{TEAMS[opponentColor].name[0]}</div>
                     <div>
                       <span className="block font-black text-slate-800 uppercase text-[10px]">Team {TEAMS[opponentColor].name} (Uitgedaagde)</span>
                       <span className={`text-xs font-bold ${opponentCorrect ? 'text-green-600' : 'text-red-500'}`}>{opponentCorrect ? 'Correct!' : 'Fout antwoord'}</span>
                     </div>
                  </div>
                  {opponentCorrect ? (
                    <div className="flex items-center gap-2 bg-yellow-400 px-4 py-2 rounded-full text-xs font-black text-yellow-900 shadow-md animate-in zoom-in-50">
                      <Star size={14} fill="currentColor" />
                      2x KEUZE TOKENS
                    </div>
                  ) : (
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-xs sm:text-sm font-black text-red-600 uppercase tracking-tight animate-in shake duration-300">GEEN TOKENS VERDIEND</span>
                      <button onClick={() => { setConfirmedQ2(false); setStep('question'); }} className="text-[8px] font-black text-indigo-600 uppercase border-b border-indigo-600">Correctie nodig?</button>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start gap-3">
                  <AlertCircle size={16} className="text-slate-400 mt-0.5" />
                  <p className="text-[10px] text-slate-500 leading-tight">
                    <strong>Instructie:</strong> Geef de fysieke tokens aan de teams zoals hierboven beschreven.
                  </p>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase hover:bg-indigo-700 shadow-xl transition-all font-serif"
              >
                Sluiten & Verder Gaan
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeModal;
