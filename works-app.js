class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack); }
  render() {
    if (this.state.hasError) return <div className="min-h-screen flex items-center justify-center">Error occurred.</div>;
    return this.props.children;
  }
}

function WorksApp() {
  const [activeFilter, setActiveFilter] = React.useState('全部');
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
      fetchFeishuProjects().then(data => {
          setProjects(data || []);
          setLoading(false);
      }).catch(err => {
          console.error('Failed to load works projects:', err);
          setProjects([]);
          setLoading(false);
      });
  }, []);

  const categories = ['全部', ...new Set(projects.map(p => p.category).filter(Boolean))];

  const filteredProjects = activeFilter === '全部' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)] overflow-hidden" data-name="works-page" data-file="works-app.js">
        {/* Background Images */}
        <div className="absolute top-0 left-0 w-full pointer-events-none z-0">
            <img src="https://app.trickle.so/storage/public/images/usr_1f85a373d0000001/1195f64c-8e24-4818-b967-d7cd0d3352da.png" alt="bg-top" className="w-full h-auto object-top object-cover min-h-[400px] opacity-90" />
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[var(--bg-primary)] to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-full pointer-events-none z-0">
            <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-[var(--bg-primary)] to-transparent"></div>
            <img src="https://app.trickle.so/storage/public/images/usr_1f85a373d0000001/ae1df77a-3cb9-4853-a7c4-7a8c5a1a64d2.png" alt="bg-bottom" className="w-full h-auto object-bottom object-cover min-h-[300px] opacity-90" />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col min-h-screen pt-16">
            <Header />
            
            <main className="flex-grow section-padding">
            <div className="mb-12 md:mb-16">
                <h1 className="text-4xl md:text-[2.75rem] font-serif font-semibold mb-6 flex items-end gap-4 text-[var(--text-primary)] tracking-wide">
                    设计实践
                    <span className="font-handwriting text-[2.5rem] md:text-[3rem] text-gray-400 font-medium -mb-1">Selected Projects</span>
                </h1>
                <p className="text-[15px] text-[var(--text-secondary)] mb-8 max-w-2xl leading-relaxed">
                    记录产品、系统与体验设计的探索历程。<br /><br className="hidden sm:block" />
                    从复杂业务系统到数字化产品实践，<br className="hidden sm:block" />
                    持续关注设计如何创造更清晰、高效且有价值的体验。
                </p>
                
                {/* 分类过滤器 */}
                <div className="flex flex-wrap gap-2.5">
                    {!loading && categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveFilter(category)}
                            className={`px-6 py-2 rounded-full text-[14px] transition-all duration-300 border ${
                                activeFilter === category 
                                    ? 'bg-[var(--text-primary)] text-white border-[var(--text-primary)] shadow-sm' 
                                    : 'bg-white/80 text-gray-600 hover:bg-white hover:text-gray-900 border-gray-200/80 backdrop-blur-sm'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
        
        {loading ? (
            <div className="flex justify-center items-center py-32">
                <div className="icon-loader text-4xl text-gray-400 animate-spin"></div>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredProjects.map((proj, i) => (
                    <div 
                        key={`${proj.title}-${i}`} 
                        onClick={() => window.location.href = `project.html?title=${encodeURIComponent(proj.title)}`}
                        className={`group cursor-pointer bg-white/95 backdrop-blur-sm rounded-[1.5rem] overflow-hidden hover:shadow-2xl hover:-translate-y-1 hover:bg-white transition-all duration-500 border border-gray-100/60 flex flex-col ${proj.colSpan || 'col-span-1'}`}
                    >
                        <div className="relative overflow-hidden w-full h-48 md:h-56 bg-gray-50">
                            <ProjectImage 
                                project={proj} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            />
                            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[12px] font-medium text-gray-800 shadow-sm">
                                {proj.category}
                            </div>
                        </div>
                        <div className="p-5 md:p-6 bg-white flex-grow flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-[17px] md:text-[18px] font-bold text-gray-900 group-hover:text-black transition-colors line-clamp-1">{proj.title}</h2>
                                <div className="icon-arrow-up-right text-gray-300 group-hover:text-black transition-colors text-lg ml-3 mt-0.5 flex-shrink-0"></div>
                            </div>
                            {proj.tags && (
                                <div className="flex flex-wrap gap-1.5 mb-2.5">
                                    {proj.tags.split(/[·、，,]+/).map(t => t.trim()).filter(Boolean).map((tag, idx) => (
                                        <span key={idx} className="text-[11px] font-medium text-gray-600 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                            <p className="text-[13px] md:text-[14px] text-gray-500 line-clamp-2 leading-relaxed">{proj.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        )}
        
        {!loading && filteredProjects.length === 0 && (
            <div className="py-20 text-center text-gray-400">
                <p>暂无相关作品</p>
            </div>
        )}
            </main>
            <Footer />
        </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <WorksApp />
  </ErrorBoundary>
);