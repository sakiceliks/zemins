import React from 'react';

// Backlink Component - 5 farklı varyasyonda kullanılabilir
interface BacklinkComponentProps {
  variant?: 'inline' | 'card' | 'sidebar' | 'footer' | 'recommendation';
  className?: string;
}

const KadikoyTelefontamiriBacklink: React.FC<BacklinkComponentProps> = ({ 
  variant = 'inline',
  className = '' 
}) => {
  
  // Rastgele anchor text seçimi için
  const anchorTexts = [
    'Kadıköy telefon tamiri',
    'Kadıköy yerinde tamir',
    'Kadıköy ekran değişimi',
    'yerinde telefon tamiri',
    'Kadıköy telefon onarımı'
  ];

  const descriptions = [
    'profesyonel telefon tamiri hizmeti',
    'hızlı ve güvenilir ekran değişimi',
    'yerinde telefon onarım hizmeti', 
    'garantili batarya değişimi',
    'uzman teknisyen desteği'
  ];

  const getRandomText = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  
  const baseUrl = 'https://kadikoytelefontamiri.com';
  const randomAnchor = getRandomText(anchorTexts);
  const randomDescription = getRandomText(descriptions);

  // Variant 1: Inline Text Link (Blog içeriği için)
  if (variant === 'inline') {
    return (
      <span className={className}>
        Teknolojik cihazlarınızın arızalanması durumunda{' '}
        <a 
          href={baseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline font-medium"
        >
          {randomAnchor}
        </a>
        {' '}hizmeti alarak sorunlarınızı kısa sürede çözebilirsiniz.
      </span>
    );
  }

  // Variant 2: Card Format (Önerilen hizmetler için)
  if (variant === 'card') {
    return (
      <div className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow ${className}`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
              📱
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              <a 
                href={baseUrl}
                target="_blank"
                rel="noopener noreferrer" 
                className="text-blue-600 hover:text-blue-800"
              >
                {randomAnchor}
              </a>
            </h3>
            <p className="text-gray-600 text-sm">
              Kadıköy bölgesinde {randomDescription} için güvenilir adres. 
              Hızlı servis, uygun fiyat, 1 yıl garanti.
            </p>
            <div className="mt-2">
              <a 
                href={baseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                İletişim →
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Variant 3: Sidebar Widget
  if (variant === 'sidebar') {
    return (
      <div className={`bg-gray-50 border-l-4 border-blue-500 p-4 ${className}`}>
        <h4 className="text-md font-semibold text-gray-800 mb-2">
          📱 Telefon Arızası mı?
        </h4>
        <p className="text-sm text-gray-600 mb-3">
          <a 
            href={baseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            {randomAnchor}
          </a>
          {' '}hizmeti ile cihazınızı kısa sürede onarttırın.
        </p>
        <a 
          href={baseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          Randevu Al →
        </a>
      </div>
    );
  }

  // Variant 4: Footer Link
  if (variant === 'footer') {
    return (
      <div className={`text-center py-2 ${className}`}>
        <p className="text-sm text-gray-600">
          İstanbul telefon tamiri ihtiyacınız için{' '}
          <a 
            href={baseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-blue-600 font-medium"
          >
            {randomAnchor}
          </a>
          {' '}hizmetini inceleyebilirsiniz.
        </p>
      </div>
    );
  }

  // Variant 5: Recommendation Box
  if (variant === 'recommendation') {
    return (
      <div className={`bg-blue-50 border border-blue-200 rounded-lg p-6 ${className}`}>
        <div className="flex items-center mb-3">
          <span className="text-2xl mr-2">💡</span>
          <h3 className="text-lg font-semibold text-blue-800">Önerilen Hizmet</h3>
        </div>
        <p className="text-gray-700 mb-4">
          Telefon, tablet veya laptop arızanız mı var? 
          <strong>
            <a 
              href={baseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 mx-1"
            >
              {randomAnchor}
            </a>
          </strong>
          hizmeti ile profesyonel çözüm bulabilirsiniz.
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="bg-white px-2 py-1 rounded text-gray-600">✓ Yerinde Servis</span>
          <span className="bg-white px-2 py-1 rounded text-gray-600">✓ 15 dk Hızlı Onarım</span>
          <span className="bg-white px-2 py-1 rounded text-gray-600">✓ 1 Yıl Garanti</span>
        </div>
        <div className="mt-4">
          <a 
            href={baseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Hemen İletişime Geç →
          </a>
        </div>
      </div>
    );
  }

  return null;
};

// Export edilebilir bileşen
export default KadikoyTelefontamiriBacklink;

// Kullanım örnekleri:
export const BacklinkExamples: React.FC = () => {
  return (
    <div className="space-y-8 p-6">
      <h2 className="text-2xl font-bold mb-6">Backlink Component Kullanım Örnekleri</h2>
      
      {/* Blog içeriği için inline */}
      <section>
        <h3 className="text-lg font-semibold mb-3">1. Blog İçeriği (Inline)</h3>
        <div className="bg-gray-50 p-4 rounded">
          <p className="text-gray-800">
            Telefonunuzun ekranı çatladığında panik yapmayın. 
            <KadikoyTelefontamiriBacklink variant="inline" />
            Bu tür arızalar günümüzde oldukça yaygındır.
          </p>
        </div>
      </section>

      {/* Sidebar için widget */}
      <section>
        <h3 className="text-lg font-semibold mb-3">2. Sidebar Widget</h3>
        <div className="max-w-xs">
          <KadikoyTelefontamiriBacklink variant="sidebar" />
        </div>
      </section>

      {/* Card format */}
      <section>
        <h3 className="text-lg font-semibold mb-3">3. Hizmet Kartı</h3>
        <div className="max-w-md">
          <KadikoyTelefontamiriBacklink variant="card" />
        </div>
      </section>

      {/* Recommendation box */}
      <section>
        <h3 className="text-lg font-semibold mb-3">4. Öneri Kutusu</h3>
        <div className="max-w-lg">
          <KadikoyTelefontamiriBacklink variant="recommendation" />
        </div>
      </section>

      {/* Footer link */}
      <section>
        <h3 className="text-lg font-semibold mb-3">5. Footer Link</h3>
        <div className="bg-gray-800 text-white p-4 rounded">
          <KadikoyTelefontamiriBacklink variant="footer" />
        </div>
      </section>
    </div>
  );
};