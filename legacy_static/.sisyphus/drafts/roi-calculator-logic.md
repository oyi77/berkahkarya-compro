# ROI Calculator Logic & Features

Extracted from `tiktok-agency.html` (611-line landing page)

## ROI Calculator JavaScript Function

**Location**: Lines 564-598

```javascript
function calculateROI() {
    const productPrice = parseFloat(document.getElementById('productPrice').value) || 0;
    const targetSales = parseFloat(document.getElementById('targetSales').value) || 0;
    
    const dailyRevenue = productPrice * targetSales;
    const monthlyRevenue = dailyRevenue * 30;
    
    // ROI calculation: (Monthly Revenue - Package Price) / Package Price * 100
    const starterROI = ((monthlyRevenue - 3000000) / 3000000) * 100;
    const growthROI = ((monthlyRevenue - 5000000) / 5000000) * 100;
    const scaleROI = ((monthlyRevenue - 8000000) / 8000000) * 100;
    
    document.getElementById('starterROI').textContent = starterROI.toFixed(0) + '%';
    document.getElementById('growthROI').textContent = growthROI.toFixed(0) + '%';
    document.getElementById('scaleROI').textContent = scaleROI.toFixed(0) + '%';
    
    // Highlight positive ROI
    if (starterROI > 0) {
        document.getElementById('starterROI').style.color = '#28a745';
    } else {
        document.getElementById('starterROI').style.color = '#dc3545';
    }
    
    if (growthROI > 0) {
        document.getElementById('growthROI').style.color = '#28a745';
    } else {
        document.getElementById('growthROI').style.color = '#dc3545';
    }
    
    if (scaleROI > 0) {
        document.getElementById('scaleROI').style.color = '#28a745';
    } else {
        document.getElementById('scaleROI').style.color = '#dc3545';
    }
}
```

### ROI Calculation Logic

**Formula**: `(Monthly Revenue - Package Price) / Package Price * 100`

**Per-Tier Pricing**:
- **Starter**: IDR 3,000,000/month
- **Growth**: IDR 5,000,000/month
- **Scale**: IDR 8,000,000/month

**Color Coding**:
- Green (#28a745): Positive ROI
- Red (#dc3545): Negative ROI

---

## ROI Calculator HTML Structure

**Location**: Lines 393-443

### Input Section
```html
<section id="roi" class="py-5">
    <div class="container">
        <div class="section-header text-center">
            <h2 class="section-title">ROI Calculator</h2>
            <p class="section-subtitle">Hitung return on investment untuk bisnis Anda</p>
        </div>
        <div class="row">
            <div class="col-lg-8 mx-auto">
                <div class="roi-calculator">
                    <div class="roi-inputs">
                        <div class="mb-3">
                            <label class="form-label">Harga produk Anda (IDR)</label>
                            <input type="number" class="form-control" id="productPrice" value="125000">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Target penjualan tambahan/hari</label>
                            <input type="number" class="form-control" id="targetSales" value="10">
                        </div>
                        <button class="btn btn-primary w-100" onclick="calculateROI()">
                            <i class="fas fa-calculator"></i> Hitung ROI
                        </button>
                    </div>
```

### Results Display Section
```html
                    <div class="roi-results">
                        <div class="result-card">
                            <h5>Paket Starter (IDR 3M)</h5>
                            <div class="result-value">
                                <span id="starterROI">0%</span>
                                <small>ROI</small>
                            </div>
                        </div>
                        <div class="result-card">
                            <h5>Paket Growth (IDR 5M)</h5>
                            <div class="result-value">
                                <span id="growthROI">0%</span>
                                <small>ROI</small>
                            </div>
                        </div>
                        <div class="result-card">
                            <h5>Paket Scale (IDR 8M)</h5>
                            <div class="result-value">
                                <span id="scaleROI">0%</span>
                                <small>ROI</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

### Key Input Fields
- `productPrice`: Product price in IDR (default: 125000)
- `targetSales`: Additional daily sales target (default: 10)

### Key Output Elements
- `starterROI`: Starter package ROI percentage
- `growthROI`: Growth package ROI percentage
- `scaleROI`: Scale package ROI percentage

---

## Shopee-Specific Contact Form

**Location**: Lines 445-514

### Form Fields (7 fields total)

```html
<form id="contactForm" action="https://formspree.io/f/your-form-id" method="POST">
    <!-- Row 1: Shop Name & Email -->
    <div class="row">
        <div class="col-md-6 mb-3">
            <label for="shopName" class="form-label">Nama Toko Shopee *</label>
            <input type="text" class="form-control" id="shopName" name="shop_name" required>
        </div>
        <div class="col-md-6 mb-3">
            <label for="email" class="form-label">Email Address *</label>
            <input type="email" class="form-control" id="email" name="email" required>
        </div>
    </div>

    <!-- Shop URL -->
    <div class="mb-3">
        <label for="shopUrl" class="form-label">Link Toko Shopee</label>
        <input type="url" class="form-control" id="shopUrl" name="shop_url" placeholder="https://shopee.co.id/shop/...">
    </div>

    <!-- Main Product -->
    <div class="mb-3">
        <label for="mainProduct" class="form-label">Produk Utama *</label>
        <input type="text" class="form-control" id="mainProduct" name="main_product" required>
    </div>

    <!-- Monthly Sales -->
    <div class="mb-3">
        <label for="monthlySales" class="form-label">Penjualan Bulanan Saat Ini</label>
        <input type="number" class="form-control" id="monthlySales" name="monthly_sales" placeholder="Contoh: 10000">
    </div>

    <!-- Message/Description -->
    <div class="mb-3">
        <label for="message" class="form-label">Ceritakan tentang toko Anda</label>
        <textarea class="form-control" id="message" name="message" rows="4" placeholder="Produk apa yang paling laku? Target audience apa?"></textarea>
    </div>

    <!-- Package Selection (Radio Buttons) -->
    <div class="mb-3">
        <label class="form-label">Paket yang diminati</label>
        <div class="radio-group">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="package" id="starter" value="starter">
                <label class="form-check-label" for="starter">Starter (IDR 3M)</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="package" id="growth" value="growth" checked>
                <label class="form-check-label" for="growth">Growth (IDR 5M)</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="package" id="scale" value="scale">
                <label class="form-check-label" for="scale">Scale (IDR 8M)</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="package" id="unsure" value="unsure">
                <label class="form-check-label" for="unsure">Belum yakin (konsultasi dulu)</label>
            </div>
        </div>
    </div>

    <button type="submit" class="btn btn-primary btn-lg w-100">
        <i class="fas fa-paper-plane"></i> Kirim & Dapatkan 3 Videos Gratis
    </button>
    <p class="text-muted small text-center mt-3">
        <i class="fas fa-lock"></i> Data Anda aman. Kami akan menghubungi Anda dalam 24 jam.
    </p>
</form>
```

### Form Field Mapping

| Field | HTML ID | Name Attribute | Type | Required | Default |
|-------|---------|----------------|------|----------|---------|
| Shop Name | shopName | shop_name | text | Yes | - |
| Email | email | email | email | Yes | - |
| Shop URL | shopUrl | shop_url | url | No | https://shopee.co.id/shop/... |
| Main Product | mainProduct | main_product | text | Yes | - |
| Monthly Sales | monthlySales | monthly_sales | number | No | Contoh: 10000 |
| Message | message | message | textarea | No | Produk apa yang paling laku? Target audience apa? |
| Package | package | package | radio | No | growth (checked) |

### Package Options
1. **Starter** (IDR 3M)
2. **Growth** (IDR 5M) - Default selected
3. **Scale** (IDR 8M)
4. **Unsure** (Konsultasi dulu)

---

## "Why TikTok" Section - Market Data

**Location**: Lines 87-124

### Section Structure
```html
<section id="why" class="py-5">
    <div class="container">
        <div class="section-header text-center">
            <h2 class="section-title">Kenapa TikTok?</h2>
            <p class="section-subtitle">TikTok sedang merevolusi lanskap e-commerce Indonesia</p>
        </div>
        <div class="row g-4">
            <!-- Card 1: Flooring Content -->
            <div class="col-md-4">
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-fire"></i>
                    </div>
                    <h3 class="feature-title">Flooring Content Meledak</h3>
                    <p class="feature-desc">577.8K posts di #flooring - konten ini viral banget di TikTok</p>
                </div>
            </div>

            <!-- Card 2: Buyer Behavior -->
            <div class="col-md-4">
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <h3 class="feature-title">Buyers Cari Video Dulu</h3>
                    <p class="feature-desc">80% pembeli cari "before & after" sebelum beli produk</p>
                </div>
            </div>

            <!-- Card 3: Market Growth -->
            <div class="col-md-4">
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-chart-bar"></i>
                    </div>
                    <h3 class="feature-title">LVT Market Booming</h3>
                    <p class="feature-desc">USD 540M (2025) → USD 1.14B (2032) dengan CAGR 11.3%</p>
                </div>
            </div>
        </div>
    </div>
</section>
```

### Key Market Data Points

| Metric | Value | Source |
|--------|-------|--------|
| Flooring Posts | 577.8K | #flooring hashtag |
| Renovation Posts | 882K+ | #renovation hashtag |
| Buyer Video Search | 80% | Before & after preference |
| LVT Market 2025 | USD 540M | Current market size |
| LVT Market 2032 | USD 1.14B | Projected market size |
| LVT Market CAGR | 11.3% | Compound Annual Growth Rate |

---

## Contact Information (Footer)

**Location**: Lines 536-541

```html
<h5 class="footer-title">Contact</h5>
<ul class="footer-contact">
    <li><i class="fas fa-envelope"></i> veris@berkahkarya.org</li>
    <li><i class="fas fa-phone"></i> +62 857-3274-0006</li>
    <li><i class="fas fa-globe"></i> berkahkarya.org</li>
</ul>
```

### Contact Details
- **Email**: veris@berkahkarya.org
- **Phone**: +62 857-3274-0006
- **Website**: berkahkarya.org

---

## Implementation Notes

### For Task 16 (ROI Calculator)
- Use the `calculateROI()` function as-is
- Adapt the per-tier pricing to match main site packages
- Consider adding more detailed ROI breakdown (daily/weekly/monthly)

### For Task 11 (Contact Form)
- Integrate the 7 Shopee-specific form fields
- Ensure form submission handler is configured
- Verify email notifications are sent to veris@berkahkarya.org

### For Task 15 (Market Data)
- Use the "Why TikTok" section statistics in marketing materials
- Update market projections if newer data becomes available
- Consider adding more regional/demographic breakdowns

---

## File Metadata
- **Source File**: tiktok-agency.html (611 lines)
- **Extraction Date**: 2026-03-02
- **Extracted By**: Task 5 - Feature Extraction
- **Status**: Ready for integration into main site
