class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <button onClick={() => window.location.reload()} className="px-4 py-2 bg-black text-white rounded">Reload Page</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden" data-name="hero" data-file="app.js">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <img src="https://app.trickle.so/storage/public/images/usr_1f85a373d0000001/69eebe3f-b9db-4d31-bada-e24df1c20deb.png" alt="Landscape" className="w-full h-full object-cover object-center" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--bg-primary)] to-transparent"></div>
            </div>

            <div className="section-padding relative z-10 w-full flex justify-between items-center h-full mt-8">
                <div className="max-w-3xl text-left">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-8 leading-[1.15] text-[#1a1a1a] font-serif">
                        让复杂系统变得<br/>清晰易用
                    </h1>
                    <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8 font-light max-w-2xl leading-relaxed">
                        你好，我是三点水。<br/>一名拥有 10年+ 行业经验的 UI/UX 设计师，专注于企业级产品、复杂业务系统与全球化产品体验设计。
                    </p>
                    
                    {/* Data Badges */}
                    <div className="flex flex-wrap gap-3 mb-12">
                        {['10年+ 行业经验', '企业级产品设计', '复杂系统设计', '设计系统建设', '全球化产品'].map(badge => (
                            <span key={badge} className="px-4 py-1.5 border border-gray-300/80 rounded-full text-[13px] md:text-sm text-gray-700 bg-white/40 backdrop-blur-sm shadow-sm font-medium">
                                {badge}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-start gap-4">
                        <a href="works.html" className="px-8 py-3.5 bg-[#2c2c2c] text-white rounded-full font-medium hover:bg-black transition-colors duration-300 shadow-lg text-center w-full sm:w-auto">查看作品</a>
                        <a href="about.html" className="px-8 py-3.5 bg-white/60 backdrop-blur-md border border-gray-300/80 text-[var(--text-primary)] rounded-full font-medium hover:bg-white hover:border-gray-400 transition-all duration-300 text-center w-full sm:w-auto">关于我</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

function CareerSnapshot() {
    return (
        <section className="py-12 md:py-16 bg-white/60 border-y border-gray-100/50" data-name="career-snapshot">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col items-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#1a1a1a] mb-2 tracking-widest">职业剪影</h2>
                    <p className="text-sm text-gray-400 font-handwriting text-xl">Career Snapshot</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
                    <div className="p-6 rounded-3xl hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border border-transparent hover:border-gray-100 group">
                        <div className="text-5xl md:text-6xl font-serif font-bold text-[#1a1a1a] mb-4 group-hover:scale-105 transition-transform">10<span className="text-3xl text-gray-400">+</span></div>
                        <div className="text-lg font-bold text-gray-900 mb-2">年行业经验</div>
                        <div className="text-[14px] text-gray-500">深耕 UI/UX 与复杂系统设计</div>
                    </div>
                    <div className="p-6 rounded-3xl hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border border-transparent hover:border-gray-100 group">
                        <div className="text-5xl md:text-6xl font-serif font-bold text-[#1a1a1a] mb-4 group-hover:scale-105 transition-transform">7<span className="text-3xl text-gray-400">+</span></div>
                        <div className="text-lg font-bold text-gray-900 mb-2">核心项目</div>
                        <div className="text-[14px] text-gray-500">从 0 到 1 主导体验与视觉</div>
                    </div>
                    <div className="p-6 rounded-3xl hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border border-transparent hover:border-gray-100 group">
                        <div className="text-5xl md:text-6xl font-serif font-bold text-[#1a1a1a] mb-4 group-hover:scale-105 transition-transform">4<span className="text-3xl text-gray-400">个</span></div>
                        <div className="text-lg font-bold text-gray-900 mb-2">大行业领域</div>
                        <div className="text-[14px] text-gray-500">企业级 / 政务 / 全球化 / 应急系统</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function CoreCapabilities() {
    const capabilities = [
        {
            title: '复杂系统设计',
            desc: '将复杂业务逻辑转化为清晰易理解的产品体验。',
            icon: 'icon-layers'
        },
        {
            title: '企业级产品设计',
            desc: '服务于管理平台、控制系统与数字化业务场景。',
            icon: 'icon-building-2'
        },
        {
            title: '设计系统建设',
            desc: '建立统一设计规范，提升产品一致性与设计效率。',
            icon: 'icon-component'
        },
        {
            title: '全球化产品体验',
            desc: '面向国际市场的产品设计与本地化适配。',
            icon: 'icon-globe'
        }
    ];

    return (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto" data-name="core-capabilities">
            <div className="flex flex-col items-center mb-16">
                <h2 className="text-3xl font-serif font-semibold text-[#1a1a1a] mb-2 tracking-widest">我专注的设计方向</h2>
                <div className="w-6 h-[1.5px] bg-[#1a1a1a]"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {capabilities.map((item, i) => (
                    <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group">
                        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-gray-900 transition-colors duration-300">
                            <div className={`${item.icon} text-2xl text-gray-700 group-hover:text-white transition-colors duration-300`}></div>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                        <p className="text-[14px] text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

function FeaturedProjects() {
    const [projects, setProjects] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const projectOverrides = {
        'TC Games 电脑玩手游助手': {
            title: 'TC Games',
            desc: '全球化手游投屏与控制平台',
            role: '产品体验设计 · 全球化产品设计'
        },
        '手机控 Total Control': {
            title: 'Total Control',
            desc: '多设备连接与控制系统',
            role: '复杂交互设计 · 设计系统建设'
        },
        '低空救援智能指挥平台': {
            title: '低空救援智能指挥平台',
            desc: '智慧应急与指挥调度平台',
            role: '数据可视化 · 决策体验设计'
        }
    };

    React.useEffect(() => {
        fetchFeishuProjects().then(data => {
            setProjects((data || []).slice(0, 3));
            setLoading(false);
        }).catch(err => {
            console.error('Failed to load projects:', err);
            setProjects([]);
            setLoading(false);
        });
    }, []);

    const handleProjectClick = (originalTitle) => {
        window.location.href = `project.html?title=${encodeURIComponent(originalTitle)}`;
    };

    return (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto" data-name="featured-projects">
            <div className="flex flex-col items-center mb-16">
                <h2 className="text-3xl font-serif font-semibold text-[#1a1a1a] mb-2 tracking-widest">精选作品</h2>
                <div className="w-6 h-[1.5px] bg-[#1a1a1a]"></div>
            </div>
            
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="icon-loader text-4xl text-gray-400 animate-spin"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
                    {projects.map((proj, i) => {
                        const override = projectOverrides[proj.title] || {};
                        const displayTitle = override.title || proj.title;
                        const displayDesc = override.desc || proj.desc;
                        const displayRole = override.role || '';

                        return (
                            <div 
                                key={i} 
                                onClick={() => handleProjectClick(proj.title)}
                                className="bg-white rounded-[1.5rem] overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 cursor-pointer group shadow-sm flex flex-col h-[400px] md:h-[420px] border border-gray-100/60"
                            >
                                <div className="h-[55%] md:h-[60%] w-full overflow-hidden relative bg-gray-50">
                                    <ProjectImage project={proj} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[12px] font-medium text-gray-800 shadow-sm">
                                        {proj.category || '精选作品'}
                                    </div>
                                </div>
                                <div className="flex-1 p-5 md:p-6 flex flex-col justify-center">
                                    <div className="flex justify-between items-start mb-1.5">
                                        <h3 className="text-[17px] md:text-[19px] font-bold text-gray-900 group-hover:text-black transition-colors line-clamp-1">{displayTitle}</h3>
                                        <div className="icon-arrow-up-right text-gray-300 group-hover:text-black transition-colors ml-3 mt-0.5 flex-shrink-0 text-lg"></div>
                                    </div>
                                    {displayRole && <p className="text-[12px] md:text-[13px] font-medium text-gray-900 mb-2">{displayRole}</p>}
                                    <p className="text-[13px] md:text-[14px] text-gray-500 line-clamp-2 leading-relaxed">{displayDesc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}

function ShortAbout() {
    return (
        <section className="py-16 md:py-20 bg-[#fcfbf9] border-y border-gray-100/50" data-name="short-about">
            <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
                <div className="flex flex-col items-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#1a1a1a] mb-2 tracking-widest">我的设计观</h2>
                    <div className="w-6 h-[1.5px] bg-[#1a1a1a]"></div>
                </div>
                <div className="text-base md:text-lg text-gray-700 leading-relaxed space-y-6 mb-10 text-center mx-auto max-w-3xl">
                    <p>
                        设计不仅是界面呈现，<br className="hidden md:block"/>
                        更是帮助用户理解系统、完成目标的过程。
                    </p>
                    <p>
                        在复杂业务场景中，<br className="hidden md:block"/>
                        我更关注信息结构、操作效率与长期可扩展性。
                    </p>
                    <p>
                        持续探索设计在<br className="hidden md:block"/>
                        业务价值、用户体验与技术创新之间的平衡。
                    </p>
                </div>
                <a href="about.html" className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-gray-300 text-[var(--text-primary)] rounded-full font-medium hover:bg-gray-100 transition-colors duration-300">
                    <span>了解更多关于我</span>
                    <div className="icon-arrow-right text-sm"></div>
                </a>
            </div>
        </section>
    );
}

function ContactSection() {
    return (
        <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto text-center" data-name="contact-section">
            <div className="flex flex-col items-center mb-12">
                <h2 className="text-3xl font-serif font-semibold text-[#1a1a1a] mb-4 tracking-widest">开放新的合作机会</h2>
                <div className="w-6 h-[1.5px] bg-[#1a1a1a] mb-10"></div>
                
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                    <span className="px-6 py-2.5 bg-white/60 backdrop-blur-sm border border-gray-200 text-gray-800 rounded-full text-sm md:text-base font-medium shadow-sm hover:bg-white transition-colors duration-300">UI/UX 设计</span>
                    <span className="px-6 py-2.5 bg-white/60 backdrop-blur-sm border border-gray-200 text-gray-800 rounded-full text-sm md:text-base font-medium shadow-sm hover:bg-white transition-colors duration-300">企业级产品设计</span>
                    <span className="px-6 py-2.5 bg-white/60 backdrop-blur-sm border border-gray-200 text-gray-800 rounded-full text-sm md:text-base font-medium shadow-sm hover:bg-white transition-colors duration-300">设计顾问咨询</span>
                </div>

                <p className="text-xl md:text-2xl text-gray-800 font-serif tracking-widest">
                    欢迎交流
                </p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                {/* 邮箱 */}
                <a href="mailto:819240234@qq.com" className="flex items-center gap-4 group cursor-pointer bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 w-full md:w-auto">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-gray-900 transition-colors duration-300">
                        <div className="icon-mail text-xl text-gray-600 group-hover:text-white transition-colors duration-300"></div>
                    </div>
                    <span className="text-gray-800 font-medium text-[15px] md:text-base">819240234@qq.com</span>
                </a>
                
                {/* 电话 */}
                <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm w-full md:w-auto">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                        <div className="icon-phone text-xl text-gray-600"></div>
                    </div>
                    <span className="text-gray-800 font-medium text-[15px] md:text-base">15882468419</span>
                </div>
                
                {/* 微信 */}
                <div className="flex items-center gap-4 relative group cursor-pointer bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 w-full md:w-auto">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-gray-900 transition-colors duration-300">
                        <svg className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 10c0-3.3-3.1-6-7-6s-7 2.7-7 6c0 1.9 1 3.5 2.5 4.7l-.8 2.3 2.8-1.4c.8.2 1.6.4 2.5.4 3.9 0 7-2.7 7-6z"/>
                            <path d="M22 15c0-2.8-2.7-5-6-5s-6 2.2-6 5 2.7 5 6 5c.7 0 1.4-.1 2.1-.3l2.4 1.2-.7-2c1.3-1 2.2-2.4 2.2-3.9z"/>
                        </svg>
                    </div>
                    <span className="text-gray-800 font-medium text-[15px] md:text-base">renaidie</span>
                    
                    {/* QR Code Popup */}
                    <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                        <div className="bg-white p-2 rounded-2xl shadow-xl border border-gray-100 w-[150px] h-[150px] relative">
                            <img src="https://app.trickle.so/storage/public/images/usr_1f85a373d0000001/2efcba12-a9bb-421b-9e6d-a9fa1bf3df3f.png" alt="WeChat QR Code" className="w-full h-full object-contain rounded-xl" />
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-gray-100 transform rotate-45"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function App() {
  try {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--bg-primary)]" data-name="app" data-file="app.js">
        <Header />
        <main className="flex-grow">
            <HeroSection />
            <CareerSnapshot />
            <CoreCapabilities />
            <FeaturedProjects />
            <ShortAbout />
            <ContactSection />
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);