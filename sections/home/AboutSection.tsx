"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    ShieldCheck,
    HandCoins,
    Headset,
    Clock,
    Radio,
    ThumbsUp,
    ArrowRight,
} from "lucide-react";
import { site, type TourlyAboutData } from "@/data/index";
import { useModal } from "@/components/common/ModalContext";

const aboutIconMap: Record<string, React.ElementType> = {
    shieldCheck: ShieldCheck,
    handCoins: HandCoins,
    headset: Headset,
    clock: Clock,
    radio: Radio,
    thumbsUp: ThumbsUp,
};

interface AboutSectionProps {
    data?: TourlyAboutData;
    showButtons?: boolean;
    hideButtons?: boolean;
}

export default function AboutSection({
    data = site.about,
    showButtons = true,
    hideButtons = false,
}: AboutSectionProps) {
    const shouldShowButtons = showButtons && !hideButtons;
    const { openModal } = useModal();
    return (
        <section id="about" className="relative w-full py-8 lg:py-12 bg-white overflow-hidden scroll-mt-20">
            {/* Top-left diamond pattern */}
            <div className="absolute top-10 left-6 sm:left-14 pointer-events-none opacity-45 hidden md:block">
                <svg width="100" height="100" viewBox="0 0 100 100">
                    <g stroke="#0284c7" strokeWidth="1.8" strokeLinecap="round">
                        <line x1="45" y1="15" x2="55" y2="15" />
                        <line x1="38" y1="23" x2="62" y2="23" />
                        <line x1="30" y1="31" x2="70" y2="31" />
                        <line x1="22" y1="39" x2="78" y2="39" />
                        <line x1="14" y1="47" x2="86" y2="47" />
                        <line x1="10" y1="55" x2="90" y2="55" />
                        <line x1="14" y1="63" x2="86" y2="63" />
                        <line x1="22" y1="71" x2="78" y2="71" />
                        <line x1="30" y1="79" x2="70" y2="79" />
                        <line x1="38" y1="87" x2="62" y2="87" />
                        <line x1="45" y1="95" x2="55" y2="95" />
                    </g>
                </svg>
            </div>

            {/* Bottom-left dot matrix */}
            <div className="absolute bottom-12 left-6 sm:left-12 pointer-events-none hidden md:block">
                <div className="grid grid-cols-6 gap-2.5 opacity-45">
                    {Array.from({ length: 24 }).map((_, i) => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                    ))}
                </div>
            </div>

            {/* Right decorative circle */}
            <div className="absolute right-6 sm:right-16 lg:right-48 top-[70%] -translate-y-1/2 w-54 sm:w-54 h-54 sm:h-54 rounded-full border-[40px] sm:border-[40px] border-[#bae6fd]/40 pointer-events-none" />

            {/* Content container */}
            <div className="relative z-10 max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 text-center">
                {/* Subtitle tag */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center justify-center gap-3 text-[#0284c7] text-xs sm:text-sm font-bold tracking-widest uppercase mb-2.5"
                >
                    <span className="w-8 h-[2px] bg-[#0284c7]" />
                    <span>{data.subtitle}</span>
                    <span className="w-8 h-[2px] bg-[#0284c7]" />
                </motion.div>

                {/* Main Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.1 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0f1d33] tracking-tight mb-2"
                >
                    {data.title}
                </motion.h2>

                {/* Lead bold summary */}
                <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="font-bold text-[#13253f] text-base sm:text-lg leading-snug sm:leading-relaxed max-w-4xl mx-auto mb-2"
                >
                    {data.lead}
                </motion.p>

                {/* Body paragraph */}
                <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-gray-600 text-sm sm:text-[15px] leading-relaxed max-w-4xl mx-auto mb-4"
                >
                    {data.description}
                </motion.p>

                {/* Features 6-grid */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.25 }}
                    className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-8 max-w-3xl mx-auto text-left mb-8"
                >
                    {data.features.map((item) => {
                        const Icon = aboutIconMap[item.icon] || ShieldCheck;
                        return (
                            <div
                                key={item.title}
                                className="flex items-center gap-3.5 group"
                            >
                                <div className="text-[#0284c7] shrink-0 transition-transform duration-200 group-hover:scale-110">
                                    <Icon className="w-6 h-6 stroke-[2]" />
                                </div>
                                <span className="font-bold text-[#13253f] text-sm sm:text-[15px] tracking-tight">
                                    {item.title}
                                </span>
                            </div>
                        );
                    })}
                </motion.div>

                {/* CTA Buttons */}
                {shouldShowButtons && (
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
                    >
                        {/* Contact Us button */}
                        <motion.div
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            <button
                                type="button"
                                onClick={() => openModal()}
                                className="group flex items-center gap-4 pl-7 pr-2.5 py-2.5 rounded-full bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#06b6d4] text-white font-medium text-sm sm:text-base shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-200 cursor-pointer"
                            >
                                <span>{data.contactButton.text}</span>
                                <div className="w-8 h-8 rounded-full bg-white text-[#0284c7] flex items-center justify-center shrink-0 shadow-sm transition-transform duration-200 group-hover:translate-x-0.5">
                                    <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                                </div>
                            </button>
                        </motion.div>

                        {/* Read More button */}
                        <motion.div
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            <button
                                type="button"
                                onClick={() => openModal()}
                                className="group flex items-center gap-4 pl-7 pr-2.5 py-2 rounded-full border-2 border-[#0284c7] text-[#13253f] hover:bg-sky-50/60 font-medium text-sm sm:text-base transition-all duration-200 cursor-pointer"
                            >
                                <span>{data.readMoreButton.text}</span>
                                <div className="w-8 h-8 rounded-full border border-[#0284c7] text-[#0284c7] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
                                    <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                                </div>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
