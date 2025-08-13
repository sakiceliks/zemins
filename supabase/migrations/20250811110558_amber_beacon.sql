/*
  # Create services and projects tables with admin management

  1. New Tables
    - `services`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `description` (text)
      - `content` (text)
      - `image` (text)
      - `featured` (boolean)
      - `meta_title` (text)
      - `meta_description` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `description` (text)
      - `content` (text)
      - `image` (text)
      - `category` (text)
      - `location` (text)
      - `completion_date` (date)
      - `featured` (boolean)
      - `meta_title` (text)
      - `meta_description` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `admin_users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `role` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for admin write access

  3. Sample Data
    - Insert sample services and projects
*/

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  image text,
  featured boolean DEFAULT false,
  meta_title text,
  meta_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  image text,
  category text NOT NULL,
  location text,
  completion_date date,
  featured boolean DEFAULT false,
  meta_title text,
  meta_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  role text DEFAULT 'admin',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Services are viewable by everyone"
  ON services
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Projects are viewable by everyone"
  ON projects
  FOR SELECT
  TO public
  USING (true);

-- Admin policies for services
CREATE POLICY "Admins can manage services"
  ON services
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

-- Admin policies for projects
CREATE POLICY "Admins can manage projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

-- Admin users policies
CREATE POLICY "Admins can view admin users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

-- Insert sample services
INSERT INTO services (title, slug, description, content, image, featured, meta_title, meta_description) VALUES
('Zemin Betonları', 'zemin-betonlari', 'Endüstriyel ve ticari alanlar için dayanıklı zemin beton çözümleri', 
'<h2>Zemin Betonları Hizmetlerimiz</h2>
<p>Endüstriyel ve ticari alanlar için en kaliteli zemin beton çözümlerini sunuyoruz. Uzman ekibimiz ile projelerinizi baştan sona yönetiyoruz.</p>
<h3>Hizmetlerimiz:</h3>
<ul>
<li>Endüstriyel Beton Uygulama</li>
<li>Baskı Beton Uygulama</li>
<li>Zemin Hazırlığı</li>
<li>Kalite Kontrol</li>
</ul>', 
'/images/services/zemin-betonlari.jpg', true, 'Zemin Betonları | Dalzemin', 'Profesyonel zemin beton çözümleri. Endüstriyel ve ticari alanlar için dayanıklı zemin uygulamaları.'),

('Beton Parlatma', 'beton-parlatma', 'Zemin yüzeylerini parlatarak estetik ve dayanıklı hale getiriyoruz', 
'<h2>Beton Parlatma Hizmetleri</h2>
<p>Modern teknoloji ile beton yüzeylerini parlatarak hem estetik hem de fonksiyonel çözümler sunuyoruz.</p>
<h3>Avantajları:</h3>
<ul>
<li>Yüksek dayanıklılık</li>
<li>Kolay temizlik</li>
<li>Estetik görünüm</li>
<li>Uzun ömür</li>
</ul>', 
'/images/services/beton-parlatma.jpg', true, 'Beton Parlatma | Dalzemin', 'Profesyonel beton parlatma hizmetleri. Estetik ve dayanıklı zemin çözümleri.'),

('Epoksi Zemin Kaplama', 'epoksi-zemin-kaplama', 'Kimyasal dayanıklılığı yüksek epoksi zemin kaplama sistemleri', 
'<h2>Epoksi Zemin Kaplama</h2>
<p>Endüstriyel tesisler için kimyasal dayanıklılığı yüksek epoksi zemin kaplama sistemleri uyguluyoruz.</p>
<h3>Özellikler:</h3>
<ul>
<li>Kimyasal dayanıklılık</li>
<li>Anti-slip özellik</li>
<li>Hijyenik yüzey</li>
<li>Renk seçenekleri</li>
</ul>', 
'/images/services/epoksi-kaplama.jpg', false, 'Epoksi Zemin Kaplama | Dalzemin', 'Kimyasal dayanıklılığı yüksek epoksi zemin kaplama sistemleri. Endüstriyel çözümler.');

-- Insert sample projects
INSERT INTO projects (title, slug, description, content, image, category, location, completion_date, featured, meta_title, meta_description) VALUES
('Fabrika Zemin Uygulaması', 'fabrika-zemin-uygulamasi', 'Büyük ölçekli fabrika zemin beton uygulaması projesi', 
'<h2>Fabrika Zemin Uygulaması Projesi</h2>
<p>15.000 m² alanda gerçekleştirdiğimiz endüstriyel zemin beton uygulaması projesi.</p>
<h3>Proje Detayları:</h3>
<ul>
<li>Alan: 15.000 m²</li>
<li>Süre: 45 gün</li>
<li>Özel karışım beton</li>
<li>Fiber takviyeli</li>
</ul>
<p>Proje başarıyla tamamlanmış ve müşteri memnuniyeti sağlanmıştır.</p>', 
'/images/projects/fabrika-zemin.jpg', 'Endüstriyel', 'İstanbul', '2024-01-15', true, 'Fabrika Zemin Uygulaması | Dalzemin', 'Büyük ölçekli fabrika zemin beton uygulaması projesi. 15.000 m² endüstriyel zemin çözümü.'),

('AVM Beton Parlatma', 'avm-beton-parlatma', 'Alışveriş merkezi zemin parlatma ve cilalama projesi', 
'<h2>AVM Beton Parlatma Projesi</h2>
<p>Prestijli alışveriş merkezinde gerçekleştirdiğimiz beton parlatma ve cilalama projesi.</p>
<h3>Proje Özellikleri:</h3>
<ul>
<li>Alan: 8.000 m²</li>
<li>Yüksek parlaklık</li>
<li>Kaymaz yüzey</li>
<li>Estetik görünüm</li>
</ul>', 
'/images/projects/avm-parlatma.jpg', 'Ticari', 'Ankara', '2024-02-20', true, 'AVM Beton Parlatma | Dalzemin', 'Alışveriş merkezi zemin parlatma projesi. 8.000 m² ticari alan beton parlatma uygulaması.'),

('Hastane Epoksi Kaplama', 'hastane-epoksi-kaplama', 'Hastane hijyenik zemin epoksi kaplama uygulaması', 
'<h2>Hastane Epoksi Kaplama Projesi</h2>
<p>Hastane ortamına uygun hijyenik epoksi zemin kaplama uygulaması.</p>
<h3>Özel Özellikler:</h3>
<ul>
<li>Antibakteriyel özellik</li>
<li>Kolay temizlik</li>
<li>Kimyasal dayanıklılık</li>
<li>Sessiz yürüyüş</li>
</ul>', 
'/images/projects/hastane-epoksi.jpg', 'Sağlık', 'İzmir', '2024-03-10', false, 'Hastane Epoksi Kaplama | Dalzemin', 'Hastane hijyenik zemin epoksi kaplama uygulaması. Antibakteriyel özellikli zemin çözümü.');

-- Insert admin user (you'll need to replace with actual email)
INSERT INTO admin_users (email, role) VALUES
('admin@dalzemin.com', 'admin');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();