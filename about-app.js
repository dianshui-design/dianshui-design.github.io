class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) return <div className="min-h-screen flex items-center justify-center">Error occurred.</div>;
    return this.props.children;
  }
}

function AboutApp() {
  return (
    <div className="relative min-h-screen bg-[#fcfbf9] overflow-hidden" data-name="about-page" data-file="about-app.js">
        {/* Background Image Layer */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
            <img 
                src="https://app.trickle.so/storage/public/images/usr_1f85a373d0000001/40238127-29d2-4578-8c9a-8efa907477f9.png" 
                alt="关于页面背景" 
                className="w-full h-[150vh] min-h-[1200px] object-cover object-top opacity-100 mix-blend-multiply" 
            />
        </div>

        <div className="relative z-10 flex flex-col min-h-screen pt-24">
            <Header />
            <main className="flex-grow section-padding max-w-7xl mx-auto w-full">
                <div className="max-w-2xl mt-8 md:mt-16">
                    <div className="flex items-center gap-4 mb-8">
                        <img src="https://app.trickle.so/storage/public/images/usr_1f85a373d0000001/de6df4df-d115-4e06-9e1b-3236161549da.png" alt="三点水 Logo" className="w-12 md:w-14 h-auto object-contain" />
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1a1a1a] tracking-wider">关于我</h1>
                    </div>
                    
                    <div className="mb-16 space-y-6 text-justify">
                        <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                            我是三点水，一名专注于复杂系统与企业级产品体验设计的 UI/UX 设计师。拥有 10年+ 行业经验，长期服务于企业级产品、全球化产品及数字化平台建设。
                        </p>
                        <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                            在过往项目中，我参与并主导过游戏工具平台、设备控制系统、政务平台、应急指挥系统等多种类型产品设计，积累了丰富的跨行业设计经验。
                        </p>
                        <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                            我相信优秀的设计不仅是视觉呈现，更重要的是帮助用户理解系统、完成目标。面对复杂业务场景时，我始终坚持从业务逻辑出发，通过梳理信息结构、优化操作流程、建立统一体验，降低用户认知成本，提升产品使用效率，并兼顾商业价值与产品的长期可持续发展。
                        </p>
                        <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                            我擅长将复杂系统转化为清晰、易理解、易操作的产品体验，持续探索设计在业务价值、用户体验与技术创新之间的更多可能。
                        </p>
                    </div>

                    <div className="mb-16">
                        <h2 className="text-xl md:text-2xl font-bold text-[#1a1a1a] mb-6 font-serif tracking-widest">核心技能</h2>
                        <div className="flex flex-wrap gap-3">
                            {['UI / UX 设计', '企业级产品设计', '设计系统搭建', '全球化产品设计', '数据可视化设计', '交互体验设计', 'AI 辅助设计'].map(skill => (
                                <span key={skill} className="px-5 py-2.5 bg-white/40 backdrop-blur-md border border-white/60 rounded-full text-[13px] font-medium text-gray-800 shadow-sm transition-all hover:bg-white/60">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/30 backdrop-blur-xl border border-white/50 p-8 md:p-10 rounded-[2rem] shadow-sm mb-20">
                        <h2 className="text-xl md:text-2xl font-bold text-[#1a1a1a] mb-3 font-serif tracking-widest">联系我</h2>
                        <p className="mb-8 text-gray-600 text-[13px] md:text-sm">期待与您沟通，共创设计价值</p>
                        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                            <a href="mailto:819240234@qq.com" className="flex items-center gap-3 group cursor-pointer">
                                <div className="icon-mail text-lg text-gray-600 group-hover:text-black transition-colors"></div>
                                <span className="text-gray-800 font-medium text-sm group-hover:text-black transition-colors">819240234@qq.com</span>
                            </a>
                            {/* 分隔线（仅在桌面端显示） */}
                            <div className="hidden md:block w-px h-5 bg-gray-300/60"></div>
                            <div className="flex items-center gap-3">
                                <div className="icon-phone text-lg text-gray-600"></div>
                                <span className="text-gray-800 font-medium text-sm">15882468419</span>
                            </div>
                            {/* 分隔线（仅在桌面端显示） */}
                            <div className="hidden md:block w-px h-5 bg-gray-300/60"></div>
                            <div className="flex items-center gap-3 relative group cursor-pointer">
                                <svg className="w-[18px] h-[18px] text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 10c0-3.3-3.1-6-7-6s-7 2.7-7 6c0 1.9 1 3.5 2.5 4.7l-.8 2.3 2.8-1.4c.8.2 1.6.4 2.5.4 3.9 0 7-2.7 7-6z"/>
                                    <path d="M22 15c0-2.8-2.7-5-6-5s-6 2.2-6 5 2.7 5 6 5c.7 0 1.4-.1 2.1-.3l2.4 1.2-.7-2c1.3-1 2.2-2.4 2.2-3.9z"/>
                                </svg>
                                <span className="text-gray-800 font-medium text-sm group-hover:text-black transition-colors">renaidie</span>
                                {/* QR Code Popup */}
                                <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                    <div className="bg-white p-2 rounded-2xl shadow-xl border border-gray-100 w-[140px] h-[140px] relative">
                                        <img src="https://app.trickle.so/storage/public/images/usr_1f85a373d0000001/2efcba12-a9bb-421b-9e6d-a9fa1bf3df3f.png" alt="WeChat QR Code" className="w-full h-full object-contain rounded-xl" />
                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-gray-100 transform rotate-45"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <AboutApp />
  </ErrorBoundary>
);