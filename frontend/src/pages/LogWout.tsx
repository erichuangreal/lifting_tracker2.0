import React, { useMemo, useState } from "react";

type SetRow = { weight: string; reps: string };

const EXERCISE_LIBRARY = [
    "Bench Press",
    "Incline Bench Press",
    "Overhead Press",
    "Lat Pulldown",
    "Barbell Row",
    "Squat",
    "Deadlift",
    "Romanian Deadlift",
    "Leg Press",
    "Calf Raise",
];

export default function LogWout() {
    // current exercise + sets
    const [currentExercise, setCurrentExercise] = useState<string>("");
    const [sets, setSets] = useState<SetRow[]>([{ weight: "", reps: "" }]);

    // exercise log (completed list)
    const [log, setLog] = useState<{ id: string; name: string; sets: SetRow[] }[]>(
        []
    );

    const canRemoveSet = sets.length > 1;

    const currentVolume = useMemo(() => {
        let v = 0;
        for (const s of sets) {
            const w = Number(s.weight);
            const r = Number(s.reps);
            if (Number.isFinite(w) && Number.isFinite(r) && w > 0 && r > 0) v += w * r;
        }
        return Math.round(v);
    }, [sets]);

    function addSet() {
        setSets((prev) => [...prev, { weight: "", reps: "" }]);
    }

    function removeSet() {
        if (!canRemoveSet) return;
        setSets((prev) => prev.slice(0, -1));
    }

    function updateSet(idx: number, patch: Partial<SetRow>) {
        setSets((prev) => prev.map((s, i) => (i === idx ? { ...s, ...patch } : s)));
    }

    function addExerciseToLog() {
        const name = currentExercise.trim();
        const cleanedSets = sets
            .map((s) => ({ weight: s.weight.trim(), reps: s.reps.trim() }))
            .filter((s) => s.weight !== "" || s.reps !== "");

        if (!name) {
            alert("Choose an exercise first.");
            return;
        }
        if (cleanedSets.length === 0) {
            alert("Add at least one set.");
            return;
        }

        setLog((prev) => [{ id: uid(), name, sets: cleanedSets }, ...prev]);

        // reset for next exercise
        setCurrentExercise("");
        setSets([{ weight: "", reps: "" }]);
    }

    function saveWorkout() {
        // UI only for now
        alert(`Saved workout.\nExercises logged: ${log.length}`);
    }

    return (
        <div className="min-h-screen bg-[#F6F5F3] pb-24">
            <div className="px-5 pt-6">
                {/* Top light-blue pill */}
                <div className="h-[78px] w-full rounded-[24px] bg-[#E0E7FF]">
                    <div className="flex h-full items-center justify-center">
                        <span className="text-[26px] font-medium text-[#111827]">
                            Workout Log
                        </span>
                    </div>
                </div>

                {/* Avatar name pill */}
                <div className="mt-6">
                    <div className="inline-flex items-center gap-3 rounded-full bg-[#6366F1] px-5 py-3 shadow-[0_10px_18px_rgba(99,102,241,0.20)]">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/25">
                            <UserIcon className="h-5 w-5 text-white" />
                        </div>
                        <div className="text-[14px] font-medium text-white">Avatar name</div>
                    </div>
                </div>
            </div>

            {/* Light-blue section band: Current Exercise + Add exercise */}
            <div className="mt-8 bg-[#E0E7FF]">
                <div className="px-5 py-4">
                    <div className="flex items-center justify-between">
                        <div className="inline-flex rounded-full bg-[#6366F1] px-5 py-2 text-[13px] font-medium text-white">
                            Current Exercise
                        </div>

                        <button
                            type="button"
                            onClick={addExerciseToLog}
                            className="text-[13px] font-medium text-[#6366F1] hover:underline"
                        >
                            + Add exercise
                        </button>
                    </div>
                </div>
            </div>

            {/* Main input area */}
            <div className="px-5 pt-6">
                {/* Choose exercise */}
                <div className="text-center">
                    <label className="text-[13px] font-medium text-[#6366F1] underline">
                        Choose exercise
                    </label>

                    <div className="mt-3 flex justify-center">
                        <select
                            value={currentExercise}
                            onChange={(e) => setCurrentExercise(e.target.value)}
                            className="w-[220px] rounded-[14px] border border-[#E5E7EB] bg-white px-4 py-3 text-[13px] text-[#111827] outline-none focus:border-[#6366F1]"
                        >
                            <option value="" disabled>
                                Select…
                            </option>
                            {EXERCISE_LIBRARY.map((name) => (
                                <option key={name} value={name}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Column headers */}
                <div className="mt-7 grid grid-cols-3 text-center text-[13px] font-medium text-[#6366F1]">
                    <div>Sets</div>
                    <div>Weight</div>
                    <div>Reps</div>
                </div>

                {/* Set rows */}
                <div className="mt-4 space-y-3">
                    {sets.map((s, idx) => (
                        <div key={idx} className="grid grid-cols-3 items-center gap-3">
                            {/* Set number */}
                            <div className="text-center text-[13px] font-medium text-[#6366F1]">
                                {idx + 1}
                            </div>

                            {/* Weight */}
                            <input
                                inputMode="decimal"
                                value={s.weight}
                                onChange={(e) => updateSet(idx, { weight: e.target.value })}
                                placeholder=""
                                className="h-[44px] rounded-[14px] border border-[#E5E7EB] bg-white px-4 text-[13px] text-[#111827] outline-none focus:border-[#6366F1] tabular-nums"
                            />

                            {/* Reps */}
                            <input
                                inputMode="numeric"
                                value={s.reps}
                                onChange={(e) => updateSet(idx, { reps: e.target.value })}
                                placeholder=""
                                className="h-[44px] rounded-[14px] border border-[#E5E7EB] bg-white px-4 text-[13px] text-[#111827] outline-none focus:border-[#6366F1] tabular-nums"
                            />
                        </div>
                    ))}
                </div>

                {/* Add/Remove set links */}
                <div className="mt-7 flex items-center justify-center gap-10">
                    <button
                        type="button"
                        onClick={addSet}
                        className="text-[13px] font-medium text-[#6366F1]"
                    >
                        + Add set
                    </button>

                    <button
                        type="button"
                        onClick={removeSet}
                        disabled={!canRemoveSet}
                        className={[
                            "text-[13px] font-medium",
                            canRemoveSet ? "text-[#9CA3AF]" : "text-[#D1D5DB] cursor-not-allowed",
                        ].join(" ")}
                    >
                        + Remove set
                    </button>
                </div>

                {/* (Optional tiny hint like volume; remove if you want it identical) */}
                <div className="mt-3 text-center text-[12px] text-[#9CA3AF] tabular-nums">
                    {currentVolume > 0 ? `Current volume: ${currentVolume}` : "\u00A0"}
                </div>
            </div>

            {/* Light-blue band: Exercise Log */}
            <div className="mt-10 bg-[#E0E7FF]">
                <div className="px-5 py-4">
                    <div className="inline-flex rounded-full bg-[#6366F1] px-6 py-2 text-[13px] font-medium text-white">
                        Exercise Log
                    </div>
                </div>
            </div>

            {/* Logged exercises list */}
            <div className="px-5 pt-5">
                {log.length === 0 ? (
                    <div className="rounded-[18px] border border-[#E5E7EB] bg-white px-4 py-4 text-[13px] text-[#9CA3AF]">
                        No exercises yet.
                    </div>
                ) : (
                    <div className="space-y-3">
                        {log.map((ex) => (
                            <div
                                key={ex.id}
                                className="rounded-[18px] border border-[#E5E7EB] bg-white px-4 py-3"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="text-[14px] font-medium text-[#111827]">
                                        {ex.name}
                                    </div>
                                    <div className="text-[12px] text-[#9CA3AF] tabular-nums">
                                        {ex.sets.length} sets
                                    </div>
                                </div>

                                <div className="mt-2 space-y-1">
                                    {ex.sets.map((s, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between text-[12px] text-[#6B7280] tabular-nums"
                                        >
                                            <span>Set {i + 1}</span>
                                            <span>
                                                {s.weight || "—"} × {s.reps || "—"}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Bottom Save Workout button */}
            <div className="mt-10 px-5">
                <div className="flex justify-center">
                    <button
                        onClick={saveWorkout}
                        className="h-[50px] w-[220px] rounded-full bg-[#6366F1] text-[14px] font-medium text-white shadow-[0_10px_18px_rgba(99,102,241,0.20)] active:scale-[0.99]"
                    >
                        Save Workout
                    </button>
                </div>
            </div>

            <div className="h-12" />
        </div>
    );
}

/* -------- helpers -------- */

function uid() {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
    return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path
                d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M4.5 20c1.7-3.5 13.3-3.5 15 0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}
