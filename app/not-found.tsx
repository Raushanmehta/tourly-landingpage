import Link from "next/link";
import { FaHome, FaArrowRight, FaCompass } from "react-icons/fa";
import { site } from "@/data/index";

export default function NotFound() {
    const data = site.notFound;

    return (
        <section className="relative w-full py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#f8fbfe] via-white to-[#f4f9fd] overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-sky-100/40 via-teal-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
                {/* Badge Pill */}
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-sky-50 text-[#0284c7] font-bold text-xs sm:text-sm tracking-widest uppercase mb-4 border border-sky-100">
                    <span className="w-2 h-2 rounded-full bg-[#0284c7]" />
                    <span>{data.badge}</span>
                </div>

                {/* Decorative 404 */}
                <div className="relative mb-2 select-none">
                    <span className="font-sans font-black text-7xl sm:text-9xl md:text-[140px] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#054553] via-[#0284c7] to-[#0ea5e9] drop-shadow-sm leading-none block">
                        {data.code}
                    </span>
                </div>

                {/* Headline */}
                <h1 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0f1d33] tracking-tight max-w-xl">
                    {data.title}
                </h1>

                {/* Explanatory subtitle */}
                <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-xl mt-3 leading-relaxed font-normal">
                    {data.description}
                </p>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-7 w-full sm:w-auto">
                    <Link
                        href={data.primaryButton.href}
                        className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#06b6d4] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-sky-500/25 hover:shadow-lg hover:shadow-sky-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-center"
                    >
                        <FaHome className="w-4 h-4" />
                        <span>{data.primaryButton.text}</span>
                        <FaArrowRight className="w-3.5 h-3.5 ml-0.5" />
                    </Link>

                    <Link
                        href={data.secondaryButton.href}
                        className="w-full sm:w-auto px-7 py-3 rounded-xl bg-white border border-gray-200 hover:border-[#0284c7] text-[#0f1d33] hover:text-[#0284c7] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all cursor-pointer text-center"
                    >
                        <FaCompass className="w-4 h-4" />
                        <span>{data.secondaryButton.text}</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
