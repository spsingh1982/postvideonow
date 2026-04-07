import Link from "next/link";

export const metadata = {
  title: "Terms of Service — PostVideoNow",
  description:
    "Read the Terms of Service for PostVideoNow — the platform that lets you upload a video once and publish it to 15+ social media platforms.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service — PostVideoNow",
    description:
      "Read the Terms of Service for PostVideoNow — the platform that lets you upload a video once and publish it to 15+ social media platforms.",
    url: "https://www.postvideonow.com/terms",
    siteName: "PostVideoNow",
    type: "website",
  },
};

export default function TermsPage() {
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
        <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontSize: "2.8rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8 }}>Terms of Service</h1>
        <p style={{ color: "#5A5A7A", marginBottom: 48, fontSize: "0.9rem" }}>Last updated: April 6, 2026</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 36, lineHeight: 1.8, color: "#AAAACC" }}>

          <section>
            <h2 style={h2}>1. Acceptance of Terms</h2>
            <p>By accessing or using PostVideoNow ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service. PostVideoNow reserves the right to update these terms at any time, and continued use of the Service constitutes acceptance of any changes.</p>
          </section>

          <section>
            <h2 style={h2}>2. Description of Service</h2>
            <p>PostVideoNow is a video publishing platform that allows users to upload video content and distribute it to multiple social media platforms, including but not limited to TikTok, Instagram, YouTube, and others. The Service acts as an intermediary between users and third-party social media platforms.</p>
          </section>

          <section>
            <h2 style={h2}>3. User Accounts</h2>
            <p>To use the Service, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.</p>
            <p style={{ marginTop: 12 }}>You must be at least 13 years old to use the Service. By creating an account, you represent that you meet this age requirement.</p>
          </section>

          <section>
            <h2 style={h2}>4. Third-Party Platform Connections</h2>
            <p>PostVideoNow integrates with third-party social media platforms (such as TikTok). When you connect your accounts on those platforms, you authorize us to access and use your account on those platforms in accordance with their respective terms of service. You are responsible for complying with the terms of service of any third-party platforms you connect.</p>
            <p style={{ marginTop: 12 }}>We are not responsible for any actions taken by third-party platforms, including account suspension or content removal.</p>
          </section>

          <section>
            <h2 style={h2}>5. User Content</h2>
            <p>You retain ownership of all content you upload to PostVideoNow ("User Content"). By uploading content, you grant PostVideoNow a limited, non-exclusive, royalty-free license to store, process, and transmit your content solely for the purpose of providing the Service.</p>
            <p style={{ marginTop: 12 }}>You represent and warrant that your content does not violate any applicable laws, infringe upon any third-party rights, or violate the terms of service of any connected social media platform.</p>
          </section>

          <section>
            <h2 style={h2}>6. Prohibited Uses</h2>
            <p>You agree not to use the Service to:</p>
            <ul style={{ marginTop: 10, paddingLeft: 24, display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                "Upload content that is illegal, harmful, threatening, abusive, or defamatory",
                "Infringe on intellectual property rights of others",
                "Distribute spam, malware, or any malicious content",
                "Attempt to gain unauthorized access to our systems",
                "Use the Service in violation of any applicable laws or regulations",
                "Impersonate any person or entity",
              ].map((item, i) => (
                <li key={i} style={{ color: "#8888AA" }}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 style={h2}>7. Intellectual Property</h2>
            <p>The PostVideoNow platform, including its design, code, trademarks, and content (excluding User Content), is the exclusive property of PostVideoNow and is protected by intellectual property laws. You may not copy, modify, distribute, or create derivative works without our express written consent.</p>
          </section>

          <section>
            <h2 style={h2}>8. Disclaimer of Warranties</h2>
            <p>The Service is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. PostVideoNow does not warrant that the Service will be uninterrupted, error-free, or free of viruses or other harmful components.</p>
          </section>

          <section>
            <h2 style={h2}>9. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, PostVideoNow shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service, including loss of data, loss of revenue, or loss of business opportunities.</p>
          </section>

          <section>
            <h2 style={h2}>10. Termination</h2>
            <p>We reserve the right to suspend or terminate your account at any time for violation of these Terms of Service or for any other reason at our sole discretion. You may terminate your account at any time by contacting us.</p>
          </section>

          <section>
            <h2 style={h2}>11. Governing Law</h2>
            <p>These Terms of Service shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.</p>
          </section>

          <section>
            <h2 style={h2}>12. Contact Us</h2>
            <p>If you have any questions about these Terms of Service, please contact us at:</p>
            <div style={{ marginTop: 14, padding: "16px 20px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", fontSize: "0.9rem" }}>
              <p><strong style={{ color: "#EEEEFF" }}>PostVideoNow</strong></p>
              <p>Website: <a href="https://www.postvideonow.com" style={{ color: "#6C63FF" }}>www.postvideonow.com</a></p>
              <p>Email: <a href="mailto:legal@postvideonow.com" style={{ color: "#6C63FF" }}>legal@postvideonow.com</a></p>
            </div>
          </section>

        </div>

        <div style={{ marginTop: 60, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: 24 }}>
          <Link href="/privacy" style={{ color: "#6C63FF", textDecoration: "none", fontSize: "0.9rem" }}>Privacy Policy →</Link>
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
