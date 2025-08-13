-- Create hero carousel table
CREATE TABLE IF NOT EXISTS hero_carousel (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  image_url TEXT NOT NULL,
  image_alt TEXT,
  button_text TEXT,
  button_link TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for ordering
CREATE INDEX IF NOT EXISTS idx_hero_carousel_order ON hero_carousel(order_index);
CREATE INDEX IF NOT EXISTS idx_hero_carousel_active ON hero_carousel(is_active);

-- Enable RLS
ALTER TABLE hero_carousel ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON hero_carousel
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON hero_carousel
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON hero_carousel
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON hero_carousel
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_hero_carousel_updated_at 
  BEFORE UPDATE ON hero_carousel 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO hero_carousel (title, subtitle, description, image_url, image_alt, button_text, button_link, order_index) VALUES
  ('Kaliteli İnşaat Hizmetleri', 'Profesyonel ve Güvenilir', 'Yılların deneyimi ile inşaat projelerinizi hayata geçiriyoruz. Kalite, güvenlik ve müşteri memnuniyeti odaklı çalışıyoruz.', '/images/hero-1.png', 'İnşaat sahası arka plan', 'Hizmetlerimizi Keşfedin', '/services', 1),
  ('Modern Tasarım Çözümleri', 'Yenilikçi Yaklaşım', 'Çağdaş mimari anlayışı ile modern yaşam alanları tasarlıyoruz. Fonksiyonel ve estetik tasarımlar ile hayalinizdeki projeyi gerçeğe dönüştürüyoruz.', '/images/hero-2.png', 'Modern bina tasarımı', 'Projelerimizi İnceleyin', '/projects', 2),
  ('Sürdürülebilir İnşaat', 'Çevre Dostu Yaklaşım', 'Çevreye duyarlı ve sürdürülebilir inşaat teknikleri kullanarak gelecek nesillere yaşanabilir bir dünya bırakıyoruz.', '/images/hero-3.png', 'Sürdürülebilir inşaat', 'Hakkımızda', '/about', 3),
  ('Uzman Ekip', 'Deneyimli Profesyoneller', 'Alanında uzman mühendisler, mimarlar ve ustalardan oluşan ekibimiz ile projelerinizi en yüksek kalitede tamamlıyoruz.', '/images/hero-4.png', 'Uzman inşaat ekibi', 'İletişime Geçin', '/contact', 4);
