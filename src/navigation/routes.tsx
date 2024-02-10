import { Home } from '../home/Home';
import { Seasons } from '../seasons/Seasons';
import { Teams } from '../teams/Teams';
import { Scheduler } from '../schedule/Scheduler';
import { MatchUps } from '../matchUps/MatchUps';
import { Players } from '../players/Players';
import { Matchups2 } from '../matchUps/Matchups2';

export const routes = [
  { name: 'Home', path: '/', Component: Home },
  { name: 'Seasons', path: '/seasons', Component: Seasons },
  { name: 'Teams', path: '/teams', Component: Teams },
  { name: 'Schedule', path: '/schedule', Component: Scheduler },
  { name: 'Match Ups', path: '/MatchUps', Component: MatchUps },
  { name: 'Players', path: '/Players', Component: Players },
];
