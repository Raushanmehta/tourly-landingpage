"use client";

import React from "react";
import Image from "next/image";
import { FaStar, FaMapMarkerAlt, FaQuoteRight } from "react-icons/fa";
import { motion } from "framer-motion";

export interface Testimonial {
    id: number;
    name: string;
    location: string;
    rating: number;
    text: string;
    avatar: string;
}

interface TestimonialCardProps {
    testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
    return (
        <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full bg-white rounded-xl lg:px-10 lg:py-6 px-4 py-3 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between"
        >
            <div>
                {/* Header with avatar */}
                <div className="flex items-center justify-between mb-2">
                    {/* User avatar circle */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-sky-200/70 p-0.5 shadow-xs">
                        <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill
                            className="object-cover rounded-full"
                        />
                    </div>

                    {/* Cyan quote icon */}
                    <div className="text-sky-200">
                        <FaQuoteRight className="text-4xl sm:text-6xl opacity-80" />
                    </div>
                </div>

                {/* Rating star row */}
                <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <FaStar
                            key={i}
                            className="w-4 h-4 text-[#f59e0b] fill-[#f59e0b]"
                        />
                    ))}
                </div>

                {/* Testimonial message text */}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-4 font-normal">
                    {testimonial.text}
                </p>
            </div>

            {/* Author details */}
            <div className=" pt-2">
                <h3 className="font-bold text-[#0f1d33] text-base sm:text-lg">
                    {testimonial.name}
                </h3>
                <div className="flex items-center gap-1.5 text-gray-500 text-xs sm:text-sm font-medium mt-1">
                    <FaMapMarkerAlt className="text-[#0284c7] w-3.5 h-3.5 shrink-0" />
                    <span>{testimonial.location}</span>
                </div>
            </div>
        </motion.div>
    );
}
