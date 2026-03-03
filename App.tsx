
import React, { useState, useEffect, useCallback } from 'react';
import { TEAMS } from './constants';
import { TeamState, TeamColor } from './types';
import TeamCard from './components/TeamCard';
import ChallengeModal from './components/ChallengeModal';
import Leaderboard from './components/Leaderboard';
import { Users, LayoutDashboard, Crown, RotateCcw } from 'lucide-react';

const STORAGE_KEY = 'bhv-land-game-state';

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

const loadSavedState = (): { view: 'setup' | 'dashboard'; teams: Record<TeamColor, TeamState> } | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch { /* ignore parse errors */ }
  return null;
};

const App: React.FC = () => {
  const saved = loadSavedState();

  const [view, setView] = useState<'setup' | 'dashboard'>(saved?.view ?? 'setup');

  const [teams, setTeams] = useState<Record<TeamColor, TeamState>>(saved?.teams ?? {
    red: initialTeamState('red'),
    green: initialTeamState('green'),
    yellow: initialTeamState('yellow'),
    orange: initialTeamState('orange'),
  });

  const [challengeChallenger, setChallengeChallenger] = useState<TeamState | null>(null);

  // Persist state to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ view, teams }));
    } catch { /* ignore quota errors */ }
  }, [view, teams]);

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

  const handleResetGame = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setTeams({
      red: initialTeamState('red'),
      green: initialTeamState('green'),
      yellow: initialTeamState('yellow'),
      orange: initialTeamState('orange'),
    });
    setView('setup');
  }, []);

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
            {view === 'dashboard' && (
              <button
                onClick={() => setView('setup')}
                className="text-sm font-black uppercase text-slate-400 hover:text-indigo-600 transition-colors tracking-tighter"
              >
                Instellingen
              </button>
            )}
            <button
              onClick={handleResetGame}
              className="text-sm font-black uppercase text-slate-400 hover:text-red-600 transition-colors tracking-tighter flex items-center gap-1"
              title="Nieuw spel starten"
            >
              <RotateCcw size={14} />
              Reset
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
    </div>
  );
};

export default App;
