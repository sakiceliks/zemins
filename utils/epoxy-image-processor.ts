/**
 * Epoxy zemin görselleştirme için görsel işleme utility fonksiyonları
 */

export interface EpoxyStyleConfig {
  brightness: number;
  contrast: number;
  saturation: number;
  reflection: number;
  colorTint?: {
    r: number;
    g: number;
    b: number;
    opacity: number;
  };
}

const epoxyStyleConfigs: Record<string, EpoxyStyleConfig> = {
  'Metallic Epoksi': {
    brightness: 1.1,
    contrast: 1.2,
    saturation: 1.3,
    reflection: 0.4,
    colorTint: { r: 200, g: 200, b: 220, opacity: 0.3 },
  },
  'Kuvars Kumlu Epoksi': {
    brightness: 1.05,
    contrast: 1.15,
    saturation: 1.1,
    reflection: 0.2,
    colorTint: { r: 240, g: 240, b: 230, opacity: 0.2 },
  },
  'Flake (Pul) Epoksi': {
    brightness: 1.08,
    contrast: 1.18,
    saturation: 1.25,
    reflection: 0.35,
    colorTint: { r: 220, g: 220, b: 240, opacity: 0.25 },
  },
  '3D Efektli Epoksi': {
    brightness: 1.12,
    contrast: 1.25,
    saturation: 1.4,
    reflection: 0.45,
    colorTint: { r: 200, g: 210, b: 230, opacity: 0.3 },
  },
  'Düz Renk Epoksi': {
    brightness: 1.0,
    contrast: 1.1,
    saturation: 1.0,
    reflection: 0.15,
  },
  'Mermer Desenli Epoksi': {
    brightness: 1.06,
    contrast: 1.2,
    saturation: 1.15,
    reflection: 0.3,
    colorTint: { r: 250, g: 250, b: 245, opacity: 0.2 },
  },
  'Terrazzo Görünümlü': {
    brightness: 1.04,
    contrast: 1.12,
    saturation: 1.08,
    reflection: 0.25,
    colorTint: { r: 245, g: 245, b: 240, opacity: 0.15 },
  },
  'Endüstriyel Stil': {
    brightness: 0.95,
    contrast: 1.15,
    saturation: 0.9,
    reflection: 0.2,
    colorTint: { r: 180, g: 180, b: 190, opacity: 0.2 },
  },
  'Parlak Yüzey': {
    brightness: 1.15,
    contrast: 1.3,
    saturation: 1.2,
    reflection: 0.5,
    colorTint: { r: 255, g: 255, b: 255, opacity: 0.1 },
  },
};

const colorSchemeTints: Record<string, { r: number; g: number; b: number; opacity: number }> = {
  'Modern Gri Tonları': { r: 200, g: 200, b: 210, opacity: 0.2 },
  'Sıcak Kahve Tonları': { r: 180, g: 150, b: 120, opacity: 0.25 },
  'Mavi-Beyaz Kombin': { r: 200, g: 220, b: 240, opacity: 0.2 },
  'Siyah-Beyaz Kontrast': { r: 150, g: 150, b: 150, opacity: 0.3 },
  'Doğal Bejler': { r: 240, g: 230, b: 220, opacity: 0.15 },
  'Canlı Renkler': { r: 255, g: 200, b: 150, opacity: 0.2 },
  'Pastel Tonlar': { r: 250, g: 240, b: 250, opacity: 0.15 },
  'Metalik Gümüş': { r: 220, g: 220, b: 230, opacity: 0.25 },
  'Altın Dokunuşlar': { r: 255, g: 220, b: 150, opacity: 0.2 },
};

/**
 * Görselin alt kısmını (zemin alanını) tespit eder
 */
function detectFloorArea(
  imageData: ImageData,
  width: number,
  height: number
): { startY: number; endY: number } {
  // Basit bir algoritma: Görselin alt %40'ını zemin olarak kabul et
  const startY = Math.floor(height * 0.6);
  const endY = height;
  
  return { startY, endY };
}

/**
 * Canvas'a epoxy efekti uygular
 */
function applyEpoxyEffect(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  config: EpoxyStyleConfig,
  floorArea: { startY: number; endY: number }
): void {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  // Sadece zemin alanına efekt uygula
  for (let y = floorArea.startY; y < floorArea.endY; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      
      let r = data[index];
      let g = data[index + 1];
      let b = data[index + 2];
      let a = data[index + 3];

      // Brightness ve contrast uygula
      r = Math.min(255, Math.max(0, (r - 128) * config.contrast + 128 * config.brightness));
      g = Math.min(255, Math.max(0, (g - 128) * config.contrast + 128 * config.brightness));
      b = Math.min(255, Math.max(0, (b - 128) * config.contrast + 128 * config.brightness));

      // Saturation uygula
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      r = Math.min(255, gray + (r - gray) * config.saturation);
      g = Math.min(255, gray + (g - gray) * config.saturation);
      b = Math.min(255, gray + (b - gray) * config.saturation);

      // Color tint uygula
      if (config.colorTint) {
        r = Math.min(255, r + (config.colorTint.r - r) * config.colorTint.opacity);
        g = Math.min(255, g + (config.colorTint.g - g) * config.colorTint.opacity);
        b = Math.min(255, b + (config.colorTint.b - b) * config.colorTint.opacity);
      }

      // Reflection efekti (parlaklık)
      const reflectionFactor = 1 + config.reflection * (1 - (y - floorArea.startY) / (floorArea.endY - floorArea.startY));
      r = Math.min(255, r * reflectionFactor);
      g = Math.min(255, g * reflectionFactor);
      b = Math.min(255, b * reflectionFactor);

      data[index] = r;
      data[index + 1] = g;
      data[index + 2] = b;
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

/**
 * Ana görsel işleme fonksiyonu
 */
export async function processEpoxyImage(
  imageDataUri: string,
  epoxyStyle: string,
  colorScheme?: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Canvas context oluşturulamadı'));
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;

        // Orijinal görseli çiz
        ctx.drawImage(img, 0, 0);

        // Epoxy stil konfigürasyonunu al
        const baseConfig = epoxyStyleConfigs[epoxyStyle] || epoxyStyleConfigs['Düz Renk Epoksi'];
        
        // Renk şeması varsa tint ekle
        const config: EpoxyStyleConfig = { ...baseConfig };
        if (colorScheme && colorSchemeTints[colorScheme]) {
          const colorTint = colorSchemeTints[colorScheme];
          config.colorTint = {
            r: Math.min(255, (config.colorTint?.r || 255) * (colorTint.r / 255)),
            g: Math.min(255, (config.colorTint?.g || 255) * (colorTint.g / 255)),
            b: Math.min(255, (config.colorTint?.b || 255) * (colorTint.b / 255)),
            opacity: (config.colorTint?.opacity || 0.2) + colorTint.opacity * 0.5,
          };
        }

        // Zemin alanını tespit et
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const floorArea = detectFloorArea(imageData, canvas.width, canvas.height);

        // Epoxy efekti uygula
        applyEpoxyEffect(ctx, canvas.width, canvas.height, config, floorArea);

        // Sonucu data URI olarak döndür
        const resultDataUri = canvas.toDataURL('image/jpeg', 0.9);
        resolve(resultDataUri);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Görsel yüklenemedi'));
    };

    img.src = imageDataUri;
  });
}

