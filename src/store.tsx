import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { Exercise, WorkoutDay, defaultPlan, isDefaultExerciseId } from '@/data/plan';
import { dateKey } from '@/dates';

export type HistoryEntry = {
  id: string;
  date: string; // ISO
  dayId: string;
  title: string;
  setsDone: number;
  setsTotal: number;
};

export type KneeEntry = {
  date: string; // YYYY-MM-DD
  pain: number; // 0–10
  note?: string;
};

export type Settings = {
  remindersOn: boolean;
  times: Record<string, string>; // dayId -> "HH:MM"
};

type State = {
  version: number;
  plan: WorkoutDay[];
  history: HistoryEntry[];
  knee: KneeEntry[];
  settings: Settings;
};

const KEY = 'bjarki-fitness-v1';

const VERSION = 4;

const defaultState: State = {
  version: VERSION,
  plan: defaultPlan,
  history: [],
  knee: [],
  settings: {
    remindersOn: true,
    times: Object.fromEntries(defaultPlan.map((d) => [d.id, '16:00'])),
  },
};

// Uppfærir eldri vistuð gögn
function migrate(s: Partial<State>): Partial<State> {
  if ((s.version ?? 1) < 2 && s.plan) {
    // Styttri hvíld: 90 → 60 sek, 60 → 45 sek
    const shorter: Record<string, string> = { '90 sek': '60 sek', '60 sek': '45 sek' };
    s.plan = s.plan.map((d) => ({
      ...d,
      exercises: d.exercises.map((e) => ({ ...e, rest: e.rest ? shorter[e.rest] ?? e.rest : e.rest })),
    }));
  }
  if ((s.version ?? 1) < 3 && s.plan) {
    // Heimaæfingar: skipta út sjálfgefnum æfingum, halda þeim sem notandi bætti við
    s.plan = s.plan.map((d) => {
      const def = defaultPlan.find((p) => p.id === d.id);
      if (!def) return d;
      const own = d.exercises.filter((e) => !isDefaultExerciseId(e.id));
      return { ...d, exercises: [...def.exercises, ...own] };
    });
  }
  if ((s.version ?? 1) < 4 && s.plan) {
    // 3 fótadagar + 1 efri líkami: ný heiti og æfingar, eigin æfingar haldast
    s.plan = s.plan.map((d) => {
      const def = defaultPlan.find((p) => p.id === d.id);
      if (!def) return d;
      const own = d.exercises.filter((e) => !isDefaultExerciseId(e.id));
      return { ...def, exercises: [...def.exercises, ...own] };
    });
  }
  return { ...s, version: VERSION };
}

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

function useStoreValue() {
  const [state, setState] = useState<State>(defaultState);
  const [ready, setReady] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((raw) => {
        if (!raw) return;
        try {
          const s = migrate(JSON.parse(raw) as Partial<State>);
          setState({
            ...defaultState,
            ...s,
            settings: { ...defaultState.settings, ...s.settings, times: { ...defaultState.settings.times, ...s.settings?.times } },
          });
        } catch {
          // ónýt gögn – byrjum upp á nýtt
        }
      })
      .catch(() => {})
      .finally(() => {
        loaded.current = true;
        setReady(true);
      });
  }, []);

  useEffect(() => {
    if (loaded.current) AsyncStorage.setItem(KEY, JSON.stringify(state)).catch(() => {});
  }, [state]);

  const mapDay = (dayId: string, fn: (d: WorkoutDay) => WorkoutDay) =>
    setState((s) => ({ ...s, plan: s.plan.map((d) => (d.id === dayId ? fn(d) : d)) }));

  return {
    state,
    ready,
    updateExercise(dayId: string, exId: string, patch: Partial<Omit<Exercise, 'id'>>) {
      mapDay(dayId, (d) => ({ ...d, exercises: d.exercises.map((e) => (e.id === exId ? { ...e, ...patch } : e)) }));
    },
    addExercise(dayId: string, ex: Omit<Exercise, 'id'>) {
      mapDay(dayId, (d) => ({ ...d, exercises: [...d.exercises, { ...ex, id: uid() }] }));
    },
    removeExercise(dayId: string, exId: string) {
      mapDay(dayId, (d) => ({ ...d, exercises: d.exercises.filter((e) => e.id !== exId) }));
    },
    moveExercise(dayId: string, exId: string, dir: -1 | 1) {
      mapDay(dayId, (d) => {
        const i = d.exercises.findIndex((e) => e.id === exId);
        const j = i + dir;
        if (i < 0 || j < 0 || j >= d.exercises.length) return d;
        const list = [...d.exercises];
        [list[i], list[j]] = [list[j], list[i]];
        return { ...d, exercises: list };
      });
    },
    renameDay(dayId: string, title: string, focus: string) {
      mapDay(dayId, (d) => ({ ...d, title, focus }));
    },
    finishWorkout(day: WorkoutDay, setsDone: number, setsTotal: number) {
      const entry: HistoryEntry = {
        id: uid(),
        date: new Date().toISOString(),
        dayId: day.id,
        title: day.title,
        setsDone,
        setsTotal,
      };
      setState((s) => ({ ...s, history: [entry, ...s.history] }));
    },
    removeHistory(id: string) {
      setState((s) => ({ ...s, history: s.history.filter((h) => h.id !== id) }));
    },
    logKnee(pain: number, note?: string) {
      const date = dateKey(new Date());
      setState((s) => ({
        ...s,
        knee: [{ date, pain, note: note?.trim() || undefined }, ...s.knee.filter((k) => k.date !== date)],
      }));
    },
    toggleReminders(on: boolean) {
      setState((s) => ({ ...s, settings: { ...s.settings, remindersOn: on } }));
    },
    setReminderTime(dayId: string, time: string) {
      setState((s) => ({ ...s, settings: { ...s.settings, times: { ...s.settings.times, [dayId]: time } } }));
    },
    resetAll() {
      setState(defaultState);
    },
  };
}

type Store = ReturnType<typeof useStoreValue>;
const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const value = useStoreValue();
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useStore verður að vera innan StoreProvider');
  return v;
}
