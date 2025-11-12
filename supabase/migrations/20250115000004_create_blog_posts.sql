-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  image TEXT,
  author TEXT,
  category TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT false,
  meta_title TEXT,
  meta_description TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON blog_posts
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON blog_posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON blog_posts
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON blog_posts
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create trigger for updated_at
CREATE TRIGGER update_blog_posts_updated_at 
  BEFORE UPDATE ON blog_posts 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, author, category, tags, featured, meta_title, meta_description, published_at) VALUES
  (
    'Epoksi Zemin Kaplama: Modern ve Dayanıklı Çözümler',
    'epoksi-zemin-kaplama-modern-ve-dayanikli-cozumler',
    'Epoksi zemin kaplama, endüstriyel ve ticari alanlar için ideal bir seçenektir. Yüksek dayanıklılık, kolay temizlenebilirlik ve estetik görünüm sunar.',
    '<h2>Epoksi Zemin Kaplama Nedir?</h2><p>Epoksi zemin kaplama, epoksi reçine ve sertleştirici karışımından oluşan, yüksek performanslı bir zemin kaplama sistemidir. Özellikle endüstriyel tesisler, garajlar, mutfaklar ve ticari alanlar için tercih edilir.</p><h2>Avantajları</h2><ul><li>Yüksek dayanıklılık ve aşınma direnci</li><li>Kolay temizlenebilirlik</li><li>Su ve kimyasal direnci</li><li>Estetik görünüm</li><li>Uzun ömür</li></ul>',
    'Zemin Ustası',
    'Zemin Kaplama',
    '["epoksi", "zemin kaplama", "endüstriyel"]'::jsonb,
    true,
    'Epoksi Zemin Kaplama: Modern ve Dayanıklı Çözümler | Zemin Ustası',
    'Epoksi zemin kaplama hizmetleri hakkında detaylı bilgi. Endüstriyel ve ticari alanlar için profesyonel epoksi zemin çözümleri.',
    NOW()
  ),
  (
    'Taş Halı (Stone Carpet) Uygulaması ve Avantajları',
    'tas-hali-stone-carpet-uygulamasi-ve-avantajlari',
    'Taş halı, doğal taş görünümünde dekoratif bir zemin kaplama yöntemidir. Hem iç hem dış mekanlarda kullanılabilir.',
    '<h2>Taş Halı Nedir?</h2><p>Taş halı (Stone Carpet), doğal taş parçacıklarının özel bir bağlayıcı ile karıştırılarak uygulandığı dekoratif bir zemin kaplama sistemidir.</p><h2>Kullanım Alanları</h2><ul><li>Bahçe ve teraslar</li><li>Balkonlar</li><li>Yürüyüş yolları</li><li>İç mekan dekorasyonu</li></ul>',
    'Zemin Ustası',
    'Dekoratif Zemin',
    '["taş halı", "stone carpet", "dekoratif"]'::jsonb,
    true,
    'Taş Halı (Stone Carpet) Uygulaması ve Avantajları | Zemin Ustası',
    'Taş halı uygulaması hakkında bilgi. Doğal taş görünümünde dekoratif zemin kaplama çözümleri.',
    NOW()
  ),
  (
    'Mikro Beton: Modern ve Minimalist Zemin Çözümü',
    'mikro-beton-modern-ve-minimalist-zemin-cozumu',
    'Mikro beton, ince dokulu ve modern görünümü ile minimalist tasarımlar için ideal bir zemin kaplama çözümüdür.',
    '<h2>Mikro Beton Özellikleri</h2><p>Mikro beton, geleneksel betondan farklı olarak çok daha ince bir dokuda uygulanır ve modern mimari projelerde sıklıkla tercih edilir.</p><h2>Avantajları</h2><ul><li>İnce dokulu yapı</li><li>Modern ve minimalist görünüm</li><li>Yüksek dayanıklılık</li><li>Kolay bakım</li></ul>',
    'Zemin Ustası',
    'Modern Zemin',
    '["mikro beton", "modern zemin", "minimalist"]'::jsonb,
    false,
    'Mikro Beton: Modern ve Minimalist Zemin Çözümü | Zemin Ustası',
    'Mikro beton zemin kaplama hizmetleri. Modern ve minimalist tasarımlar için profesyonel çözümler.',
    NOW()
  );

