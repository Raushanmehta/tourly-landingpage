"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import DestinationCard from "@/components/cards/DestinationCard";
import { site, type TourlyDestinationsData } from "@/data/index";

interface DestinationSectionProps {
    data?: TourlyDestinationsData;
}

export default function DestinationSection({ data = site.destinations }: DestinationSectionProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [hoveredId, setHoveredId] = useState<number | string | null>(null);

    const handleScroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;
        const offset = 275;
        scrollRef.current.scrollBy({
            left: direction === "left" ? -offset : offset,
            behavior: "smooth",
        });
    };

    return (
        <section id="destinations" className="relative w-full py-8 lg:py-12 bg-[#F6FBFE] overflow-hidden scroll-mt-20">
            {/* World map watermark */}
            <div className="absolute right-0 top-0 w-80 sm:w-96 h-80 sm:h-96 pointer-events-none opacity-[0.06] bg-[radial-gradient(#054553_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
                {/* Header Section */}
                <div className="relative mb-4 sm:mb-6">
                    {/* Centered header content */}
                    <div className="text-center max-w-3xl mx-auto px-2">
                        {/* Subtitle tag */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                            className="inline-flex items-center justify-center gap-3 text-[#0284c7] text-xs sm:text-sm font-bold tracking-widest uppercase mb-2"
                        >
                            <span className="w-8 h-[2px] bg-[#0284c7]" />
                            <span>{data.subtitle}</span>
                            <span className="w-8 h-[2px] bg-[#0284c7]" />
                        </motion.div>

                        {/* Main title */}
                        <motion.h2
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: 0.1 }}
                            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0f1d33] leading-tight text-center"
                        >
                            {data.titlePrefix}
                            <span className="text-[#0284c7]">{data.titleHighlight}</span>
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            className="text-gray-600 text-sm sm:text-[15.5px] leading-relaxed mt-2 max-w-2xl mx-auto text-center"
                        >
                            {data.description}
                        </motion.p>
                    </div>
                </div>

                {/* Expanding cards */}
                <div className="relative group">
                    {/* Left arrow */}
                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => handleScroll("left")}
                        aria-label="Previous destination"
                        className="absolute left-1 sm:left-2 md:-left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-gradient-to-r hover:from-[#0284c7] hover:to-[#06b6d4] text-gray-800 hover:text-white shadow-xl hover:shadow-sky-500/30 border border-gray-100/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 cursor-pointer pointer-events-none group-hover:pointer-events-auto"
                    >
                        <FaChevronLeft className="text-sm sm:text-base pr-0.5" />
                    </motion.button>

                    {/* Right arrow */}
                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => handleScroll("right")}
                        aria-label="Next destination"
                        className="absolute right-1 sm:right-2 md:-right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-gradient-to-r hover:from-[#0284c7] hover:to-[#06b6d4] text-gray-800 hover:text-white shadow-xl hover:shadow-sky-500/30 border border-gray-100/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 cursor-pointer pointer-events-none group-hover:pointer-events-auto"
                    >
                        <FaChevronRight className="text-sm sm:text-base pl-0.5" />
                    </motion.button>

                    {/* Cards row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55 }}
                        ref={scrollRef}
                        className="flex items-stretch gap-3.5 sm:gap-4 overflow-x-auto pb-4 pt-1 pr-6 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {(data.destinationsList || []).map((item) => {
                            const isHovered = hoveredId === item.id;
                            return (
                                <div
                                    key={item.id}
                                    onMouseEnter={() => setHoveredId(item.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    className={`shrink-0 transition-all duration-500 ease-out ${isHovered
                                        ? "w-[330px] sm:w-[350px] md:w-[360px]"
                                        : hoveredId !== null
                                            ? "w-[210px] sm:w-[220px] md:w-[225px]"
                                            : "w-[235px] sm:w-[245px] md:w-[255px]"
                                        }`}
                                >
                                    <DestinationCard item={item} />
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
