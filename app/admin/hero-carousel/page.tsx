'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, MoveUp, MoveDown, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ImageUpload } from '@/components/ui/image-upload';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

interface HeroCarouselItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image_url: string;
  image_alt?: string;
  button_text?: string;
  button_link?: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function HeroCarouselAdmin() {
  const [items, setItems] = useState<HeroCarouselItem[]>([]);
  const [editingItem, setEditingItem] = useState<HeroCarouselItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image_url: '',
    image_alt: '',
    button_text: '',
    button_link: '',
    order_index: 0,
    is_active: true
  });

  useEffect(() => {
    fetchHeroCarousel();
  }, []);

  const fetchHeroCarousel = async () => {
    try {
      const { data, error } = await supabase
        .from('hero_carousel')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching hero carousel:', error);
      toast({
        title: 'Hata',
        description: 'Hero carousel verileri yüklenirken hata oluştu.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingItem(null);
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      image_url: '',
      image_alt: '',
      button_text: '',
      button_link: '',
      order_index: items.length + 1,
      is_active: true
    });
  };

  const handleEdit = (item: HeroCarouselItem) => {
    setEditingItem(item);
    setIsCreating(false);
    setFormData({
      title: item.title,
      subtitle: item.subtitle || '',
      description: item.description || '',
      image_url: item.image_url,
      image_alt: item.image_alt || '',
      button_text: item.button_text || '',
      button_link: item.button_link || '',
      order_index: item.order_index,
      is_active: item.is_active
    });
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingItem(null);
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      image_url: '',
      image_alt: '',
      button_text: '',
      button_link: '',
      order_index: 0,
      is_active: true
    });
  };

  const handleSave = async () => {
    if (!formData.title || !formData.image_url) {
      toast({
        title: 'Hata',
        description: 'Başlık ve resim alanları zorunludur.',
        variant: 'destructive'
      });
      return;
    }

    setIsSaving(true);
    try {
      if (isCreating) {
        // Create new item
        const { error } = await supabase
          .from('hero_carousel')
          .insert([formData]);

        if (error) throw error;
        toast({
          title: 'Başarılı',
          description: 'Yeni carousel öğesi oluşturuldu.'
        });
      } else if (editingItem) {
        // Update existing item
        const { error } = await supabase
          .from('hero_carousel')
          .update(formData)
          .eq('id', editingItem.id);

        if (error) throw error;
        toast({
          title: 'Başarılı',
          description: 'Carousel öğesi güncellendi.'
        });
      }

      await fetchHeroCarousel();
      handleCancel();
    } catch (error) {
      console.error('Error saving hero carousel item:', error);
      toast({
        title: 'Hata',
        description: 'Kaydetme sırasında hata oluştu.',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu öğeyi silmek istediğinizden emin misiniz?')) return;

    try {
      const { error } = await supabase
        .from('hero_carousel')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: 'Başarılı',
        description: 'Carousel öğesi silindi.'
      });
      await fetchHeroCarousel();
    } catch (error) {
      console.error('Error deleting hero carousel item:', error);
      toast({
        title: 'Hata',
        description: 'Silme sırasında hata oluştu.',
        variant: 'destructive'
      });
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('hero_carousel')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      await fetchHeroCarousel();
      toast({
        title: 'Başarılı',
        description: `Öğe ${!currentStatus ? 'aktif' : 'pasif'} hale getirildi.`
      });
    } catch (error) {
      console.error('Error toggling active status:', error);
      toast({
        title: 'Hata',
        description: 'Durum güncellenirken hata oluştu.',
        variant: 'destructive'
      });
    }
  };

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = items.findIndex(item => item.id === id);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= items.length) return;

    try {
      const currentItem = items[currentIndex];
      const targetItem = items[newIndex];

      const { error } = await supabase
        .from('hero_carousel')
        .update([
          { id: currentItem.id, order_index: targetItem.order_index },
          { id: targetItem.id, order_index: currentItem.order_index }
        ])
        .in('id', [currentItem.id, targetItem.id]);

      if (error) throw error;
      await fetchHeroCarousel();
    } catch (error) {
      console.error('Error reordering items:', error);
      toast({
        title: 'Hata',
        description: 'Sıralama güncellenirken hata oluştu.',
        variant: 'destructive'
      });
    }
  };

  const handleImageUpload = (url: string) => {
    setFormData(prev => ({ ...prev, image_url: url }));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Hero Carousel Yönetimi</h1>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Yeni Öğe Ekle
        </Button>
      </div>

      {/* Form */}
      {(isCreating || editingItem) && (
        <Card>
          <CardHeader>
            <CardTitle>
              {isCreating ? 'Yeni Carousel Öğesi' : 'Carousel Öğesini Düzenle'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Başlık *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ana başlık"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Alt Başlık</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                  placeholder="Alt başlık"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Açıklama</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Detaylı açıklama"
                rows={3}
              />
            </div>

                         <div className="space-y-2">
               <Label>Resim *</Label>
               <ImageUpload
                 value={formData.image_url}
                 onChange={handleImageUpload}
                 folder="hero-carousel"
               />
             </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="image_alt">Resim Alt Metni</Label>
                <Input
                  id="image_alt"
                  value={formData.image_alt}
                  onChange={(e) => setFormData(prev => ({ ...prev, image_alt: e.target.value }))}
                  placeholder="Resim açıklaması"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order_index">Sıra</Label>
                <Input
                  id="order_index"
                  type="number"
                  value={formData.order_index}
                  onChange={(e) => setFormData(prev => ({ ...prev, order_index: parseInt(e.target.value) || 0 }))}
                  min="1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="button_text">Buton Metni</Label>
                <Input
                  id="button_text"
                  value={formData.button_text}
                  onChange={(e) => setFormData(prev => ({ ...prev, button_text: e.target.value }))}
                  placeholder="Buton metni"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="button_link">Buton Linki</Label>
                <Input
                  id="button_link"
                  value={formData.button_link}
                  onChange={(e) => setFormData(prev => ({ ...prev, button_link: e.target.value }))}
                  placeholder="/sayfa-yolu"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
              />
              <Label htmlFor="is_active">Aktif</Label>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                İptal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Items List */}
      <div className="grid gap-4">
        {items.map((item, index) => (
          <Card key={item.id} className={!item.is_active ? 'opacity-60' : ''}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-24 h-16 bg-gray-200 rounded overflow-hidden">
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.image_alt || item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    {item.subtitle && (
                      <span className="text-sm text-gray-600">- {item.subtitle}</span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                  )}
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>Sıra: {item.order_index}</span>
                    {item.button_text && (
                      <span>Buton: {item.button_text}</span>
                    )}
                    <span>Durum: {item.is_active ? 'Aktif' : 'Pasif'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReorder(item.id, 'up')}
                    disabled={index === 0}
                  >
                    <MoveUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReorder(item.id, 'down')}
                    disabled={index === items.length - 1}
                  >
                    <MoveDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleActive(item.id, item.is_active)}
                  >
                    {item.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {items.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center text-gray-500">
            Henüz carousel öğesi eklenmemiş. Yeni öğe eklemek için yukarıdaki butonu kullanın.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
