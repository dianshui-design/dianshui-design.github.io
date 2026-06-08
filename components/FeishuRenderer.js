function FeishuImage({ fileToken, token }) {
    const [imgUrl, setImgUrl] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [errorMsg, setErrorMsg] = React.useState(null);

    React.useEffect(() => {
        if (!fileToken || !token) return;

        let isMounted = true;

        const fetchImage = async (retryCount = 0) => {
            try {
                const url = `https://open.feishu.cn/open-apis/drive/v1/medias/${fileToken}/download`;
                const res = await fetch(`https://proxy-api.trickle-app.host/?url=${encodeURIComponent(url)}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                }).catch(e => { throw new Error(`Failed to fetch: ${e.message}`); });
                
                if (!res.ok) {
                    const errText = await res.text();
                    const isRateLimit = res.status === 429 || (res.status === 400 && errText.includes('frequency limit')) || errText.includes('99991400');
                    const isServerError = res.status >= 500;
                    
                    if ((isRateLimit || isServerError) && retryCount < 5) {
                        throw new Error('RETRY_FETCH');
                    }
                    throw new Error(`[${res.status}] ${errText.substring(0, 150)}`);
                }
                
                const blob = await res.blob();
                const objectUrl = URL.createObjectURL(blob);
                
                if (isMounted) {
                    setImgUrl(objectUrl);
                    setLoading(false);
                }
            } catch (err) {
                const isRetryableError = err.message === 'RETRY_FETCH' || 
                                         err.message.includes('Failed to fetch') || 
                                         err.message.includes('NetworkError');

                if (isRetryableError && retryCount < 5) {
                    const delay = 1500 * (retryCount + 1) + Math.random() * 2000;
                    setTimeout(() => {
                        if (isMounted) fetchImage(retryCount + 1);
                    }, delay);
                    return;
                }

                console.error('Fetch image error:', err);
                if (isMounted) {
                    setErrorMsg(err.message === 'RETRY_FETCH' ? '获取图片过于频繁，请稍后再试' : err.message);
                    setLoading(false);
                }
            }
        };

        fetchImage();

        return () => { isMounted = false; };
    }, [fileToken, token]);

    if (loading) {
        return <div className="w-full h-48 bg-gray-100 animate-pulse rounded-2xl my-6 flex items-center justify-center"><div className="icon-image text-3xl text-gray-300"></div></div>;
    }

    if (!imgUrl) {
        return (
            <div className="w-full p-6 bg-gray-50 text-gray-400 text-center rounded-2xl my-6 flex flex-col items-center justify-center gap-2">
                <div className="icon-image text-2xl"></div>
                <span className="font-medium text-gray-500">无法加载图片</span>
                {errorMsg && <span className="text-xs text-red-400 break-all max-w-xl">{errorMsg}</span>}
            </div>
        );
    }

    return (
        <img src={imgUrl} alt="Feishu Content" className="max-w-full h-auto block rounded-2xl shadow-sm my-8" />
    );
}

function FeishuBlock({ block, token }) {
    const renderElements = (elements) => {
        if (!elements) return '';
        
        const renderLinkOrEmbed = (url, text, key) => {
            // Check for YouTube links
            const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^& \n]+)/);
            if (ytMatch) {
                return (
                    <div key={`yt-${key}`} className="my-6 aspect-video w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-sm bg-gray-100 border border-gray-200/50">
                        <iframe 
                            width="100%" 
                            height="100%" 
                            src={`https://www.youtube.com/embed/${ytMatch[1]}`} 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                    </div>
                );
            }
            
            // Check for Bilibili links
            const bilibiliMatch = url.match(/bilibili\.com\/video\/([^/?]+)/);
            if (bilibiliMatch) {
                return (
                    <div key={`bili-${key}`} className="my-6 aspect-video w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-sm bg-gray-100 border border-gray-200/50">
                        <iframe 
                            width="100%" 
                            height="100%" 
                            src={`//player.bilibili.com/player.html?bvid=${bilibiliMatch[1]}&page=1&autoplay=0`} 
                            scrolling="no" 
                            border="0" 
                            frameBorder="no" 
                            framespacing="0" 
                            allowFullScreen
                        ></iframe>
                    </div>
                );
            }

            // Normal link
            return (
                <a 
                    key={key} 
                    href={url} 
                    onClick={(e) => {
                        e.preventDefault();
                        window.open(url, '_blank', 'noopener,noreferrer');
                    }}
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors break-all"
                >
                    {text}
                </a>
            );
        };

        return elements.map((el, idx) => {
            const content = el.text_run?.content || '';
            const link = el.text_run?.text_element_style?.link?.url;
            
            if (link) {
                return renderLinkOrEmbed(link, content, idx);
            }

            // Fallback for raw URLs in text that aren't marked as links in Feishu
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            if (urlRegex.test(content)) {
                const parts = content.split(urlRegex);
                return parts.map((part, i) => {
                    if (part.match(urlRegex)) {
                        return renderLinkOrEmbed(part, part, `${idx}-${i}`);
                    }
                    return part;
                });
            }

            return content;
        });
    };

    switch (block.block_type) {
        case 1: // Page
            return null;
        case 2: { // Text
            const content = renderElements(block.text?.elements);
            const isEmpty = !content || (Array.isArray(content) && content.every(item => typeof item === 'string' && !item.trim()));
            if (isEmpty) return <br />;
            return <div className="mb-6 text-[var(--text-secondary)] leading-relaxed text-[15px] md:text-base text-justify whitespace-pre-wrap">{content}</div>;
        }
        case 3: // Heading 1
            return <h1 className="text-3xl md:text-4xl font-serif font-bold mt-16 mb-8 text-[var(--text-primary)] tracking-wide">{renderElements(block.heading1?.elements)}</h1>;
        case 4: // Heading 2
            return <h2 className="text-2xl md:text-3xl font-serif font-bold mt-12 mb-6 text-[var(--text-primary)] tracking-wide">{renderElements(block.heading2?.elements)}</h2>;
        case 5: // Heading 3
            return <h3 className="text-xl md:text-2xl font-serif font-bold mt-10 mb-4 text-[var(--text-primary)] tracking-wide">{renderElements(block.heading3?.elements)}</h3>;
        case 12: // Bullet List
            return <li className="ml-6 list-disc text-[var(--text-secondary)] text-[15px] md:text-base mb-3 pl-2 leading-relaxed whitespace-pre-wrap">{renderElements(block.bullet?.elements)}</li>;
        case 13: // Numbered List
            return <li className="ml-6 list-decimal text-[var(--text-secondary)] text-[15px] md:text-base mb-3 pl-2 leading-relaxed whitespace-pre-wrap">{renderElements(block.ordered?.elements)}</li>;
        case 15: // Quote
            return <blockquote className="border-l-4 border-gray-300/60 pl-5 italic text-gray-500 my-8 bg-white/40 backdrop-blur-sm py-4 pr-4 rounded-r-2xl text-[15px] md:text-base whitespace-pre-wrap">{renderElements(block.quote?.elements)}</blockquote>;
        case 27: // Image
            return <FeishuImage fileToken={block.image?.token} token={token} />;
        case 28: // Callout
            return (
                <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100 my-6 flex gap-4 items-start">
                    <div className="icon-info text-blue-500 text-xl mt-1"></div>
                    <div className="text-gray-700 text-lg whitespace-pre-wrap">{renderElements(block.callout?.elements)}</div>
                </div>
            );
        default:
            return null;
    }
}

function FeishuDocRenderer({ docData }) {
    if (!docData || !docData.blocks || docData.blocks.length === 0) {
        return <p className="text-gray-500 text-center py-10">暂无详细内容</p>;
    }

    return (
        <div className="feishu-doc-content w-full max-w-none break-words">
            {docData.blocks.map(block => (
                <FeishuBlock key={block.block_id} block={block} token={docData.token} />
            ))}
        </div>
    );
}