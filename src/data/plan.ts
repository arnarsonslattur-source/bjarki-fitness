// Sjálfgefin vikuáætlun fyrir heimaæfingar: handlóð, teygjur og veggur.
// 3 fótadagar (mest hnévænir) + 1 dagur fyrir efri líkama.
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
    title: 'Fætur A – mjaðmir',
    focus: 'Rass · aftanlæri · kálfar',
    exercises: [
      { id: 'f1', name: 'Mjaðmalyfta með handlóði', sets: 3, reps: '12', rest: '60 sek' },
      { id: 'f2', name: 'Rúmensk réttstaða með handlóðum', sets: 3, reps: '10', rest: '60 sek' },
      { id: 'f3', name: 'Hliðarganga með teygju', sets: 3, reps: '12 hvora átt', rest: '45 sek' },
      { id: 'f4', name: 'Kálfalyftur', sets: 3, reps: '15', rest: '45 sek' },
    ],
  },
  {
    id: 'dagur-2',
    weekday: 2,
    dayName: 'Þriðjudagur',
    title: 'Efri líkami',
    focus: 'Brjóst · bak · axlir · hendur',
    exercises: [
      { id: 'f5', name: 'Gólfpressa með handlóðum', sets: 3, reps: '8–12', rest: '60 sek' },
      { id: 'f6', name: 'Framhallandi róður með handlóðum', sets: 3, reps: '8–10', rest: '60 sek' },
      { id: 'f7', name: 'Axlapressa standandi', sets: 3, reps: '8–10', rest: '60 sek' },
      { id: 'f8', name: 'Niðurtog með teygju', sets: 3, reps: '12–15', rest: '45 sek' },
      { id: 'f9', name: 'Tvíhöfðakreppa', sets: 3, reps: '10–12', rest: '45 sek' },
      { id: 'f10', name: 'Þríhöfðaréttur yfir höfuð', sets: 3, reps: '10–12', rest: '45 sek' },
    ],
  },
  {
    id: 'dagur-3',
    weekday: 4,
    dayName: 'Fimmtudagur',
    title: 'Fætur B – blanda',
    focus: 'Læri · rass · jafnvægi',
    exercises: [
      { id: 'f11', name: 'Grunn bikarbeygja', sets: 3, reps: '10', rest: '60 sek' },
      { id: 'f12', name: 'Rúmensk réttstaða á öðrum fæti', sets: 3, reps: '8 hvorn fót', rest: '45 sek' },
      { id: 'f13', name: 'Veggseta', sets: 3, reps: '30 sek', rest: '45 sek' },
      { id: 'f14', name: 'Mjaðmalyfta á öðrum fæti', sets: 3, reps: '10 hvorn fót', rest: '45 sek' },
    ],
  },
  {
    id: 'dagur-4',
    weekday: 5,
    dayName: 'Föstudagur',
    title: 'Fætur C – rass og stöðugleiki',
    focus: 'Rass · hliðar mjaðma · kálfar',
    exercises: [
      { id: 'f15', name: 'Rúmensk réttstaða með handlóðum', sets: 3, reps: '10', rest: '60 sek' },
      { id: 'f16', name: 'Grunn bikarbeygja', sets: 3, reps: '10', rest: '60 sek' },
      { id: 'f17', name: 'Aftursveifla með teygju', sets: 3, reps: '12 hvorn fót', rest: '45 sek' },
      { id: 'f18', name: 'Hliðarlega fótalyfta', sets: 3, reps: '15 hvorn fót', rest: '45 sek' },
      { id: 'f19', name: 'Kálfalyftur á öðrum fæti', sets: 3, reps: '12 hvorn fót', rest: '45 sek' },
    ],
  },
];

/** Auðkenni sjálfgefinna æfinga (gamlar og nýjar) – notað við uppfærslu vistaðra gagna */
export const isDefaultExerciseId = (id: string) => /^[ehf]\d+$/.test(id);

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
