"use client";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface TikTokAccount {
  id: string;
  tiktokUserId: string;
  displayName: string | null;
  avatarUrl: string | null;
  createdAt: string;
}

function DashboardContent() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const [accounts, setAccounts] = useState<TikTokAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [caption, setCaption] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [posting, setPosting] = useState(false);
  const [postResults, setPostResults] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchAccounts();
    // Handle redirect messages
    const connected = searchParams.get("connected");
    const error = searchParams.get("error");
    if (connected === "tiktok") showToast("TikTok account connected successfully!", "success");
    if (error === "tiktok_auth_failed") showToast("TikTok authorization failed. Please try again.", "error");
    if (error === "tiktok_connect_failed") showToast("Failed to connect TikTok. Please try again.", "error");
  }, []);

  async function fetchAccounts() {
    try {
      const res = await fetch("/api/tiktok/accounts");
      const data = await res.json();
      setAccounts(data.accounts || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function disconnectAccount(accountId: string) {
    if (!confirm("Disconnect this TikTok account?")) return;
    await fetch("/api/tiktok/accounts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accountId }),
    });
    setAccounts(prev => prev.filter(a => a.id !== accountId));
    showToast("Account disconnected.", "success");
  }

  async function handlePost() {
    if (!videoFile || selectedAccounts.length === 0) return;
    setPosting(true);
    setPostResults({});

    try {
      // In real implementation, upload video to storage first, get URL
      // For sandbox demo, we simulate with a test video URL
      const videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4"; // sandbox test URL

      const res = await fetch("/api/tiktok/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoUrl, caption, accountIds: selectedAccounts }),
      });
      const data = await res.json();

      const results: Record<string, string> = {};
      data.results?.forEach((r: { accountId: string; status: string }) => {
        results[r.accountId] = r.status;
      });
      setPostResults(results);
      showToast("Video posted successfully!", "success");
      setTimeout(() => { setModalOpen(false); setVideoFile(null); setCaption(""); setPostResults({}); }, 2000);
    } catch {
      showToast("Failed to post video.", "error");
    } finally {
      setPosting(false);
    }
  }

  function showToast(msg: string, type: "success" | "error") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  }

  function toggleAccount(id: string) {
    setSelectedAccounts(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  }

  const s = styles;

  return (
    <div style={s.page}>
      {/* NAV */}
      <nav style={s.nav}>
        <div style={s.navInner}>
          <Link href="/" style={s.logo}>
            <div style={s.logoMark}>PV</div>
            <span style={s.logoText}>PostVideoNow</span>
          </Link>
          <div style={s.navRight}>
            <span style={s.navGreet}>Hey, {user?.firstName || "Creator"} 👋</span>
            <UserButton />
          </div>
        </div>
      </nav>

      <main style={s.main}>
        {/* Header */}
        <div style={s.pageHeader}>
          <div>
            <div style={s.sectionLabel}>Dashboard</div>
            <h1 style={s.pageTitle}>Your Publishing Hub</h1>
            <p style={s.pageSub}>Connect your TikTok accounts and start posting.</p>
          </div>
          <button onClick={() => setModalOpen(true)} style={s.btnPrimary} disabled={accounts.length === 0}>
            ☁️ Upload & Post Video
          </button>
        </div>

        {/* Stats */}
        <div style={s.statsRow}>
          {[
            ["🔗", accounts.length.toString(), "Connected Accounts"],
            ["🎵", "TikTok", "Active Platform"],
            ["⏳", "14", "Platforms Coming Soon"],
          ].map(([icon, val, label]) => (
            <div key={label} style={s.statCard}>
              <div style={s.statIcon}>{icon}</div>
              <div style={s.statVal}>{val}</div>
              <div style={s.statLabel}>{label}</div>
            </div>
          ))}
        </div>

        {/* Connected Accounts */}
        <div style={s.section}>
          <div style={s.sectionHeader}>
            <div>
              <h2 style={s.sectionTitle}>Connected TikTok Accounts</h2>
              <p style={s.sectionSub}>You can connect multiple TikTok accounts and post to all of them at once.</p>
            </div>
            <a href="/api/auth/tiktok" style={s.btnConnect}>+ Connect TikTok Account</a>
          </div>

          {loading ? (
            <div style={s.emptyState}>
              <div style={s.spinner} />
              <p style={{ color: "#5A5A7A", marginTop: 12 }}>Loading accounts...</p>
            </div>
          ) : accounts.length === 0 ? (
            <div style={s.emptyState}>
              <div style={s.emptyIcon}>🎵</div>
              <h3 style={s.emptyTitle}>No TikTok accounts connected yet</h3>
              <p style={s.emptySub}>Connect your first TikTok account to start posting videos.</p>
              <a href="/api/auth/tiktok" style={{ ...s.btnPrimary, textDecoration: "none", display: "inline-flex", marginTop: 20 }}>
                Connect TikTok Account
              </a>
            </div>
          ) : (
            <div style={s.accountsGrid}>
              {accounts.map(account => (
                <div key={account.id} style={s.accountCard}>
                  <div style={s.accountAvatar}>
                    {account.avatarUrl
                      ? <img src={account.avatarUrl} alt={account.displayName || ""} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
                      : <span style={{ fontSize: "1.4rem" }}>🎵</span>
                    }
                  </div>
                  <div style={s.accountInfo}>
                    <div style={s.accountName}>{account.displayName || "TikTok User"}</div>
                    <div style={s.accountId}>@{account.tiktokUserId}</div>
                    <div style={s.accountConnected}>Connected {new Date(account.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div style={s.accountActions}>
                    <span style={s.activeBadge}>● Active</span>
                    <button onClick={() => disconnectAccount(account.id)} style={s.btnDisconnect}>Disconnect</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Posts placeholder */}
        <div style={s.section}>
          <h2 style={s.sectionTitle}>Recent Posts</h2>
          <p style={s.sectionSub}>Your posting history will appear here.</p>
          <div style={s.emptyState}>
            <div style={s.emptyIcon}>📭</div>
            <p style={s.emptySub}>No posts yet. Upload your first video to get started!</p>
          </div>
        </div>
      </main>

      {/* UPLOAD MODAL */}
      {modalOpen && (
        <div onClick={e => { if (e.target === e.currentTarget) setModalOpen(false); }} style={s.overlay}>
          <div style={s.modal}>
            <button onClick={() => setModalOpen(false)} style={s.modalClose}>✕</button>
            <div style={s.modalTitle}>Post Video to TikTok</div>
            <div style={s.modalSub}>Select accounts, upload your video, and post — all at once.</div>

            {/* Select Accounts */}
            <div style={s.modalSection}>
              <div style={s.modalStepLabel}>Step 1 — Select TikTok accounts</div>
              <div style={s.accountChecks}>
                {accounts.map(account => (
                  <div key={account.id} onClick={() => toggleAccount(account.id)}
                    style={{ ...s.accountCheck, ...(selectedAccounts.includes(account.id) ? s.accountCheckActive : {}) }}>
                    <div style={{ ...s.checkBox, ...(selectedAccounts.includes(account.id) ? s.checkBoxActive : {}) }}>
                      {selectedAccounts.includes(account.id) ? "✓" : ""}
                    </div>
                    <div style={s.accountAvatar2}>
                      {account.avatarUrl
                        ? <img src={account.avatarUrl} alt="" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
                        : "🎵"
                      }
                    </div>
                    <div>
                      <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>{account.displayName || "TikTok User"}</div>
                      <div style={{ fontSize: "0.72rem", color: "#5A5A7A" }}>@{account.tiktokUserId}</div>
                    </div>
                    {postResults[account.id] && (
                      <div style={{ marginLeft: "auto", fontSize: "0.8rem", color: postResults[account.id] === "success" ? "#00D4C8" : "#FF4D4D", fontWeight: 600 }}>
                        {postResults[account.id] === "success" ? "✓ Posted" : "✗ Failed"}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Upload Video */}
            <div style={s.modalSection}>
              <div style={s.modalStepLabel}>Step 2 — Upload video</div>
              <div onClick={() => fileInputRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) setVideoFile(f); }}
                style={{ ...s.dropzone, ...(dragOver || videoFile ? s.dropzoneActive : {}) }}>
                <div style={{ fontSize: "2rem", marginBottom: 8 }}>{videoFile ? "✅" : "🎬"}</div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{videoFile ? videoFile.name : "Drag & drop your video"}</div>
                <div style={{ fontSize: "0.8rem", color: "#5A5A7A" }}>{videoFile ? `${(videoFile.size / 1024 / 1024).toFixed(1)} MB — Ready` : "or click to browse · MP4, MOV up to 4GB"}</div>
              </div>
              <input ref={fileInputRef} type="file" accept="video/*" style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) setVideoFile(f); }} />
            </div>

            {/* Caption */}
            <div style={s.modalSection}>
              <div style={s.modalStepLabel}>Step 3 — Caption & hashtags</div>
              <textarea value={caption} onChange={e => setCaption(e.target.value)} maxLength={2200}
                placeholder="Write a caption... #viral #trending"
                style={s.textarea} />
              <div style={{ fontSize: "0.75rem", color: "#5A5A7A", textAlign: "right", marginTop: 4 }}>{caption.length} / 2200</div>
            </div>

            <div style={s.modalFooter}>
              <button onClick={() => setModalOpen(false)} style={s.btnCancel}>Cancel</button>
              <button onClick={handlePost}
                disabled={posting || selectedAccounts.length === 0 || !videoFile}
                style={{ ...s.btnPrimary, opacity: (posting || selectedAccounts.length === 0 || !videoFile) ? 0.5 : 1 }}>
                {posting ? "Posting..." : `Post to ${selectedAccounts.length} account${selectedAccounts.length !== 1 ? "s" : ""} →`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div style={{ ...s.toast, background: toast.type === "success" ? "rgba(0,212,200,0.1)" : "rgba(255,77,77,0.1)", borderColor: toast.type === "success" ? "rgba(0,212,200,0.3)" : "rgba(255,77,77,0.3)" }}>
          <span>{toast.type === "success" ? "✅" : "❌"}</span>
          <span style={{ fontSize: "0.88rem", fontWeight: 600 }}>{toast.msg}</span>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div style={{ background: "#07070E", minHeight: "100vh" }} />}>
      <DashboardContent />
    </Suspense>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { background: "#07070E", minHeight: "100vh", color: "#EEEEFF", fontFamily: "var(--font-figtree, sans-serif)" },
  nav: { borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "16px 28px", position: "sticky", top: 0, zIndex: 50, background: "rgba(7,7,14,0.9)", backdropFilter: "blur(20px)" },
  navInner: { maxWidth: 1180, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" },
  logo: { display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#EEEEFF" },
  logoMark: { width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#6C63FF,#00D4C8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 800, color: "#fff" },
  logoText: { fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, fontSize: "1.1rem" },
  navRight: { display: "flex", alignItems: "center", gap: 16 },
  navGreet: { fontSize: "0.9rem", color: "#8888AA" },
  main: { maxWidth: 1180, margin: "0 auto", padding: "48px 28px" },
  pageHeader: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 20 },
  sectionLabel: { fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#00D4C8", marginBottom: 8 },
  pageTitle: { fontFamily: "var(--font-syne, sans-serif)", fontSize: "2.2rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8 },
  pageSub: { fontSize: "1rem", color: "#8888AA" },
  btnPrimary: { padding: "12px 24px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#6C63FF,#8B84FF)", color: "#fff", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 0 24px rgba(108,99,255,0.35)", display: "inline-flex", alignItems: "center", gap: 8 },
  statsRow: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 40 },
  statCard: { background: "#111122", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "24px 20px", display: "flex", flexDirection: "column" as const, gap: 8 },
  statIcon: { fontSize: "1.5rem" },
  statVal: { fontFamily: "var(--font-syne, sans-serif)", fontSize: "1.8rem", fontWeight: 800 },
  statLabel: { fontSize: "0.82rem", color: "#5A5A7A" },
  section: { background: "#111122", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "32px", marginBottom: 24 },
  sectionHeader: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap" as const, gap: 16 },
  sectionTitle: { fontFamily: "var(--font-syne, sans-serif)", fontSize: "1.2rem", fontWeight: 700, marginBottom: 6 },
  sectionSub: { fontSize: "0.88rem", color: "#5A5A7A" },
  btnConnect: { padding: "10px 20px", borderRadius: 10, border: "1px solid rgba(0,212,200,0.4)", background: "rgba(0,212,200,0.08)", color: "#00D4C8", fontSize: "0.88rem", fontWeight: 600, cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 },
  emptyState: { display: "flex", flexDirection: "column" as const, alignItems: "center", padding: "48px 20px", textAlign: "center" as const },
  emptyIcon: { fontSize: "3rem", marginBottom: 16 },
  emptyTitle: { fontFamily: "var(--font-syne, sans-serif)", fontSize: "1.1rem", fontWeight: 700, marginBottom: 8 },
  emptySub: { fontSize: "0.9rem", color: "#5A5A7A", maxWidth: 360 },
  spinner: { width: 32, height: 32, borderRadius: "50%", border: "3px solid rgba(108,99,255,0.2)", borderTopColor: "#6C63FF", animation: "spin 0.8s linear infinite" },
  accountsGrid: { display: "flex", flexDirection: "column" as const, gap: 12 },
  accountCard: { display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" },
  accountAvatar: { width: 48, height: 48, borderRadius: "50%", background: "rgba(108,99,255,0.15)", border: "2px solid rgba(108,99,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" },
  accountInfo: { flex: 1 },
  accountName: { fontSize: "0.95rem", fontWeight: 600, marginBottom: 2 },
  accountId: { fontSize: "0.8rem", color: "#8888AA", marginBottom: 2 },
  accountConnected: { fontSize: "0.75rem", color: "#5A5A7A" },
  accountActions: { display: "flex", flexDirection: "column" as const, alignItems: "flex-end", gap: 8 },
  activeBadge: { fontSize: "0.72rem", fontWeight: 700, color: "#00D4C8", background: "rgba(0,212,200,0.1)", border: "1px solid rgba(0,212,200,0.2)", padding: "3px 8px", borderRadius: 100 },
  btnDisconnect: { padding: "6px 12px", borderRadius: 8, border: "1px solid rgba(255,77,77,0.3)", background: "rgba(255,77,77,0.06)", color: "#FF6B6B", fontSize: "0.75rem", cursor: "pointer", fontFamily: "inherit" },
  overlay: { position: "fixed", inset: 0, zIndex: 200, background: "rgba(7,7,14,0.85)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 },
  modal: { background: "#111122", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 24, maxWidth: 600, width: "100%", padding: 40, position: "relative", maxHeight: "90vh", overflowY: "auto" as const },
  modalClose: { position: "absolute", top: 16, right: 16, width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.07)", color: "#8888AA", fontSize: "1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  modalTitle: { fontFamily: "var(--font-syne, sans-serif)", fontSize: "1.5rem", fontWeight: 800, marginBottom: 6 },
  modalSub: { fontSize: "0.88rem", color: "#8888AA", marginBottom: 28 },
  modalSection: { marginBottom: 24 },
  modalStepLabel: { fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#00D4C8", marginBottom: 12 },
  accountChecks: { display: "flex", flexDirection: "column" as const, gap: 8 },
  accountCheck: { display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.07)", cursor: "pointer", transition: "all 0.2s" },
  accountCheckActive: { border: "1px solid rgba(108,99,255,0.5)", background: "rgba(108,99,255,0.06)" },
  checkBox: { width: 18, height: 18, borderRadius: 5, border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", flexShrink: 0 },
  checkBoxActive: { background: "#6C63FF", border: "1px solid #6C63FF", color: "#fff" },
  accountAvatar2: { width: 32, height: 32, borderRadius: "50%", background: "rgba(108,99,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", overflow: "hidden", flexShrink: 0 },
  dropzone: { border: "2px dashed rgba(108,99,255,0.3)", borderRadius: 14, padding: "32px 20px", textAlign: "center" as const, cursor: "pointer", transition: "all 0.3s" },
  dropzoneActive: { border: "2px dashed #6C63FF", background: "rgba(108,99,255,0.04)" },
  textarea: { width: "100%", borderRadius: 12, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)", color: "#EEEEFF", padding: "12px 14px", fontFamily: "inherit", fontSize: "0.9rem", resize: "vertical" as const, minHeight: 90, outline: "none" },
  modalFooter: { display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 8 },
  btnCancel: { padding: "11px 20px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#8888AA", fontSize: "0.9rem", cursor: "pointer", fontFamily: "inherit" },
  toast: { position: "fixed", bottom: 28, right: 28, zIndex: 999, padding: "14px 20px", borderRadius: 12, border: "1px solid", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" },
};
