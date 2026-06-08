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

function renderTextWithLinks(text) {
    if (!text) return null;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) => {
        if (part.match(urlRegex)) {
            return (
                <a 
                    key={i} 
                    href={part} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                    {part}
                </a>
            );
        }
        return part;
    });
}

function ProjectApp() {
    const [project, setProject] = React.useState(null);
    const [docData, setDocData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [docLoading, setDocLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const title = params.get('title');

        if (!title) {
            setLoading(false);
            return;
        }

        fetchFeishuProjects().then(projects => {
            const foundProject = (projects || []).find(p => p.title === title);
            setProject(foundProject);
            setLoading(false);

            if (foundProject && foundProject.docUrl) {
                setDocLoading(true);
                fetchFeishuDocContent(foundProject.docUrl)
                    .then(data => {
                        if (data && data.blocks && data.blocks.length > 0) {
                            setDocData(data);
                        } else {
                            setError(true);
                        }
                    })
                    .catch(() => setError(true))
                    .finally(() => setDocLoading(false));
            }
        }).catch(err => {
            console.error('Failed to load project details:', err);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col pt-16">
                <Header />
                <div className="flex-grow flex items-center justify-center">
                    <div className="icon-loader text-4xl text-gray-400 animate-spin"></div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col pt-16">
                <Header />
                <div className="flex-grow flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold mb-4">未找到该项目</h1>
                    <a href="works.html" className="text-blue-600 hover:underline">返回作品列表</a>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
            <Header />
            <main className="flex-grow pt-24">
                {/* Hero Section */}
                <div className="w-full h-[40vh] md:h-[60vh] relative bg-gray-100 mx-auto max-w-7xl md:rounded-3xl overflow-hidden mt-6 shadow-sm">
                    <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10">
                        <button 
                            onClick={() => window.history.length > 1 ? window.history.back() : window.location.href = 'works.html'} 
                            className="flex items-center gap-2 px-5 py-2.5 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full text-white text-sm font-medium transition-all"
                        >
                            <div className="icon-arrow-left text-lg"></div>
                            <span>返回</span>
                        </button>
                    </div>
                    <ProjectImage project={project} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 w-full">
                        <div className="max-w-5xl mx-auto px-6 md:px-12 pb-12 text-white">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium tracking-wide">
                                    {project.category}
                                </span>
                                <span className="px-4 py-1.5 bg-black/30 backdrop-blur-md rounded-full text-sm font-medium flex items-center gap-1.5 tracking-wide">
                                    <div className="icon-user text-xs"></div>
                                    {project.role}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 tracking-wide">{project.title}</h1>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="section-padding">
                    <div className="mb-16 pb-12 border-b border-gray-200/60">
                        <h2 className="text-xl md:text-2xl font-serif font-bold mb-6 text-[var(--text-primary)] tracking-widest">项目简介</h2>
                        <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed whitespace-pre-line text-justify">
                            {renderTextWithLinks(project.detailDesc || project.desc)}
                        </p>
                    </div>

                    <div className="prose prose-lg max-w-none text-[var(--text-primary)]">
                        {docLoading ? (
                            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                                <div className="icon-loader text-3xl animate-spin mb-4"></div>
                                <p>正在读取文档内容...</p>
                            </div>
                        ) : error ? (
                            <div className="bg-[var(--bg-secondary)] rounded-3xl p-10 text-center">
                                <div className="icon-lock text-5xl text-gray-400 mb-6 mx-auto"></div>
                                <h3 className="text-2xl font-bold mb-4">知识库权限受限</h3>
                                <p className="text-gray-500 mb-8 max-w-xl mx-auto">
                                    抱歉，由于该作品的飞书知识库设置了“无法对组织外用户分享”，因此网站无法直接获取并在页面内展示正文内容。
                                </p>
                                {project.docUrl ? (
                                    <a 
                                        href={project.docUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        <span>在飞书中打开并阅读详情</span>
                                        <div className="icon-arrow-right"></div>
                                    </a>
                                ) : (
                                    <p className="text-gray-400">暂无文档链接</p>
                                )}
                            </div>
                        ) : !project.docUrl ? (
                            <div className="text-center py-20 text-gray-400 bg-gray-50 rounded-3xl">
                                <p>该作品暂无详细图文内容</p>
                            </div>
                        ) : (
                            <FeishuDocRenderer docData={docData} />
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <ProjectApp />
  </ErrorBoundary>
);