import { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import { revSystemData } from '@/data/rev-system';
import Head from 'next/head';

type Locale = 'id' | 'en';

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [{ params: { locale: 'id' } }, { params: { locale: 'en' } }],
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: { locale: (params?.locale as Locale) || 'id' },
});

export default function RevSystem({ locale }: { locale: Locale }) {
  const d = revSystemData[locale];
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: '',
    monthlyRevenue: '',
    problemDescription: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/rev-system-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={d.meta.title} description={d.meta.description}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet" />
      </Head>
      
      <div className="rev-container">
        {/* Sticky CTA */}
        <div className="sticky-cta">
          <a href="#audit-form" className="cta-btn-sm">{d.hero.cta}</a>
        </div>

        {/* HERO SECTION */}
        <section className="section hero">
          <div className="glow-effect top-right"></div>
          <div className="content">
            <span className="eyebrow">R.E.V SYSTEM™</span>
            <h1 className="title-huge">{d.hero.headline}</h1>
            <p className="subtitle">{d.hero.subheadline}</p>
            
            <div className="metrics-grid">
              {d.hero.metrics.map((m, i) => (
                <div key={i} className="metric-card">
                  <span className="metric-val">{m.value}</span>
                  <span className="metric-lab">{m.label}</span>
                </div>
              ))}
            </div>

            <a href="#audit-form" className="cta-btn-main">{d.hero.cta}</a>
            
            <div className="dashboard-mockup">
               <div className="mockup-header">
                 <div className="dots"><span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span></div>
                 <div className="url-bar">revenue-system-analytics.v2</div>
               </div>
               <div className="mockup-body">
                 <div className="chart-line"></div>
                 <div className="chart-bars">
                    <div className="bar" style={{height: '40%'}}></div>
                    <div className="bar" style={{height: '60%'}}></div>
                    <div className="bar" style={{height: '85%'}}></div>
                    <div className="bar" style={{height: '45%'}}></div>
                    <div className="bar" style={{height: '95%'}}></div>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="section trust">
           <div className="logos-wrap">
              <span className="trust-text">TRUSTED BY HIGH-GROWTH BRANDS</span>
              <div className="logos-scroll">
                 {/* Decorative placeholder logos */}
                 <div className="logo-item">VELOCE</div>
                 <div className="logo-item">STRATOS</div>
                 <div className="logo-item">NEXUS</div>
                 <div className="logo-item">AURA</div>
                 <div className="logo-item">GLOW</div>
              </div>
           </div>
        </section>

        {/* PROBLEM SECTION */}
        <section className="section problem">
          <div className="glow-effect center-left"></div>
          <div className="content">
            <h2 className="section-title text-center">
              {d.problem.title}<br/>
              <span className="gradient-text">{d.problem.subtitle}</span>
            </h2>
            <div className="pains-list">
               {d.problem.pains.map((p, i) => (
                 <div key={i} className="pain-item">
                    <span className="check-icon">✕</span>
                    <span>{p}</span>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* R.E.V SYSTEM EXPLANATION */}
        <section className="section framework">
          <div className="content">
            <h2 className="section-title text-center">{d.system.title}</h2>
            <div className="framework-steps">
               {d.system.steps.map((s, i) => (
                 <div key={i} className="step-card">
                   <div className="step-num">{s.id}</div>
                   <div className="step-icon">{s.icon}</div>
                   <h3>{s.name}</h3>
                   <p>{s.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* CASE STUDY SECTION */}
        <section className="section cases">
          <div className="content">
             <div className="case-grid">
                {d.cases.map((c, i) => (
                  <div key={i} className="case-card">
                    <h4>{c.title}</h4>
                    <p className="case-val">{c.metric1}</p>
                    <p className="case-lab">{c.metric2}</p>
                    <div className="graph-visual"></div>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* OMNICHANNEL SECTION */}
        <section className="section omnichannel">
           <div className="glow-effect bottom-right"></div>
           <div className="content">
              <div className="omni-flex">
                 <div className="omni-text">
                    <h2 className="section-title">{d.omnichannel.title}</h2>
                    <p>{d.omnichannel.description}</p>
                 </div>
                 <div className="omni-visual">
                    <div className="core-node">R.E.V</div>
                    <div className="orbit">
                       {d.omnichannel.platforms.map((p, i) => (
                         <div key={i} className={`platform-node node-${i+1}`}>{p}</div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="section services">
           <div className="content">
              <div className="services-grid">
                 {d.services.map((s, i) => (
                   <div key={i} className="service-card">
                      <h3>{s.title}</h3>
                      <p>{s.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* FINAL CTA */}
        <section className="section cta-final">
           <div className="content text-center">
              <h2 className="section-title">{d.cta_final.title}</h2>
              <a href="#audit-form" className="cta-btn-main">{d.cta_final.button}</a>
           </div>
        </section>

        {/* FORM SECTION */}
        <section id="audit-form" className="section form-section">
           <div className="content">
              <div className="glass-form-wrap">
                 {submitted ? (
                   <div className="success-msg">
                      <h3>✓ Success</h3>
                      <p>{d.form.success}</p>
                   </div>
                 ) : (
                   <form onSubmit={handleSubmit} className="audit-form">
                      <h2 className="text-center">Request Your Growth Audit</h2>
                      <div className="form-grid">
                         <div className="input-group">
                            <label>Full Name</label>
                            <input type="text" required placeholder="John Doe" value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} />
                         </div>
                         <div className="input-group">
                            <label>Business Email</label>
                            <input type="email" required placeholder="john@company.com" value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} />
                         </div>
                         <div className="input-group">
                            <label>Phone Number (WhatsApp)</label>
                            <input type="tel" required placeholder="+62 ..." value={formState.phone} onChange={e => setFormState({...formState, phone: e.target.value})} />
                         </div>
                         <div className="input-group">
                            <label>Business Type</label>
                            <input type="text" required placeholder="E-commerce, SaaS, etc." value={formState.businessType} onChange={e => setFormState({...formState, businessType: e.target.value})} />
                         </div>
                         <div className="input-group">
                            <label>Monthly Revenue</label>
                            <select required value={formState.monthlyRevenue} onChange={e => setFormState({...formState, monthlyRevenue: e.target.value})}>
                               <option value="">Select Range</option>
                               <option value="< 50M">Below Rp 50M</option>
                               <option value="50M - 200M">Rp 50M - 200M</option>
                               <option value="200M - 1B">Rp 200M - 1B</option>
                               <option value="> 1B">Over Rp 1B</option>
                            </select>
                         </div>
                         <div className="input-group full-width">
                            <label>Describe Your Biggest Growth Problem</label>
                            <textarea rows={4} required placeholder="Low ROAS, difficult to scale, etc." value={formState.problemDescription} onChange={e => setFormState({...formState, problemDescription: e.target.value})}></textarea>
                         </div>
                      </div>
                      <button type="submit" className="submit-btn" disabled={loading}>
                         {loading ? 'Processing...' : 'Request Free Audit Now →'}
                      </button>
                   </form>
                 )}
              </div>
           </div>
        </section>

        {/* FOOTER */}
        <footer className="footer-minimal">
           <div className="content">
              <div className="footer-flex">
                 <div className="footer-brand">R.E.V System™</div>
                 <div className="footer-copy">© 2026 BerkahKarya. All rights reserved.</div>
                 <div className="footer-links">
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                 </div>
              </div>
           </div>
        </footer>
      </div>

      <style jsx>{`
        .rev-container {
          background-color: #050505;
          color: #ffffff;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
          scroll-behavior: smooth;
        }

        .section {
          padding: 100px 20px;
          position: relative;
        }

        .content {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .eyebrow {
          display: block;
          color: #6366f1;
          font-weight: 600;
          letter-spacing: 0.1em;
          margin-bottom: 20px;
          text-transform: uppercase;
        }

        .title-huge {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 4.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }

        .subtitle {
          font-size: 1.25rem;
          color: #94a3b8;
          max-width: 600px;
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .gradient-text {
          background: linear-gradient(135deg, #818cf8 0%, #c084fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .cta-btn-main {
          display: inline-block;
          background: #ffffff;
          color: #000000;
          padding: 18px 36px;
          border-radius: 99px;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
        }

        .cta-btn-main:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 30px rgba(255, 255, 255, 0.2);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          margin: 60px 0;
        }

        .metric-card {
          display: flex;
          flex-direction: column;
        }

        .metric-val {
          font-size: 2.5rem;
          font-weight: 700;
          color: #ffffff;
        }

        .metric-lab {
          color: #64748b;
          text-transform: uppercase;
          font-size: 0.875rem;
          letter-spacing: 0.05em;
          margin-top: 5px;
        }

        .dashboard-mockup {
          margin-top: 80px;
          background: #0f172a;
          border: 1px solid #1e293b;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .mockup-header {
          background: #1e293b;
          padding: 15px 20px;
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .dots { display: flex; gap: 8px; }
        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .red { background: #ef4444; }
        .yellow { background: #f59e0b; }
        .green { background: #10b981; }

        .url-bar {
          background: #0f172a;
          padding: 4px 16px;
          border-radius: 4px;
          font-size: 12px;
          color: #64748b;
          flex: 1;
        }

        .mockup-body {
          height: 300px;
          padding: 30px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .chart-bars {
          display: flex;
          align-items: flex-end;
          gap: 15px;
          height: 200px;
        }

        .bar {
          flex: 1;
          background: linear-gradient(to top, #6366f1, #c084fc);
          border-radius: 4px 4px 0 0;
          opacity: 0.8;
          transition: height 0.3s;
        }

        .glow-effect {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(0,0,0,0) 70%);
          pointer-events: none;
          z-index: 1;
        }

        .top-right { top: -200px; right: -200px; }
        .center-left { top: 20%; left: -300px; background: radial-gradient(circle, rgba(192, 132, 252, 0.1) 0%, rgba(0,0,0,0) 70%); }
        .bottom-right { bottom: -300px; right: -200px; }

        .logos-wrap {
          border-top: 1px solid #1e293b;
          border-bottom: 1px solid #1e293b;
          padding: 40px 0;
          text-align: center;
        }

        .trust-text {
          font-size: 12px;
          color: #64748b;
          letter-spacing: 0.2em;
          display: block;
          margin-bottom: 30px;
        }

        .logos-scroll {
          display: flex;
          justify-content: space-around;
          align-items: center;
          opacity: 0.5;
        }

        .logo-item {
          font-weight: 800;
          font-size: 1.5rem;
          letter-spacing: -0.05em;
        }

        .pains-list {
          margin-top: 60px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .pain-item {
          background: #0f172a;
          border: 1px solid #1e293b;
          padding: 24px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 15px;
          font-size: 1.125rem;
        }

        .check-icon { color: #ef4444; font-weight: bold; }

        .framework-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-top: 60px;
        }

        .step-card {
           background: rgba(30, 41, 59, 0.4);
           backdrop-filter: blur(10px);
           border: 1px solid rgba(255, 255, 255, 0.1);
           padding: 40px 30px;
           border-radius: 20px;
           transition: transform 0.3s;
        }

        .step-card:hover { transform: translateY(-10px); background: rgba(30, 41, 59, 0.6); }

        .step-num { font-size: 3rem; font-weight: 800; opacity: 0.1; position: absolute; top: 10px; right: 20px; }
        .step-icon { font-size: 2.5rem; margin-bottom: 20px; }
        .step-card h3 { font-size: 1.5rem; margin-bottom: 15px; }
        .step-card p { color: #94a3b8; line-height: 1.6; }

        .case-grid {
           display: grid;
           grid-template-columns: repeat(3, 1fr);
           gap: 30px;
        }

        .case-card {
           background: #111;
           border: 1px solid #222;
           padding: 30px;
           border-radius: 16px;
        }

        .case-val { font-size: 2rem; font-weight: 700; color: #6366f1; margin: 15px 0 5px; }
        .case-lab { color: #94a3b8; font-size: 0.9rem; }
        .graph-visual { height: 4px; background: #222; margin-top: 20px; border-radius: 2px; }

        .omni-flex { display: flex; align-items: center; gap: 80px; }
        .omni-text { flex: 1; }
        .omni-visual { flex: 1; position: relative; height: 400px; display: flex; justify-content: center; align-items: center; }

        .core-node {
           width: 100px; height: 100px; background: #6366f1; border-radius: 50%;
           display: flex; justify-content: center; align-items: center; font-weight: 800;
           box-shadow: 0 0 50px rgba(99, 102, 241, 0.5);
           z-index: 2;
        }

        .orbit {
           position: absolute; width: 300px; height: 300px; border: 1px dashed #334155; border-radius: 50%;
           animation: rotate 20s linear infinite;
        }

        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .platform-node {
           position: absolute; background: #1e293b; border: 1px solid #334155;
           padding: 8px 16px; border-radius: 99px; font-size: 12px;
        }

        .node-1 { top: 0; left: 50%; transform: translateX(-50%); }
        .node-2 { right: 0; top: 50%; transform: translateY(-50%); }
        .node-3 { bottom: 0; left: 50%; transform: translateX(-50%); }
        .node-4 { left: 0; top: 50%; transform: translateY(-50%); }

        .services-grid {
           display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;
        }

        .service-card {
           padding: 40px; border-radius: 16px; border: 1px solid #1e293b; background: #0a0a0a;
        }

        .service-card h3 { margin-bottom: 20px; color: #c084fc; }

        .glass-form-wrap {
           background: rgba(15, 23, 42, 0.6);
           backdrop-filter: blur(20px);
           border: 1px solid rgba(255,255,255,0.05);
           padding: 60px;
           border-radius: 24px;
           max-width: 800px;
           margin: 0 auto;
        }

        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 40px; }
        .full-width { grid-column: span 2; }

        .input-group label { display: block; margin-bottom: 10px; color: #94a3b8; font-size: 0.9rem; }
        .input-group input, .input-group select, .input-group textarea {
           width: 100%; background: #0a0f1d; border: 1px solid #1e293b; padding: 12px 16px;
           border-radius: 8px; color: #fff; outline: none; transition: border-color 0.2s;
        }
        .input-group input:focus { border-color: #6366f1; }

        .submit-btn {
           width: 100%; border: none; padding: 18px; border-radius: 8px; font-weight: 700;
           font-size: 1.1rem; margin-top: 40px; cursor: pointer;
           background: linear-gradient(135deg, #6366f1 0%, #c084fc 100%);
           color: #fff; transition: opacity 0.2s;
        }

        .submit-btn:disabled { opacity: 0.5; }

        .success-msg { text-align: center; }
        .success-msg h3 { font-size: 2rem; color: #10b981; margin-bottom: 20px; }

        .footer-minimal { border-top: 1px solid #1e293b; padding: 60px 0; }
        .footer-flex { display: flex; justify-content: space-between; align-items: center; color: #64748b; font-size: 0.875rem; }
        .footer-brand { font-weight: 700; color: #fff; }
        .footer-links { display: flex; gap: 20px; }
        .footer-links a { color: inherit; text-decoration: none; }

        .sticky-cta {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 100;
        }

        .cta-btn-sm {
           background: #6366f1; color: #fff; padding: 12px 24px; border-radius: 99px; font-weight: 600;
           text-decoration: none; box-shadow: 0 10px 20px rgba(99, 102, 241, 0.4);
        }

        @media (max-width: 768px) {
           .title-huge { font-size: 2.5rem; }
           .metrics-grid { grid-template-columns: 1fr; gap: 20px; }
           .framework-steps, .pains-list, .case-grid, .services-grid, .form-grid { grid-template-columns: 1fr; }
           .omni-flex { flex-direction: column; gap: 40px; text-align: center; }
           .section { padding: 60px 20px; }
           .glass-form-wrap { padding: 30px; }
           .footer-flex { flex-direction: column; gap: 20px; }
        }
      `}</style>
    </Layout>
  );
}
