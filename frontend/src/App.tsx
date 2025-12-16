import { useEffect, useState } from "react";

type HealthStatus = "loading" | "ok" | "error";
type AvatarState = "idle" | "ready" | "win" | "tired";

function App() {
  const [status, setStatus] = useState<HealthStatus>("loading");
  const [avatarState, setAvatarState] = useState<AvatarState>("idle");

  async function fetchAvatarState() {
    try {
      const res = await fetch("http://localhost:3000/api/avatar-state");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      // expecting AvatarState
      setStatus("ok");
      setAvatarState(data.avatarState as AvatarState);
    } catch (err) {
      console.error("Error fetching avatar state:", err);
      setStatus("error");
    }
  }

  useEffect(() => {
    fetchAvatarState();
  }, []);

  async function logWorkout() {
    await fetch("http://localhost:3000/api/workouts", { method: "POST" });
    await fetchAvatarState();
  }
  // remember to use tailwind syntax, NOT jsx style syntax
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-950 text-white font-sans">
      <h1 className="text-3xl font-bold">Lifting Tracker – Dev Mode</h1>
      <div className="w-72 h-72 rounded-2xl border border-white/15 flex flex-col items-center justify-center gap-2">
        <div className="text-sm opacity-70">AVATAR STATE</div>
        <div className="text-4xl font-extrabold">{avatarState}</div>
      </div>

      <button
        onClick={logWorkout}
        className="px-4 py-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 transition"
      >
        Log workout (test)
      </button>

      <p>
        Backend status:{" "}
        <strong
          className={
            status === "ok"
              ? "text-green-500"
              : status === "error"
                ? "text-red-500"
                : "text-yellow-400"
          }
        >
          {status}
        </strong>
      </p>

      <p className="text-sm opacity-80">Full stack is ONLINE!</p>
    </div>
  );
}
export default App;