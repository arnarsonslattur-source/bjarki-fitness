// Sjálfgefin vikuáætlun. Æfingum er breytt í appinu sjálfu (Æfingar → dagur → Breyta).

export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest?: string;
};

export type WorkoutDay = {
  id: string;
  weekday: number; // 1 = mánudagur … 7 = sunnudagur
  dayName: string;
  title: string;
  focus: string;
  exercises: Exercise[];
};

export const WEEKDAYS = ['Mán', 'Þri', 'Mið', 'Fim', 'Fös', 'Lau', 'Sun'];

export const defaultPlan: WorkoutDay[] = [
  {
    id: 'dagur-1',
    weekday: 1,
    dayName: 'Mánudagur',
    title: 'Efri líkami – ýta',
    focus: 'Brjóst · axlir · þríhöfði',
    exercises: [
      { id: 'e1', name: 'Bekkpressa með handlóðum', sets: 3, reps: '8–10', rest: '60 sek' },
      { id: 'e2', name: 'Axlapressa sitjandi', sets: 3, reps: '8–10', rest: '60 sek' },
      { id: 'e3', name: 'Hliðarlyftur', sets: 3, reps: '12–15', rest: '45 sek' },
      { id: 'e4', name: 'Þríhöfðapressa í kapli', sets: 3, reps: '12', rest: '45 sek' },
    ],
  },
  {
    id: 'dagur-2',
    weekday: 2,
    dayName: 'Þriðjudagur',
    title: 'Efri líkami – toga',
    focus: 'Bak · tvíhöfði',
    exercises: [
      { id: 'e5', name: 'Niðurtog í kapli', sets: 3, reps: '8–10', rest: '60 sek' },
      { id: 'e6', name: 'Róður sitjandi', sets: 3, reps: '10', rest: '60 sek' },
      { id: 'e7', name: 'Face pull', sets: 3, reps: '15', rest: '45 sek' },
      { id: 'e8', name: 'Tvíhöfðakreppa', sets: 3, reps: '10–12', rest: '45 sek' },
    ],
  },
  {
    id: 'dagur-3',
    weekday: 4,
    dayName: 'Fimmtudagur',
    title: 'Neðri líkami',
    focus: 'Þú setur inn þínar æfingar',
    exercises: [],
  },
  {
    id: 'dagur-4',
    weekday: 5,
    dayName: 'Föstudagur',
    title: 'Efri líkami – heild',
    focus: 'Ýta · toga · axlir',
    exercises: [
      { id: 'e9', name: 'Hallandi bekkpressa', sets: 3, reps: '10', rest: '60 sek' },
      { id: 'e10', name: 'Einarma róður', sets: 3, reps: '10', rest: '60 sek' },
      { id: 'e11', name: 'Arnold-pressa', sets: 3, reps: '10', rest: '45 sek' },
    ],
  },
];

export function todayWeekday(): number {
  const d = new Date().getDay(); // 0 = sunnudagur
  return d === 0 ? 7 : d;
}

export function nextWorkout(plan: WorkoutDay[]): WorkoutDay {
  const today = todayWeekday();
  const sorted = [...plan].sort((a, b) => a.weekday - b.weekday);
  return sorted.find((d) => d.weekday >= today) ?? sorted[0];
}

export function totalSets(day: WorkoutDay) {
  return day.exercises.reduce((n, e) => n + e.sets, 0);
}
