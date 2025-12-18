// src/pages/Home.tsx
import { useNavigate } from "react-router-dom";

export default function Home() {
    const nav = useNavigate();

    return (
        <div className="min-h-screen bg-[#F6F5F3] text-[#111827] pb-24">
            {/* Top bar (W345 H29, positioned with ~22px side margins, ~50px from top) */}
            <div className="pt-[50px]">
                <div className="mx-auto w-[345px] h-[29px] flex items-center justify-between">
                    <button aria-label="Menu" className="w-8 h-8 flex items-center justify-center">
                        <HamburgerIcon className="w-6 h-6 text-[#111827]" />
                    </button>

                    <h1 className="text-[22px] font-medium">Home</h1>

                    <button
                        aria-label="Profile"
                        className="w-8 h-8 flex items-center justify-center"
                        onClick={() => nav("/profile")}
                    >
                        <UserCircleIcon className="w-7 h-7 text-[#111827]" />
                    </button>
                </div>

                {/* Advice + streak pill */}
                <div className="mx-auto w-[345px] mt-7 flex items-center justify-between">
                    <p className="text-[13px] leading-snug max-w-[235px]">
                        One line of advice/encouragement blahblah
                    </p>

                    {/* pill: 78 x 41, radius 20, bg E0E7FF */}
                    <div className="w-[78px] h-[41px] rounded-[20px] bg-[#E0E7FF] flex items-center justify-center gap-3">
                        {/* number text box 14x25, font 25 */}
                        <span className="text-[25px] leading-none font-normal">4</span>

                        {/* flame vector: 17.92 x 25.37, fill 6366F1 */}
                        <FlameIcon className="w-[17.92px] h-[25.37px] text-[#6366F1]" />
                    </div>
                </div>

                {/* Avatar card */}
                <div className="mt-10 flex flex-col items-center">
                    {/* card: 207 x 191, radius 18, white, subtle shadow */}
                    <div className="w-[207px] h-[191px] rounded-[18px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.10)] flex items-center justify-center">
                        {/* Replace with your animal avatar later */}
                        <div className="opacity-40 text-sm">[avatar]</div>
                    </div>

                    {/* “Today…” text box: 218 x 19, size 16 */}
                    <p className="mt-6 w-[218px] h-[19px] text-[16px] italic text-[#9CA3AF] text-center leading-none">
                        “Today, I’m feeling ___”
                    </p>
                </div>

                {/* Buttons row (each button 152 x 41, radius 20) */}
                <div className="mt-8 mx-auto w-[342px] flex justify-between gap-[38px]">
                    <button
                        className="w-[152px] h-[41px] rounded-[20px] bg-[#6366F1] text-white text-[14px] leading-[16px] font-medium flex items-center justify-center text-center"
                        onClick={() => nav("/log")}
                    >
                        <span>
                            Log today’s
                            <br />
                            session
                        </span>
                    </button>

                    <button
                        className="w-[152px] h-[41px] rounded-[20px] bg-[#AAAAAA] text-[#6B7280] text-[14px] font-medium flex items-center justify-center"
                        onClick={() => nav("/log?mode=rest")}
                    >
                        Log rest day
                    </button>
                </div>

                {/* Highlights */}
                <div className="mt-12">
                    {/* title: size 25; positioned ~24px from left */}
                    <h2 className="ml-[24px] text-[25px] font-medium">
                        Highlight of the week
                    </h2>

                    {/* group: W297 H165, row gap 24 */}
                    <div className="ml-[42px] mt-8 w-[297px] space-y-[24px]">
                        <HighlightRow
                            icon={<CrownIcon className="w-7 h-7 text-[#111827]" />}
                            text="Greatest volume day — last Friday"
                        />
                        <HighlightRow
                            icon={<TrophyIcon className="w-7 h-7 text-[#111827]" />}
                            text="That PR you hit on bench"
                        />
                        <HighlightRow
                            icon={<GiftIcon className="w-7 h-7 text-[#111827]" />}
                            text="You showed up on a tough week"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function HighlightRow({ icon, text }: { icon: React.ReactNode; text: string }) {
    return (
        <div className="flex items-center gap-[8px]">
            <div className="w-[32px] flex justify-center">{icon}</div>
            <p className="text-[15px] italic text-[#B0B0B0]">“{text}”</p>
        </div>
    );
}

/* ---------- Inline SVGs (no assets needed) ---------- */

function HamburgerIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function UserCircleIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
            <path
                d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
                stroke="currentColor"
                strokeWidth="2"
            />
            <path
                d="M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                stroke="currentColor"
                strokeWidth="2"
            />
            <path
                d="M7.5 19.2c1.2-2 3-3.2 4.5-3.2s3.3 1.2 4.5 3.2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

function FlameIcon({ className }: { className?: string }) {
    // Simple flame shape; uses currentColor so it matches #6366F1
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
            <path
                d="M12 2s2 3 2 6c0 1.6-.7 2.6-1.6 3.6C11.4 12.7 11 13.5 11 15a3 3 0 0 0 6 0c0-2.3-1.2-4-2.6-5.5C13.4 8.4 12 6.7 12 2Z"
                fill="currentColor"
            />
            <path
                d="M7 13.8c0-1.6.7-2.9 1.6-4 0 2 1.2 3.2 1.2 5.2a3.2 3.2 0 0 1-6.4 0c0-2.2 1.3-4 3.6-5.5-.1 1.2 0 2.2 0 4.3Z"
                fill="currentColor"
                opacity="0.85"
            />
        </svg>
    );
}

function CrownIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
            <path
                d="M4 8l4 4 4-6 4 6 4-4v10H4V8Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
            />
            <path d="M6 18h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function TrophyIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
            <path
                d="M8 4h8v4a4 4 0 0 1-8 0V4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
            />
            <path
                d="M6 6H4v2a4 4 0 0 0 4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M18 6h2v2a4 4 0 0 1-4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path d="M12 12v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 20h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M10 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function GiftIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
            <path d="M4 10h16v10H4V10Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <path d="M12 10v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 10V7h16v3" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <path
                d="M12 7c-1.2 0-3-1.2-3-2.5S10.2 2 12 4.2C13.8 2 15 3.2 15 4.5S13.2 7 12 7Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
            />
        </svg>
    );
}
