
import React, { useState } from 'react';
import { TEAMS } from './constants';
import { TeamState, TeamColor } from './types';
import TeamCard from './components/TeamCard';
import ChallengeModal from './components/ChallengeModal';
import Leaderboard from './components/Leaderboard';
import { Users, LayoutDashboard, Crown, Settings, X, RotateCcw, Palette, AlertTriangle } from 'lucide-react';

const initialTeamState = (color: TeamColor): TeamState => ({
  color,
  active: false,
  incidentCount: 0,
  routeLength: 0,
  doorCount: 0,
  extinguisherCount: 0,
  completedSkills: [],
  answeredQuestions: []
});

const App: React.FC = () => {
  const [view, setView] = useState<'setup' | 'dashboard'>('setup');
  
  const [teams, setTeams] = useState<Record<TeamColor, TeamState>>({
    red: initialTeamState('red'),
    green: initialTeamState('green'),
    yellow: initialTeamState('yellow'),
    orange: initialTeamState('orange'),
  });

  const [challengeChallenger, setChallengeChallenger] = useState<TeamState | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleFullReset = () => {
    setTeams({
      red: initialTeamState('red'),
      green: initialTeamState('green'),
      yellow: initialTeamState('yellow'),
      orange: initialTeamState('orange'),
    });
    setView('setup');
    setShowResetConfirm(false);
    setShowSettings(false);
  };

  const toggleTeamActive = (color: TeamColor) => {
    setTeams(prev => ({
      ...prev,
      [color]: { ...prev[color], active: !prev[color].active }
    }));
  };

  const handleChallengeComplete = (challengerCorrect: boolean, opponentCorrect: boolean, opponentColor: TeamColor) => {
    setChallengeChallenger(null);
  };

  const handleUpdateCount = (teamColor: TeamColor, field: 'routeLength' | 'doorCount' | 'extinguisherCount', val: number) => {
    setTeams(prev => ({
      ...prev,
      [teamColor]: { ...prev[teamColor], [field]: Math.max(0, val) }
    }));
  };

  const activeTeamsList = (Object.values(teams) as TeamState[]).filter(t => t.active);
  const hasActiveTeams = activeTeamsList.length > 0;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="bg-indigo-600 p-2 rounded-lg text-white">
                <Crown size={20} />
             </div>
             <h1 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 uppercase tracking-tight font-serif">
               Instructeursdashboard
             </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSettings(true)}
              className="text-sm font-black uppercase text-slate-400 hover:text-indigo-600 transition-colors tracking-tighter flex items-center gap-1.5 cursor-pointer"
            >
              <Settings size={16} />
              Instellingen
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'setup' && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-slate-800 mb-3 uppercase tracking-tighter font-serif">Deelnemende Teams</h2>
              <p className="text-slate-500 font-medium">Selecteer de groepen die vandaag strijden om de veiligheid.</p>
            </div>
            <div className="grid gap-4">
              {(Object.keys(TEAMS) as TeamColor[]).map((color) => {
                const config = TEAMS[color];
                const isActive = teams[color].active;
                return (
                  <button
                    key={color}
                    onClick={() => toggleTeamActive(color)}
                    className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all duration-300 shadow-sm hover:shadow-md ${
                      isActive 
                        ? 'border-indigo-600 bg-white scale-[1.02]' 
                        : 'border-transparent bg-slate-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full shadow-inner flex items-center justify-center text-white font-bold`} style={{ backgroundColor: config.hex }}>
                         {isActive && <Users size={20} className={config.textColor} />}
                      </div>
                      <span className="text-xl font-black text-slate-800 uppercase tracking-tight font-serif">{config.name}</span>
                    </div>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${isActive ? 'bg-indigo-600 border-indigo-600' : 'border-slate-400'}`}>
                      {isActive && <Users size={16} className="text-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setView('dashboard')}
              disabled={!hasActiveTeams}
              className={`w-full mt-8 py-4 rounded-2xl font-black uppercase text-lg tracking-widest shadow-xl flex items-center justify-center gap-2 transition-all font-serif ${
                hasActiveTeams 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 translate-y-0' 
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              <LayoutDashboard size={24} />
              Start Training
            </button>
          </div>
        )}

        {view === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {hasActiveTeams && (
                <Leaderboard teams={activeTeamsList} />
            )}
            <div className={`grid gap-6 ${activeTeamsList.length === 1 ? 'max-w-md mx-auto' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4'}`}>
              {activeTeamsList.map(team => (
                <TeamCard 
                  key={team.color}
                  teamState={team}
                  onStartChallenge={() => setChallengeChallenger(team)}
                  onUpdateCount={(field, val) => handleUpdateCount(team.color, field, val)}
                />
              ))}
            </div>
            
            {challengeChallenger && (
              <ChallengeModal 
                challenger={challengeChallenger}
                activeTeams={activeTeamsList}
                onClose={() => setChallengeChallenger(null)}
                onComplete={handleChallengeComplete}
              />
            )}
          </div>
        )}
      </main>
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">V.1.3</p>
      </footer>

      {/* Instellingen Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform animate-in zoom-in-95 duration-200 border border-slate-200">
            <div className="bg-slate-900 p-6 flex justify-between items-center border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-600 rounded-lg text-white">
                  <Settings size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white uppercase tracking-tighter font-serif">Instellingen</h3>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowSettings(false);
                  setShowResetConfirm(false);
                }}
                className="p-2 rounded-full hover:bg-white/10 text-slate-400 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {!showResetConfirm ? (
                <div className="space-y-4">
                  <p className="text-sm text-slate-500 font-medium">Kies een van de opties om de training aan te passen of opnieuw op te starten.</p>

                  <button
                    onClick={() => {
                      setView('setup');
                      setShowSettings(false);
                    }}
                    className="w-full flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50/50 transition-all text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                        <Palette size={20} />
                      </div>
                      <div>
                        <span className="block text-sm font-black text-slate-800 uppercase tracking-tight font-serif">Teams Beheren</span>
                        <span className="text-xs text-slate-500 font-medium">Teamkleuren toevoegen of uitschakelen</span>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setShowResetConfirm(true)}
                    className="w-full flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-red-600 hover:bg-red-50/50 transition-all text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-red-50 text-red-600 group-hover:bg-red-100 transition-colors">
                        <RotateCcw size={20} />
                      </div>
                      <div>
                        <span className="block text-sm font-black text-slate-800 uppercase tracking-tight font-serif">Alles Resetten</span>
                        <span className="text-xs text-slate-500 font-medium">Zet alle scores en teams terug op 0</span>
                      </div>
                    </div>
                  </button>
                </div>
              ) : (
                <div className="space-y-6 text-center py-2 animate-in fade-in zoom-in-95 duration-200">
                  <div className="mx-auto w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-800 font-serif uppercase tracking-tight">Weet je het zeker?</h4>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                      Hiermee worden alle actieve teams uitgeschakeld en worden alle scores (zoals vluchtroutes en deuren) volledig teruggezet op 0. Dit kan niet ongedaan worden gemaakt.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      className="py-3 px-4 border border-slate-200 hover:bg-slate-50 rounded-xl text-sm font-black uppercase text-slate-600 transition-colors cursor-pointer"
                    >
                      Annuleren
                    </button>
                    <button
                      onClick={handleFullReset}
                      className="py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-black uppercase tracking-wider shadow-md shadow-red-100 transition-all cursor-pointer"
                    >
                      Ja, Reset Alles
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
