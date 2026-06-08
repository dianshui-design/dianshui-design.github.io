function ProjectImage({ project, className, alt }) {
    const [imgSrc, setImgSrc] = React.useState(project.img || null);
    const [loading, setLoading] = React.useState(!project.img && !!project.imgToken);

    React.useEffect(() => {
        if (project.imgToken && project.apiToken && !project.img) {
            let isMounted = true;
            const fetchImage = async (retryCount = 0) => {
                try {
                    if (retryCount === 0) {
                        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
                    }
                    const url = `https://open.feishu.cn/open-apis/drive/v1/medias/${project.imgToken}/download`;
                    const res = await fetch(`https://proxy-api.trickle-app.host/?url=${encodeURIComponent(url)}`, {
                        headers: { 'Authorization': `Bearer ${project.apiToken}` }
                    }).catch(e => { throw new Error(`Failed to fetch: ${e.message}`); });
                    
                    if (!res.ok) {
                        const errText = await res.text();
                        const isRateLimit = res.status === 429 || (res.status === 400 && errText.includes('frequency limit')) || errText.includes('99991400');
                        const isServerError = res.status >= 500;
                        
                        if ((isRateLimit || isServerError) && retryCount < 5) {
                            const delay = 1500 * (retryCount + 1) + Math.random() * 2000;
                            setTimeout(() => { if (isMounted) fetchImage(retryCount + 1); }, delay);
                            return;
                        }
                        throw new Error(`Fetch failed: ${res.status} - ${errText.substring(0, 50)}`);
                    }
                    
                    const blob = await res.blob();
                    const objectUrl = URL.createObjectURL(blob);
                    if (isMounted) {
                        setImgSrc(objectUrl);
                        setLoading(false);
                    }
                } catch (err) {
                    console.warn('Fallback to default image due to:', err.message);
                    if (isMounted) {
                        const matchedDefault = typeof defaultProjects !== 'undefined' 
                            ? defaultProjects.find(dp => dp.title.includes(project.title) || project.title.includes(dp.title))
                            : null;
                        setImgSrc(matchedDefault && matchedDefault.img ? matchedDefault.img : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800");
                        setLoading(false);
                    }
                }
            };
            fetchImage();
            return () => { isMounted = false; };
        }
    }, [project.imgToken, project.apiToken, project.img, project.title]);

    if (loading || !imgSrc) {
        return (
            <div className={`bg-gray-100 flex items-center justify-center ${className}`} style={{ minHeight: '100%' }}>
                <div className="icon-image text-gray-300 text-3xl animate-pulse"></div>
            </div>
        );
    }

    return <img src={imgSrc} alt={alt || project.title} className={className} />;
}