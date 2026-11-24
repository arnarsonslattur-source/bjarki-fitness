// Sjálfgefin vikuáætlun fyrir heimaæfingar: handlóð, teygjur og veggur.
// 3 krefjandi fótadagar með lítið álag á hné + 1 dagur fyrir efri líkama.
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
    focus: 'Rass · aftanlæri · kálfar · hnévænt',
    exercises: [
      { id: 'g1', name: 'Mjaðmalyfta með handlóði', sets: 4, reps: '12 · 2 sek bið efst', rest: '60 sek' },
      { id: 'g2', name: 'Rúmensk réttstaða með handlóðum', sets: 4, reps: '10 · 3 sek niður', rest: '60 sek' },
      { id: 'g3', name: 'Hliðarganga með teygju', sets: 3, reps: '15 hvora átt', rest: '45 sek' },
      { id: 'g4', name: 'Kálfalyftur á öðrum fæti', sets: 4, reps: '12 hvorn fót', rest: '45 sek' },
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
    title: 'Fætur B – einn fótur',
    focus: 'Aftanlæri · rass · jafnvægi · hnévænt',
    exercises: [
      { id: 'g5', name: 'Grunn bikarbeygja', sets: 3, reps: '10 · 3 sek niður', rest: '60 sek' },
      { id: 'g6', name: 'Rúmensk réttstaða á öðrum fæti', sets: 4, reps: '10 hvorn fót', rest: '60 sek' },
      { id: 'g7', name: 'Mjaðmalyfta á öðrum fæti', sets: 4, reps: '12 hvorn fót', rest: '45 sek' },
      { id: 'g8', name: 'Mjaðmalyfta með gangi', sets: 3, reps: '8', rest: '45 sek' },
      { id: 'g9', name: 'Hliðarlega fótalyfta', sets: 3, reps: '20 hvorn fót', rest: '45 sek' },
    ],
  },
  {
    id: 'dagur-4',
    weekday: 5,
    dayName: 'Föstudagur',
    title: 'Fætur C – kraftur',
    focus: 'Rass · aftanlæri · kálfar · hnévænt',
    exercises: [
      { id: 'g10', name: 'Súmó réttstaða með handlóði', sets: 4, reps: '12', rest: '60 sek' },
      { id: 'g11', name: 'Rúmensk réttstaða með handlóðum', sets: 4, reps: '10 · 3 sek niður', rest: '60 sek' },
      { id: 'g12', name: 'Mjaðmalyfta með teygju og lóði', sets: 3, reps: '15', rest: '45 sek' },
      { id: 'g13', name: 'Aftursveifla með teygju', sets: 3, reps: '15 hvorn fót', rest: '45 sek' },
      { id: 'g14', name: 'Kálfalyftur', sets: 4, reps: '20', rest: '45 sek' },
    ],
  },
];

/** Auðkenni sjálfgefinna æfinga (gamlar og nýjar) – notað við uppfærslu vistaðra gagna */
export const isDefaultExerciseId = (id: string) => /^[ehfg]\d+$/.test(id);

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
