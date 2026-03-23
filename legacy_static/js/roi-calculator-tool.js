/**
 * BerkahKarya — roi-calculator-tool.js
 * 3 ROI calculators: Paid Ads, SEO, AI Agent
 * Inject into any container with id="bk-roi-calc"
 */
(function () {
  'use strict';

  window.BerkahKarya = window.BerkahKarya || {};

  var WA = '6285632740006';

  function fmt(n) {
    if (typeof n !== 'number' || isNaN(n)) return '0';
    if (Math.abs(n) >= 1e9) return (n / 1e9).toFixed(1) + 'M';
    if (Math.abs(n) >= 1e6) return 'Rp ' + (n / 1e6).toFixed(0) + ' juta';
    if (Math.abs(n) >= 1e3) return 'Rp ' + Math.round(n).toLocaleString('id-ID');
    return 'Rp ' + Math.round(n);
  }

  var CALCS = {
    ads: {
      label: '📢 Paid Ads',
      fields: [
        { id: 'adSpend', label: 'Budget Iklan/Bulan (Rp)', placeholder: '5000000', type: 'number' },
        { id: 'cvrCurrent', label: 'CVR Saat Ini (%)', placeholder: '1', type: 'number' },
        { id: 'cvrOptimized', label: 'Target CVR (%)', placeholder: '3', type: 'number' },
        { id: 'aov', label: 'Rata-rata Nilai Order (Rp)', placeholder: '250000', type: 'number' },
        { id: 'margin', label: 'Profit Margin (%)', placeholder: '40', type: 'number' },
      ],
      calc: function (v) {
        var clicks = 100000 * 0.02;
        var convBefore = clicks * (v.cvrCurrent / 100);
        var convAfter = clicks * (v.cvrOptimized / 100);
        var revBefore = convBefore * v.aov;
        var revAfter = convAfter * v.aov;
        var additionalRevenue = revAfter - revBefore;
        var profit = additionalRevenue * (v.margin / 100);
        var roi = ((profit - v.adSpend) / v.adSpend) * 100;
        return {
          items: [
            { label: 'Revenue Sebelum', value: fmt(revBefore) },
            { label: 'Revenue Sesudah', value: fmt(revAfter) },
            { label: 'Tambahan Revenue', value: fmt(additionalRevenue) },
            { label: 'Net Profit', value: fmt(profit) },
          ],
          roi: Math.round(roi),
          additionalRevenue: additionalRevenue,
          type: 'Paid Ads',
        };
      },
    },
    seo: {
      label: '🔍 SEO',
      fields: [
        { id: 'trafficCurrent', label: 'Traffic Saat Ini (visitor/bulan)', placeholder: '2500', type: 'number' },
        { id: 'trafficOptimized', label: 'Target Traffic (12 bulan)', placeholder: '25000', type: 'number' },
        { id: 'cvr', label: 'Conversion Rate (%)', placeholder: '2', type: 'number' },
        { id: 'aov', label: 'Rata-rata Nilai Order (Rp)', placeholder: '500000', type: 'number' },
        { id: 'margin', label: 'Profit Margin (%)', placeholder: '35', type: 'number' },
        { id: 'investment', label: 'Investasi SEO/Bulan (Rp)', placeholder: '3000000', type: 'number' },
      ],
      calc: function (v) {
        var months = 12;
        var revBefore = v.trafficCurrent * (v.cvr / 100) * v.aov * months;
        var revAfter = v.trafficOptimized * (v.cvr / 100) * v.aov * months;
        var profit = (revAfter - revBefore) * (v.margin / 100);
        var totalInvest = v.investment * 12;
        var roi = ((profit - totalInvest) / totalInvest) * 100;
        var additionalRevenue = revAfter - revBefore;
        return {
          items: [
            { label: 'Revenue 12 Bulan (Sekarang)', value: fmt(revBefore) },
            { label: 'Revenue 12 Bulan (Setelah SEO)', value: fmt(revAfter) },
            { label: 'Tambahan Revenue', value: fmt(additionalRevenue) },
            { label: 'Investasi Total 12 Bulan', value: fmt(totalInvest) },
          ],
          roi: Math.round(roi),
          additionalRevenue: additionalRevenue,
          type: 'SEO',
        };
      },
    },
    aiagent: {
      label: '🤖 AI Agent',
      fields: [
        { id: 'leads', label: 'Leads Masuk/Bulan', placeholder: '500', type: 'number' },
        { id: 'responseCurrent', label: 'Response Rate Saat Ini (%)', placeholder: '30', type: 'number' },
        { id: 'responseOptimized', label: 'Response Rate AI (%)', placeholder: '90', type: 'number' },
        { id: 'conversion', label: 'Lead → Customer CVR (%)', placeholder: '5', type: 'number' },
        { id: 'customerValue', label: 'Nilai per Customer (Rp)', placeholder: '1500000', type: 'number' },
        { id: 'csCostCurrent', label: 'Biaya CS Saat Ini/Bulan (Rp)', placeholder: '12000000', type: 'number' },
        { id: 'agentCost', label: 'Biaya AI Agent/Bulan (Rp)', placeholder: '2500000', type: 'number' },
      ],
      calc: function (v) {
        var leadsBefore = v.leads * (v.responseCurrent / 100);
        var leadsAfter = v.leads * (v.responseOptimized / 100);
        var addRevenue = (leadsAfter - leadsBefore) * (v.conversion / 100) * v.customerValue;
        var costSavings = v.csCostCurrent - v.agentCost;
        var totalBenefit = addRevenue + costSavings;
        var roi = (totalBenefit / v.agentCost) * 100;
        return {
          items: [
            { label: 'Tambahan Revenue', value: fmt(addRevenue) },
            { label: 'Penghematan Biaya CS', value: fmt(costSavings) },
            { label: 'Total Benefit/Bulan', value: fmt(totalBenefit) },
            { label: 'Biaya AI Agent', value: fmt(v.agentCost) },
          ],
          roi: Math.round(roi),
          additionalRevenue: addRevenue,
          type: 'AI Agent',
        };
      },
    },
  };

  function injectStyles() {
    if (document.getElementById('bk-roi-styles')) return;
    var s = document.createElement('style');
    s.id = 'bk-roi-styles';
    s.textContent = [
      '#bk-roi-calc { max-width: 760px; margin: 0 auto; padding: 40px 24px; }',
      '.bk-roi-tabs { display: flex; gap: 8px; margin-bottom: 28px; flex-wrap: wrap; }',
      '.bk-roi-tab {',
      '  padding: 10px 20px; border-radius: 10px; cursor: pointer; font-weight: 700;',
      '  border: 2px solid transparent; font-size: 0.9rem;',
      '  background: #f1f5f9; color: #64748b; transition: all 0.18s;',
      '}',
      '.bk-roi-tab.active { background: linear-gradient(135deg,#667eea,#764ba2); color: #fff; }',
      '.bk-roi-tab:hover:not(.active) { border-color: #667eea; color: #667eea; }',
      '.bk-roi-form { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }',
      '@media(max-width:600px) { .bk-roi-form { grid-template-columns: 1fr; } }',
      '.bk-roi-field { display: flex; flex-direction: column; gap: 6px; }',
      '.bk-roi-field label { font-size: 0.82rem; font-weight: 600; color: #374151; }',
      '.bk-roi-field input {',
      '  padding: 10px 14px; border: 1.5px solid #e2e8f0; border-radius: 9px;',
      '  font-size: 0.95rem; outline: none; transition: border-color 0.15s;',
      '}',
      '.bk-roi-field input:focus { border-color: #667eea; }',
      '.bk-roi-submit {',
      '  width: 100%; padding: 16px; background: linear-gradient(135deg,#667eea,#764ba2);',
      '  color: #fff; border: none; border-radius: 12px;',
      '  font-size: 1rem; font-weight: 800; cursor: pointer;',
      '  transition: transform 0.18s, box-shadow 0.18s; margin-bottom: 28px;',
      '}',
      '.bk-roi-submit:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(102,126,234,0.4); }',
      '.bk-roi-results {',
      '  background: #f8fafc; border-radius: 14px; padding: 24px;',
      '  border: 1.5px solid #e2e8f0; display: none;',
      '  animation: bk-fadeInUp 0.35s ease both;',
      '}',
      '.bk-roi-results.visible { display: block; }',
      '.bk-roi-result-grid {',
      '  display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;',
      '}',
      '.bk-roi-result-item {',
      '  background: #fff; border-radius: 10px; padding: 14px;',
      '  box-shadow: 0 2px 8px rgba(0,0,0,0.05);',
      '}',
      '.bk-roi-result-label { font-size: 0.78rem; color: #64748b; font-weight: 500; margin-bottom: 4px; }',
      '.bk-roi-result-value { font-size: 1.1rem; font-weight: 800; color: #111; }',
      '.bk-roi-big {',
      '  text-align: center; padding: 20px;',
      '  background: linear-gradient(135deg,#667eea,#764ba2);',
      '  border-radius: 14px; color: #fff; margin-bottom: 20px;',
      '}',
      '.bk-roi-big-label { font-size: 0.9rem; opacity: 0.85; margin-bottom: 4px; }',
      '.bk-roi-big-number { font-size: 3.5rem; font-weight: 900; letter-spacing: -0.04em; }',
      '.bk-roi-wa-btn {',
      '  display: flex; align-items: center; justify-content: center; gap: 10px;',
      '  width: 100%; padding: 16px; background: linear-gradient(135deg,#25D366,#128C7E);',
      '  color: #fff; border: none; border-radius: 12px;',
      '  font-size: 0.95rem; font-weight: 800; cursor: pointer; text-decoration: none;',
      '  transition: transform 0.18s, box-shadow 0.18s;',
      '}',
      '.bk-roi-wa-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(37,211,102,0.35); }',
    ].join('\n');
    document.head.appendChild(s);
  }

  function buildCalculator(container) {
    injectStyles();
    var currentType = 'ads';

    function renderForm() {
      var calc = CALCS[currentType];
      var html = '';

      // Tabs
      html += '<div class="bk-roi-tabs">';
      Object.keys(CALCS).forEach(function (k) {
        html += '<button class="bk-roi-tab' + (k === currentType ? ' active' : '') + '" data-type="' + k + '">' + CALCS[k].label + '</button>';
      });
      html += '</div>';

      // Fields
      html += '<div class="bk-roi-form">';
      calc.fields.forEach(function (f) {
        html += '<div class="bk-roi-field">';
        html += '<label for="bk-roi-' + f.id + '">' + f.label + '</label>';
        html += '<input id="bk-roi-' + f.id + '" type="' + f.type + '" placeholder="' + f.placeholder + '" value="' + f.placeholder + '">';
        html += '</div>';
      });
      html += '</div>';

      html += '<button class="bk-roi-submit" id="bk-roi-run">🧮 Hitung ROI Saya</button>';
      html += '<div class="bk-roi-results" id="bk-roi-results"></div>';

      container.innerHTML = html;

      // Tab events
      container.querySelectorAll('.bk-roi-tab').forEach(function (tab) {
        tab.addEventListener('click', function () {
          currentType = tab.getAttribute('data-type');
          renderForm();
        });
      });

      // Calculate
      container.querySelector('#bk-roi-run').addEventListener('click', function () {
        var calc2 = CALCS[currentType];
        var vals = {};
        calc2.fields.forEach(function (f) {
          vals[f.id] = parseFloat(container.querySelector('#bk-roi-' + f.id).value) || 0;
        });
        var result = calc2.calc(vals);
        showResults(result);
      });
    }

    function showResults(result) {
      var el = container.querySelector('#bk-roi-results');
      var roisign = result.roi >= 0 ? '+' : '';
      var html = '';
      html += '<div class="bk-roi-big">';
      html += '<div class="bk-roi-big-label">Estimasi ROI Anda</div>';
      html += '<div class="bk-roi-big-number">' + roisign + result.roi + '%</div>';
      html += '</div>';
      html += '<div class="bk-roi-result-grid">';
      result.items.forEach(function (item) {
        html += '<div class="bk-roi-result-item"><div class="bk-roi-result-label">' + item.label + '</div><div class="bk-roi-result-value">' + item.value + '</div></div>';
      });
      html += '</div>';

      var msg = 'Halo! Saya baru coba ROI Calculator untuk ' + result.type + ' di BerkahKarya. Hasilnya ROI ' + result.roi + '% dengan tambahan revenue ' + fmt(result.additionalRevenue) + '/bulan. Mau konsultasi lebih lanjut!';
      var waUrl = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(msg);
      html += '<a href="' + waUrl + '" target="_blank" class="bk-roi-wa-btn">💬 Konsultasi Sekarang di WhatsApp →</a>';

      el.innerHTML = html;
      el.classList.add('visible');
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    renderForm();
  }

  window.BerkahKarya.ROICalculator = { init: buildCalculator };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      var el = document.getElementById('bk-roi-calc');
      if (el) buildCalculator(el);
    });
  } else {
    var el = document.getElementById('bk-roi-calc');
    if (el) buildCalculator(el);
  }
})();
