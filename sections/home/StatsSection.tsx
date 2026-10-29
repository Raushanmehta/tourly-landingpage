"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import {
    TrendingUp,
    Users,
    Award,
    CalendarCheck,
    X,
} from "lucide-react";
import { site, type TourlyStatsData } from "@/data/index";

const statsIconMap: Record<string, React.ElementType> = {
    trendingUp: TrendingUp,
    users: Users,
    award: Award,
    calendarCheck: CalendarCheck,
};

interface CounterProps {
    value: number;
    suffix?: string;
    duration?: number;
}

function Counter({ value, suffix = "", duration = 2 }: CounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });

    useEffect(() => {
        if (!inView) return;

        let startTime: number | null = null;
        let animationFrameId: number;

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * value));

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(step);
            } else {
                setCount(value);
            }
        };

        animationFrameId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animationFrameId);
    }, [inView, value, duration]);

    return (
        <span ref={ref} className="inline-block tabular-nums">
            {count.toLocaleString()}
            {suffix}
        </span>
    );
}

interface StatsSectionProps {
    data?: TourlyStatsData;
}

export default function StatsSection({ data = site.stats }: StatsSectionProps) {
    const [videoOpen, setVideoOpen] = useState(false);
    const stat1 = data.stats[0] || { target: 20, suffix: "K+", label: "Tours Success", icon: "trendingUp" };
    const stat2 = data.stats[1] || { target: 3700, suffix: "+", label: "Happy Traveler", icon: "users" };
    const stat3 = data.stats[2] || { target: 4461, suffix: "+", label: "Awards Winning", icon: "award" };
    const stat4 = data.stats[3] || { target: 22, suffix: "+", label: "Our Experience", icon: "calendarCheck" };

    const Icon1 = statsIconMap[stat1.icon] || TrendingUp;
    const Icon2 = statsIconMap[stat2.icon] || Users;
    const Icon3 = statsIconMap[stat3.icon] || Award;
    const Icon4 = statsIconMap[stat4.icon] || CalendarCheck;

    return (
        <section id="stats" className="relative w-full min-h-[420px] sm:min-h-[460px] lg:min-h-[500px] flex items-center overflow-hidden py-8 lg:py-12">
            {/* Background panoramic photography */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={data.bgImage}
                    alt="Tropical bay panorama"
                    fill
                    className="object-cover object-center brightness-[0.98]"
                    priority={false}
                />
                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/15 to-transparent pointer-events-none" />
            </div>

            <div className="relative z-10 max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 w-full">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
                    {/* Video play area */}
                    <div className="flex items-center gap-4 sm:gap-6 self-center lg:self-center pl-2 sm:pl-6">
                        {/* Playful curved indicator */}
                        <div className="flex flex-col items-end text-white drop-shadow-md select-none">
                            <span className="font-bold text-sm sm:text-base leading-tight text-right">
                                Watch Our <br />
                                Travel Video
                            </span>
                            {/* Curved ocean cyan arrow */}
                            <svg
                                width="46"
                                height="28"
                                viewBox="0 0 50 30"
                                fill="none"
                                className="text-[#38bdf8] mt-1 -rotate-3"
                            >
                                <path
                                    d="M6 8C18 4 34 8 44 22"
                                    stroke="#38bdf8"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M38 23L44 22L44 16"
                                    stroke="#38bdf8"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        {/* Pulsing play button */}
                        <div className="relative flex items-center justify-center">
                            {/* Outer pulsing ripple */}
                            <div className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-white/20 bg-white/10 animate-ping pointer-events-none" />

                            {/* Outer ripple ring */}
                            <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-white/30 bg-white/15 pointer-events-none" />

                            {/* Main play trigger */}
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.12 }}
                                whileTap={{ scale: 0.94 }}
                                onClick={() => setVideoOpen(true)}
                                aria-label="Watch Travel Video"
                                className="relative z-10 w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#06b6d4] text-white flex items-center justify-center shadow-2xl shadow-sky-500/50 cursor-pointer transition-all"
                            >
                                <FaPlay className="text-2xl sm:text-3xl ml-1 sm:ml-1.5 text-white drop-shadow-sm" />
                            </motion.button>
                        </div>
                    </div>

                    {/* Floating stats card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55 }}
                        className="w-full max-w-lg lg:max-w-xl bg-white rounded-3xl shadow-2xl p-6 sm:p-9 md:p-10 border border-gray-100"
                    >
                        {/* Stats grid */}
                        <div className="grid grid-cols-2 divide-x divide-gray-100">
                            {/* Left column */}
                            <div className="divide-y divide-gray-100 px-3 sm:px-6">
                                {/* Tours stat */}
                                <div className="pb-6 sm:pb-7 flex flex-col items-center text-center">
                                    <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#e0f2fe]/75 text-[#054553] flex items-center justify-center mb-3 shadow-xs mx-auto">
                                        <Icon1 className="w-6 h-6 stroke-[2.2]" />
                                    </div>
                                    <h3 className="font-extrabold text-[#0f1d33] text-2xl sm:text-3xl lg:text-[34px] tracking-tight leading-none">
                                        <Counter value={stat1.target} suffix={stat1.suffix} />
                                    </h3>
                                    <p className="text-gray-500 text-xs sm:text-sm font-medium mt-1.5">
                                        {stat1.label}
                                    </p>
                                </div>

                                {/* Awards stat */}
                                <div className="pt-6 sm:pt-7 flex flex-col items-center text-center">
                                    <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#e0f2fe]/75 text-[#054553] flex items-center justify-center mb-3 shadow-xs mx-auto">
                                        <Icon3 className="w-6 h-6 stroke-[2.2]" />
                                    </div>
                                    <h3 className="font-extrabold text-[#0f1d33] text-2xl sm:text-3xl lg:text-[34px] tracking-tight leading-none">
                                        <Counter value={stat3.target} suffix={stat3.suffix} />
                                    </h3>
                                    <p className="text-gray-500 text-xs sm:text-sm font-medium mt-1.5">
                                        {stat3.label}
                                    </p>
                                </div>
                            </div>

                            {/* Right column */}
                            <div className="divide-y divide-gray-100 px-3 sm:px-6">
                                {/* Travelers stat */}
                                <div className="pb-6 sm:pb-7 flex flex-col items-center text-center">
                                    <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#e0f2fe]/75 text-[#054553] flex items-center justify-center mb-3 shadow-xs mx-auto">
                                        <Icon2 className="w-6 h-6 stroke-[2.2]" />
                                    </div>
                                    <h3 className="font-extrabold text-[#0f1d33] text-2xl sm:text-3xl lg:text-[34px] tracking-tight leading-none">
                                        <Counter value={stat2.target} suffix={stat2.suffix} />
                                    </h3>
                                    <p className="text-gray-500 text-xs sm:text-sm font-medium mt-1.5">
                                        {stat2.label}
                                    </p>
                                </div>

                                {/* Experience stat */}
                                <div className="pt-6 sm:pt-7 flex flex-col items-center text-center">
                                    <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#e0f2fe]/75 text-[#054553] flex items-center justify-center mb-3 shadow-xs mx-auto">
                                        <Icon4 className="w-6 h-6 stroke-[2.2]" />
                                    </div>
                                    <h3 className="font-extrabold text-[#0f1d33] text-2xl sm:text-3xl lg:text-[34px] tracking-tight leading-none">
                                        <Counter value={stat4.target} suffix={stat4.suffix} />
                                    </h3>
                                    <p className="text-gray-500 text-xs sm:text-sm font-medium mt-1.5">
                                        {stat4.label}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Video Modal Lightbox */}
            <AnimatePresence>
                {videoOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setVideoOpen(false)}
                        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                        >
                            {/* Close modal button */}
                            <button
                                type="button"
                                onClick={() => setVideoOpen(false)}
                                aria-label="Close video"
                                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Video iframe player */}
                            <iframe
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                                title="Travel Showcase Video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full border-0"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
