function Header() {
    const currentPath = window.location.pathname;
    const isHome = currentPath.includes('index') || currentPath === '/';
    const isWorks = currentPath.includes('works');
    const isAbout = currentPath.includes('about');
    
    return (
        <header className="absolute top-0 w-full z-50 bg-transparent" data-name="header" data-file="components/Header.js">
            <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
                <a href="index.html" className="flex items-center gap-3 text-xl font-bold tracking-widest text-[var(--text-primary)] hover:opacity-80 transition-opacity">
                    <img src="https://app.trickle.so/storage/public/images/usr_1f85a373d0000001/de6df4df-d115-4e06-9e1b-3236161549da.png" alt="三点水 Logo" className="h-8 w-auto object-contain" />
                    <span>三点水</span>
                </a>
                <nav className="hidden md:flex items-center space-x-10">
                    <div className="relative group flex flex-col items-center">
                        <a href="index.html" className={`text-sm font-medium transition-colors ${isHome ? 'text-black' : 'text-gray-500 hover:text-black'}`}>首页</a>
                        {isHome && <div className="absolute -bottom-2 w-4 h-0.5 bg-black"></div>}
                    </div>
                    <div className="relative group flex flex-col items-center">
                        <a href="works.html" className={`text-sm font-medium transition-colors ${isWorks ? 'text-black' : 'text-gray-500 hover:text-black'}`}>作品</a>
                        {isWorks && <div className="absolute -bottom-2 w-4 h-0.5 bg-black"></div>}
                    </div>
                    <div className="relative group flex flex-col items-center">
                        <a href="about.html" className={`text-sm font-medium transition-colors ${isAbout ? 'text-black' : 'text-gray-500 hover:text-black'}`}>关于</a>
                        {isAbout && <div className="absolute -bottom-2 w-4 h-0.5 bg-black"></div>}
                    </div>
                </nav>
                <div className="md:hidden">
                    <div className="icon-menu text-2xl cursor-pointer"></div>
                </div>
            </div>
        </header>
    );
}
