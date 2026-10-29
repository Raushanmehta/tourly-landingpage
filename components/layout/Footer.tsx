"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaFacebookF,
    FaInstagram,
    FaYoutube,
    FaLinkedinIn,
    FaChevronRight,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { site, type TourlyFooterData } from "@/data/index";

const iconMap: Record<string, React.ElementType> = {
    facebook: FaFacebookF,
    instagram: FaInstagram,
    youtube: FaYoutube,
    linkedin: FaLinkedinIn,
    twitter: FaXTwitter,
};

interface FooterProps {
    data?: TourlyFooterData;
}

export default function Footer({ data = site.footer }: FooterProps) {
    return (
        <footer className="relative w-full bg-[#033c47] text-white overflow-hidden">
            {/* Silhouette landmark background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                <Image
                    src={data.bgImage}
                    alt="World landmarks"
                    fill
                    className="object-cover object-bottom"
                    priority={false}
                />
            </div>

            {/* Main footer container */}
            <div className="relative z-10 max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-14 sm:pt-16 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-0">
                    {/* Brand column */}
                    <div className="lg:col-span-4 lg:pr-8 lg:border-r lg:border-white/10 flex flex-col justify-between">
                        <div>
                            {/* Logo link */}
                            <Link href="/" className="inline-block mb-5">
                                <Image
                                    src={data.logo.src}
                                    alt={data.logo.alt}
                                    width={data.logo.width}
                                    height={data.logo.height}
                                    className="h-15 sm:h-17 w-auto object-contain"
                                />
                            </Link>

                            {/* About paragraph */}
                            <p className="text-gray-300 text-sm sm:text-[14.5px] leading-relaxed max-w-sm mb-7">
                                {data.description}
                            </p>
                        </div>

                        {/* Social icons */}
                        <div className="flex items-center gap-3 pt-2">
                            {data.socialLinks.map((item) => {
                                const IconComponent = iconMap[item.icon] || FaFacebookF;
                                return (
                                    <motion.div
                                        key={item.name}
                                        whileHover={{ scale: 1.15, y: -2 }}
                                        whileTap={{ scale: 0.92 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 18 }}
                                    >
                                        <Link
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={item.name}
                                            className="w-9 h-9 rounded-full border border-[#0284c7] text-white hover:bg-[#0284c7] hover:text-white flex items-center justify-center transition-colors duration-200"
                                        >
                                            <IconComponent className="text-sm" />
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick links column */}
                    <div className="lg:col-span-2 lg:px-6 lg:border-r lg:border-white/10">
                        {/* Column title */}
                        <h3 className="font-semibold text-lg text-white tracking-wide">
                            {data.quickLinksTitle}
                        </h3>
                        <div className="h-[2.5px] w-8 bg-[#0284c7] rounded-full mt-2 mb-6" />

                        {/* Links list */}
                        <ul className="space-y-3 text-sm">
                            {data.quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="group inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                                    >
                                        <FaChevronRight className="text-[10px] text-[#38bdf8] shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                                        <span>{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Popular destinations column */}
                    <div className="lg:col-span-3 lg:px-6 lg:border-r lg:border-white/10">
                        {/* Column title */}
                        <h3 className="font-semibold text-lg text-white tracking-wide">
                            {data.destinationsTitle}
                        </h3>
                        <div className="h-[2.5px] w-8 bg-[#0284c7] rounded-full mt-2 mb-6" />

                        {/* Links list */}
                        <ul className="space-y-3 text-sm">
                            {data.destinationLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="group inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                                    >
                                        <FaChevronRight className="text-[10px] text-[#38bdf8] shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                                        <span>{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact information column */}
                    <div className="lg:col-span-3 lg:pl-8">
                        {/* Column title */}
                        <h3 className="font-semibold text-lg text-white tracking-wide">
                            {data.contactTitle}
                        </h3>
                        <div className="h-[2.5px] w-8 bg-[#0284c7] rounded-full mt-2 mb-6" />

                        <div className="space-y-5">
                            {/* Phone info */}
                            <div className="flex items-start gap-3.5">
                                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#0284c7] to-[#0ea5e9] text-white flex items-center justify-center shrink-0 shadow-md">
                                    <FaPhoneAlt className="text-sm" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white">Phone</p>
                                    <a
                                        href={data.phoneHref}
                                        className="text-sm text-gray-300 hover:text-white transition-colors block mt-0.5"
                                    >
                                        {data.phone}
                                    </a>
                                </div>
                            </div>

                            {/* Email info */}
                            <div className="flex items-start gap-3.5">
                                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#0284c7] to-[#0ea5e9] text-white flex items-center justify-center shrink-0 shadow-md">
                                    <FaEnvelope className="text-sm" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white">Email</p>
                                    <a
                                        href={data.emailHref}
                                        className="text-sm text-gray-300 hover:text-white transition-colors block mt-0.5"
                                    >
                                        {data.email}
                                    </a>
                                </div>
                            </div>

                            {/* Address info */}
                            <div className="flex items-start gap-3.5">
                                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#0284c7] to-[#0ea5e9] text-white flex items-center justify-center shrink-0 shadow-md">
                                    <FaMapMarkerAlt className="text-sm" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white">Address</p>
                                    <p className="text-sm text-gray-300 leading-snug mt-0.5">
                                        {data.address}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright bottom bar */}
            <div className="relative z-10 border-t border-white/10 py-5">
                <div className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
                    <p className="text-xs sm:text-sm text-gray-300/80">
                        {data.copyright}
                    </p>
                </div>
            </div>
        </footer>
    );
}