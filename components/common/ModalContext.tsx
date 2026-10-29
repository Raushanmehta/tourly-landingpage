"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

interface ModalOpenOptions {
    destination?: string;
    packageTitle?: string;
}

interface ModalContextType {
    isOpen: boolean;
    initialData: ModalOpenOptions | null;
    openModal: (options?: ModalOpenOptions) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [initialData, setInitialData] = useState<ModalOpenOptions | null>(null);

    const openModal = useCallback((options?: ModalOpenOptions) => {
        if (options) {
            setInitialData(options);
        } else {
            setInitialData(null);
        }
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        setInitialData(null);
    }, []);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = (e.target as HTMLElement)?.closest<HTMLElement>(
                "[data-open-modal], a[href='#cta'], a[href='#enquiry'], a[href*='enquiry-now'], a[href*='contact']"
            );
            if (target) {
                e.preventDefault();
                const dest = target.getAttribute("data-destination");
                openModal(dest ? { destination: dest } : undefined);
            }
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [openModal]);

    return (
        <ModalContext.Provider value={{ isOpen, initialData, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
}

export function useModal() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
}

