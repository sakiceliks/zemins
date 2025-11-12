-- Add features column to services table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'services' AND column_name = 'features'
  ) THEN
    ALTER TABLE services ADD COLUMN features TEXT[] DEFAULT ARRAY[]::TEXT[];
  END IF;
END $$;

-- Insert Dekoratif Baskı Betonu service
INSERT INTO services (
  title, 
  slug, 
  description, 
  content, 
  featured, 
  meta_title, 
  meta_description,
  features
) VALUES (
  'Dekoratif Baskı Betonu',
  'dekoratif-baski-betonu',
  'Dekoratif baskı betonu ile zeminlerinize estetik ve dayanıklı bir görünüm kazandırın. Doğal taş, ahşap ve farklı desen seçenekleri ile özel tasarımlar.',
  '<h2>Dekoratif Baskı Betonu Nedir?</h2>
<p>Dekoratif baskı betonu, taze beton üzerine özel kalıplar kullanılarak desen, doku ve renk uygulanması ile oluşturulan estetik bir zemin kaplama sistemidir. Hem iç hem dış mekanlarda kullanılabilen bu sistem, geleneksel betonun görsel olarak dönüştürülmesini sağlar.</p>

<h2>Kullanım Alanları</h2>
<ul>
  <li>Bahçe ve teras zeminleri</li>
  <li>Yürüyüş yolları ve kaldırımlar</li>
  <li>Park alanları ve otoparklar</li>
  <li>İç mekan zeminleri</li>
  <li>Havuz çevreleri</li>
  <li>Ticari ve endüstriyel alanlar</li>
</ul>

<h2>Avantajları</h2>
<ul>
  <li><strong>Estetik Görünüm:</strong> Doğal taş, ahşap, fayans gibi farklı malzemelerin görünümünü taklit edebilir</li>
  <li><strong>Yüksek Dayanıklılık:</strong> Geleneksel betonun sağlamlığını korur</li>
  <li><strong>Uzun Ömür:</strong> Düşük bakım gereksinimi ile uzun yıllar kullanılabilir</li>
  <li><strong>Ekonomik:</strong> Doğal malzemelere göre daha uygun maliyetli</li>
  <li><strong>Çeşitli Desen Seçenekleri:</strong> Yüzlerce farklı desen ve renk kombinasyonu</li>
  <li><strong>Kayma Direnci:</strong> Özel işlemlerle kayma direnci artırılabilir</li>
  <li><strong>Kolay Temizlik:</strong> Düzgün yüzey sayesinde kolay temizlenir</li>
</ul>

<h2>Uygulama Süreci</h2>
<ol>
  <li><strong>Hazırlık:</strong> Mevcut zeminin temizlenmesi ve hazırlanması</li>
  <li><strong>Beton Dökümü:</strong> Yeni beton dökümü veya mevcut betonun hazırlanması</li>
  <li><strong>Renklendirme:</strong> Özel renklendiricilerin uygulanması</li>
  <li><strong>Baskı İşlemi:</strong> Özel kalıplarla desen uygulaması</li>
  <li><strong>Koruma:</strong> Sealer (koruyucu) uygulaması</li>
</ol>

<h2>Bakım ve Koruma</h2>
<p>Dekoratif baskı betonu, düzenli temizlik ve periyodik sealer uygulaması ile uzun yıllar dayanıklılığını korur. Yılda bir kez profesyonel bakım önerilir.</p>',
  true,
  'Dekoratif Baskı Betonu | Zemin Kaplama Hizmetleri | Zemin Ustası',
  'Dekoratif baskı betonu uygulama hizmetleri. Doğal taş ve ahşap görünümünde estetik zemin çözümleri. Profesyonel uygulama ve uygun fiyat garantisi. İstanbul ve çevre illerde hizmet.',
  ARRAY['Doğal taş görünümü', 'Ahşap desen seçenekleri', 'Yüksek dayanıklılık', 'Uzun ömür', 'Kolay bakım', 'Ekonomik çözüm', 'Çeşitli desen seçenekleri', 'Kayma direnci']
) ON CONFLICT (slug) DO NOTHING;

-- Insert Helikopterli Şap Flake Zemin service
INSERT INTO services (
  title, 
  slug, 
  description, 
  content, 
  featured, 
  meta_title, 
  meta_description,
  features
) VALUES (
  'Helikopterli Şap Flake Zemin',
  'helikopterli-sap-flake-zemin',
  'Helikopterli şap ve flake zemin uygulamaları ile pürüzsüz, düzgün ve estetik zeminler. Endüstriyel ve ticari alanlar için profesyonel çözümler.',
  '<h2>Helikopterli Şap Flake Zemin Nedir?</h2>
<p>Helikopterli şap, özel helikopter makinesi kullanılarak beton veya şap yüzeyinin düzeltilmesi ve parlatılması işlemidir. Flake zemin ise, bu işlem sırasında veya sonrasında dekoratif renkli parçacıkların (flake) serpilmesi ile oluşturulan estetik bir zemin kaplama sistemidir.</p>

<h2>Helikopterli Şap İşlemi</h2>
<p>Helikopterli şap, büyük alanlarda hızlı ve etkili bir şekilde düzgün yüzey elde etmek için kullanılan profesyonel bir yöntemdir. Özel helikopter makinesi, beton yüzeyini döner bıçaklarla düzeltir ve parlatır.</p>

<h2>Flake Zemin Sistemi</h2>
<p>Flake zemin, epoksi veya poliüretan bağlayıcı üzerine renkli dekoratif parçacıkların (flake) serpilmesi ile oluşturulan estetik bir zemin kaplama sistemidir. Hem görsel hem de fonksiyonel avantajlar sunar.</p>

<h2>Kullanım Alanları</h2>
<ul>
  <li>Endüstriyel tesisler ve fabrikalar</li>
  <li>Depo ve lojistik merkezleri</li>
  <li>Otoparklar ve garajlar</li>
  <li>Ticari alanlar ve mağazalar</li>
  <li>Hastaneler ve sağlık tesisleri</li>
  <li>Okullar ve eğitim kurumları</li>
  <li>Ofis binaları</li>
  <li>Spor salonları</li>
</ul>

<h2>Avantajları</h2>
<ul>
  <li><strong>Pürüzsüz Yüzey:</strong> Helikopterli şap ile mükemmel düzgünlük</li>
  <li><strong>Yüksek Dayanıklılık:</strong> Ağır yük ve trafiğe dayanıklı</li>
  <li><strong>Estetik Görünüm:</strong> Flake ile renkli ve modern görünüm</li>
  <li><strong>Kolay Temizlik:</strong> Düzgün yüzey sayesinde kolay bakım</li>
  <li><strong>Toz Kontrolü:</strong> Sealer uygulaması ile toz oluşumu engellenir</li>
  <li><strong>Hızlı Uygulama:</strong> Büyük alanlarda hızlı işlem</li>
  <li><strong>Uzun Ömür:</strong> Düşük bakım ile uzun yıllar kullanım</li>
  <li><strong>Kayma Direnci:</strong> Güvenli yürüme yüzeyi</li>
</ul>

<h2>Uygulama Süreci</h2>
<ol>
  <li><strong>Hazırlık:</strong> Zeminin temizlenmesi ve hazırlanması</li>
  <li><strong>Şap/Beton Dökümü:</strong> Yeni şap veya beton dökümü</li>
  <li><strong>Helikopterli Düzeltme:</strong> Özel makine ile yüzey düzeltme</li>
  <li><strong>Flake Uygulaması:</strong> Dekoratif parçacıkların serpilmesi (opsiyonel)</li>
  <li><strong>Sealer Uygulaması:</strong> Koruyucu kaplama</li>
  <li><strong>Kontrol ve Teslim:</strong> Kalite kontrolü ve teslim</li>
</ol>

<h2>Teknik Özellikler</h2>
<ul>
  <li>Yüzey düzgünlüğü: ±2mm tolerans</li>
  <li>Basınç dayanımı: 25-35 MPa</li>
  <li>Aşınma direnci: Yüksek</li>
  <li>Kimyasal direnç: Orta-yüksek</li>
  <li>Uygulama kalınlığı: 5-10 cm</li>
</ul>

<h2>Bakım ve Koruma</h2>
<p>Helikopterli şap flake zemin, düzenli temizlik ve periyodik sealer yenileme ile uzun ömürlü olur. Ağır trafikli alanlarda yılda bir kez profesyonel bakım önerilir.</p>',
  true,
  'Helikopterli Şap Flake Zemin | Profesyonel Zemin Düzeltme | Zemin Ustası',
  'Helikopterli şap ve flake zemin uygulama hizmetleri. Endüstriyel ve ticari alanlar için pürüzsüz, dayanıklı ve estetik zemin çözümleri. İstanbul genelinde profesyonel hizmet.',
  ARRAY['Pürüzsüz yüzey', 'Yüksek dayanıklılık', 'Estetik görünüm', 'Kolay temizlik', 'Toz kontrolü', 'Hızlı uygulama', 'Uzun ömür', 'Kayma direnci', 'Ağır yük taşıma kapasitesi', 'Profesyonel uygulama']
) ON CONFLICT (slug) DO NOTHING;

-- Insert Kauçuk Zemin service
INSERT INTO services (
  title, 
  slug, 
  description, 
  content, 
  featured, 
  meta_title, 
  meta_description,
  features
) VALUES (
  'Kauçuk Zemin',
  'kacuk-zemin',
  'Güvenli, esnek ve dayanıklı kauçuk zemin kaplamaları. Çocuk oyun alanları, spor tesisleri ve güvenlik zeminleri için ideal çözüm.',
  '<h2>Kauçuk Zemin Nedir?</h2>
<p>Kauçuk zemin, geri dönüştürülmüş veya doğal kauçuk malzemeden üretilen, esnek, dayanıklı ve güvenli bir zemin kaplama sistemidir. Özellikle çocuk oyun alanları, spor tesisleri, yürüyüş yolları ve güvenlik gerektiren alanlarda tercih edilir.</p>

<h2>Kullanım Alanları</h2>
<ul>
  <li>Çocuk oyun alanları ve parklar</li>
  <li>Spor salonları ve fitness merkezleri</li>
  <li>Okul bahçeleri ve kreşler</li>
  <li>Yürüyüş ve koşu parkurları</li>
  <li>Hastane ve sağlık tesisleri</li>
  <li>Yaşlı bakım merkezleri</li>
  <li>Endüstriyel alanlar (anti-statik)</li>
  <li>Otoparklar ve garajlar</li>
</ul>

<h2>Avantajları</h2>
<ul>
  <li><strong>Güvenlik:</strong> Düşme durumunda yaralanma riskini azaltır, şok emici özellik</li>
  <li><strong>Esneklik:</strong> Yumuşak ve esnek yapı sayesinde konforlu yürüyüş</li>
  <li><strong>Dayanıklılık:</strong> Ağır kullanıma ve hava koşullarına dayanıklı</li>
  <li><strong>Su Geçirmez:</strong> Su ve nem geçirmez yapı</li>
  <li><strong>Bakım Kolaylığı:</strong> Kolay temizlenebilir ve bakım gerektirmez</li>
  <li><strong>Renk Seçenekleri:</strong> Geniş renk paleti ile tasarım özgürlüğü</li>
  <li><strong>Çevre Dostu:</strong> Geri dönüştürülmüş malzeme kullanımı</li>
  <li><strong>Anti-Bakteriyel:</strong> Hijyenik yüzey özelliği</li>
  <li><strong>Kaymaz Yüzey:</strong> Güvenli yürüme ve koşma</li>
  <li><strong>UV Dayanımı:</strong> Güneş ışığına karşı renk solması yok</li>
</ul>

<h2>Kauçuk Zemin Türleri</h2>
<ul>
  <li><strong>Kauçuk Karo:</strong> Modüler karo sistem, kolay montaj</li>
  <li><strong>Dökme Kauçuk:</strong> Monolitik yüzey, sıfır derz</li>
  <li><strong>Kauçuk Granül:</strong> Serbest dökme granül sistem</li>
  <li><strong>EPDM Kauçuk:</strong> Yüksek kalite, uzun ömürlü</li>
</ul>

<h2>Uygulama Süreci</h2>
<ol>
  <li><strong>Hazırlık:</strong> Zeminin temizlenmesi ve düzeltilmesi</li>
  <li><strong>Alt Zemin Hazırlığı:</strong> Beton veya asfalt alt zemin hazırlığı</li>
  <li><strong>Bağlayıcı Uygulaması:</strong> Poliüretan bağlayıcı uygulaması</li>
  <li><strong>Kauçuk Uygulaması:</strong> Kauçuk granül veya karo uygulaması</li>
  <li><strong>Sıkıştırma:</strong> Özel makine ile sıkıştırma</li>
  <li><strong>Koruma:</strong> Sealer uygulaması (opsiyonel)</li>
</ol>

<h2>Teknik Özellikler</h2>
<ul>
  <li>Kalınlık: 10mm - 50mm arası</li>
  <li>Şok Emme: %60-80 arası</li>
  <li>Basınç Dayanımı: Yüksek</li>
  <li>Su Geçirgenlik: Yok</li>
  <li>UV Dayanımı: Yüksek</li>
  <li>Kullanım Ömrü: 10-15 yıl</li>
</ul>

<h2>Bakım ve Koruma</h2>
<p>Kauçuk zemin, düzenli temizlik ile uzun ömürlü olur. Su ve sabun ile kolayca temizlenebilir. Ağır kullanım alanlarında yılda bir kez profesyonel bakım önerilir.</p>',
  true,
  'Kauçuk Zemin | Güvenli ve Esnek Zemin Kaplama | Zemin Ustası',
  'Kauçuk zemin uygulama hizmetleri. Çocuk oyun alanları, spor tesisleri ve güvenlik zeminleri için esnek, dayanıklı ve güvenli kauçuk zemin çözümleri. İstanbul genelinde profesyonel hizmet.',
  ARRAY['Güvenlik', 'Şok emici', 'Esnek yapı', 'Yüksek dayanıklılık', 'Su geçirmez', 'Kolay bakım', 'Geniş renk seçenekleri', 'Çevre dostu', 'Anti-bakteriyel', 'Kaymaz yüzey', 'UV dayanımı', 'Uzun ömür']
) ON CONFLICT (slug) DO NOTHING;

-- Insert SBR EPDM service
INSERT INTO services (
  title, 
  slug, 
  description, 
  content, 
  featured, 
  meta_title, 
  meta_description,
  features
) VALUES (
  'SBR EPDM Zemin',
  'sbr-epdm-zemin',
  'SBR ve EPDM kauçuk zemin sistemleri. Yüksek kalite, uzun ömürlü ve estetik zemin çözümleri. Spor tesisleri ve oyun alanları için ideal.',
  '<h2>SBR EPDM Zemin Nedir?</h2>
<p>SBR (Styrene Butadiene Rubber) ve EPDM (Ethylene Propylene Diene Monomer) kauçuk zemin sistemleri, yüksek kaliteli, uzun ömürlü ve estetik zemin kaplama çözümleridir. Özellikle spor tesisleri, çocuk oyun alanları ve yüksek trafikli alanlar için tercih edilir.</p>

<h2>SBR ve EPDM Farkları</h2>
<h3>SBR (Styrene Butadiene Rubber)</h3>
<ul>
  <li>Geri dönüştürülmüş lastik malzemeden üretilir</li>
  <li>Ekonomik fiyat avantajı</li>
  <li>Yüksek dayanıklılık</li>
  <li>Geniş renk seçenekleri</li>
  <li>Çevre dostu üretim</li>
</ul>

<h3>EPDM (Ethylene Propylene Diene Monomer)</h3>
<ul>
  <li>Doğal kauçuk bazlı yüksek kalite malzeme</li>
  <li>Üstün UV dayanımı</li>
  <li>Renk solması yok</li>
  <li>Daha uzun ömür</li>
  <li>Premium görünüm</li>
</ul>

<h2>Kullanım Alanları</h2>
<ul>
  <li>Atletizm pistleri ve koşu parkurları</li>
  <li>Çocuk oyun alanları ve parklar</li>
  <li>Okul bahçeleri ve spor alanları</li>
  <li>Fitness merkezleri ve spor salonları</li>
  <li>Basketbol ve tenis kortları</li>
  <li>Yürüyüş yolları</li>
  <li>Hastane ve sağlık tesisleri</li>
  <li>Endüstriyel alanlar</li>
</ul>

<h2>Avantajları</h2>
<ul>
  <li><strong>Yüksek Kalite:</strong> Premium malzeme kalitesi</li>
  <li><strong>Uzun Ömür:</strong> 15-20 yıl kullanım ömrü</li>
  <li><strong>UV Dayanımı:</strong> Güneş ışığına karşı renk solması yok</li>
  <li><strong>Şok Emme:</strong> Düşme durumunda yaralanma önleme</li>
  <li><strong>Su Geçirmez:</strong> Tam su geçirmez yapı</li>
  <li><strong>Bakım Kolaylığı:</strong> Minimum bakım gereksinimi</li>
  <li><strong>Estetik Görünüm:</strong> Modern ve şık tasarım</li>
  <li><strong>Esneklik:</strong> Yumuşak ve konforlu yüzey</li>
  <li><strong>Kaymaz:</strong> Güvenli yürüme ve koşma</li>
  <li><strong>Çevre Dostu:</strong> Geri dönüştürülebilir malzeme</li>
</ul>

<h2>Uygulama Yöntemleri</h2>
<h3>1. Dökme SBR/EPDM</h3>
<p>Monolitik yüzey, sıfır derz, sürekli kullanım için ideal</p>

<h3>2. SBR/EPDM Karo</h3>
<p>Modüler sistem, kolay montaj ve değiştirilebilir</p>

<h3>3. Hibrit Sistem</h3>
<p>SBR alt katman + EPDM üst katman kombinasyonu</p>

<h2>Uygulama Süreci</h2>
<ol>
  <li><strong>Hazırlık:</strong> Zemin analizi ve hazırlık</li>
  <li><strong>Alt Zemin:</strong> Beton veya asfalt alt zemin hazırlığı</li>
  <li><strong>Bağlayıcı:</strong> Poliüretan bağlayıcı uygulaması</li>
  <li><strong>Granül Uygulama:</strong> SBR/EPDM granül serpilmesi</li>
  <li><strong>Sıkıştırma:</strong> Özel makine ile sıkıştırma</li>
  <li><strong>Yüzey İşlemi:</strong> Düzeltme ve parlatma</li>
  <li><strong>Koruma:</strong> Sealer uygulaması</li>
</ol>

<h2>Teknik Özellikler</h2>
<ul>
  <li>Kalınlık: 10mm - 50mm</li>
  <li>Şok Emme: %70-85</li>
  <li>UV Dayanımı: Çok Yüksek (EPDM)</li>
  <li>Su Geçirgenlik: Yok</li>
  <li>Basınç Dayanımı: Yüksek</li>
  <li>Kullanım Ömrü: 15-20 yıl</li>
  <li>Renk Seçenekleri: 20+ renk</li>
</ul>

<h2>Bakım ve Koruma</h2>
<p>SBR EPDM zemin, düzenli temizlik ile minimum bakım gerektirir. Su ve sabun ile temizlenebilir. Yılda bir kez profesyonel kontrol ve bakım önerilir.</p>',
  true,
  'SBR EPDM Zemin | Yüksek Kalite Kauçuk Zemin Sistemleri | Zemin Ustası',
  'SBR ve EPDM kauçuk zemin uygulama hizmetleri. Spor tesisleri, çocuk oyun alanları ve yüksek trafikli alanlar için uzun ömürlü, estetik ve güvenli zemin çözümleri. İstanbul genelinde profesyonel hizmet.',
  ARRAY['Yüksek kalite', 'Uzun ömür (15-20 yıl)', 'UV dayanımı', 'Şok emme', 'Su geçirmez', 'Kolay bakım', 'Estetik görünüm', 'Esnek yapı', 'Kaymaz yüzey', 'Çevre dostu', 'Geniş renk seçenekleri', 'Premium malzeme']
) ON CONFLICT (slug) DO NOTHING;

-- Insert Spor Zemin Sistemleri service
INSERT INTO services (
  title, 
  slug, 
  description, 
  content, 
  featured, 
  meta_title, 
  meta_description,
  features
) VALUES (
  'Spor Zemin Sistemleri',
  'spor-zemin-sistemleri',
  'Profesyonel spor tesisleri için özel tasarlanmış zemin sistemleri. Basketbol, voleybol, tenis, atletizm ve fitness alanları için özel çözümler.',
  '<h2>Spor Zemin Sistemleri Nedir?</h2>
<p>Spor zemin sistemleri, farklı spor dallarına özel olarak tasarlanmış, performans odaklı, güvenli ve dayanıklı zemin kaplama çözümleridir. Her spor dalının kendine özgü gereksinimlerine göre optimize edilmiş sistemler sunar.</p>

<h2>Spor Dalına Özel Sistemler</h2>
<h3>Basketbol Zeminleri</h3>
<ul>
  <li>Ahşap parke zeminler</li>
  <li>PVC spor zeminleri</li>
  <li>Kauçuk zemin sistemleri</li>
  <li>Yüksek sıçrama performansı</li>
  <li>Top kontrolü optimizasyonu</li>
</ul>

<h3>Voleybol Zeminleri</h3>
<ul>
  <li>Ahşap parke sistemleri</li>
  <li>PVC modüler zeminler</li>
  <li>Şok emici özellik</li>
  <li>Düşme koruması</li>
</ul>

<h3>Tenis Kortları</h3>
<ul>
  <li>Akrilik zemin sistemleri</li>
  <li>Çim kort alternatifleri</li>
  <li>Top sıçrama kontrolü</li>
  <li>Hava koşullarına dayanıklı</li>
</ul>

<h3>Atletizm Pistleri</h3>
<ul>
  <li>EPDM kauçuk sistemler</li>
  <li>IAAF standartlarına uygun</li>
  <li>Şok emme özelliği</li>
  <li>Yüksek performans</li>
</ul>

<h3>Fitness ve CrossFit</h3>
<ul>
  <li>Kauçuk zemin sistemleri</li>
  <li>Ağırlık düşme koruması</li>
  <li>Kaymaz yüzey</li>
  <li>Kolay temizlik</li>
</ul>

<h2>Kullanım Alanları</h2>
<ul>
  <li>Profesyonel spor salonları</li>
  <li>Okul spor tesisleri</li>
  <li>Fitness merkezleri</li>
  <li>CrossFit box''lar</li>
  <li>Atletizm tesisleri</li>
  <li>Tenis kulüpleri</li>
  <li>Basketbol sahaları</li>
  <li>Voleybol sahaları</li>
  <li>Çok amaçlı spor salonları</li>
  <li>Rekreasyon alanları</li>
</ul>

<h2>Avantajları</h2>
<ul>
  <li><strong>Performans Odaklı:</strong> Spor performansını artıran özel tasarım</li>
  <li><strong>Güvenlik:</strong> Düşme ve yaralanma önleme</li>
  <li><strong>Şok Emme:</strong> Eklem koruması ve yaralanma önleme</li>
  <li><strong>Dayanıklılık:</strong> Ağır kullanıma dayanıklı yapı</li>
  <li><strong>Bakım Kolaylığı:</strong> Kolay temizlik ve bakım</li>
  <li><strong>Estetik:</strong> Modern ve profesyonel görünüm</li>
  <li><strong>Standart Uyumu:</strong> Uluslararası spor standartlarına uygun</li>
  <li><strong>Çok Amaçlı:</strong> Farklı spor dalları için uygun</li>
  <li><strong>Uzun Ömür:</strong> 15-20 yıl kullanım ömrü</li>
  <li><strong>Özel Tasarım:</strong> Spor dalına özel optimizasyon</li>
</ul>

<h2>Zemin Malzemeleri</h2>
<ul>
  <li><strong>Ahşap Parke:</strong> Klasik ve premium görünüm</li>
  <li><strong>PVC Spor Zemin:</strong> Modüler ve esnek sistem</li>
  <li><strong>Kauçuk Sistemler:</strong> Şok emici ve güvenli</li>
  <li><strong>EPDM:</strong> Atletizm ve açık alanlar</li>
  <li><strong>Akrilik:</strong> Tenis ve açık hava sporları</li>
  <li><strong>Hibrit Sistemler:</strong> Kombine çözümler</li>
</ul>

<h2>Uygulama Süreci</h2>
<ol>
  <li><strong>Proje Analizi:</strong> Spor dalı ve kullanım analizi</li>
  <li><strong>Tasarım:</strong> Özel zemin tasarımı ve planlama</li>
  <li><strong>Hazırlık:</strong> Alt zemin hazırlığı</li>
  <li><strong>Malzeme Seçimi:</strong> Spor dalına uygun malzeme</li>
  <li><strong>Uygulama:</strong> Profesyonel montaj ve uygulama</li>
  <li><strong>Test ve Kalibrasyon:</strong> Performans testleri</li>
  <li><strong>Teslim ve Eğitim:</strong> Bakım eğitimi</li>
</ol>

<h2>Teknik Standartlar</h2>
<ul>
  <li>IAAF standartları (Atletizm)</li>
  <li>FIBA standartları (Basketbol)</li>
  <li>FIVB standartları (Voleybol)</li>
  <li>ITF standartları (Tenis)</li>
  <li>EN 14904 (Spor zeminleri standardı)</li>
</ul>

<h2>Bakım ve Koruma</h2>
<p>Spor zemin sistemleri, düzenli temizlik ve periyodik bakım ile uzun ömürlü olur. Spor dalına özel bakım protokolleri uygulanır. Yılda 2-4 kez profesyonel bakım önerilir.</p>',
  true,
  'Spor Zemin Sistemleri | Profesyonel Spor Tesisleri Zemin Çözümleri | Zemin Ustası',
  'Profesyonel spor zemin sistemleri. Basketbol, voleybol, tenis, atletizm ve fitness alanları için performans odaklı, güvenli ve dayanıklı zemin çözümleri. İstanbul genelinde uzman hizmet.',
  ARRAY['Performans odaklı', 'Güvenlik', 'Şok emme', 'Yüksek dayanıklılık', 'Kolay bakım', 'Estetik görünüm', 'Standart uyumu', 'Çok amaçlı', 'Uzun ömür', 'Özel tasarım', 'IAAF/FIBA/FIVB uyumlu', 'Profesyonel uygulama']
) ON CONFLICT (slug) DO NOTHING;

