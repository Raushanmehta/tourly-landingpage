"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaQuestion } from "react-icons/fa";
import { site, type TourlyFaqData, type FaqItem } from "@/data/index";

interface FaqsSectionProps {
    data?: TourlyFaqData;
}

export default function FaqsSection({ data: propData }: FaqsSectionProps = {}) {
    const data = propData ?? site.faq;
    const faqsList: FaqItem[] = data?.faqsList ?? data?.leftFaqs ?? [];
    const [openId, setOpenId] = useState<number | null>(1);

    const toggleFaq = (id: number) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    const renderCard = (faq: FaqItem) => {
        const isOpen = openId === faq.id;

        return (
            <motion.div
                key={faq.id}

                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                    ? "bg-white border-[#0284c7]/40 shadow-lg shadow-sky-500/10 ring-1 ring-[#0284c7]/20"
                    : "bg-white border-gray-100 shadow-xs hover:border-gray-200 hover:shadow-md"
                    }`}
            >
                {/* Question header button */}
                <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer select-none transition-colors"
                    aria-expanded={isOpen}
                >
                    <div className="flex items-center gap-3.5 sm:gap-4 flex-1">
                        {/* Question badge */}
                        <div
                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen
                                ? "bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#06b6d4] text-white shadow-md shadow-sky-500/25"
                                : "bg-sky-50 text-[#0284c7] border border-sky-100"
                                }`}
                        >
                            <FaQuestion className="text-xs sm:text-sm" />
                        </div>

                        {/* Question text */}
                        <span
                            className={`font-bold text-sm sm:text-[15px] md:text-base leading-snug transition-colors ${isOpen ? "text-[#0284c7]" : "text-[#0f1d33]"
                                }`}
                        >
                            {faq.question}
                        </span>
                    </div>

                    {/* Chevron toggle icon */}
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen
                            ? "bg-sky-50 text-[#0284c7] rotate-180"
                            : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                            }`}
                    >
                        <FaChevronDown className="w-3 h-3 transition-transform" />
                    </div>
                </button>

                {/* Animated Answer Body */}
                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <div className="px-5 pb-5 pt-0 pl-16 sm:pl-19">
                                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-normal">
                                    {faq.answer}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        );
    };

    return (
        <section
            id="faqs"
            className="relative w-full py-12 lg:py-16 bg-gradient-to-b from-white via-[#f8fbfe] to-[#f4f9fd] overflow-hidden scroll-mt-20"
        >
            {/* Subtle background radial dot pattern */}
            <div className="absolute right-0 top-0 w-80 sm:w-96 h-80 sm:h-96 pointer-events-none opacity-[0.05] bg-[radial-gradient(#054553_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute left-0 bottom-0 w-80 sm:w-96 h-80 sm:h-96 pointer-events-none opacity-[0.05] bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
                {/* Section title header */}
                <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
                    {/* Badge pill */}
                    <div className="flex items-center justify-center gap-2 text-[#0284c7] font-bold text-xs sm:text-sm tracking-widest uppercase mb-2.5 select-none">
                        <span className="w-6 sm:w-8 h-[2px] bg-[#0284c7]" />
                        <span>{data?.subtitle}</span>
                        <span className="w-6 sm:w-8 h-[2px] bg-[#0284c7]" />
                    </div>

                    {/* Main heading */}
                    <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#0f1d33] tracking-tight leading-tight">
                        {data?.titlePrefix}
                        <span className="text-[#0284c7]">{data?.titleHighlight}</span>
                    </h2>

                    {/* Subtitle description */}
                    <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto mt-3 leading-relaxed font-normal">
                        {data?.description}
                    </p>
                </div>

                {/* FAQ list */}
                <div className="grid grid-cols-1 gap-4 sm:gap-5 items-start">
                    <div className="flex flex-col gap-4">
                        {faqsList.map((faq) => renderCard(faq))}
                    </div>
                </div>
            </div>
        </section>
    );
}
