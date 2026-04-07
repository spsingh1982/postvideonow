import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — PostVideoNow",
  description:
    "Read the Privacy Policy for PostVideoNow. Learn how we collect, use, and protect your data when you use our multi-platform video publishing service.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy — PostVideoNow",
    description:
      "Read the Privacy Policy for PostVideoNow. Learn how we collect, use, and protect your data when you use our multi-platform video publishing service.",
    url: "https://www.postvideonow.com/privacy",
    siteName: "PostVideoNow",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <div style={{ background: "#07070E", minHeight: "100vh", color: "#EEEEFF", fontFamily: "var(--font-figtree, sans-serif)" }}>
      {/* Nav */}
      <nav style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "18px 28px", display: "flex", alignItems: "center", gap: "12px" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "#EEEEFF" }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#6C63FF,#00D4C8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 800, color: "#fff" }}>PV</div>
          <span style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, fontSize: "1.1rem" }}>PostVideoNow</span>
        </Link>
      </nav>

      {/* Content */}
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "60px 28px 100px" }}>
        <p style={{ fontSize: "0.8rem", color: "#6C63FF", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Legal</p>
        <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontSize: "2.8rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ color: "#5A5A7A", marginBottom: 48, fontSize: "0.9rem" }}>Last updated: April 6, 2026</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 36, lineHeight: 1.8, color: "#AAAACC" }}>

          <section>
            <h2 style={h2}>1. Introduction</h2>
            <p>PostVideoNow ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our video publishing platform at <a href="https://www.postvideonow.com" style={{ color: "#6C63FF" }}>www.postvideonow.com</a>.</p>
            <p style={{ marginTop: 12 }}>By using the Service, you consent to the data practices described in this policy.</p>
          </section>

          <section>
            <h2 style={h2}>2. Information We Collect</h2>
            <h3 style={h3}>2.1 Information You Provide</h3>
            <ul style={ul}>
              {[
                "Account information (name, email address) provided during sign-up via Clerk",
                "Video content and captions you upload to be published",
                "Social media account credentials and access tokens for connected platforms",
              ].map((item, i) => <li key={i} style={{ color: "#8888AA" }}>{item}</li>)}
            </ul>
            <h3 style={{ ...h3, marginTop: 16 }}>2.2 Information Collected Automatically</h3>
            <ul style={ul}>
              {[
                "Log data (IP address, browser type, pages visited, time and date of visit)",
                "Device information (hardware model, operating system)",
                "Usage data (features used, actions taken within the platform)",
              ].map((item, i) => <li key={i} style={{ color: "#8888AA" }}>{item}</li>)}
            </ul>
            <h3 style={{ ...h3, marginTop: 16 }}>2.3 Information from Third-Party Platforms</h3>
            <p>When you connect a social media account (e.g., TikTok), we receive information from that platform including your user ID, display name, profile picture, and OAuth access tokens necessary to post content on your behalf.</p>
          </section>

          <section>
            <h2 style={h2}>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul style={{ ...ul, marginTop: 10 }}>
              {[
                "Provide, operate, and improve the Service",
                "Authenticate your identity and manage your account",
                "Post videos to connected social media platforms on your behalf",
                "Send service-related notifications and updates",
                "Respond to your comments and questions",
                "Monitor and analyze usage patterns to improve user experience",
                "Detect and prevent fraud or abuse",
              ].map((item, i) => <li key={i} style={{ color: "#8888AA" }}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h2 style={h2}>4. How We Share Your Information</h2>
            <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
            <ul style={{ ...ul, marginTop: 10 }}>
              {[
                "With third-party social media platforms you have explicitly connected (e.g., TikTok) solely to fulfill the video posting service",
                "With service providers who assist in operating our platform (e.g., Clerk for authentication, Neon for database hosting, Vercel for deployment)",
                "When required by law or to respond to legal process",
                "To protect the rights, property, or safety of PostVideoNow, our users, or others",
                "In connection with a merger, acquisition, or sale of assets (with prior notice)",
              ].map((item, i) => <li key={i} style={{ color: "#8888AA" }}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h2 style={h2}>5. TikTok Data Usage</h2>
            <p>When you connect your TikTok account, we access the following data solely to provide the Service:</p>
            <ul style={{ ...ul, marginTop: 10 }}>
              {[
                "Basic profile info (user ID, display name, avatar) — to identify your account in our dashboard",
                "Video upload and publish permissions — to post videos on your behalf",
              ].map((item, i) => <li key={i} style={{ color: "#8888AA" }}>{item}</li>)}
            </ul>
            <p style={{ marginTop: 12 }}>We do not access your TikTok followers, messages, or any data beyond what is required to post videos. You can revoke TikTok access at any time from your PostVideoNow dashboard or directly from your TikTok account settings.</p>
          </section>

          <section>
            <h2 style={h2}>6. Data Retention</h2>
            <p>We retain your personal data for as long as your account is active or as needed to provide the Service. You may request deletion of your account and associated data at any time by contacting us. Uploaded videos are not stored permanently — they are transmitted to your connected platforms and deleted from our servers within 24 hours.</p>
          </section>

          <section>
            <h2 style={h2}>7. Data Security</h2>
            <p>We implement industry-standard security measures to protect your information, including:</p>
            <ul style={{ ...ul, marginTop: 10 }}>
              {[
                "Encryption of data in transit using TLS/HTTPS",
                "Encrypted storage of OAuth access tokens",
                "Access controls limiting who can view your data",
                "Regular security reviews and updates",
              ].map((item, i) => <li key={i} style={{ color: "#8888AA" }}>{item}</li>)}
            </ul>
            <p style={{ marginTop: 12 }}>No method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 style={h2}>8. Your Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal data:</p>
            <ul style={{ ...ul, marginTop: 10 }}>
              {[
                "Access — request a copy of the data we hold about you",
                "Correction — request correction of inaccurate data",
                "Deletion — request deletion of your account and data",
                "Portability — request your data in a machine-readable format",
                "Objection — object to certain types of data processing",
              ].map((item, i) => <li key={i} style={{ color: "#8888AA" }}>{item}</li>)}
            </ul>
            <p style={{ marginTop: 12 }}>To exercise any of these rights, please contact us at <a href="mailto:privacy@postvideonow.com" style={{ color: "#6C63FF" }}>privacy@postvideonow.com</a>.</p>
          </section>

          <section>
            <h2 style={h2}>9. Cookies</h2>
            <p>We use cookies and similar tracking technologies to maintain your session and improve the Service. You can control cookie settings through your browser, but disabling cookies may affect the functionality of the Service.</p>
          </section>

          <section>
            <h2 style={h2}>10. Children's Privacy</h2>
            <p>The Service is not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately.</p>
          </section>

          <section>
            <h2 style={h2}>11. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of the Service after any changes constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 style={h2}>12. Contact Us</h2>
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:</p>
            <div style={{ marginTop: 14, padding: "16px 20px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", fontSize: "0.9rem" }}>
              <p><strong style={{ color: "#EEEEFF" }}>PostVideoNow — Privacy Team</strong></p>
              <p>Website: <a href="https://www.postvideonow.com" style={{ color: "#6C63FF" }}>www.postvideonow.com</a></p>
              <p>Email: <a href="mailto:privacy@postvideonow.com" style={{ color: "#6C63FF" }}>privacy@postvideonow.com</a></p>
            </div>
          </section>

        </div>

        <div style={{ marginTop: 60, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: 24 }}>
          <Link href="/terms" style={{ color: "#6C63FF", textDecoration: "none", fontSize: "0.9rem" }}>Terms of Service →</Link>
          <Link href="/" style={{ color: "#5A5A7A", textDecoration: "none", fontSize: "0.9rem" }}>← Back to Home</Link>
        </div>
      </main>
    </div>
  );
}

const h2: React.CSSProperties = {
  fontFamily: "var(--font-syne, sans-serif)",
  fontSize: "1.15rem",
  fontWeight: 700,
  color: "#EEEEFF",
  marginBottom: 12,
};

const h3: React.CSSProperties = {
  fontSize: "0.95rem",
  fontWeight: 600,
  color: "#CCCCEE",
  marginBottom: 8,
};

const ul: React.CSSProperties = {
  paddingLeft: 24,
  display: "flex",
  flexDirection: "column",
  gap: 6,
};
