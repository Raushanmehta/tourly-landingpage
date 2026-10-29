"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaFacebookF,
    FaInstagram,
    FaYoutube,
    FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { site, type TourlyTopbarData } from "@/data/index";

const iconMap: Record<string, React.ElementType> = {
    facebook: FaFacebookF,
    twitter: FaXTwitter,
    instagram: FaInstagram,
    youtube: FaYoutube,
    linkedin: FaLinkedinIn,
};

interface TopbarProps {
    data?: TourlyTopbarData;
}

export default function Topbar({ data = site.topbar }: TopbarProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="hidden md:block w-full bg-[#032830] text-white text-xs sm:text-[13px] font-sans border-b border-cyan-900/40 shadow-xs"
        >
            <div className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-2.5 flex items-center justify-between gap-4">
                {/* Left contact info */}
                <div className="flex items-center flex-wrap gap-x-4 sm:gap-x-6 gap-y-1.5 text-gray-200">
                    {/* Phone link */}
                    <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={data.phoneHref}
                        className="group flex items-center gap-2 hover:text-[#38bdf8] transition-colors"
                        aria-label={`Call ${data.phone}`}
                    >
                        <span className="w-5 h-5 rounded-full bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-[#38bdf8] group-hover:bg-[#0284c7] group-hover:text-white transition-all">
                            <FaPhoneAlt className="text-[10px] shrink-0" />
                        </span>
                        <span className="font-normal tracking-wide">{data.phone}</span>
                    </motion.a>

                    {/* Divider */}
                    <span className="text-cyan-500/30 select-none">|</span>

                    {/* Email link */}
                    <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={data.emailHref}
                        className="group flex items-center gap-2 hover:text-[#38bdf8] transition-colors"
                        aria-label={`Email ${data.email}`}
                    >
                        <span className="w-5 h-5 rounded-full bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-[#38bdf8] group-hover:bg-[#0284c7] group-hover:text-white transition-all">
                            <FaEnvelope className="text-[10px] shrink-0" />
                        </span>
                        <span className="font-normal tracking-wide">{data.email}</span>
                    </motion.a>

                    {/* Divider */}
                    <span className="hidden md:inline text-cyan-500/30 select-none">|</span>

                    {/* Address line */}
                    <div className="hidden md:flex items-center gap-2 text-gray-200">
                        <span className="w-5 h-5 rounded-full bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-[#38bdf8]">
                            <FaMapMarkerAlt className="text-[10px] shrink-0" />
                        </span>
                        <span className="font-normal tracking-wide">{data.address}</span>
                    </div>
                </div>

                {/* Right social links */}
                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                    <span className="text-cyan-500/30 select-none">|</span>

                    {/* Social icons */}
                    <div className="flex items-center gap-2">
                        {data.socialLinks.map((item) => {
                            const IconComponent = iconMap[item.icon] || FaFacebookF;
                            return (
                                <motion.div
                                    key={item.name}
                                    whileHover={{ scale: 1.12, y: -1 }}
                                    whileTap={{ scale: 0.92 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                >
                                    <Link
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={item.name}
                                        className="w-7 h-7 rounded-full border border-cyan-500/30 bg-cyan-950/50 text-cyan-200 hover:text-white hover:bg-gradient-to-r hover:from-[#0284c7] hover:to-[#06b6d4] hover:border-transparent hover:shadow-[0_0_12px_rgba(14,165,233,0.4)] flex items-center justify-center transition-all duration-200"
                                    >
                                        <IconComponent className="text-[11px]" />
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}