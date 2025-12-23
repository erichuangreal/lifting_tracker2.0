import { Router } from "express";
import { z } from "zod";
import { prisma } from "../prisma";

const router = Router();

const SetSchema = z.object({
  weight: z.number().nullable(),
  reps: z.number().int().nullable(),
});

const ExerciseSchema = z.object({
  name: z.string().min(1).max(80),
  sets: z.array(SetSchema).min(1),
});

const SaveWorkoutSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), 
  exercises: z.array(ExerciseSchema).min(1),
});

router.post("/", async (req, res) => {
  const parsed = SaveWorkoutSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: parsed.error.flatten() });
  }

  const { date, exercises } = parsed.data;

  try {
    const created = await prisma.workout.create({
      data: {
        date: new Date(date), 
        exercises: {
          create: exercises.map((ex, i) => ({
            name: ex.name,
            order: i,
            sets: {
              create: ex.sets.map((s, j) => ({
                order: j,
                weight: s.weight,
                reps: s.reps,
              })),
            },
          })),
        },
      },
      select: { id: true },
    });

    return res.json({ ok: true, workoutId: created.id.toString() });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message ?? "server_error" });
  }
});


router.get("/", async (req, res) => {
  const date = String(req.query.date ?? "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ ok: false, error: "date_required_YYYY-MM-DD" });
  }

  const dayStart = new Date(date + "T00:00:00.000Z");
  const dayEnd = new Date(date + "T23:59:59.999Z");

  const workout = await prisma.workout.findFirst({
    where: { date: { gte: dayStart, lte: dayEnd } },
    orderBy: { createdAt: "desc" },
    include: {
      exercises: {
        orderBy: { order: "asc" },
        include: { sets: { orderBy: { order: "asc" } } },
      },
    },
  });

  if (!workout) return res.json({ ok: true, workout: null });
  return res.json({
    ok: true,
    workout: {
      id: workout.id.toString(),
      date,
      createdAt: workout.createdAt,
      exercises: workout.exercises.map((ex) => ({
        id: ex.id.toString(),
        name: ex.name,
        sets: ex.sets.map((s) => ({
          id: s.id.toString(),
          weight: s.weight === null ? null : Number(s.weight),
          reps: s.reps === null ? null : s.reps,
        })),
      })),
    },
  });
});

export default router;
