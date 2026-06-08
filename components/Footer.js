function Footer() {
    return (
        <footer className="bg-white/70 backdrop-blur-md border-t border-gray-200/50 py-10 relative z-10" data-name="footer" data-file="components/Footer.js">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col text-center md:text-left">
                    <p className="font-bold text-lg text-gray-900 tracking-wide">三点水 · UI/UX Designer</p>
                    <p className="text-gray-500 text-[13px] md:text-sm mt-1.5">专注复杂系统与企业级产品体验设计</p>
                </div>
                <div className="text-gray-400 text-[13px] tracking-wider text-center md:text-right">
                    &copy; 2026 All Rights Reserved
                </div>
            </div>
        </footer>
    );
}
