"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyWebLaneLanding = MyWebLaneLanding;
const react_1 = require("react");
const script_1 = __importDefault(require("next/script"));
function MyWebLaneLanding() {
    const containerRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        // The script logic from the HTML file
        if (typeof window === "undefined")
            return;
        const runScripts = () => {
            const container = containerRef.current || document.querySelector('.mwl-container');
            // Theme
            const btn = document.getElementById('themeBtn');
            if (btn && container) {
                const stored = localStorage.getItem('mwl-theme');
                if (stored) {
                    container.dataset.theme = stored;
                }
                btn.textContent = container.dataset.theme === 'dark' ? '🌙' : '☀️';
                btn.onclick = () => {
                    const next = container.dataset.theme === 'dark' ? 'light' : 'dark';
                    container.dataset.theme = next;
                    localStorage.setItem('mwl-theme', next);
                    btn.textContent = next === 'dark' ? '🌙' : '☀️';
                };
            }
            // Scramble
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
            const phrases = ['losing the race', 'bleeding money', 'losing customers', 'falling behind'];
            const el = document.getElementById('scrambleTarget');
            let phraseIdx = 0;
            let interval = null;
            function scramble(target) {
                let iter = 0;
                if (interval)
                    clearInterval(interval);
                if (!el)
                    return;
                interval = setInterval(() => {
                    el.textContent = target.split('').map((c, i) => {
                        if (c === ' ')
                            return ' ';
                        if (i < iter)
                            return target[i];
                        return chars[Math.floor(Math.random() * chars.length)];
                    }).join('');
                    if (iter >= target.length && interval)
                        clearInterval(interval);
                    iter += 1.5;
                }, 32);
            }
            if (el) {
                scramble(phrases[0]);
                setInterval(() => {
                    phraseIdx = (phraseIdx + 1) % phrases.length;
                    scramble(phrases[phraseIdx]);
                }, 3200);
            }
            // Odometer & GSAP
            if (window.gsap && window.ScrollTrigger) {
                window.gsap.registerPlugin(window.ScrollTrigger);
                document.querySelectorAll('.odometer').forEach((odo) => {
                    const odoEl = odo;
                    const val = odoEl.dataset.value || "";
                    const suffix = odoEl.dataset.suffix || '';
                    const digits = val.split('');
                    odoEl.innerHTML = '';
                    digits.forEach((d) => {
                        const digit = document.createElement('div');
                        digit.className = 'odo-digit';
                        const strip = document.createElement('div');
                        strip.className = 'odo-strip';
                        for (let i = 0; i <= 9; i++) {
                            const s = document.createElement('span');
                            s.textContent = i.toString();
                            strip.appendChild(s);
                        }
                        digit.appendChild(strip);
                        odoEl.appendChild(digit);
                    });
                    if (suffix) {
                        const s = document.createElement('span');
                        s.className = 'odo-suffix';
                        s.textContent = suffix;
                        odoEl.appendChild(s);
                    }
                    window.ScrollTrigger.create({
                        trigger: odoEl,
                        start: 'top 85%',
                        once: true,
                        onEnter: () => {
                            const strips = odoEl.querySelectorAll('.odo-strip');
                            strips.forEach((strip, i) => {
                                const target = parseInt(digits[i]);
                                const stripEl = strip;
                                const h = stripEl.children[0].offsetHeight || 60;
                                stripEl.style.transform = 'translateY(-' + (target * h) + 'px)';
                                stripEl.style.transitionDelay = (i * 0.1) + 's';
                            });
                        }
                    });
                });
            }
            // Spotlight
            const nicheGrid = document.getElementById('nicheGrid');
            if (nicheGrid) {
                nicheGrid.addEventListener('mousemove', (e) => {
                    nicheGrid.querySelectorAll('.niche-card').forEach((c) => {
                        const card = c;
                        const r = card.getBoundingClientRect();
                        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
                        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
                    });
                });
            }
            const widget = document.getElementById('synthiaWidget');
            if (widget) {
                widget.addEventListener('mousemove', (e) => {
                    const r = widget.getBoundingClientRect();
                    widget.style.setProperty('--mx', (e.clientX - r.left) + 'px');
                    widget.style.setProperty('--my', (e.clientY - r.top) + 'px');
                });
            }
            // Particles
            function spawnParticles(cx, cy) {
                const colors = ['#c9a84c', '#f2ece0', '#4ade80', '#e85555', '#c9a84c'];
                for (let i = 0; i < 24; i++) {
                    const p = document.createElement('div');
                    p.className = 'particle';
                    p.style.background = colors[Math.floor(Math.random() * colors.length)];
                    p.style.left = cx + 'px';
                    p.style.top = cy + 'px';
                    document.body.appendChild(p);
                    const angle = Math.random() * Math.PI * 2;
                    const dist = 50 + Math.random() * 100;
                    const dx = Math.cos(angle) * dist;
                    const dy = Math.sin(angle) * dist - 50;
                    p.style.transition = 'all .7s cubic-bezier(.16,1,.3,1)';
                    p.offsetHeight;
                    p.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(0)';
                    p.style.opacity = '0';
                    setTimeout((el) => { el.remove(); }, 750, p);
                }
            }
            document.querySelectorAll('.explode-cta').forEach((b) => {
                b.addEventListener('click', () => {
                    const r = b.getBoundingClientRect();
                    spawnParticles(r.left + r.width / 2, r.top + r.height / 2);
                });
            });
            // Widget Demo
            let demo = false;
            const widgetDemoBtn = document.getElementById('widgetDemoBtn');
            if (widgetDemoBtn) {
                widgetDemoBtn.addEventListener('click', function () {
                    demo = !demo;
                    const score = document.getElementById('widgetScore');
                    const fills = [
                        { id: 'bf1', v: demo ? 97 : 34 }, { id: 'bf2', v: demo ? 95 : 28 },
                        { id: 'bf3', v: demo ? 96 : 52 }, { id: 'bf4', v: demo ? 98 : 61 }
                    ];
                    if (score) {
                        score.textContent = demo ? '97' : '34';
                        score.className = 'widget-score' + (demo ? ' good' : '');
                    }
                    fills.forEach((f) => {
                        const el = document.getElementById(f.id);
                        if (el) {
                            el.style.width = f.v + '%';
                            el.className = 'bar-fill' + (demo ? ' good' : '');
                            if (el.nextElementSibling)
                                el.nextElementSibling.textContent = f.v.toString();
                        }
                    });
                    this.textContent = demo ? '◀ See Before WordPress' : '▶ See After Migration';
                    const urlSpan = document.querySelector('.widget-url span:last-child');
                    if (urlSpan) {
                        urlSpan.innerHTML = demo ? '<span style="color:var(--speed-green)">▲ 0.4s load</span>' : '<span style="color:var(--speed-red)">▼ 6.2s load</span>';
                    }
                    const widgetTitle = document.querySelector('.widget-title');
                    if (widgetTitle)
                        widgetTitle.textContent = demo ? 'SYNTHIA Score · After' : 'SYNTHIA Score · Before';
                    const r = this.getBoundingClientRect();
                    spawnParticles(r.left + r.width / 2, r.top + r.height / 2);
                });
            }
            // Marquee
            const mq1 = document.getElementById('mq1');
            const mq2 = document.getElementById('mq2');
            let pos1 = 0, pos2 = 0, lastY = window.scrollY, vel = 0;
            let animationId;
            function marqueeLoop() {
                const y = window.scrollY;
                vel = y - lastY;
                lastY = y;
                const speed = 1.2 + Math.abs(vel) * 0.08;
                pos1 -= speed;
                pos2 += speed * 0.7;
                if (mq1 && mq2) {
                    const w1 = mq1.scrollWidth / 2;
                    const w2 = mq2.scrollWidth / 2;
                    if (Math.abs(pos1) >= w1)
                        pos1 = 0;
                    if (pos2 >= w2)
                        pos2 = 0;
                    mq1.style.transform = 'translateX(' + pos1 + 'px)';
                    mq2.style.transform = 'translateX(' + pos2 + 'px)';
                }
                animationId = requestAnimationFrame(marqueeLoop);
            }
            marqueeLoop();
            return () => {
                if (animationId)
                    cancelAnimationFrame(animationId);
            };
        };
        // We wait for GSAP to load
        const checkGsap = setInterval(() => {
            if (window.gsap && window.ScrollTrigger) {
                clearInterval(checkGsap);
                runScripts();
            }
        }, 100);
        return () => clearInterval(checkGsap);
    }, []);
    return (<div ref={containerRef} className="mwl-container" data-theme="dark">
      <script_1.default src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" strategy="lazyOnload"/>
      <script_1.default src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" strategy="lazyOnload"/>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .mwl-container {
          --gold: #c9a84c;
          --gold-dim: rgba(201,168,76,.12);
          --gold-glow: rgba(201,168,76,.35);
          --speed-red: #e85555;
          --speed-green: #4ade80;
          --mono: 'JetBrains Mono', monospace;
          background: var(--bg);
          color: var(--text);
          font-family: 'Outfit', sans-serif;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
          transition: background .3s, color .3s;
          min-height: 100vh;
        }
        .mwl-container[data-theme="dark"] {
          --bg: #07090f;
          --surface: #0d1117;
          --surface2: #131820;
          --text: #f2ece0;
          --muted: #6b7280;
          --border: rgba(255,255,255,.07);
          --card-bg: rgba(13,17,23,.85);
        }
        .mwl-container[data-theme="light"] {
          --bg: #f9f7f2;
          --surface: #ffffff;
          --surface2: #f0ece4;
          --text: #1a1508;
          --muted: #5c5446;
          --border: rgba(0,0,0,.08);
          --card-bg: rgba(255,255,255,.9);
        }
        
        .mwl-container nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 clamp(20px,5vw,60px); height: 64px;
          background: rgba(7,9,15,.7);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          transition: background .3s;
        }
        .mwl-container[data-theme="light"] nav { background: rgba(249,247,242,.85); }
        .mwl-container .nav-brand { font-size: 18px; font-weight: 700; letter-spacing: -.02em; display: flex; align-items: center; gap: 8px; }
        .mwl-container .nav-brand span { color: var(--gold); }
        .mwl-container .nav-right { display: flex; align-items: center; gap: 12px; }
        .mwl-container .theme-toggle {
          width: 36px; height: 36px; border-radius: 8px; border: 1px solid var(--border);
          background: var(--surface); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; transition: all .2s; color: var(--text);
        }
        .mwl-container .theme-toggle:hover { border-color: var(--gold); transform: scale(1.05); }
        .mwl-container .nav-cta {
          padding: 8px 20px; background: var(--gold); color: #07090f;
          border: none; border-radius: 8px; font-family: 'Outfit', sans-serif;
          font-weight: 600; font-size: 14px; cursor: pointer; transition: all .2s;
        }
        .mwl-container .nav-cta:hover { opacity: .9; transform: translateY(-1px); }

        .mwl-container .hero {
          min-height: 100dvh; display: flex; flex-direction: column;
          align-items: center; justify-content: center; text-align: center;
          padding: 100px clamp(20px,5vw,60px) 60px; position: relative; overflow: hidden;
        }
        .mwl-container .hero-grid-bg {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(201,168,76,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,.04) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%);
        }
        .mwl-container .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          border: 1px solid var(--gold-glow); background: var(--gold-dim);
          padding: 6px 16px; border-radius: 100px;
          font-size: 12px; font-weight: 500; letter-spacing: .08em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 32px;
        }
        .mwl-container .hero-badge::before {
          content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--speed-green);
          animation: blink 1.8s ease-in-out infinite;
        }
        @keyframes blink { 0%,100% {opacity:1} 50% {opacity:.3} }
        
        .mwl-container .hero-h1 {
          font-size: clamp(38px,7vw,88px); font-weight: 800; line-height: 1.08;
          letter-spacing: -.035em; max-width: 900px; margin-bottom: 24px;
        }
        .mwl-container .scramble-target { color: var(--gold); }
        .mwl-container .hero-sub {
          font-size: clamp(16px,2vw,20px); color: var(--muted);
          max-width: 56ch; line-height: 1.6; margin-bottom: 48px;
        }
        .mwl-container .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; }
        
        .mwl-container .synthia-widget {
          margin-top: 64px; background: var(--surface);
          border: 1px solid var(--border); border-radius: 20px;
          padding: 32px; max-width: 520px; width: 100%; text-align: left;
          position: relative; overflow: hidden;
        }
        .mwl-container .synthia-widget::before {
          content: ''; position: absolute; inset: -1px; border-radius: 20px;
          background: radial-gradient(circle 200px at var(--mx,50%) var(--my,50%), rgba(201,168,76,.08), transparent);
          opacity: 0; transition: opacity .3s; pointer-events: none;
        }
        .mwl-container .synthia-widget:hover::before { opacity: 1; }
        .mwl-container .widget-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .mwl-container .widget-title { font-size: 13px; font-weight: 600; letter-spacing: .05em; text-transform: uppercase; color: var(--muted); }
        .mwl-container .widget-score { font-family: var(--mono); font-size: 32px; font-weight: 700; color: var(--speed-red); transition: color .5s; }
        .mwl-container .widget-score.good { color: var(--speed-green); }
        .mwl-container .widget-url {
          font-family: var(--mono); font-size: 12px; color: var(--muted);
          margin-bottom: 16px; padding: 8px 12px; background: var(--surface2);
          border-radius: 6px; display: flex; align-items: center; justify-content: space-between;
        }
        .mwl-container .widget-bars { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
        .mwl-container .bar-row { display: flex; align-items: center; gap: 12px; }
        .mwl-container .bar-label { font-size: 12px; color: var(--muted); width: 100px; flex-shrink: 0; }
        .mwl-container .bar-track { flex: 1; height: 6px; background: var(--surface2); border-radius: 3px; overflow: hidden; }
        .mwl-container .bar-fill {
          height: 100%; border-radius: 3px; background: var(--speed-red);
          width: 0; transition: width 1.2s cubic-bezier(.16,1,.3,1), background .5s;
        }
        .mwl-container .bar-fill.good { background: var(--speed-green); }
        .mwl-container .bar-val { font-family: var(--mono); font-size: 12px; color: var(--muted); width: 32px; text-align: right; }
        .mwl-container .widget-cta {
          width: 100%; padding: 12px; background: var(--gold); color: #07090f;
          border: none; border-radius: 10px; font-family: 'Outfit', sans-serif;
          font-weight: 700; font-size: 14px; cursor: pointer; transition: all .2s;
        }
        .mwl-container .widget-cta:hover { opacity: .9; }

        .mwl-container .marquee-section { padding: 48px 0; overflow: hidden; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .mwl-container .marquee-row { display: flex; white-space: nowrap; will-change: transform; padding: 6px 0; }
        .mwl-container .marquee-item {
          display: inline-flex; align-items: center; padding: 0 32px;
          font-size: clamp(32px,6vw,72px); font-weight: 800; letter-spacing: -.04em;
          color: var(--text); flex-shrink: 0; opacity: .6; transition: opacity .2s;
        }
        .mwl-container .marquee-item:hover { opacity: 1; }
        .mwl-container .marquee-item .sep {
          display: inline-block; width: 10px; height: 10px; border-radius: 50%;
          background: var(--gold); margin: 0 24px; flex-shrink: 0;
        }
        .mwl-container .marquee-row.outline .marquee-item { color: transparent; -webkit-text-stroke: 1.5px var(--muted); }

        .mwl-container .stats-section, .mwl-container .niches-section, .mwl-container .how-section, .mwl-container .proof-section {
          padding: 80px clamp(20px,5vw,80px); max-width: 1100px; margin: 0 auto;
        }
        .mwl-container .how-section { max-width: 900px; text-align: center; }
        .mwl-container .section-label { font-size: 12px; letter-spacing: .15em; text-transform: uppercase; color: var(--gold); margin-bottom: 16px; }
        .mwl-container .section-h2 { font-size: clamp(28px,4vw,48px); font-weight: 700; letter-spacing: -.025em; margin-bottom: 48px; }
        .mwl-container .stats-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(200px,1fr)); gap: 1px; background: var(--border); border-radius: 16px; overflow: hidden; }
        .mwl-container .stat-card { background: var(--surface); padding: 40px 28px; text-align: center; position: relative; overflow: hidden; }
        .mwl-container .odometer {
          font-family: var(--mono); font-size: clamp(40px,6vw,68px); font-weight: 700;
          color: var(--gold); letter-spacing: -.04em; overflow: hidden; height: 1.15em;
          display: flex; justify-content: center; align-items: flex-start;
        }
        .mwl-container .odo-digit { display: inline-block; overflow: hidden; height: 1.15em; position: relative; }
        .mwl-container .odo-strip { display: flex; flex-direction: column; transition: transform 1.4s cubic-bezier(.16,1,.3,1); }
        .mwl-container .odo-strip span { display: block; height: 1.15em; line-height: 1.15; }
        .mwl-container .odo-suffix { font-family: var(--mono); font-size: clamp(28px,4vw,44px); font-weight: 700; color: var(--gold); vertical-align: top; line-height: 1.4; }
        .mwl-container .stat-label { font-size: 14px; color: var(--muted); margin-top: 8px; }

        .mwl-container .niche-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(240px,1fr)); gap: 1px; background: var(--border); border-radius: 20px; overflow: hidden; }
        .mwl-container .niche-card { background: var(--surface); padding: 40px 28px; position: relative; overflow: hidden; cursor: default; }
        .mwl-container .niche-card::before {
          content: ''; position: absolute; inset: -1px;
          background: radial-gradient(circle 160px at var(--mx,50%) var(--my,50%), var(--gold-glow), transparent);
          opacity: 0; transition: opacity .3s; pointer-events: none; border-radius: inherit;
        }
        .mwl-container .niche-card:hover::before { opacity: 1; }
        .mwl-container .niche-num { font-family: var(--mono); font-size: 11px; letter-spacing: .08em; color: var(--gold); opacity: .5; margin-bottom: 20px; }
        .mwl-container .niche-icon { font-size: 32px; margin-bottom: 12px; }
        .mwl-container .niche-card h3 { font-size: 17px; font-weight: 600; margin-bottom: 6px; }
        .mwl-container .niche-card p { font-size: 13px; color: var(--muted); line-height: 1.55; }
        .mwl-container .niche-score { margin-top: 16px; display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--muted); }
        .mwl-container .niche-score-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--speed-red); }
        .mwl-container .niche-score-dot.good { background: var(--speed-green); }

        .mwl-container .steps { display: grid; grid-template-columns: repeat(auto-fit,minmax(220px,1fr)); gap: 32px; margin-top: 48px; }
        .mwl-container .step { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 32px 24px; text-align: left; position: relative; }
        .mwl-container .step-num { font-family: var(--mono); font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: var(--gold); margin-bottom: 12px; }
        .mwl-container .step h3 { font-size: 16px; font-weight: 600; margin-bottom: 8px; }
        .mwl-container .step p { font-size: 13px; color: var(--muted); line-height: 1.55; }
        .mwl-container .step-connector { position: absolute; right: -17px; top: 50%; transform: translateY(-50%); width: 32px; height: 2px; background: var(--border); display: none; }
        @media(min-width:720px){.mwl-container .step-connector{display:block}}
        .mwl-container .step:last-child .step-connector { display: none; }

        .mwl-container .proof-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(280px,1fr)); gap: 16px; }
        .mwl-container .proof-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 28px; }
        .mwl-container .proof-stars { color: var(--gold); font-size: 14px; margin-bottom: 12px; letter-spacing: 2px; }
        .mwl-container .proof-text { font-size: 15px; color: var(--text); line-height: 1.6; margin-bottom: 16px; }
        .mwl-container .proof-author { display: flex; align-items: center; gap: 10px; font-size: 13px; }
        .mwl-container .proof-avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--gold-dim); border: 1.5px solid var(--gold-glow); display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: var(--gold); }
        .mwl-container .proof-meta { display: flex; flex-direction: column; gap: 1px; }
        .mwl-container .proof-name { font-weight: 600; }
        .mwl-container .proof-biz { font-size: 12px; color: var(--muted); }

        .mwl-container .cta-section { text-align: center; padding: 100px clamp(20px,5vw,60px); position: relative; overflow: hidden; }
        .mwl-container .cta-glow { position: absolute; inset: 0; background: radial-gradient(ellipse 60% 40% at 50% 50%, var(--gold-dim), transparent); }

        .mwl-container .btn-primary { padding: 16px 40px; background: var(--gold); color: #07090f; border: none; border-radius: 12px; font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 16px; cursor: pointer; transition: all .2s; position: relative; display: inline-block; }
        .mwl-container .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 24px var(--gold-glow); }
        .mwl-container .btn-secondary { padding: 16px 40px; background: transparent; color: var(--text); border: 1px solid var(--border); border-radius: 12px; font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 16px; cursor: pointer; transition: all .2s; }
        .mwl-container .btn-secondary:hover { border-color: var(--gold); color: var(--gold); }

        .particle { position: fixed; width: 8px; height: 8px; border-radius: 50%; pointer-events: none; z-index: 9999; }

        .mwl-container footer { border-top: 1px solid var(--border); padding: 40px clamp(20px,5vw,80px); display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: space-between; font-size: 13px; color: var(--muted); }
        .mwl-container .footer-brand { font-weight: 700; color: var(--text); }
        .mwl-container .footer-brand span { color: var(--gold); }
      ` }}/>

      <nav>
        <div className="nav-brand">My <span>Web Lane</span></div>
        <div className="nav-right">
          <button className="theme-toggle" id="themeBtn" title="Toggle theme">🌙</button>
          <button className="nav-cta" onClick={() => window.scrollTo({ top: document.querySelector('.cta-section')?.getBoundingClientRect().top + window.scrollY, behavior: 'smooth' })}>
            Free Audit
          </button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-grid-bg"></div>
        <div className="hero-badge">SYNTHIA Powered · Migrates in 25 Minutes</div>
        <h1 className="hero-h1">
          Your WordPress site is<br />
          <span className="scramble-target" id="scrambleTarget">losing the race</span>
        </h1>
        <p className="hero-sub">
          We migrate slow WordPress sites to blazing-fast Astro + Cloudflare Pages —
          in 25 minutes, not 4 weeks. Score 95+ on Lighthouse or we fix it free.
        </p>
        <div className="hero-actions">
          <button className="btn-primary explode-cta" id="heroAuditBtn">Run Free Audit</button>
          <button className="btn-secondary">See Live Demo</button>
        </div>

        <div className="synthia-widget" id="synthiaWidget">
          <div className="widget-header">
            <div className="widget-title">SYNTHIA Score · Before</div>
            <div className="widget-score" id="widgetScore">34</div>
          </div>
          <div className="widget-url">
            <span>yourslowsite.com</span>
            <span style={{ color: "var(--speed-red)" }}>▼ 6.2s load</span>
          </div>
          <div className="widget-bars">
            <div className="bar-row">
              <div className="bar-label">Performance</div>
              <div className="bar-track"><div className="bar-fill" id="bf1" style={{ width: "34%" }}></div></div>
              <div className="bar-val" id="bv1">34</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Speed</div>
              <div className="bar-track"><div className="bar-fill" id="bf2" style={{ width: "28%" }}></div></div>
              <div className="bar-val" id="bv2">28</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Best Practices</div>
              <div className="bar-track"><div className="bar-fill" id="bf3" style={{ width: "52%" }}></div></div>
              <div className="bar-val" id="bv3">52</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">SEO</div>
              <div className="bar-track"><div className="bar-fill" id="bf4" style={{ width: "61%" }}></div></div>
              <div className="bar-val" id="bv4">61</div>
            </div>
          </div>
          <button className="widget-cta" id="widgetDemoBtn">▶ See After Migration</button>
        </div>
      </section>

      <div className="marquee-section">
        <div className="marquee-row" id="mq1">
          <div className="marquee-item">Speed Wins<span className="sep"></span></div>
          <div className="marquee-item">25-Min Migration<span className="sep"></span></div>
          <div className="marquee-item">95+ Lighthouse<span className="sep"></span></div>
          <div className="marquee-item">Zero Downtime<span className="sep"></span></div>
          <div className="marquee-item">Speed Wins<span className="sep"></span></div>
          <div className="marquee-item">25-Min Migration<span className="sep"></span></div>
          <div className="marquee-item">95+ Lighthouse<span className="sep"></span></div>
          <div className="marquee-item">Zero Downtime<span className="sep"></span></div>
        </div>
        <div className="marquee-row outline" id="mq2">
          <div className="marquee-item">WP → Astro<span className="sep"></span></div>
          <div className="marquee-item">India · USA · Mexico<span className="sep"></span></div>
          <div className="marquee-item">AI-Powered<span className="sep"></span></div>
          <div className="marquee-item">Cloudflare Edge<span className="sep"></span></div>
          <div className="marquee-item">WP → Astro<span className="sep"></span></div>
          <div className="marquee-item">India · USA · Mexico<span className="sep"></span></div>
          <div className="marquee-item">AI-Powered<span className="sep"></span></div>
          <div className="marquee-item">Cloudflare Edge<span className="sep"></span></div>
        </div>
      </div>

      <section className="stats-section">
        <div className="section-label">By the Numbers</div>
        <h2 className="section-h2">Real results, real fast</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="odometer" data-value="847">—</div>
            <div className="stat-label">Sites migrated</div>
          </div>
          <div className="stat-card">
            <div className="odometer" data-value="96" data-suffix="+">—</div>
            <div className="stat-label">Avg Lighthouse score</div>
          </div>
          <div className="stat-card">
            <div className="odometer" data-value="25" data-suffix="m">—</div>
            <div className="stat-label">Avg migration time</div>
          </div>
          <div className="stat-card">
            <div className="odometer" data-value="98" data-suffix="%">—</div>
            <div className="stat-label">Client satisfaction</div>
          </div>
        </div>
      </section>

      <section className="niches-section">
        <div className="section-label">Who We Serve</div>
        <h2 className="section-h2">Every niche, one lane</h2>
        <div className="niche-grid" id="nicheGrid">
          <div className="niche-card">
            <div className="niche-num">01</div>
            <div className="niche-icon">🏥</div>
            <h3>Healthcare & Clinics</h3>
            <p>Patient portals and appointment sites that load before the competition finishes loading.</p>
            <div className="niche-score"><div className="niche-score-dot"></div>Avg before: 31 · After: 97</div>
          </div>
          <div className="niche-card">
            <div className="niche-num">02</div>
            <div className="niche-icon">⚖️</div>
            <h3>Law Firms</h3>
            <p>Client-acquiring sites where a 1-second delay costs you a consultation booking.</p>
            <div className="niche-score"><div className="niche-score-dot"></div>Avg before: 38 · After: 95</div>
          </div>
          <div className="niche-card">
            <div className="niche-num">03</div>
            <div className="niche-icon">🛒</div>
            <h3>E-Commerce</h3>
            <p>WooCommerce sites too slow to convert. We strip the plugins, keep the sales.</p>
            <div className="niche-score"><div className="niche-score-dot"></div>Avg before: 24 · After: 94</div>
          </div>
          <div className="niche-card">
            <div className="niche-num">04</div>
            <div className="niche-icon">🏗️</div>
            <h3>Contractors</h3>
            <p>Local businesses losing leads to faster sites ranking above them on Google.</p>
            <div className="niche-score"><div className="niche-score-dot"></div>Avg before: 41 · After: 96</div>
          </div>
          <div className="niche-card">
            <div className="niche-num">05</div>
            <div className="niche-icon">🍽️</div>
            <h3>Restaurants</h3>
            <p>Menus and bookings that load in 0.4s on 3G. Your food deserves a fast table.</p>
            <div className="niche-score"><div className="niche-score-dot good"></div>Avg before: 29 · After: 98</div>
          </div>
          <div className="niche-card">
            <div className="niche-num">06</div>
            <div className="niche-icon">🎓</div>
            <h3>Education</h3>
            <p>Course pages and admissions sites that stop losing students to faster competitors.</p>
            <div className="niche-score"><div className="niche-score-dot"></div>Avg before: 35 · After: 95</div>
          </div>
        </div>
      </section>

      <section className="how-section">
        <div className="section-label">The Process</div>
        <h2 className="section-h2">From slow to fast in 25 minutes</h2>
        <div className="steps">
          <div className="step">
            <div className="step-num">Step 01</div>
            <h3>SYNTHIA Audit</h3>
            <p>AI scans your WP site in 90 seconds. UDEC score + Lighthouse baseline established.</p>
            <div className="step-connector"></div>
          </div>
          <div className="step">
            <div className="step-num">Step 02</div>
            <h3>Extraction</h3>
            <p>We pull all content, images, and structure — zero downtime, your site stays live.</p>
            <div className="step-connector"></div>
          </div>
          <div className="step">
            <div className="step-num">Step 03</div>
            <h3>Rebuild</h3>
            <p>AI rebuilds your site in Astro with Cloudflare edge delivery. SEO copy rewritten for clarity and conversion.</p>
            <div className="step-connector"></div>
          </div>
          <div className="step">
            <div className="step-num">Step 04</div>
            <h3>Launch</h3>
            <p>95+ Lighthouse or we keep going. DNS flip takes 5 minutes. You're in the fast lane.</p>
          </div>
        </div>
      </section>

      <section className="proof-section">
        <div className="section-label">Client Stories</div>
        <h2 className="section-h2">They were slow. Now they're not.</h2>
        <div className="proof-grid">
          <div className="proof-card">
            <div className="proof-stars">★★★★★</div>
            <div className="proof-text">&quot;Our WP site was scoring 28. After My Web Lane, we&apos;re at 97. Bookings went up 40% in the first month.&quot;</div>
            <div className="proof-author">
              <div className="proof-avatar">R</div>
              <div className="proof-meta">
                <div className="proof-name">Dr. Rajesh Mehta</div>
                <div className="proof-biz">Mehta Dental Clinic, Pune</div>
              </div>
            </div>
          </div>
          <div className="proof-card">
            <div className="proof-stars">★★★★★</div>
            <div className="proof-text">&quot;I was paying $180/month for WP hosting and getting 32 on Lighthouse. Now it&apos;s $12/month and 96. Unreal.&quot;</div>
            <div className="proof-author">
              <div className="proof-avatar">S</div>
              <div className="proof-meta">
                <div className="proof-name">Sarah Kowalski</div>
                <div className="proof-biz">Summit Legal, Denver CO</div>
              </div>
            </div>
          </div>
          <div className="proof-card">
            <div className="proof-stars">★★★★★</div>
            <div className="proof-text">&quot;48 horas y ya. Nuestro WooCommerce tardaba 8 segundos. Ahora carga en 0.4s. Las ventas se triplicaron.&quot;</div>
            <div className="proof-author">
              <div className="proof-avatar">C</div>
              <div className="proof-meta">
                <div className="proof-name">Carlos Vega</div>
                <div className="proof-biz">TiendaVega.mx, CDMX</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-glow"></div>
        <div style={{ position: "relative" }}>
          <div className="section-label" style={{ justifyContent: "center", display: "flex" }}>Ready to race?</div>
          <h2 style={{ fontSize: "clamp(36px,6vw,72px)", fontWeight: 800, letterSpacing: "-.03em", margin: "16px 0 24px" }}>
            Get your free SYNTHIA audit
          </h2>
          <p style={{ fontSize: "18px", color: "var(--muted)", maxWidth: "48ch", margin: "0 auto 40px", lineHeight: 1.6 }}>
            Paste your WordPress URL. 90 seconds later you&apos;ll know exactly why you&apos;re losing — and what it costs you every day.
          </p>
          <button className="btn-primary explode-cta" id="mainCtaBtn" style={{ fontSize: "18px", padding: "20px 56px" }}>
            Run Free Audit — Takes 90 Seconds
          </button>
          <p style={{ marginTop: "16px", fontSize: "13px", color: "var(--muted)" }}>
            No credit card · No commitment · Instant results
          </p>
        </div>
      </section>

      <footer>
        <div className="footer-brand">My <span>Web Lane</span></div>
        <div>Powered by SYNTHIA · Built on Cloudflare · Migrates in 25 Minutes</div>
        <div>© 2025 My Web Lane. All rights reserved.</div>
      </footer>
    </div>);
}
