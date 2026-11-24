// Sjálfgefin vikuáætlun fyrir heimaæfingar: handlóð, teygjur og veggur.
// Æfingum er breytt í appinu sjálfu (Æfingar → dagur → Breyta).

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
      { id: 'h1', name: 'Gólfpressa með handlóðum', sets: 3, reps: '8–12', rest: '60 sek' },
      { id: 'h2', name: 'Axlapressa standandi', sets: 3, reps: '8–10', rest: '60 sek' },
      { id: 'h3', name: 'Hliðarlyftur', sets: 3, reps: '12–15', rest: '45 sek' },
      { id: 'h4', name: 'Þríhöfðaréttur yfir höfuð', sets: 3, reps: '10–12', rest: '45 sek' },
    ],
  },
  {
    id: 'dagur-2',
    weekday: 2,
    dayName: 'Þriðjudagur',
    title: 'Efri líkami – toga',
    focus: 'Bak · tvíhöfði',
    exercises: [
      { id: 'h5', name: 'Framhallandi róður með handlóðum', sets: 3, reps: '8–10', rest: '60 sek' },
      { id: 'h6', name: 'Niðurtog með teygju', sets: 3, reps: '12–15', rest: '45 sek' },
      { id: 'h7', name: 'Teygja dregin í sundur', sets: 3, reps: '15', rest: '45 sek' },
      { id: 'h8', name: 'Tvíhöfðakreppa', sets: 3, reps: '10–12', rest: '45 sek' },
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
      { id: 'h9', name: 'Fluga á gólfi', sets: 3, reps: '10–12', rest: '45 sek' },
      { id: 'h10', name: 'Einarma róður með stuðningi við vegg', sets: 3, reps: '10', rest: '60 sek' },
      { id: 'h11', name: 'Arnold-pressa', sets: 3, reps: '10', rest: '45 sek' },
      { id: 'h12', name: 'Hamarskreppa', sets: 3, reps: '10–12', rest: '45 sek' },
    ],
  },
];

/** Auðkenni sjálfgefinna æfinga (gamlar og nýjar) – notað við uppfærslu vistaðra gagna */
export const isDefaultExerciseId = (id: string) => /^[eh]\d+$/.test(id);

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
