"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    ShieldCheck,
    Coins,
    Compass,
    Headset,
    ArrowRight,
} from "lucide-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { site, type TourlyWhyChooseUsData } from "@/data/index";
import { useModal } from "@/components/common/ModalContext";

const whyUsIconMap: Record<string, React.ElementType> = {
    shieldCheck: ShieldCheck,
    coins: Coins,
    compass: Compass,
    headset: Headset,
};

interface WhyChooseUsSectionProps {
    data?: TourlyWhyChooseUsData;
}

export default function WhyChooseUsSection({ data = site.whyChooseUs }: WhyChooseUsSectionProps) {
    const { openModal } = useModal();
    return (
        <section id="why-choose-us" className="relative w-full py-8 lg:py-12 bg-white overflow-hidden scroll-mt-20">
            {/* World map */}
            <div className="absolute right-0 top-0 w-80 sm:w-96 h-80 sm:h-96 pointer-events-none opacity-[0.06] bg-[radial-gradient(#054553_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Location pin */}
            <FaMapMarkerAlt className="absolute top-12 right-12 sm:right-24 text-4xl sm:text-5xl text-[#38bdf8]/20 pointer-events-none hidden md:block" />

            {/* Bottom-left dot matrix */}
            <div className="absolute bottom-10 left-6 sm:left-12 pointer-events-none hidden md:block">
                <div className="grid grid-cols-6 gap-2.5 opacity-40">
                    {Array.from({ length: 24 }).map((_, i) => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                    ))}
                </div>
            </div>

            <div className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
                    {/* Left image collage */}
                    <div className="lg:col-span-6 relative">
                        {/* Cyan/Ocean accent shape */}
                        <div className="absolute -top-4 -left-4 w-28 h-28 bg-gradient-to-br from-[#0284c7] to-[#0ea5e9] rounded-2xl pointer-events-none -z-0" />

                        {/* Cyan shape */}
                        <div className="absolute top-1/2 -left-6 -translate-y-1/2 w-72 h-80 bg-[#e0f2fe]/60 rounded-3xl pointer-events-none -z-0" />

                        {/* Asymmetric 3-image collage */}
                        <div className="relative z-10 grid grid-cols-12 gap-3 sm:gap-4 items-center">
                            {/* Main vertical image */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.55 }}
                                className="col-span-6 relative h-[380px] sm:h-[450px] md:h-[480px] rounded-2xl overflow-hidden shadow-xl border-[5px] border-white group"
                            >
                                <Image
                                    src={data.images.main}
                                    alt="Thailand viewpoint"
                                    fill
                                    className="object-cover object-center transition-transform duration-700 group-hover:scale-108"
                                />
                            </motion.div>

                            {/* Landscape images */}
                            <div className="col-span-6 flex flex-col gap-3 sm:gap-4">
                                {/* Top landscape image */}
                                <motion.div
                                    initial={{ opacity: 0, y: -18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.55, delay: 0.1 }}
                                    className="relative h-[180px] sm:h-[215px] md:h-[230px] rounded-2xl overflow-hidden shadow-xl group"
                                >
                                    <Image
                                        src={data.images.topRight}
                                        alt="Maldives traveler"
                                        fill
                                        className="object-cover object-center transition-transform duration-700 group-hover:scale-108"
                                    />
                                </motion.div>

                                {/* Bottom landscape image */}
                                <motion.div
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.55, delay: 0.2 }}
                                    className="relative h-[180px] sm:h-[215px] md:h-[230px] rounded-2xl overflow-hidden shadow-xl group"
                                >
                                    <Image
                                        src={data.images.bottomRight}
                                        alt="Mount Fuji Japan traveler"
                                        fill
                                        className="object-cover object-center transition-transform duration-700 group-hover:scale-108"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Right content column */}
                    <div className="lg:col-span-6 flex flex-col items-start">
                        {/* Subtitle tag */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                            className="inline-flex items-center gap-3 text-[#0284c7] text-xs sm:text-sm font-bold tracking-widest uppercase mb-2"
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
                            className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#0f1d33] leading-[1.2]"
                        >
                            {data.title}
                        </motion.h2>

                        {/* Description paragraph */}
                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            className="text-gray-600 text-sm sm:text-[15px] leading-relaxed mt-4 mb-4"
                        >
                            {data.description}
                        </motion.p>

                        {/* Feature cards */}
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55, delay: 0.2 }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6 w-full"
                        >
                            {data.features.map((item) => {
                                const Icon = whyUsIconMap[item.icon] || ShieldCheck;
                                return (
                                    <div
                                        key={item.title}
                                        className="flex items-start gap-3.5 group"
                                    >
                                        {/* Circular icon badge */}
                                        <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#e0f2fe]/75 text-[#054553] flex items-center justify-center shrink-0 border border-[#bae6fd]/50 transition-all duration-300 group-hover:scale-105 group-hover:bg-gradient-to-r group-hover:from-[#0284c7] group-hover:to-[#0ea5e9] group-hover:text-white shadow-xs">
                                            <Icon className="w-6 h-6 stroke-[2]" />
                                        </div>

                                        {/* Texts */}
                                        <div className="min-w-0">
                                            <h3 className="font-bold text-[#0f1d33] text-sm sm:text-[15px] tracking-tight">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-500 text-xs sm:text-[12.5px] leading-relaxed mt-1">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>

                        {/* Action button */}
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="mt-8"
                        >
                            <button
                                type="button"
                                onClick={() => openModal()}
                                className="group inline-flex items-center gap-4 pl-7 pr-2.5 py-2.5 rounded-full bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#06b6d4] text-white font-medium text-sm sm:text-base shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-200 cursor-pointer"
                            >
                                <span>{data.ctaButton.text}</span>
                                <div className="w-8 h-8 rounded-full bg-white text-[#0284c7] flex items-center justify-center shrink-0 shadow-sm transition-transform duration-200 group-hover:translate-x-0.5">
                                    <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                                </div>
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
