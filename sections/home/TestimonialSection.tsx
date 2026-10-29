"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import TestimonialCard from "@/components/cards/TestimonialCard";
import { site, type TourlyTestimonialsData } from "@/data/index";

interface TestimonialSectionProps {
    data?: TourlyTestimonialsData;
}

export default function TestimonialSection({ data = site.testimonials }: TestimonialSectionProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    const onSelect = useCallback(() => {
        if (!api) return;
        setCurrent(api.selectedScrollSnap());
    }, [api]);

    useEffect(() => {
        if (!api) return;
        const frameId = requestAnimationFrame(() => {
            onSelect();
        });
        api.on("select", onSelect);
        api.on("reInit", onSelect);

        return () => {
            cancelAnimationFrame(frameId);
            api.off("select", onSelect);
            api.off("reInit", onSelect);
        };
    }, [api, onSelect]);

    return (
        <section id="testimonials" className="relative w-full py-8 lg:py-12 bg-gradient-to-b from-[#F6FBFE] via-white to-[#f4f9fd] overflow-hidden scroll-mt-20">
            {/* Ambient wave background */}
            <div className="absolute inset-0 pointer-events-none opacity-45">
                <svg
                    className="w-full h-full"
                    viewBox="0 0 1440 800"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M-100 200 C300 120 700 350 1540 180"
                        stroke="#38bdf8"
                        strokeWidth="1.2"
                        strokeDasharray="4 6"
                        opacity="0.3"
                    />
                    <path
                        d="M-100 260 C400 180 800 420 1540 240"
                        stroke="#0284c7"
                        strokeWidth="1"
                        opacity="0.2"
                    />
                    <path
                        d="M-100 620 C350 520 850 720 1540 560"
                        stroke="#0284c7"
                        strokeWidth="1.2"
                        opacity="0.2"
                    />
                </svg>
            </div>

            <div className="relative z-10 max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
                {/* Header text container */}
                <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6">
                    {/* Badge pill */}
                    <div className="flex items-center justify-center gap-2 text-[#0284c7] font-bold text-xs sm:text-sm tracking-widest uppercase mb-2 select-none">
                        <span className="w-6 sm:w-8 h-[2px] bg-[#0284c7]" />
                        <span>{data.subtitle}</span>
                        <span className="w-6 sm:w-8 h-[2px] bg-[#0284c7]" />
                    </div>

                    {/* Main section title */}
                    <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#0f1d33] tracking-tight">
                        {data.titlePrefix}
                        <span className="text-[#0284c7]">{data.titleHighlight}</span>
                    </h2>

                    {/* Header description subtitle */}
                    <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto mt-2 leading-relaxed font-normal">
                        {data.description}
                    </p>
                </div>

                {/* Testimonials carousel */}
                <div className="relative w-full group">
                    <Carousel
                        setApi={setApi}
                        opts={{
                            loop: true,
                            align: "start",
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4 sm:-ml-6">
                            {data.items.map((item) => (
                                <CarouselItem
                                    key={item.id}
                                    className="pl-4 sm:pl-6 basis-full md:basis-1/2 lg:basis-1/3"
                                >
                                    <div className="h-full py-2">
                                        <TestimonialCard testimonial={item} />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>

                    {/* Left arrow */}
                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => api?.scrollPrev()}
                        aria-label="Previous testimonial"
                        className="absolute left-1 sm:left-2 md:-left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-gradient-to-r hover:from-[#0284c7] hover:to-[#06b6d4] text-gray-800 hover:text-white shadow-xl hover:shadow-sky-500/30 border border-gray-100/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 cursor-pointer pointer-events-none group-hover:pointer-events-auto"
                    >
                        <FaChevronLeft className="text-sm sm:text-base pr-0.5" />
                    </motion.button>

                    {/* Right arrow */}
                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => api?.scrollNext()}
                        aria-label="Next testimonial"
                        className="absolute right-1 sm:right-2 md:-right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-gradient-to-r hover:from-[#0284c7] hover:to-[#06b6d4] text-gray-800 hover:text-white shadow-xl hover:shadow-sky-500/30 border border-gray-100/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 cursor-pointer pointer-events-none group-hover:pointer-events-auto"
                    >
                        <FaChevronRight className="text-sm sm:text-base pl-0.5" />
                    </motion.button>

                    {/* Bottom navigation dots */}
                    <div className="flex items-center justify-center gap-2 mt-5 select-none">
                        {data.items.map((item, idx) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => api?.scrollTo(idx)}
                                aria-label={`Go to testimonial ${idx + 1}`}
                                className={`transition-all duration-300 cursor-pointer ${current === idx
                                    ? "w-3.5 h-3.5 rounded-full bg-[#0284c7] shadow-sm"
                                    : "w-2.5 h-2.5 rounded-full bg-[#bae6fd] hover:bg-sky-300"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
