"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useModal } from "@/components/common/ModalContext";
import { site, type TourlyContactModalData } from "@/data/index";
import {
    FaUser,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaPaperPlane,
    FaCheckCircle,
} from "react-icons/fa";

interface ContactModalProps {
    data?: TourlyContactModalData;
}

export default function ContactModal({ data = site.contactModal }: ContactModalProps) {
    const { isOpen, closeModal, initialData } = useModal();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        destination: "",
        travelDate: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [prevInitialData, setPrevInitialData] = useState(initialData);
    if (initialData !== prevInitialData) {
        setPrevInitialData(initialData);
        if (initialData?.destination && formData.destination !== initialData.destination) {
            setFormData((prev) => ({ ...prev, destination: initialData.destination || "" }));
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate submission
        await new Promise((resolve) => setTimeout(resolve, 800));

        setIsSubmitting(false);
        setIsSubmitted(true);

        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                fullName: "",
                email: "",
                phone: "",
                destination: "",
                travelDate: "",
            });
            closeModal();
        }, 2200);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
            <DialogContent className="border border-sky-100 shadow-2xl p-6 sm:p-8 max-w-lg">
                <DialogHeader className="space-y-1.5 pb-2 border-b border-gray-100 items-center">
                    <DialogTitle className="text-2xl sm:text-[26px] font-bold text-center text-[#13253f] tracking-tight">
                        {data.title}{" "}
                        {data.titleHighlight && (
                            <span className="text-[#0284c7]">{data.titleHighlight}</span>
                        )}
                    </DialogTitle>
                    <DialogDescription className="text-gray-500 text-xs text-center sm:text-sm leading-relaxed">
                        {data.description}
                    </DialogDescription>
                </DialogHeader>

                <AnimatePresence mode="wait">
                    {isSubmitted ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="py-10 text-center flex flex-col items-center justify-center gap-3"
                        >
                            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-200 flex items-center justify-center text-3xl shadow-xs">
                                <FaCheckCircle />
                            </div>
                            <h3 className="text-xl font-bold text-[#13253f]">{data.success.title}</h3>
                            <p className="text-sm text-gray-500 max-w-xs">
                                {data.success.message}
                            </p>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onSubmit={handleSubmit}
                            className="mt-4 space-y-3.5"
                        >
                            {/* Input 1: Full Name */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                        <FaUser className="text-xs" />
                                    </div>
                                    <Input
                                        type="text"
                                        name="fullName"
                                        required
                                        placeholder="e.g. John Doe"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            {/* Input 2: Email Address */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                        <FaEnvelope className="text-xs" />
                                    </div>
                                    <Input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="e.g. john@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            {/* Input 3: Phone Number */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                        <FaPhoneAlt className="text-xs" />
                                    </div>
                                    <Input
                                        type="tel"
                                        name="phone"
                                        required
                                        placeholder="e.g. +1 (555) 000-1234"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            {/* Input 4: Destination */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Destination / Place of Interest <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                        <FaMapMarkerAlt className="text-xs" />
                                    </div>
                                    <Input
                                        type="text"
                                        name="destination"
                                        required
                                        placeholder="e.g. Bali, Maldives, Switzerland"
                                        value={formData.destination}
                                        onChange={handleChange}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            {/* Input 5: Travel Date & Guests */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Travel Date & Guests <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                        <FaCalendarAlt className="text-xs" />
                                    </div>
                                    <Input
                                        type="text"
                                        name="travelDate"
                                        required
                                        placeholder="e.g. Next month • 2 Adults, 1 Child"
                                        value={formData.travelDate}
                                        onChange={handleChange}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            {/* 1 Button: Submit Button */}
                            <div className="pt-2">
                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#06b6d4] text-white font-semibold text-sm shadow-md hover:shadow-lg hover:shadow-sky-500/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                                >
                                    {isSubmitting ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <FaPaperPlane className="text-xs" />
                                            <span>{data.submitButton.text}</span>
                                        </>
                                    )}
                                </motion.button>
                            </div>

                        </motion.form>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
}

