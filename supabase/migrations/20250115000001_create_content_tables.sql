-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL DEFAULT 'Zemin Ustası',
  company_description TEXT NOT NULL DEFAULT 'Yenilikçi inşaat çözümleri için güvenilir ortağınız. 2000''den beri mükemmellik inşa ediyor ve kalite sunuyoruz.',
  address TEXT NOT NULL DEFAULT '123 BMÇ Zemin Cad., İnşaat Mahallesi, İstanbul 34000',
  phone TEXT NOT NULL DEFAULT '(0212) 456-7890',
  email TEXT NOT NULL DEFAULT 'info@BMÇ Zemin.com',
  working_hours TEXT NOT NULL DEFAULT 'Pazartesi - Cuma: 08:00 - 17:00, Cumartesi: 09:00 - 14:00',
  social_media JSONB DEFAULT '{"facebook": "", "instagram": "", "twitter": "", "linkedin": ""}',
  hero_title TEXT NOT NULL DEFAULT 'İnşaat Projenizi Başlatmaya Hazır mısınız?',
  hero_subtitle TEXT NOT NULL DEFAULT 'Ücretsiz danışmanlık için bugün bizimle iletişime geçin ve BMÇ Zemin''ın vizyonunuzu nasıl hayata geçirebileceğini keşfedin.',
  about_title TEXT NOT NULL DEFAULT 'BMÇ Zemin Hakkında',
  about_description TEXT NOT NULL DEFAULT 'Yenilik, kaliteli ustalık ve müşterilerimize karşı sarsılmaz bağlılıkla mükemmellik inşa ediyoruz.',
  services_title TEXT NOT NULL DEFAULT 'Hizmetlerimiz',
  services_description TEXT NOT NULL DEFAULT 'Özel ihtiyaçlarınıza ve vizyonunuza uyarlanmış kapsamlı inşaat çözümleri.',
  projects_title TEXT NOT NULL DEFAULT 'Projelerimiz',
  projects_description TEXT NOT NULL DEFAULT 'Başarıyla tamamladığımız projelerden örnekler',
  contact_title TEXT NOT NULL DEFAULT 'İletişim',
  contact_description TEXT NOT NULL DEFAULT 'Proje ihtiyaçlarınızı görüşmek veya teklif talep etmek için ekibimizle iletişime geçin.',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create faqs table
CREATE TABLE IF NOT EXISTS faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  bio TEXT NOT NULL,
  image TEXT,
  email TEXT,
  phone TEXT,
  social_media JSONB DEFAULT '{"linkedin": "", "twitter": ""}',
  "order" INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default site settings
INSERT INTO site_settings (id, company_name, company_description, address, phone, email, working_hours, hero_title, hero_subtitle, about_title, about_description, services_title, services_description, projects_title, projects_description, contact_title, contact_description) 
VALUES (
  '1',
  'Zemin Ustası',
  'Yenilikçi inşaat çözümleri için güvenilir ortağınız. 2000''den beri mükemmellik inşa ediyor ve kalite sunuyoruz.',
  '123 BMÇ Zemin Cad., İnşaat Mahallesi, İstanbul 34000',
  '(0212) 456-7890',
  'info@BMÇ Zemin.com',
  'Pazartesi - Cuma: 08:00 - 17:00, Cumartesi: 09:00 - 14:00',
  'İnşaat Projenizi Başlatmaya Hazır mısınız?',
  'Ücretsiz danışmanlık için bugün bizimle iletişime geçin ve BMÇ Zemin''ın vizyonunuzu nasıl hayata geçirebileceğini keşfedin.',
  'BMÇ Zemin Hakkında',
  'Yenilik, kaliteli ustalık ve müşterilerimize karşı sarsılmaz bağlılıkla mükemmellik inşa ediyoruz.',
  'Hizmetlerimiz',
  'Özel ihtiyaçlarınıza ve vizyonunuza uyarlanmış kapsamlı inşaat çözümleri.',
  'Projelerimiz',
  'Başarıyla tamamladığımız projelerden örnekler',
  'İletişim',
  'Proje ihtiyaçlarınızı görüşmek veya teklif talep etmek için ekibimizle iletişime geçin.'
) ON CONFLICT (id) DO NOTHING;

-- Insert sample FAQs
INSERT INTO faqs (question, answer, "order", active) VALUES
('Hangi tür projeleri ele alıyorsunuz?', 'Konut evleri, ticari binalar, endüstriyel tesisler, yenilemeler ve mimari tasarım hizmetleri dahil olmak üzere geniş bir inşaat projeleri yelpazesini ele alıyoruz. Ekibimiz için hiçbir proje çok büyük veya çok küçük değildir.', 1, true),
('Projem için nasıl teklif alabilirim?', 'İletişim formumuzu doldurarak, ofisimizi arayarak veya bize e-posta göndererek teklif talep edebilirsiniz. Proje ihtiyaçlarınızı görüşmek ve detaylı bir tahmin sunmak için bir danışmanlık randevusu ayarlayacağız.', 2, true),
('Tipik bir inşaat projesi ne kadar sürer?', 'Proje süreleri kapsam ve karmaşıklığa bağlı olarak değişir. Küçük bir yenileme birkaç hafta sürebilirken, büyük bir ticari bina birkaç ay sürebilir. İlk danışmanlığımız sırasında, projeniz için tahmini bir zaman çizelgesi sunacağız.', 3, true),
('İzinler ve onayları ele alıyor musunuz?', 'Evet, kapsamlı hizmetimizin bir parçası olarak gerekli tüm izinleri ve düzenleyici onayları ele alıyoruz. Ekibimiz, sorunsuz bir onay süreci sağlamak için yerel yapı kodları ve düzenlemeleri konusunda bilgilidir.', 4, true),
('BMÇ Zemin''ı diğer inşaat şirketlerinden ayıran nedir?', 'BMÇ Zemin, kaliteye bağlılığımız, şeffaf iletişimimiz, yenilikçi çözümlerimiz ve zamanında teslimatımızla öne çıkıyor. Geleneksel ustalığı modern teknolojilerle birleştirerek, müşteri beklentilerini aşan olağanüstü sonuçlar sunuyoruz.', 5, true);

-- Insert sample team members
INSERT INTO team_members (name, position, bio, "order", active) VALUES
('Ahmet Yılmaz', 'Genel Müdür', '20 yıllık inşaat deneyimi ile şirketin genel yönetiminden sorumlu. Müşteri memnuniyeti ve kalite odaklı yaklaşımı ile tanınıyor.', 1, true),
('Fatma Demir', 'Baş Mimar', '15 yıllık mimarlık deneyimi ile projelerin tasarım ve planlama aşamalarını yönetiyor. Sürdürülebilir ve yenilikçi tasarım çözümleri konusunda uzman.', 2, true),
('Mehmet Kaya', 'Proje Müdürü', '12 yıllık proje yönetimi deneyimi ile inşaat süreçlerinin koordinasyonundan sorumlu. Zamanında teslimat ve bütçe kontrolü konusunda başarılı.', 3, true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

