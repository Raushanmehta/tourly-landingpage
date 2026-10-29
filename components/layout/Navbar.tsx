"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaBars, FaTimes } from "react-icons/fa";
import { site, type TourlyNavbarData } from "@/data/index";
import { useModal } from "@/components/common/ModalContext";

interface NavbarProps {
    data?: TourlyNavbarData;
}

export default function Navbar({ data = site.navbar }: NavbarProps) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string>("#home");
    const [isScrolled, setIsScrolled] = useState(false);
    const { openModal } = useModal();

    // Scroll spy & hash navigation
    useEffect(() => {
        const sections = [
            { id: "home", href: "#home" },
            { id: "about", href: "#about" },
            { id: "destinations", href: "#destinations" },
            { id: "why-choose-us", href: "#why-choose-us" },
            { id: "stats", href: "#why-choose-us" },
            { id: "testimonials", href: "#testimonials" },
            { id: "faqs", href: "#faqs" },
        ];

        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 20);

            if (scrollY < 60) {
                setActiveSection("#home");
                return;
            }

            if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 50) {
                setActiveSection("#faqs");
                return;
            }

            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i].id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 100) {
                        setActiveSection(sections[i].href);
                        return;
                    }
                }
            }
        };

        const lenis = window.__lenis;
        if (lenis && typeof lenis.on === "function") {
            lenis.on("scroll", handleScroll);
        }
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        // Initial hash scroll on mount
        if (typeof window !== "undefined" && window.location.hash) {
            const hash = window.location.hash;
            const target = document.querySelector(hash) as HTMLElement | null;
            if (target) {
                setTimeout(() => {
                    const navHeight = 80;
                    const targetY = Math.max(0, target.getBoundingClientRect().top + window.scrollY - navHeight);
                    const l = window.__lenis;
                    if (l) {
                        l.scrollTo(targetY, { duration: 0.85 });
                    } else {
                        window.scrollTo({ top: targetY, behavior: "smooth" });
                    }
                    setActiveSection(hash);
                }, 200);
            }
        }

        return () => {
            if (lenis && typeof lenis.off === "function") {
                lenis.off("scroll", handleScroll);
            }
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    const handleNavClick = (e: React.MouseEvent, href: string) => {
        e.preventDefault();
        setMobileOpen(false);
        setActiveSection(href);

        if (typeof window === "undefined") return;

        if (href === "#home" || href === "/" || href === "#") {
            const lenis = window.__lenis;
            if (lenis) {
                lenis.scrollTo(0, { duration: 0.85 });
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
            window.history.pushState(null, "", "/");
            return;
        }

        const target = document.querySelector(href) as HTMLElement | null;
        if (target) {
            const navHeight = 80;
            const targetY = Math.max(0, target.getBoundingClientRect().top + window.scrollY - navHeight);
            const lenis = window.__lenis;
            if (lenis) {
                lenis.scrollTo(targetY, { duration: 0.85 });
            } else {
                window.scrollTo({ top: targetY, behavior: "smooth" });
            }
            window.history.pushState(null, "", href);
        }
    };

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${
                isScrolled
                    ? "bg-white/95 backdrop-blur-md shadow-[0_4px_20px_-2px_rgba(0,0,0,0.08)] border-b border-gray-100"
                    : "bg-white border-b border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)]"
            }`}
        >
            <div className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
                <div className="flex items-center justify-between h-20">
                    {/* Brand logo link */}
                    <a
                        href="#home"
                        onClick={(e) => handleNavClick(e, "#home")}
                        className="flex items-center shrink-0 py-1 cursor-pointer"
                        aria-label="Tourly Home"
                    >
                        <Image
                            src={data.logo.src}
                            alt={data.logo.alt}
                            width={data.logo.width}
                            height={data.logo.height}
                            priority
                            className="h-14 sm:h-16 w-auto object-contain transition-transform"
                        />
                    </a>

                    {/* Desktop navigation links */}
                    <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
                        {data.navItems.map((item) => {
                            const active = activeSection === item.href;

                            return (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                    className={`relative text-[15px] font-medium transition-colors py-2 cursor-pointer ${
                                        active
                                            ? "text-[#0284c7] font-semibold"
                                            : "text-[#13253f] hover:text-[#0284c7]"
                                    }`}
                                >
                                    <span>{item.name}</span>
                                    {active && (
                                        <motion.span
                                            layoutId="activeNavIndicator"
                                            className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-[#0284c7] rounded-full"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </a>
                            );
                        })}
                    </nav>

                    {/* CTA button desktop */}
                    <div className="hidden lg:flex items-center">
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            <button
                                type="button"
                                onClick={() => openModal()}
                                className="group flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#06b6d4] text-white font-medium text-sm sm:text-[15px] shadow-md hover:shadow-lg hover:shadow-sky-500/30 transition-all duration-200 cursor-pointer"
                            >
                                <span>{data.ctaButton.text}</span>
                                <div className="w-8 h-8 rounded-full bg-white text-[#0284c7] flex items-center justify-center shrink-0 shadow-sm transition-transform duration-200 group-hover:translate-x-0.5">
                                    <FaArrowRight className="text-xs" />
                                </div>
                            </button>
                        </motion.div>
                    </div>

                    {/* Mobile hamburger button */}
                    <div className="flex items-center lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle Navigation Menu"
                            className="p-2.5 rounded-lg text-gray-700 hover:text-[#0284c7] hover:bg-gray-100 transition-colors focus:outline-hidden cursor-pointer"
                        >
                            {mobileOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile navigation drawer & backdrop */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setMobileOpen(false)}
                            className="fixed inset-0 top-20 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
                        />

                        {/* Mobile Drawer */}
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="lg:hidden absolute top-full left-0 right-0 z-50 border-t border-gray-100 bg-white shadow-2xl overflow-hidden max-h-[calc(100vh-5rem)] overflow-y-auto"
                        >
                            <div className="px-5 py-6 space-y-3">
                                {data.navItems.map((item) => {
                                    const active = activeSection === item.href;

                                    return (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            onClick={(e) => handleNavClick(e, item.href)}
                                            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-base font-medium transition-colors cursor-pointer ${
                                                active
                                                    ? "bg-sky-50 text-[#0284c7] font-semibold"
                                                    : "text-[#13253f] hover:bg-gray-50 hover:text-[#0284c7]"
                                            }`}
                                        >
                                            <span>{item.name}</span>
                                            {active && (
                                                <span className="w-2 h-2 rounded-full bg-[#0284c7]" />
                                            )}
                                        </a>
                                    );
                                })}

                                {/* Mobile action button */}
                                <div className="pt-4 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMobileOpen(false);
                                            openModal();
                                        }}
                                        className="w-full flex items-center justify-center gap-3 py-3 rounded-full bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#06b6d4] text-white font-semibold text-sm shadow-md cursor-pointer"
                                    >
                                        <span>{data.ctaButton.text}</span>
                                        <FaArrowRight className="text-xs" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
