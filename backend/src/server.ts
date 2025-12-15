import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

type AvatarState = "idle" | "ready" | "win" | "tired";
let lastWorkoutAt: number | null = null;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Lifting tracker backend is running");
});

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

// Determines the avatar state based on the last workout time
const WIN_MS = 12 * 60 * 60 * 1000;        // win - 12 hours
const READY_MS = 48 * 60 * 60 * 1000;     // ready - 2 days
const TIRED_MS = 3 * 24 * 60 * 60 * 1000; // tired - 3 days

function computeAvatarState(now: number, last: number | null): AvatarState {
    if (last === null) return "idle";
    const dt = now - last;
    if (dt <= WIN_MS) return "win";
    if (dt <= READY_MS) return "ready";
    if (dt >= TIRED_MS) return "tired";
    return "idle";
}

app.get("/api/avatar-state", (req, res) => {
    const now = Date.now();
    const avatarState = computeAvatarState(now, lastWorkoutAt);
    res.json({ avatarState, lastWorkoutAt, now });
});

app.post("/api/workouts", (req, res) => {
    lastWorkoutAt = Date.now();
    res.json({ ok: true, lastWorkoutAt });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});