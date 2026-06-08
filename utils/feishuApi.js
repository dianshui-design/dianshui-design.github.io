const defaultProjects = [
    {
        title: "TC Games 电脑玩手游助手",
        category: "产品设计 (UI/UX)",
        role: "UI/UX 设计",
        desc: "用电脑键鼠畅玩手机游戏的投屏工具。",
        img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1600",
        colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
        tags: "全球化产品 · 产品体验"
    },
    {
        title: "手机控 Total Control",
        category: "产品设计 (UI/UX)",
        role: "UI设计",
        desc: "支持多设备同步控制与自动化操作的安卓云控工具。",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        colSpan: "col-span-1",
        tags: "企业级产品 · 设计系统"
    },
    {
        title: "低空救援智能指挥平台",
        category: "产品设计 (UI/UX)",
        role: "UI/UX 设计",
        desc: "应急救援的数据可视化与指挥中心，提供实时大屏监控与决策支持。",
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600",
        colSpan: "col-span-1 md:col-span-2 lg:col-span-3",
        tags: "数据可视化 · 指挥调度"
    },
    {
        title: "我在西藏有棵树",
        category: "网页 & 小程序",
        role: "小程序设计",
        desc: "环保公益类微信小程序，提供认养树木、绿化地图与互动体验。",
        img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
        colSpan: "col-span-1",
        tags: "公益项目"
    },
    {
        title: "西藏政协官网",
        category: "网页 & 小程序",
        role: "官网设计",
        desc: "政务公开与新闻资讯门户网站，注重信息架构与严谨的视觉传达。",
        img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
        colSpan: "col-span-1",
        tags: "政务平台"
    },
    {
        title: "惟精应急官网",
        category: "网页 & 小程序",
        role: "官网设计",
        desc: "企业级官网重构，展示应急救援核心技术方案与产品矩阵。",
        img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
        colSpan: "col-span-1",
        tags: "企业官网"
    },
    {
        title: "各类运营设计",
        category: "视觉 & 运营",
        role: "运营设计",
        desc: "包含产品发布海报、活动专题页、宣发物料等综合运营视觉设计。",
        img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1600",
        colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
        tags: "品牌运营"
    },
    {
        title: "小视频设计与制作",
        category: "视觉 & 运营",
        role: "视频制作",
        desc: "产品演示、功能教程及宣发短视频的策划、剪辑与动效包装。",
        img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800",
        colSpan: "col-span-1",
        tags: "品牌运营"
    }
];

async function fetchWithRetry(url, options = {}, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const res = await fetch(url, options);
            if (res.ok) return res;
            if (res.status >= 500 || res.status === 429) {
                await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
                continue;
            }
            return res;
        } catch (error) {
            if (i === retries - 1) {
                return { ok: false, status: 500, text: async () => 'Failed to fetch', json: async () => ({}) };
            }
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
    }
    return { ok: false, status: 500, text: async () => 'Fetch request failed after retries', json: async () => ({}) };
}

function getProxyUrl(targetUrl) {
    return `https://proxy-api.trickle-app.host/?url=${encodeURIComponent(targetUrl)}`;
}

async function fetchFeishuDocContent(docUrl) {
    if (!docUrl || typeof docUrl !== 'string') return null;
    
    // 提取 documentId
    // 常见格式: https://xxx.feishu.cn/docx/doxcniKxxxxxxxxxxxxxxxxx
    const match = docUrl.match(/docx\/([a-zA-Z0-9_-]+)/);
    if (!match || !match[1]) return null;
    const documentId = match[1];

    const APP_ID = 'cli_aa9edcb04a78dcbb';
    const APP_SECRET = 'oG7sf77IV1ThT8NrIWKodfIjBZgMOzqE';

    try {
        const tokenRes = await fetchWithRetry(getProxyUrl('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ app_id: APP_ID, app_secret: APP_SECRET })
        });
        if (!tokenRes.ok) throw new Error(`Token fetch failed: ${await tokenRes.text()}`);
        const tokenData = await tokenRes.json();
        const token = tokenData.tenant_access_token;
        if (!token) throw new Error('无法获取飞书 Token');

        // 获取文档 blocks
        const blocksUrl = `https://open.feishu.cn/open-apis/docx/v1/documents/${documentId}/blocks?page_size=500`;
        const blocksRes = await fetchWithRetry(getProxyUrl(blocksUrl), {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!blocksRes.ok) throw new Error(`Blocks fetch failed: ${await blocksRes.text()}`);
        const blocksData = await blocksRes.json();
        
        if (blocksData.code !== 0) throw new Error(blocksData.msg || '获取文档内容失败');
        
        return {
            blocks: blocksData.data.items || [],
            token: token
        };
    } catch (error) {
        console.warn('Feishu doc fetch network/proxy error. Details:', error.message);
        return null;
    }
}

async function fetchFeishuProjects() {
    const APP_ID = 'cli_aa9edcb04a78dcbb';
    const APP_SECRET = 'oG7sf77IV1ThT8NrIWKodfIjBZgMOzqE';
    const APP_TOKEN = 'XO6rb9m8macMfCs6cL6cBSdFn4e';
    const TABLE_ID = 'tblOHyU3hFaZgl3X';

    try {
        // 1. 获取 tenant_access_token (通过代理以防 CORS)
        const tokenRes = await fetchWithRetry(getProxyUrl('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ app_id: APP_ID, app_secret: APP_SECRET })
        });
        if (!tokenRes.ok) throw new Error(`Token fetch failed: ${await tokenRes.text()}`);
        const tokenData = await tokenRes.json();
        const token = tokenData.tenant_access_token;
        
        if (!token) throw new Error('无法获取飞书 Token');

        // 2. 获取多维表格数据
        const url = `https://open.feishu.cn/open-apis/bitable/v1/apps/${APP_TOKEN}/tables/${TABLE_ID}/records?page_size=100`;
        const recordsRes = await fetchWithRetry(getProxyUrl(url), {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!recordsRes.ok) throw new Error(`Records fetch failed: ${await recordsRes.text()}`);
        const recordsData = await recordsRes.json();
        console.log("Feishu API Response:", recordsData); // 增加控制台打印以供排查
        
        if (recordsData.code !== 0) throw new Error(recordsData.msg || '获取表格数据失败');
        
        const items = recordsData.data.items || [];
        
        // 3. 过滤“已发布”状态的数据并映射字段
        const publishedItems = items.filter(item => {
            const fields = item.fields || {};
            let status = '';
            const statusVal = fields['发布状态'] || fields['状态'] || fields['Status'];
            if (statusVal) {
                if (typeof statusVal === 'string') status = statusVal;
                else if (Array.isArray(statusVal)) status = statusVal[0]?.text || statusVal[0]?.name || statusVal[0] || '';
                else if (statusVal.text) status = statusVal.text;
                else if (statusVal.name) status = statusVal.name;
            }
            return status === '已发布';
        });

        const parsedProjects = publishedItems.map(item => {
            const fields = item.fields || {};
            
            const getVal = (keys) => {
                for (const key of keys) {
                    const val = fields[key];
                    if (val) {
                        if (typeof val === 'string') return val;
                        if (Array.isArray(val)) return val[0]?.text || val[0]?.name || val[0] || '';
                        if (val.text) return val.text;
                    }
                }
                return '';
            };

            let img = null;
            let imgToken = null;
            const imgKeys = ['封面', '图片', '封面图片', '作品图', 'Image', 'Cover', 'URL', '链接'];
            for (const key of imgKeys) {
                const val = fields[key];
                if (val) {
                    if (typeof val === 'string' && val.startsWith('http')) { img = val; break; }
                    if (val.text && val.text.startsWith('http')) { img = val.text; break; }
                    if (Array.isArray(val) && val[0]) {
                        if (val[0].file_token) { imgToken = val[0].file_token; break; }
                        if (val[0].link) { img = val[0].link; break; }
                        if (val[0].url) { img = val[0].url; break; }
                        if (typeof val[0] === 'string' && val[0].startsWith('http')) { img = val[0]; break; }
                    }
                }
            }

            // 如果预设的字段名都没有找到图片，则遍历所有字段，寻找包含 file_token 的附件字段作为兜底
            if (!img && !imgToken) {
                for (const key in fields) {
                    const val = fields[key];
                    if (Array.isArray(val) && val.length > 0 && val[0].file_token) {
                        // 简单判断一下是否可能是图片附件（根据名称后缀或 mimetype，虽然飞书返回的可能有 type 字段）
                        imgToken = val[0].file_token;
                        break;
                    }
                }
            }

            const title = getVal(['标题', '项目名称', '作品名', '名称', 'Title']) || '未命名作品';
            
            // 兜底图片处理
            if (!img && !imgToken) {
                const matchedDefault = defaultProjects.find(dp => dp.title.includes(title) || title.includes(dp.title));
                img = matchedDefault ? matchedDefault.img : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800";
            }

            const colSpanVal = getVal(['展示宽度', '网格', '跨度', 'ColSpan']);
            let colSpan = 'col-span-1';
            if (colSpanVal === '大' || colSpanVal === '宽' || colSpanVal === '2' || colSpanVal === '大图') colSpan = 'col-span-1 md:col-span-2 lg:col-span-2';
            if (colSpanVal === '全屏' || colSpanVal === '3') colSpan = 'col-span-1 md:col-span-2 lg:col-span-3';

            let docUrl = null;
            const docKeys = ['链接', '知识库链接', '文档', 'URL', 'Link'];
            for (const key of docKeys) {
                const val = fields[key];
                if (val) {
                    if (typeof val === 'string' && val.startsWith('http')) { docUrl = val; break; }
                    if (val.link) { docUrl = val.link; break; }
                    if (val.text && val.text.startsWith('http')) { docUrl = val.text; break; }
                    if (Array.isArray(val) && val[0]) {
                        if (val[0].link) { docUrl = val[0].link; break; }
                        if (val[0].url) { docUrl = val[0].url; break; }
                        if (typeof val[0].text === 'string' && val[0].text.startsWith('http')) { docUrl = val[0].text; break; }
                        if (typeof val[0] === 'string' && val[0].startsWith('http')) { docUrl = val[0]; break; }
                    }
                }
            }

            return {
                title: title,
                category: getVal(['设计类型', '分类', '板块', 'Category']) || '产品设计',
                role: getVal(['角色', '参与角色', 'Role']) || '设计师',
                desc: getVal(['项目描述', '描述', 'Description']) || '暂无描述',
                detailDesc: getVal(['项目简介', '简介', '内容']) || getVal(['项目描述', '描述', 'Description']) || '暂无描述',
                img: img,
                imgToken: imgToken,
                apiToken: token,
                colSpan: colSpan,
                docUrl: docUrl,
                tags: getVal(['项目标签', '标签', 'Tags']) || ''
            };
        });
        
        // 若完全没有拉取到符合规则的数据，则使用默认的兜底数据，以保证网页可以展示
        return parsedProjects.length > 0 ? parsedProjects : defaultProjects;
    } catch (error) {
        console.warn('Feishu API network/proxy error. Using local fallback data. Details:', error.message);
        return defaultProjects;
    }
}
