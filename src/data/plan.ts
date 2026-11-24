// Vikuáætlun – SÝNIDÖGN.
// Æfingarnar hér eru staðgenglar sem notandi/þjálfari breytir síðar.
// Engar hnéálagsæfingar eru settar inn sjálfkrafa. Neðri líkami og
// endurhæfing eru læst þar til sjúkraþjálfari hefur samþykkt þær.

export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest?: string;
  note?: string;
};

export type WorkoutDay = {
  id: string;
  weekday: number; // 1 = mánudagur … 7 = sunnudagur
  dayName: string;
  title: string;
  focus: string;
  durationMin: number;
  exercises: Exercise[];
  requiresPhysioApproval?: boolean;
};

export const WEEKDAYS = ['Mán', 'Þri', 'Mið', 'Fim', 'Fös', 'Lau', 'Sun'];

export const weeklyPlan: WorkoutDay[] = [
  {
    id: 'dagur-1',
    weekday: 1,
    dayName: 'Mánudagur',
    title: 'Efri líkami – ýta',
    focus: 'Brjóst · axlir · þríhöfði',
    durationMin: 45,
    exercises: [
      { id: 'e1', name: 'Bekkpressa með handlóðum', sets: 3, reps: '8–10', rest: '90 sek' },
      { id: 'e2', name: 'Axlapressa sitjandi', sets: 3, reps: '8–10', rest: '90 sek' },
      { id: 'e3', name: 'Hliðarlyftur', sets: 3, reps: '12–15', rest: '60 sek' },
      { id: 'e4', name: 'Þríhöfðapressa í kapli', sets: 3, reps: '12', rest: '60 sek' },
    ],
  },
  {
    id: 'dagur-2',
    weekday: 2,
    dayName: 'Þriðjudagur',
    title: 'Efri líkami – toga',
    focus: 'Bak · tvíhöfði',
    durationMin: 45,
    exercises: [
      { id: 'e5', name: 'Niðurtog í kapli', sets: 3, reps: '8–10', rest: '90 sek' },
      { id: 'e6', name: 'Róður sitjandi', sets: 3, reps: '10', rest: '90 sek' },
      { id: 'e7', name: 'Face pull', sets: 3, reps: '15', rest: '60 sek' },
      { id: 'e8', name: 'Tvíhöfðakreppa', sets: 3, reps: '10–12', rest: '60 sek' },
    ],
  },
  {
    id: 'dagur-3',
    weekday: 4,
    dayName: 'Fimmtudagur',
    title: 'Neðri líkami',
    focus: 'Bíður samþykkis sjúkraþjálfara',
    durationMin: 0,
    exercises: [],
    requiresPhysioApproval: true,
  },
  {
    id: 'dagur-4',
    weekday: 5,
    dayName: 'Föstudagur',
    title: 'Efri líkami – heild',
    focus: 'Ýta · toga · axlir',
    durationMin: 40,
    exercises: [
      { id: 'e9', name: 'Hallandi bekkpressa', sets: 3, reps: '10', rest: '90 sek' },
      { id: 'e10', name: 'Einarma róður', sets: 3, reps: '10', rest: '90 sek' },
      { id: 'e11', name: 'Arnold-pressa', sets: 3, reps: '10', rest: '60 sek' },
    ],
  },
];

export function todayWeekday(): number {
  const d = new Date().getDay(); // 0 = sunnudagur
  return d === 0 ? 7 : d;
}

export function getDay(id: string) {
  return weeklyPlan.find((d) => d.id === id);
}

export function nextWorkout(): WorkoutDay {
  const today = todayWeekday();
  const sorted = [...weeklyPlan].sort((a, b) => a.weekday - b.weekday);
  return sorted.find((d) => d.weekday >= today) ?? sorted[0];
}

// Sýnisgögn fyrir framfaraskjá – verða skipt út fyrir vistaða sögu.
export const sampleHistory = [
  { week: 'V. 44', sessions: 3 },
  { week: 'V. 45', sessions: 4 },
  { week: 'V. 46', sessions: 2 },
  { week: 'V. 47', sessions: 4 },
];

export const sampleKneeLog = [
  { day: 'Mán', pain: 2 },
  { day: 'Þri', pain: 3 },
  { day: 'Mið', pain: 2 },
  { day: 'Fim', pain: 1 },
  { day: 'Fös', pain: 2 },
];
