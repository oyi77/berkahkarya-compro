/**
 * Admin Panel — Vilona Bot Prompt Management
 * URL: berkahkarya.org/admin-panel/vilona-bot
 */
import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';

const NICHES = [
  { key: 'fnb',           emoji: '🍔', label: 'F&B' },
  { key: 'fashion',       emoji: '👗', label: 'Fashion' },
  { key: 'tech',          emoji: '📱', label: 'Tech' },
  { key: 'health',        emoji: '💪', label: 'Health' },
  { key: 'travel',        emoji: '✈️', label: 'Travel' },
  { key: 'education',     emoji: '📚', label: 'Education' },
  { key: 'finance',       emoji: '💰', label: 'Finance' },
  { key: 'entertainment', emoji: '🎭', label: 'Entertainment' },
];

interface Prompt {
  id: number;
  niche: string;
  title: string;
  prompt: string;
  successRate: number;
  createdAt: string;
}

interface ModalState {
  open: boolean;
  mode: 'add' | 'edit';
  data: Partial<Prompt>;
}

const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_PANEL_KEY || 'BerkahKarya2026!';

export default function VilonaAdminPanel() {
  const [authed, setAuthed]         = useState(false);
  const [password, setPassword]     = useState('');
  const [authError, setAuthError]   = useState('');
  const [prompts, setPrompts]       = useState<Prompt[]>([]);
  const [loading, setLoading]       = useState(false);
  const [activeNiche, setActiveNiche] = useState('all');
  const [toast, setToast]           = useState('');
  const [toastType, setToastType]   = useState<'ok'|'err'>('ok');
  const [modal, setModal]           = useState<ModalState>({ open: false, mode: 'add', data: {} });
  const [deleteConfirm, setDeleteConfirm] = useState<Prompt | null>(null);
  const [stats, setStats]           = useState({ total: 0, niches: 8 });

  // ── Auth ──────────────────────────────────────────────────────────────────
  const handleLogin = () => {
    if (password === ADMIN_KEY) {
      setAuthed(true);
      setAuthError('');
      localStorage.setItem('vb_admin_authed', '1');
    } else {
      setAuthError('Password salah. Coba lagi.');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('vb_admin_authed') === '1') setAuthed(true);
  }, []);

  // ── API helpers ───────────────────────────────────────────────────────────
  const apiCall = useCallback(async (method: string, path: string, body?: object) => {
    const url = `/api/admin-panel/prompts${path}`;
    const r = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 'x-admin-key': ADMIN_KEY },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  }, []);

  const loadPrompts = useCallback(async () => {
    setLoading(true);
    try {
      const q = activeNiche !== 'all' ? `?niche=${activeNiche}` : '';
      const data = await apiCall('GET', q);
      setPrompts(data);
      setStats(s => ({ ...s, total: data.length }));
    } catch {
      showToast('❌ Gagal load prompts — cek koneksi ke bot', 'err');
    } finally {
      setLoading(false);
    }
  }, [activeNiche, apiCall]);

  useEffect(() => { if (authed) loadPrompts(); }, [authed, activeNiche, loadPrompts]);

  // ── Toast ─────────────────────────────────────────────────────────────────
  const showToast = (msg: string, type: 'ok'|'err' = 'ok') => {
    setToast(msg); setToastType(type);
    setTimeout(() => setToast(''), 3500);
  };

  // ── CRUD ──────────────────────────────────────────────────────────────────
  const openAdd = () => setModal({ open: true, mode: 'add', data: { niche: activeNiche !== 'all' ? activeNiche : 'fnb' } });
  const openEdit = (p: Prompt) => setModal({ open: true, mode: 'edit', data: { ...p } });
  const closeModal = () => setModal(m => ({ ...m, open: false }));

  const savePrompt = async () => {
    const { id, niche, title, prompt } = modal.data;
    if (!niche || !title?.trim() || !prompt?.trim()) {
      showToast('⚠️ Niche, judul, dan prompt wajib diisi', 'err'); return;
    }
    try {
      if (modal.mode === 'add') {
        await apiCall('POST', '', { niche, title, prompt });
        showToast(`✅ Prompt "${title}" berhasil ditambahkan ke bot!`);
      } else {
        await apiCall('PUT', `?id=${id}`, { niche, title, prompt });
        showToast(`✅ Prompt "${title}" diupdate!`);
      }
      closeModal();
      loadPrompts();
    } catch {
      showToast('❌ Gagal menyimpan. Cek koneksi bot.', 'err');
    }
  };

  const deletePrompt = async (p: Prompt) => {
    try {
      await apiCall('DELETE', `?id=${p.id}`);
      showToast(`🗑️ Prompt "${p.title}" dihapus`);
      setDeleteConfirm(null);
      loadPrompts();
    } catch {
      showToast('❌ Gagal hapus.', 'err');
    }
  };

  const nicheEmoji = (key: string) => NICHES.find(n => n.key === key)?.emoji || '📋';
  const nicheLabel = (key: string) => NICHES.find(n => n.key === key)?.label || key;

  // ── Login Screen ──────────────────────────────────────────────────────────
  if (!authed) return (
    <div style={styles.loginWrap}>
      <Head><title>Vilona Admin — Login</title></Head>
      <div style={styles.loginCard}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🤖</div>
        <h1 style={styles.loginTitle}>Vilona Bot Admin</h1>
        <p style={styles.loginSub}>Masukkan password admin untuk lanjut</p>
        <input
          style={styles.input}
          type="password"
          placeholder="Admin password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
        />
        {authError && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 12 }}>{authError}</p>}
        <button style={styles.btnPrimary} onClick={handleLogin}>Masuk →</button>
      </div>
    </div>
  );

  // ── Main Panel ────────────────────────────────────────────────────────────
  return (
    <div style={styles.wrap}>
      <Head>
        <title>Vilona Admin — Prompt Management</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      {/* Navbar */}
      <nav style={styles.nav}>
        <div style={styles.navBrand}>
          <span style={{ fontSize: 24 }}>🤖</span>
          <span style={styles.navTitle}>Vilona Bot Admin</span>
          <span style={styles.navBadge}>📚 Prompt Management</span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <a href="https://t.me/berkahkarya_saas_bot" target="_blank" rel="noreferrer" style={styles.navLink}>
            Open Bot ↗
          </a>
          <button style={styles.btnSm} onClick={() => { localStorage.removeItem('vb_admin_authed'); setAuthed(false); }}>
            Logout
          </button>
        </div>
      </nav>

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.pageHeader}>
          <div>
            <h2 style={styles.pageTitle}>📚 Kelola Prompt Library</h2>
            <p style={styles.pageDesc}>Prompt yang ditambahkan di sini langsung aktif di @berkahkarya_saas_bot — tanpa restart</p>
          </div>
          <button style={styles.btnPrimary} onClick={openAdd}>➕ Tambah Prompt Baru</button>
        </div>

        {/* Stats */}
        <div style={styles.statsGrid}>
          {[
            { label: 'Total Admin Prompts', value: stats.total, color: '#6366f1' },
            { label: 'Niche Categories', value: stats.niches, color: '#22c55e' },
            { label: 'Template Bawaan', value: '40', color: '#f59e0b' },
            { label: 'Bot Status', value: '🟢 Live', color: '#22c55e' },
          ].map(s => (
            <div key={s.label} style={styles.statCard}>
              <div style={{ ...styles.statValue, color: s.color }}>{s.value}</div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Info Banner */}
        <div style={styles.infoBanner}>
          <span style={{ fontSize: 20 }}>💡</span>
          <div>
            <strong>Cara kerja:</strong> Prompt yang kamu tambahkan di sini muncul sebagai &quot;⭐ Dari Admin&quot; di atas template bawaan ketika user membuka niche di bot. Langsung aktif real-time.
          </div>
        </div>

        {/* Niche Filter Tabs */}
        <div style={styles.tabs}>
          <button
            style={{ ...styles.tab, ...(activeNiche === 'all' ? styles.tabActive : {}) }}
            onClick={() => setActiveNiche('all')}
          >🌐 Semua</button>
          {NICHES.map(n => (
            <button
              key={n.key}
              style={{ ...styles.tab, ...(activeNiche === n.key ? styles.tabActive : {}) }}
              onClick={() => setActiveNiche(n.key)}
            >{n.emoji} {n.label}</button>
          ))}
        </div>

        {/* Prompts Table */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <span style={{ fontWeight: 700 }}>
              {activeNiche === 'all' ? '🌐 Semua Niche' : `${nicheEmoji(activeNiche)} ${nicheLabel(activeNiche)}`}
              {' '}— {prompts.length} prompt
            </span>
            <span style={{ fontSize: 12, color: '#64748b' }}>
              Muncul di bot sebagai &quot;⭐ Dari Admin&quot;
            </span>
          </div>

          {loading ? (
            <div style={styles.emptyState}>⏳ Loading prompts dari bot...</div>
          ) : prompts.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>
                Belum ada admin prompt untuk {activeNiche === 'all' ? 'semua niche' : nicheLabel(activeNiche)}
              </div>
              <div style={{ color: '#64748b', marginBottom: 16, fontSize: 14 }}>
                Klik &quot;➕ Tambah Prompt Baru&quot; untuk menambahkan prompt yang akan muncul di bot
              </div>
              <button style={styles.btnPrimary} onClick={openAdd}>➕ Tambah Sekarang</button>
            </div>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  {['Niche', 'Judul', 'Preview Prompt', 'Dipakai', 'Dibuat', 'Aksi'].map(h => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {prompts.map(p => (
                  <tr key={p.id} style={styles.tr}>
                    <td style={styles.td}>
                      <span style={styles.nicheBadge}>{nicheEmoji(p.niche)} {nicheLabel(p.niche)}</span>
                    </td>
                    <td style={{ ...styles.td, fontWeight: 600, maxWidth: 180 }}>{p.title}</td>
                    <td style={styles.td}>
                      <div style={styles.promptPreview}>
                        {p.prompt.slice(0, 100)}{p.prompt.length > 100 ? '...' : ''}
                      </div>
                    </td>
                    <td style={{ ...styles.td, color: '#64748b', textAlign: 'center' }}>{p.successRate}x</td>
                    <td style={{ ...styles.td, color: '#64748b', fontSize: 12 }}>
                      {new Date(p.createdAt).toLocaleDateString('id-ID')}
                    </td>
                    <td style={styles.td}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button style={styles.btnEdit} onClick={() => openEdit(p)}>✏️</button>
                        <button style={styles.btnDelete} onClick={() => setDeleteConfirm(p)}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modal.open && (
        <div style={styles.overlay} onClick={e => e.target === e.currentTarget && closeModal()}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3 style={{ fontWeight: 700 }}>{modal.mode === 'add' ? '➕ Tambah Prompt Baru' : '✏️ Edit Prompt'}</h3>
              <button style={styles.closeBtn} onClick={closeModal}>✕</button>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Niche *</label>
              <select
                style={styles.select}
                value={modal.data.niche || 'fnb'}
                onChange={e => setModal(m => ({ ...m, data: { ...m.data, niche: e.target.value } }))}
              >
                {NICHES.map(n => (
                  <option key={n.key} value={n.key}>{n.emoji} {n.label}</option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Judul Prompt * <span style={{ color: '#64748b' }}>(maks 100 karakter)</span></label>
              <input
                style={styles.input}
                type="text"
                placeholder="contoh: Dramatic Sizzle Close-up"
                maxLength={100}
                value={modal.data.title || ''}
                onChange={e => setModal(m => ({ ...m, data: { ...m.data, title: e.target.value } }))}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Teks Prompt * <span style={{ color: '#64748b' }}>(deskripsi untuk AI video generator)</span></label>
              <textarea
                style={{ ...styles.input, minHeight: 120, resize: 'vertical' } as React.CSSProperties}
                placeholder="Cinematic food shot dengan steam rising effect, slow zoom in, warm golden hour lighting, background blur..."
                value={modal.data.prompt || ''}
                onChange={e => setModal(m => ({ ...m, data: { ...m.data, prompt: e.target.value } }))}
              />
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>
                {modal.data.prompt?.length || 0} karakter
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              <button style={styles.btnPrimary} onClick={savePrompt}>
                💾 {modal.mode === 'add' ? 'Simpan ke Bot' : 'Update'}
              </button>
              <button style={styles.btnSecondary} onClick={closeModal}>Batal</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div style={styles.overlay} onClick={e => e.target === e.currentTarget && setDeleteConfirm(null)}>
          <div style={{ ...styles.modal, maxWidth: 400 }}>
            <h3 style={{ fontWeight: 700, marginBottom: 12 }}>🗑️ Hapus Prompt?</h3>
            <p style={{ color: '#94a3b8', marginBottom: 16 }}>
              Yakin mau hapus prompt <strong style={{ color: '#f8fafc' }}>&quot;{deleteConfirm.title}&quot;</strong>?
              Ini tidak bisa di-undo.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={styles.btnDelete} onClick={() => deletePrompt(deleteConfirm)}>Ya, Hapus</button>
              <button style={styles.btnSecondary} onClick={() => setDeleteConfirm(null)}>Batal</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{ ...styles.toast, background: toastType === 'ok' ? '#22c55e' : '#ef4444' }}>
          {toast}
        </div>
      )}
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  wrap: { minHeight: '100vh', background: '#0f172a', color: '#e2e8f0', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' },
  loginWrap: { minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  loginCard: { background: '#1e293b', border: '1px solid #334155', borderRadius: 16, padding: 40, width: 360, textAlign: 'center' },
  loginTitle: { fontSize: 22, fontWeight: 700, marginBottom: 6 },
  loginSub: { color: '#64748b', fontSize: 14, marginBottom: 24 },
  nav: { background: '#1e293b', borderBottom: '1px solid #334155', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 },
  navBrand: { display: 'flex', alignItems: 'center', gap: 12 },
  navTitle: { fontWeight: 700, fontSize: 18 },
  navBadge: { background: '#312e81', color: '#a5b4fc', padding: '3px 10px', borderRadius: 999, fontSize: 12 },
  navLink: { color: '#94a3b8', textDecoration: 'none', fontSize: 14 },
  container: { maxWidth: 1100, margin: '0 auto', padding: '28px 24px' },
  pageHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  pageTitle: { fontSize: 22, fontWeight: 700, marginBottom: 4 },
  pageDesc: { color: '#64748b', fontSize: 14 },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 },
  statCard: { background: '#1e293b', border: '1px solid #334155', borderRadius: 12, padding: 20 },
  statValue: { fontSize: 28, fontWeight: 700 },
  statLabel: { fontSize: 12, color: '#64748b', marginTop: 4 },
  infoBanner: { background: '#1e3a5f', border: '1px solid #1d4ed8', borderRadius: 10, padding: '14px 18px', display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 24, fontSize: 14, lineHeight: 1.5 },
  tabs: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 },
  tab: { padding: '8px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 13, background: '#1e293b', border: '1px solid #334155', color: '#94a3b8' },
  tabActive: { background: '#6366f1', color: '#fff', borderColor: '#6366f1' },
  card: { background: '#1e293b', border: '1px solid #334155', borderRadius: 12, overflow: 'hidden' },
  cardHeader: { padding: '14px 20px', background: '#0f172a', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  emptyState: { textAlign: 'center', padding: '48px 24px', color: '#64748b' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '10px 16px', color: '#64748b', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, borderBottom: '1px solid #334155' },
  tr: { borderBottom: '1px solid #1e293b' },
  td: { padding: '12px 16px', fontSize: 14, verticalAlign: 'top' },
  nicheBadge: { background: '#1e3a5f', color: '#60a5fa', padding: '2px 8px', borderRadius: 999, fontSize: 11, whiteSpace: 'nowrap' },
  promptPreview: { fontFamily: 'monospace', fontSize: 12, color: '#a5b4fc', maxWidth: 320, wordBreak: 'break-word', lineHeight: 1.5 },
  btnPrimary: { background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', fontSize: 14, fontWeight: 600 },
  btnSecondary: { background: '#334155', color: '#e2e8f0', border: 'none', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', fontSize: 14 },
  btnEdit: { background: '#1e3a5f', color: '#60a5fa', border: 'none', borderRadius: 6, padding: '6px 10px', cursor: 'pointer', fontSize: 13 },
  btnDelete: { background: '#450a0a', color: '#f87171', border: 'none', borderRadius: 6, padding: '6px 10px', cursor: 'pointer', fontSize: 13 },
  btnSm: { background: '#334155', color: '#94a3b8', border: 'none', borderRadius: 6, padding: '6px 12px', cursor: 'pointer', fontSize: 13 },
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  modal: { background: '#1e293b', border: '1px solid #6366f1', borderRadius: 14, padding: 28, width: 560, maxWidth: '95vw', maxHeight: '90vh', overflowY: 'auto' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  closeBtn: { background: 'transparent', border: 'none', color: '#64748b', fontSize: 20, cursor: 'pointer' },
  formGroup: { marginBottom: 16 },
  label: { fontSize: 12, color: '#94a3b8', marginBottom: 6, display: 'block' },
  input: { background: '#0f172a', border: '1px solid #334155', color: '#e2e8f0', borderRadius: 8, padding: '10px 14px', width: '100%', fontSize: 14, boxSizing: 'border-box' },
  select: { background: '#0f172a', border: '1px solid #334155', color: '#e2e8f0', borderRadius: 8, padding: '10px 14px', width: '100%', fontSize: 14 },
  toast: { position: 'fixed', bottom: 24, right: 24, color: '#fff', padding: '12px 20px', borderRadius: 10, fontSize: 14, fontWeight: 600, zIndex: 999, boxShadow: '0 4px 20px rgba(0,0,0,0.4)' },
};
