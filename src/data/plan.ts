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
      { id: 'k1', name: 'Mjaðmalyfta með handlóði', sets: 4, reps: '12 · 2 sek bið efst', rest: '60 sek' },
      { id: 'k2', name: 'Rúmensk réttstaða með handlóðum', sets: 4, reps: '10 · 3 sek niður', rest: '60 sek' },
      { id: 'k3', name: 'Hliðarganga með teygju', sets: 3, reps: '15 hvora átt', rest: '45 sek' },
      { id: 'k4', name: 'Kálfalyftur á öðrum fæti', sets: 4, reps: '12 hvorn fót', rest: '45 sek' },
      { id: 'k5', name: 'Dauð padda', sets: 3, reps: '8 hvora hlið', rest: '45 sek' },
    ],
  },
  {
    id: 'dagur-2',
    weekday: 2,
    dayName: 'Þriðjudagur',
    title: 'Efri líkami',
    focus: 'Brjóst · bak · axlir · hendur · mjóbak',
    exercises: [
      { id: 'k6', name: 'Gólfpressa með handlóðum', sets: 3, reps: '8–12', rest: '60 sek' },
      { id: 'k7', name: 'Framhallandi róður með handlóðum', sets: 4, reps: '8–10', rest: '60 sek' },
      { id: 'k8', name: 'Axlapressa standandi', sets: 3, reps: '8–10', rest: '60 sek' },
      { id: 'k9', name: 'Niðurtog með teygju', sets: 3, reps: '12–15', rest: '45 sek' },
      { id: 'k10', name: 'Teygja dregin í sundur', sets: 3, reps: '15', rest: '45 sek' },
      { id: 'k11', name: 'Ofurmenni', sets: 3, reps: '10 · 2 sek bið', rest: '45 sek' },
      { id: 'k12', name: 'Tvíhöfðakreppa', sets: 3, reps: '10–12', rest: '45 sek' },
      { id: 'k13', name: 'Þríhöfðaréttur yfir höfuð', sets: 3, reps: '10–12', rest: '45 sek' },
    ],
  },
  {
    id: 'dagur-3',
    weekday: 4,
    dayName: 'Fimmtudagur',
    title: 'Fætur B – einn fótur',
    focus: 'Aftanlæri · rass · jafnvægi · hnévænt',
    exercises: [
      { id: 'k14', name: 'Grunn bikarbeygja', sets: 3, reps: '10 · 3 sek niður', rest: '60 sek' },
      { id: 'k15', name: 'Rúmensk réttstaða á öðrum fæti', sets: 4, reps: '10 hvorn fót', rest: '60 sek' },
      { id: 'k16', name: 'Mjaðmalyfta á öðrum fæti', sets: 4, reps: '12 hvorn fót', rest: '45 sek' },
      { id: 'k17', name: 'Mjaðmalyfta með gangi', sets: 3, reps: '8', rest: '45 sek' },
      { id: 'k18', name: 'Hliðarlega fótalyfta', sets: 3, reps: '20 hvorn fót', rest: '45 sek' },
      { id: 'k19', name: 'Hliðarplanki', sets: 3, reps: '20–30 sek hvor hlið', rest: '45 sek' },
    ],
  },
  {
    id: 'dagur-4',
    weekday: 5,
    dayName: 'Föstudagur',
    title: 'Fætur C – kraftur',
    focus: 'Rass · aftanlæri · kálfar · hnévænt',
    exercises: [
      { id: 'k20', name: 'Súmó réttstaða með handlóði', sets: 4, reps: '12', rest: '60 sek' },
      { id: 'k21', name: 'Rúmensk réttstaða með handlóðum', sets: 4, reps: '10 · 3 sek niður', rest: '60 sek' },
      { id: 'k22', name: 'Mjaðmalyfta með teygju og lóði', sets: 3, reps: '15', rest: '45 sek' },
      { id: 'k23', name: 'Aftursveifla með teygju', sets: 3, reps: '15 hvorn fót', rest: '45 sek' },
      { id: 'k24', name: 'Kálfalyftur', sets: 4, reps: '20', rest: '45 sek' },
      { id: 'k25', name: 'Planki', sets: 3, reps: '30–45 sek', rest: '45 sek' },
    ],
  },
];

/** Auðkenni sjálfgefinna æfinga (gamlar og nýjar) – notað við uppfærslu vistaðra gagna */
export const isDefaultExerciseId = (id: string) => /^[ehfgk]\d+$/.test(id);

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
