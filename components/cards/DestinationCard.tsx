"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { useModal } from "@/components/common/ModalContext";

export interface DestinationItem {
    id: number | string;
    title: string;
    price?: string;
    packages?: string;
    description?: string;
    image: string;
    href?: string;
    variant?: string;
    isFeatured?: boolean;
}

interface DestinationCardProps {
    item: DestinationItem;
}

export default function DestinationCard({ item }: DestinationCardProps) {
    const { openModal } = useModal();

    return (
        <motion.div
            transition={{ duration: 0.25 }}
            className="relative rounded-2xl overflow-hidden shadow-md group block w-full h-[320px] sm:h-[340px] md:h-[360px] bg-gray-900 cursor-pointer"
            onClick={() => openModal({ destination: item.title })}
        >
            <div
                className="block w-full h-full relative"
                aria-label={`View details for ${item.title}`}
            >
                {/* Destination background image */}
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Subtle top vignette */}
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/25 to-transparent pointer-events-none" />

                {/* Gradient overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#02242b] via-[#033c47]/95 via-65% to-transparent pt-16 pb-3.5 px-3.5 sm:px-4 sm:pb-4 flex items-end justify-between gap-2.5 z-10">
                    <div className="min-w-0 flex-1">
                        {/* Destination title */}
                        <h3 className="text-white font-bold text-sm sm:text-[15.5px] tracking-tight group-hover:text-[#38bdf8] transition-colors truncate">
                            {item.title}
                        </h3>

                        {/* Starting price tag */}
                        <div className="flex items-center gap-1.5 text-gray-200 text-[11px] sm:text-xs font-medium mt-1">
                            <FaMapMarkerAlt className="text-[#38bdf8] text-[10px] shrink-0" />
                            <span>Starting From {item.price || "₹ 45,000"}</span>
                        </div>
                    </div>

                    {/* Spacer placeholder */}
                    <div className="w-8.5 h-8.5 sm:w-9 sm:h-9 shrink-0" />
                </div>
            </div>

            {/* Circular arrow icon */}
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    openModal({ destination: item.title });
                }}
                aria-label={`Enquire now for ${item.title}`}
                className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 z-20 w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#06b6d4] text-white flex items-center justify-center shrink-0 shadow-md shadow-sky-500/30 transition-transform duration-300 hover:scale-110 cursor-pointer"
            >
                <FaArrowRight className="text-[11px] transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
        </motion.div>
    );
}
