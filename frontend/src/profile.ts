export type Units = "kg" | "lb";
export type Experience = "beginner" | "intermediate" | "advanced";
export type Goal = "strength" | "hypertrophy" | "general" | "cut" | "bulk";
export type CoachingStyle = "gentle" | "direct" | "coach";

export type Profile = {
    displayName: string;
    pronouns: string;

    units: Units;
    experience: Experience;
    goal: Goal;

    targetDaysPerWeek: number;

    encouragementLevel: number;
    coachingStyle: CoachingStyle;
    showAvatar: boolean;

    updatedAt: string;
};

export const DEFAULT_PROFILE: Profile = {
    displayName: "",
    pronouns: "",

    units: "lb",
    experience: "beginner",
    goal: "general",

    targetDaysPerWeek: 3,

    encouragementLevel: 60,
    coachingStyle: "gentle",
    showAvatar: true,

    updatedAt: new Date().toISOString(),
};
