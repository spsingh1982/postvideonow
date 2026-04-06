"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [posting, setPosting] = useState(false);
  const [toastShow, setToastShow] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setModalOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function handleFile(file: File) {
    if (file && file.type.startsWith("video/")) setFileName(file.name);
  }

  function handlePost() {
    setPosting(true);
    setTimeout(() => {
      setPosting(false);
      setModalOpen(false);
      setFileName(null);
      setCaption("");
      setToastShow(true);
      setTimeout(() => setToastShow(false), 5000);
    }, 2000);
  }

  const platforms = [
    { name: "TikTok", cat: "Short-Form", icon: "🎵", active: true, bg: "#000000" },
    { name: "Instagram", cat: "Short-Form", icon: "📸", active: false, bg: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)" },
    { name: "Snapchat", cat: "Short-Form", icon: "👻", active: false, bg: "#FFFC00" },
    { name: "YT Shorts", cat: "Short-Form", icon: "▶️", active: false, bg: "#FF0000" },
    { name: "Facebook", cat: "Social", icon: "👍", active: false, bg: "#1877F2" },
    { name: "Twitter/X", cat: "Social", icon: "𝕏", active: false, bg: "#000000" },
    { name: "LinkedIn", cat: "Social", icon: "💼", active: false, bg: "#0A66C2" },
    { name: "Reddit", cat: "Social", icon: "🤖", active: false, bg: "#FF4500" },
    { name: "Pinterest", cat: "Social", icon: "📌", active: false, bg: "#E60023" },
    { name: "Mastodon", cat: "Social", icon: "🐘", active: false, bg: "#563ACC" },
    { name: "Threads", cat: "Social", icon: "🧵", active: false, bg: "#000000" },
    { name: "YouTube", cat: "Video", icon: "🎬", active: false, bg: "#FF0000" },
    { name: "Twitch", cat: "Video", icon: "🎮", active: false, bg: "#9146FF" },
    { name: "Vimeo", cat: "Video", icon: "🎥", active: false, bg: "#1AB7EA" },
    { name: "Substack", cat: "Publishing", icon: "📰", active: false, bg: "#FF6719" },
  ];

  return (
    <div style={{ background: "var(--bg, #07070E)", minHeight: "100vh", color: "#EEEEFF", fontFamily: "var(--font-figtree, sans-serif)", overflowX: "hidden" }}>
      <style>{`
        :root {
          --bg: #07070E; --surface: #0C0C18; --card: #111122; --card-hi: #16163A;
          --border: rgba(255,255,255,0.07); --border-hi: rgba(255,255,255,0.15);
          --accent: #6C63FF; --accent2: #00D4C8; --glow: rgba(108,99,255,0.35);
          --muted: #5A5A7A; --muted2: #8888AA;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #07070E; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
        @keyframes spin-slow { to{transform:rotate(360deg)} }
        @keyframes fade-up { to{opacity:1;transform:translateY(0)} }
        @keyframes tiktok-pulse {
          0%,100%{box-shadow:0 0 30px rgba(0,212,200,0.12)}
          50%{box-shadow:0 0 50px rgba(0,212,200,0.25)}
        }
        @keyframes grain {
          0%,100%{transform:translate(0,0)} 10%{transform:translate(-2%,-3%)}
          20%{transform:translate(3%,2%)} 30%{transform:translate(-1%,4%)}
          40%{transform:translate(4%,-1%)} 50%{transform:translate(-3%,3%)}
          60%{transform:translate(2%,-4%)} 70%{transform:translate(-4%,1%)}
          80%{transform:translate(1%,3%)} 90%{transform:translate(-2%,-1%)}
        }
        .fade-up { opacity:0; transform:translateY(24px); animation:fade-up 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        .d1{animation-delay:0.1s} .d2{animation-delay:0.2s} .d3{animation-delay:0.3s} .d4{animation-delay:0.4s}
        .platform-card { transition: all 0.3s; }
        .platform-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.15) !important; }
        .platform-card.active-card { animation: tiktok-pulse 3s ease-in-out infinite; }
        .btn-primary-hover:hover { transform:translateY(-2px); box-shadow:0 0 50px rgba(108,99,255,0.5),0 12px 40px rgba(0,0,0,0.5) !important; }
        .feature-card { transition: all 0.3s; }
        .feature-card:hover { transform:translateY(-4px); border-color:rgba(255,255,255,0.15) !important; }
        .upload-zone:hover { border-color: var(--accent) !important; background: #16163A !important; }
        ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:#07070E} ::-webkit-scrollbar-thumb{background:#16163A;border-radius:3px}
      `}</style>

      {/* GRAIN */}
      <div style={{ position:"fixed", inset:0, zIndex:0, backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, opacity:0.025, pointerEvents:"none", animation:"grain 8s steps(1) infinite" }} />

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, padding:"18px 0", transition:"all 0.4s", background: scrolled ? "rgba(7,7,14,0.9)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
        <div style={{ maxWidth:1180, margin:"0 auto", padding:"0 28px", display:"flex", alignItems:"center", gap:40 }}>
          <Link href="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none", color:"#EEEEFF" }}>
            <div style={{ width:34, height:34, borderRadius:10, background:"linear-gradient(135deg,#6C63FF,#00D4C8)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.85rem", fontWeight:800, color:"#fff", boxShadow:"0 0 20px rgba(108,99,255,0.4)" }}>PV</div>
            <span style={{ fontFamily:"var(--font-syne,sans-serif)", fontWeight:800, fontSize:"1.2rem", letterSpacing:"-0.02em" }}>PostVideoNow</span>
          </Link>
          <div style={{ display:"flex", gap:32, marginLeft:"auto" }}>
            {["Platforms","How it works","Features"].map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(/ /g,"-")}`} style={{ color:"#8888AA", fontSize:"0.9rem", fontWeight:500, textDecoration:"none" }}>{l}</a>
            ))}
          </div>
          <div style={{ display:"flex", gap:12, alignItems:"center" }}>
            <Link href="/sign-in" style={{ padding:"9px 20px", borderRadius:10, border:"1px solid rgba(255,255,255,0.15)", background:"transparent", color:"#8888AA", fontSize:"0.88rem", fontWeight:500, cursor:"pointer", textDecoration:"none" }}>Sign In</Link>
            <button onClick={() => setModalOpen(true)} className="btn-primary-hover" style={{ padding:"9px 22px", borderRadius:10, border:"none", background:"linear-gradient(135deg,#6C63FF,#8B84FF)", color:"#fff", fontSize:"0.88rem", fontWeight:600, cursor:"pointer", boxShadow:"0 0 24px rgba(108,99,255,0.35)", fontFamily:"inherit" }}>Get Started →</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position:"relative", minHeight:"100vh", display:"flex", alignItems:"center", padding:"120px 28px 80px", overflow:"hidden" }}>
        <div style={{ position:"absolute", width:600, height:600, borderRadius:"50%", background:"radial-gradient(ellipse,rgba(108,99,255,0.18),transparent 70%)", top:-100, left:-200, filter:"blur(80px)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", width:400, height:400, borderRadius:"50%", background:"radial-gradient(ellipse,rgba(0,212,200,0.12),transparent 70%)", bottom:0, right:-100, filter:"blur(80px)", pointerEvents:"none" }} />
        <div style={{ maxWidth:1180, margin:"0 auto", width:"100%", display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center", position:"relative", zIndex:1 }}>
          <div>
            <div className="fade-up" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 14px", borderRadius:100, background:"rgba(108,99,255,0.12)", border:"1px solid rgba(108,99,255,0.3)", fontSize:"0.78rem", fontWeight:600, color:"#00D4C8", letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:28 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#00D4C8", boxShadow:"0 0 8px #00D4C8", display:"inline-block", animation:"pulse 2s infinite" }} />
              Now Live — TikTok Publishing
            </div>
            <h1 className="fade-up d1" style={{ fontFamily:"var(--font-syne,sans-serif)", fontWeight:800, letterSpacing:"-0.03em", lineHeight:0.95, fontSize:"clamp(3rem,6vw,5.5rem)", marginBottom:24 }}>
              <span style={{ display:"block", color:"#EEEEFF" }}>POST ONCE.</span>
              <span style={{ display:"block", background:"linear-gradient(90deg,#6C63FF,#00D4C8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>PUBLISH<br/>EVERYWHERE.</span>
            </h1>
            <p className="fade-up d2" style={{ fontSize:"1.1rem", color:"#8888AA", maxWidth:480, lineHeight:1.7, marginBottom:40 }}>Upload your video once and instantly distribute it across 15+ social platforms. Save hours, reach millions — all from one dashboard.</p>
            <div className="fade-up d3" style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
              <button onClick={() => setModalOpen(true)} className="btn-primary-hover" style={{ padding:"14px 32px", borderRadius:12, border:"none", background:"linear-gradient(135deg,#6C63FF,#8B84FF)", color:"#fff", fontSize:"1rem", fontWeight:600, cursor:"pointer", boxShadow:"0 0 30px rgba(108,99,255,0.35)", fontFamily:"inherit", display:"flex", alignItems:"center", gap:8, transition:"all 0.25s" }}>
                ☁️ Upload Video Free
              </button>
              <button onClick={() => document.getElementById("platforms")?.scrollIntoView({behavior:"smooth"})} style={{ padding:"14px 32px", borderRadius:12, border:"1px solid rgba(255,255,255,0.15)", background:"transparent", color:"#8888AA", fontSize:"1rem", fontWeight:500, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:8, transition:"all 0.25s" }}>
                ▶ See Platforms
              </button>
            </div>
            <div className="fade-up d4" style={{ display:"flex", gap:32, marginTop:48, paddingTop:32, borderTop:"1px solid rgba(255,255,255,0.07)" }}>
              {[["15+","Platforms supported"],["1-click","Cross-posting"],["∞","Reach potential"]].map(([n,l]) => (
                <div key={l}>
                  <div style={{ fontFamily:"var(--font-syne,sans-serif)", fontSize:"1.8rem", fontWeight:800 }}>{n}</div>
                  <div style={{ fontSize:"0.82rem", color:"#5A5A7A", marginTop:2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Upload Card */}
          <div className="fade-up d3" style={{ position:"relative" }}>
            <div style={{ position:"absolute", inset:-2, borderRadius:22, zIndex:-1, background:"linear-gradient(135deg,#6C63FF,#00D4C8,transparent)", opacity:0.5 }} />
            <div className="upload-zone" onClick={() => setModalOpen(true)} onDragOver={e=>{e.preventDefault();setDragOver(true)}} onDragLeave={()=>setDragOver(false)} onDrop={e=>{e.preventDefault();setDragOver(false);const f=e.dataTransfer.files[0];if(f){handleFile(f);setModalOpen(true);}}}
              style={{ background: dragOver ? "#16163A" : "#111122", borderRadius:20, padding:"48px 40px", textAlign:"center", border:`2px dashed ${dragOver?"#6C63FF":"rgba(108,99,255,0.3)"}`, cursor:"pointer", position:"relative", overflow:"hidden", transition:"all 0.3s" }}>
              <div style={{ width:80, height:80, borderRadius:"50%", margin:"0 auto 24px", background:"linear-gradient(135deg,rgba(108,99,255,0.2),rgba(0,212,200,0.1))", border:"1px solid rgba(108,99,255,0.3)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"2rem", position:"relative" }}>
                <span style={{ position:"absolute", inset:-8, borderRadius:"50%", border:"1px solid rgba(108,99,255,0.15)", animation:"spin-slow 8s linear infinite" }} />
                ☁️
              </div>
              <div style={{ fontFamily:"var(--font-syne,sans-serif)", fontSize:"1.2rem", fontWeight:700, marginBottom:8 }}>Drop your video here</div>
              <div style={{ fontSize:"0.85rem", color:"#5A5A7A", marginBottom:24 }}>or click to browse files</div>
              <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap", marginBottom:24 }}>
                {["MP4","MOV","AVI","WebM","up to 4GB"].map(f => (
                  <span key={f} style={{ padding:"4px 10px", borderRadius:6, fontSize:"0.72rem", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.07)", color:"#8888AA", fontWeight:500 }}>{f}</span>
                ))}
              </div>
              <button style={{ width:"100%", padding:14, borderRadius:12, border:"none", background:"linear-gradient(135deg,#6C63FF,#8B84FF)", color:"#fff", fontSize:"0.95rem", fontWeight:600, cursor:"pointer", fontFamily:"inherit", boxShadow:"0 0 24px rgba(108,99,255,0.35)" }}>Choose Video File</button>
            </div>
            <div style={{ display:"flex", gap:8, alignItems:"center", marginTop:16, padding:"14px 18px", borderRadius:12, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ width:32, height:32, borderRadius:8, background:"#000", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.9rem" }}>🎵</div>
              <span style={{ fontSize:"0.82rem", fontWeight:600 }}>TikTok</span>
              <span style={{ fontSize:"0.75rem", color:"#00D4C8", fontWeight:600, marginLeft:4 }}>● Ready</span>
              <span style={{ fontSize:"0.8rem", color:"#5A5A7A", marginLeft:"auto" }}>+14 coming soon</span>
            </div>
          </div>
        </div>
      </section>

      <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)", margin:"0 28px" }} />

      {/* PLATFORMS */}
      <section id="platforms" style={{ padding:"100px 28px", position:"relative" }}>
        <div style={{ maxWidth:1180, margin:"0 auto" }}>
          <div style={{ fontSize:"0.75rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#00D4C8", marginBottom:16 }}>All Platforms</div>
          <h2 style={{ fontFamily:"var(--font-syne,sans-serif)", fontWeight:700, fontSize:"clamp(2rem,4vw,3rem)", marginBottom:16 }}>Your entire audience,<br/>one upload away.</h2>
          <p style={{ fontSize:"1rem", color:"#8888AA", maxWidth:520, lineHeight:1.7, marginBottom:56 }}>TikTok is live now. We're rapidly building out every major platform.</p>
          {[
            { label:"Short-Form Video", items: platforms.filter(p=>p.cat==="Short-Form") },
            { label:"Social & Posts", items: platforms.filter(p=>p.cat==="Social") },
            { label:"Video & Streaming", items: platforms.filter(p=>p.cat==="Video") },
            { label:"Publishing", items: platforms.filter(p=>p.cat==="Publishing") },
          ].map(group => (
            <div key={group.label} style={{ marginBottom:40 }}>
              <div style={{ fontFamily:"var(--font-syne,sans-serif)", fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#5A5A7A", marginBottom:14, paddingBottom:10, borderBottom:"1px solid rgba(255,255,255,0.07)" }}>{group.label}</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:12 }}>
                {group.items.map(p => (
                  <div key={p.name} onClick={p.active ? () => setModalOpen(true) : undefined}
                    className={`platform-card ${p.active ? "active-card" : ""}`}
                    style={{ background: p.active ? "rgba(0,212,200,0.04)" : "#111122", border: p.active ? "1px solid rgba(0,212,200,0.4)" : "1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:"22px 18px", display:"flex", flexDirection:"column", alignItems:"center", gap:12, cursor: p.active ? "pointer" : "default", position:"relative", opacity: p.active ? 1 : 0.6 }}>
                    {p.active
                      ? <span style={{ position:"absolute", top:10, right:10, padding:"3px 8px", borderRadius:100, fontSize:"0.65rem", fontWeight:700, background:"rgba(0,212,200,0.15)", color:"#00D4C8", border:"1px solid rgba(0,212,200,0.3)" }}>Live ✓</span>
                      : <span style={{ position:"absolute", top:10, right:10, padding:"3px 8px", borderRadius:100, fontSize:"0.65rem", fontWeight:600, background:"rgba(255,255,255,0.04)", color:"#5A5A7A", border:"1px solid rgba(255,255,255,0.07)" }}>Soon</span>
                    }
                    <div style={{ width:52, height:52, borderRadius:14, background: p.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.6rem" }}>{p.icon}</div>
                    <div style={{ fontSize:"0.82rem", fontWeight:600, textAlign:"center" }}>{p.name}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)", margin:"0 28px" }} />

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding:"100px 28px" }}>
        <div style={{ maxWidth:1180, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"start" }}>
          <div>
            <div style={{ fontSize:"0.75rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#00D4C8", marginBottom:16 }}>How it works</div>
            <h2 style={{ fontFamily:"var(--font-syne,sans-serif)", fontWeight:700, fontSize:"clamp(2rem,4vw,3rem)", marginBottom:16 }}>Three steps to everywhere.</h2>
            <p style={{ fontSize:"1rem", color:"#8888AA", lineHeight:1.7 }}>No more logging into each platform. No more re-uploading. Just upload, select, and post.</p>
          </div>
          <div>
            {[
              ["01","Upload your video","Drag and drop any video file up to 4GB. Supports MP4, MOV, AVI, WebM and more."],
              ["02","Select your platforms","Choose from your connected social accounts. Each gets its own optimized version."],
              ["03","Post or schedule","Hit post to go live now, or schedule for peak engagement hours across all platforms."],
            ].map(([n,t,d]) => (
              <div key={n} style={{ display:"grid", gridTemplateColumns:"60px 1fr", gap:24, padding:"28px 0", borderBottom:"1px solid rgba(255,255,255,0.07)", alignItems:"start" }}>
                <div style={{ width:48, height:48, borderRadius:"50%", background:"rgba(108,99,255,0.12)", border:"1px solid rgba(108,99,255,0.3)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--font-syne,sans-serif)", fontSize:"1rem", fontWeight:800, color:"#6C63FF" }}>{n}</div>
                <div>
                  <div style={{ fontFamily:"var(--font-syne,sans-serif)", fontSize:"1.05rem", fontWeight:700, marginBottom:8 }}>{t}</div>
                  <div style={{ fontSize:"0.9rem", color:"#8888AA", lineHeight:1.7 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)", margin:"0 28px" }} />

      {/* FEATURES */}
      <section id="features" style={{ padding:"100px 28px", position:"relative" }}>
        <div style={{ maxWidth:1180, margin:"0 auto" }}>
          <div style={{ fontSize:"0.75rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#00D4C8", marginBottom:16 }}>Why PostVideoNow</div>
          <h2 style={{ fontFamily:"var(--font-syne,sans-serif)", fontWeight:700, fontSize:"clamp(2rem,4vw,3rem)", marginBottom:56 }}>Built for serious creators.</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
            {[
              ["⚡","Upload Once","Stop wasting hours re-uploading the same video across 15 different apps. One upload reaches your entire audience.","rgba(108,99,255,0.12)","rgba(108,99,255,0.2)"],
              ["🎯","Platform-Optimized","Our engine automatically reformats your video for each platform — correct aspect ratios, bitrates, captions, and lengths.","rgba(0,212,200,0.1)","rgba(0,212,200,0.2)"],
              ["📅","Schedule & Automate","Plan your entire content calendar in advance. Schedule posts for peak engagement times per platform. Your audience, on autopilot.","rgba(255,170,0,0.1)","rgba(255,170,0,0.2)"],
            ].map(([icon,title,text,bg,border],i) => (
              <div key={i} className="feature-card" style={{ background:"#111122", border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, padding:"36px 30px", position:"relative", overflow:"hidden" }}>
                <div style={{ fontFamily:"var(--font-syne,sans-serif)", fontSize:"3.5rem", fontWeight:800, background:"linear-gradient(135deg,#6C63FF,#00D4C8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", opacity:0.3, lineHeight:1, marginBottom:20 }}>0{i+1}</div>
                <div style={{ width:48, height:48, borderRadius:12, background:bg as string, border:`1px solid ${border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.5rem", marginBottom:20 }}>{icon}</div>
                <div style={{ fontFamily:"var(--font-syne,sans-serif)", fontSize:"1.2rem", fontWeight:700, marginBottom:12 }}>{title}</div>
                <div style={{ fontSize:"0.9rem", color:"#8888AA", lineHeight:1.7 }}>{text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:"100px 28px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", width:600, height:600, borderRadius:"50%", background:"radial-gradient(ellipse,rgba(108,99,255,0.15),transparent 70%)", top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none" }} />
        <div style={{ maxWidth:720, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
          <div style={{ fontSize:"0.75rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#00D4C8", marginBottom:16 }}>Start free today</div>
          <h2 style={{ fontFamily:"var(--font-syne,sans-serif)", fontWeight:800, letterSpacing:"-0.03em", fontSize:"clamp(2.5rem,5vw,4rem)", marginBottom:20, background:"linear-gradient(135deg,#EEEEFF,rgba(238,238,255,0.6))", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Stop uploading manually.</h2>
          <p style={{ fontSize:"1.05rem", color:"#8888AA", marginBottom:40, lineHeight:1.7 }}>Join thousands of creators saving hours every week. Post to TikTok now — more platforms launching soon.</p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={() => setModalOpen(true)} className="btn-primary-hover" style={{ padding:"14px 32px", borderRadius:12, border:"none", background:"linear-gradient(135deg,#6C63FF,#8B84FF)", color:"#fff", fontSize:"1rem", fontWeight:600, cursor:"pointer", boxShadow:"0 0 30px rgba(108,99,255,0.35)", fontFamily:"inherit", display:"flex", alignItems:"center", gap:8, transition:"all 0.25s" }}>☁️ Upload Your First Video</button>
            <button style={{ padding:"14px 32px", borderRadius:12, border:"1px solid rgba(255,255,255,0.15)", background:"transparent", color:"#8888AA", fontSize:"1rem", fontWeight:500, cursor:"pointer", fontFamily:"inherit" }}>No credit card required</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop:"1px solid rgba(255,255,255,0.07)", padding:"48px 28px" }}>
        <div style={{ maxWidth:1180, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:24 }}>
          <Link href="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none", color:"#EEEEFF" }}>
            <div style={{ width:28, height:28, borderRadius:8, background:"linear-gradient(135deg,#6C63FF,#00D4C8)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.72rem", fontWeight:800, color:"#fff" }}>PV</div>
            <span style={{ fontFamily:"var(--font-syne,sans-serif)", fontWeight:800, fontSize:"1.1rem" }}>PostVideoNow</span>
          </Link>
          <div style={{ display:"flex", gap:28 }}>
            {[["Privacy","/privacy"],["Terms","/terms"],["Support","#"],["Roadmap","#"]].map(([l,h]) => (
              <Link key={l} href={h} style={{ fontSize:"0.85rem", color:"#5A5A7A", textDecoration:"none" }}>{l}</Link>
            ))}
          </div>
          <div style={{ fontSize:"0.82rem", color:"#5A5A7A" }}>© 2026 PostVideoNow. All rights reserved.</div>
        </div>
      </footer>

      {/* MODAL */}
      {modalOpen && (
        <div onClick={e=>{if(e.target===e.currentTarget)setModalOpen(false)}} style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(7,7,14,0.85)", backdropFilter:"blur(12px)", display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
          <div style={{ background:"#111122", border:"1px solid rgba(255,255,255,0.15)", borderRadius:24, maxWidth:680, width:"100%", padding:48, position:"relative", maxHeight:"90vh", overflowY:"auto" }}>
            <button onClick={() => setModalOpen(false)} style={{ position:"absolute", top:20, right:20, width:36, height:36, borderRadius:"50%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.07)", color:"#8888AA", fontSize:"1.1rem", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
            <div style={{ fontFamily:"var(--font-syne,sans-serif)", fontSize:"1.6rem", fontWeight:800, marginBottom:6 }}>Post Your Video</div>
            <div style={{ fontSize:"0.9rem", color:"#8888AA", marginBottom:32 }}>Upload once, post everywhere — starting with TikTok.</div>

            {/* Drop zone */}
            <div style={{ marginBottom:24 }}>
              <div style={{ fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#00D4C8", marginBottom:12 }}>Step 1 — Choose video</div>
              <div onClick={() => fileInputRef.current?.click()} onDragOver={e=>{e.preventDefault();setDragOver(true)}} onDragLeave={()=>setDragOver(false)} onDrop={e=>{e.preventDefault();setDragOver(false);const f=e.dataTransfer.files[0];if(f)handleFile(f);}}
                style={{ border:`2px dashed ${dragOver||fileName?"#6C63FF":"rgba(108,99,255,0.3)"}`, borderRadius:16, padding:40, textAlign:"center", cursor:"pointer", background: fileName ? "rgba(108,99,255,0.04)" : "transparent", transition:"all 0.3s" }}>
                <div style={{ fontSize:"2.5rem", marginBottom:12 }}>{fileName ? "✅" : "🎬"}</div>
                <div style={{ fontWeight:600, marginBottom:4 }}>{fileName || "Drag & drop your video here"}</div>
                <div style={{ fontSize:"0.82rem", color:"#5A5A7A" }}>{fileName ? "Ready to post" : "or click to browse — MP4, MOV, AVI, WebM up to 4GB"}</div>
              </div>
              <input ref={fileInputRef} type="file" accept="video/*" style={{ display:"none" }} onChange={e=>{const f=e.target.files?.[0];if(f)handleFile(f);}} />
            </div>

            {/* Platform selector */}
            <div style={{ marginBottom:24 }}>
              <div style={{ fontFamily:"var(--font-syne,sans-serif)", fontSize:"0.85rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", color:"#8888AA", marginBottom:14 }}>Step 2 — Select platforms</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:10 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 14px", borderRadius:12, border:"1px solid rgba(108,99,255,0.5)", background:"rgba(108,99,255,0.06)", cursor:"pointer" }}>
                  <div style={{ width:18, height:18, borderRadius:5, background:"#6C63FF", border:"1px solid #6C63FF", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.7rem", color:"#fff" }}>✓</div>
                  <span style={{ fontSize:"1.2rem" }}>🎵</span>
                  <div><div style={{ fontSize:"0.85rem", fontWeight:600 }}>TikTok</div><div style={{ fontSize:"0.7rem", color:"#00D4C8" }}>● Connected</div></div>
                </div>
                {[["📸","Instagram"],["▶️","YouTube"],["🐦","Twitter/X"],["💼","LinkedIn"],["👻","Snapchat"]].map(([icon,name]) => (
                  <div key={name} style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 14px", borderRadius:12, border:"1px solid rgba(255,255,255,0.07)", opacity:0.4, cursor:"not-allowed" }}>
                    <div style={{ width:18, height:18, borderRadius:5, border:"1px solid rgba(255,255,255,0.15)" }} />
                    <span style={{ fontSize:"1.2rem" }}>{icon}</span>
                    <div><div style={{ fontSize:"0.85rem", fontWeight:600 }}>{name}</div><div style={{ fontSize:"0.7rem", color:"#5A5A7A" }}>Coming Soon</div></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Caption */}
            <div style={{ marginBottom:24 }}>
              <div style={{ fontFamily:"var(--font-syne,sans-serif)", fontSize:"0.85rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", color:"#8888AA", marginBottom:12 }}>Step 3 — Caption</div>
              <textarea value={caption} onChange={e=>setCaption(e.target.value)} maxLength={2200} placeholder="Write a caption... Add hashtags like #viral #trending" style={{ width:"100%", borderRadius:12, border:"1px solid rgba(255,255,255,0.07)", background:"rgba(255,255,255,0.03)", color:"#EEEEFF", padding:"14px 16px", fontFamily:"inherit", fontSize:"0.9rem", resize:"vertical", minHeight:100, outline:"none" }} />
              <div style={{ fontSize:"0.78rem", color:"#5A5A7A", textAlign:"right", marginTop:4 }}>{caption.length} / 2200</div>
            </div>

            <div style={{ display:"flex", justifyContent:"flex-end", gap:12 }}>
              <button onClick={() => setModalOpen(false)} style={{ padding:"11px 24px", borderRadius:10, border:"1px solid rgba(255,255,255,0.15)", background:"transparent", color:"#8888AA", fontSize:"0.9rem", cursor:"pointer", fontFamily:"inherit" }}>Cancel</button>
              <button onClick={handlePost} disabled={posting} style={{ padding:"11px 28px", borderRadius:10, border:"none", background:"linear-gradient(135deg,#6C63FF,#8B84FF)", color:"#fff", fontSize:"0.95rem", fontWeight:600, cursor:"pointer", fontFamily:"inherit", opacity: posting ? 0.7 : 1, boxShadow:"0 0 24px rgba(108,99,255,0.35)" }}>
                {posting ? "Posting..." : "Post to TikTok →"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      <div style={{ position:"fixed", bottom:32, right:32, zIndex:999, padding:"16px 24px", borderRadius:14, background:"#111122", border:"1px solid rgba(0,212,200,0.3)", boxShadow:"0 0 30px rgba(0,212,200,0.2),0 20px 60px rgba(0,0,0,0.5)", display:"flex", alignItems:"center", gap:12, maxWidth:360, transition:"all 0.4s cubic-bezier(0.34,1.56,0.64,1)", transform: toastShow ? "translateY(0)" : "translateY(120px)", opacity: toastShow ? 1 : 0 }}>
        <span style={{ fontSize:"1.4rem" }}>🎉</span>
        <div>
          <div style={{ fontSize:"0.88rem", fontWeight:600 }}>Posted to TikTok!</div>
          <div style={{ fontSize:"0.78rem", color:"#8888AA", marginTop:2 }}>Your video is now live and processing.</div>
        </div>
      </div>
    </div>
  );
}
