-- Create bolgeler table for district-specific landing pages
CREATE TABLE IF NOT EXISTS bolgeler (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  company JSONB NOT NULL,
  seo JSONB NOT NULL,
  navigation JSONB NOT NULL,
  hero JSONB NOT NULL,
  stats JSONB NOT NULL,
  service_areas TEXT[] NOT NULL,
  services JSONB NOT NULL,
  advantages JSONB NOT NULL,
  social_media JSONB NOT NULL,
  footer_links JSONB NOT NULL
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_bolgeler_slug ON bolgeler(slug);

-- Insert sample data for Sultanbeyli
INSERT INTO bolgeler (
  slug,
  company,
  seo,
  navigation,
  hero,
  stats,
  service_areas,
  services,
  advantages,
  social_media,
  footer_links
) VALUES (
  'sultanbeyli-tas-hali-kaplama',
  '{
    "name": "Sultanbeyli Taş Halı Kaplama",
    "fullName": "Sultanbeyli Taş Halı Kaplama ve Zemin Sistemleri",
    "phone": "+90 532 123 45 67",
    "whatsappPhone": "905321234567",
    "email": "info@sultanbeyli-tas-hali.com",
    "address": "Sultanbeyli, İstanbul",
    "workingHours": {
      "weekdays": "08:00 - 18:00",
      "saturday": "09:00 - 16:00"
    }
  }',
  '{
    "title": "Sultanbeyli Taş Halı Kaplama - Profesyonel Zemin Çözümleri",
    "description": "Sultanbeyli bölgesinde profesyonel taş halı kaplama hizmetleri. Kaliteli malzeme ve uygun fiyatlarla zemin çözümlerinizde yanınızdayız."
  }',
  '[
    {"label": "Ana Sayfa", "href": "#"},
    {"label": "Hizmetler", "href": "#hizmetler"},
    {"label": "Avantajlar", "href": "#avantajlar"},
    {"label": "İletişim", "href": "#iletisim"}
  ]',
  '{
    "title": "Sultanbeyli Taş Halı Kaplama",
    "subtitle": "Profesyonel zemin çözümleri ile evinizi güzelleştirin",
    "buttons": [
      {
        "text": "Ücretsiz Keşif",
        "href": "#iletisim",
        "icon": "fas fa-calculator",
        "primary": true
      },
      {
        "text": "Galeri",
        "href": "#galeri",
        "icon": "fas fa-images",
        "primary": false
      }
    ]
  }',
  '[
    {"value": "500+", "label": "Tamamlanan Proje"},
    {"value": "15+", "label": "Yıllık Deneyim"},
    {"value": "100%", "label": "Müşteri Memnuniyeti"},
    {"value": "24/7", "label": "Destek"}
  ]',
  '["Sultanbeyli", "Pendik", "Kartal", "Maltepe", "Ataşehir", "Kadıköy"]',
  '[
    {
      "icon": "fas fa-home",
      "title": "Ev Taş Halı Kaplama",
      "items": ["Salon", "Yatak Odası", "Mutfak", "Banyo", "Koridor"]
    },
    {
      "icon": "fas fa-building",
      "title": "İş Yeri Kaplama",
      "items": ["Ofis", "Mağaza", "Restoran", "Klinik", "Spor Salonu"]
    },
    {
      "icon": "fas fa-tools",
      "title": "Özel Uygulamalar",
      "items": ["Merdiven", "Teras", "Balkon", "Garaj", "Depo"]
    }
  ]',
  '[
    {
      "icon": "fas fa-medal",
      "title": "Kaliteli Malzeme",
      "description": "En kaliteli taş halı malzemelerini kullanıyoruz"
    },
    {
      "icon": "fas fa-clock",
      "title": "Hızlı Teslimat",
      "description": "Projelerinizi zamanında teslim ediyoruz"
    },
    {
      "icon": "fas fa-shield-alt",
      "title": "Garanti",
      "description": "Tüm işlerimizde garanti veriyoruz"
    }
  ]',
  '[
    {"platform": "Facebook", "icon": "fab fa-facebook", "href": "https://facebook.com"},
    {"platform": "Instagram", "icon": "fab fa-instagram", "href": "https://instagram.com"},
    {"platform": "WhatsApp", "icon": "fab fa-whatsapp", "href": "https://wa.me/905321234567"}
  ]',
  '[
    {"label": "Hakkımızda", "href": "#"},
    {"label": "Hizmetler", "href": "#hizmetler"},
    {"label": "Galeri", "href": "#galeri"},
    {"label": "İletişim", "href": "#iletisim"}
  ]'
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_bolgeler_updated_at 
    BEFORE UPDATE ON bolgeler 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE bolgeler ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public read access" ON bolgeler
    FOR SELECT USING (true);

CREATE POLICY "Admin insert access" ON bolgeler
    FOR INSERT WITH CHECK (auth.role() = 'anon');

CREATE POLICY "Admin update access" ON bolgeler
    FOR UPDATE USING (auth.role() = 'anon');

CREATE POLICY "Admin delete access" ON bolgeler
    FOR DELETE USING (auth.role() = 'anon');
