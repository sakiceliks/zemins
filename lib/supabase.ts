import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

type AnySupabaseClient = SupabaseClient<any, 'public', any>

function canUseWebStorage(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const key = '__sb_test__'
    window.localStorage.setItem(key, '1')
    window.localStorage.removeItem(key)
    return true
  } catch {
    return false
  }
}

class MemoryStorage implements Storage {
  private store = new Map<string, string>()

  get length() {
    return this.store.size
  }

  clear(): void {
    this.store.clear()
  }

  getItem(key: string): string | null {
    return this.store.has(key) ? (this.store.get(key) as string) : null
  }

  key(index: number): string | null {
    const keys = Array.from(this.store.keys())
    return keys[index] ?? null
  }

  removeItem(key: string): void {
    this.store.delete(key)
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value)
  }
}

function createSupabaseClientSingleton(): AnySupabaseClient {
  const g = globalThis as unknown as {
    __supabase_public_client__?: AnySupabaseClient
  }

  if (g.__supabase_public_client__) return g.__supabase_public_client__

  const hasStorage = canUseWebStorage()
  const storage: Storage = hasStorage ? window.localStorage : new MemoryStorage()

  g.__supabase_public_client__ = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      // Bu projede Supabase session'ı kalıcı tutmuyoruz (admin auth localStorage tabanlı).
      // Storage erişimi bloklanan ortamlarda (Safari/ITP vb.) hata fırlatmayı da engelliyoruz.
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
      // Auth-helpers ile aynı storageKey'i paylaşmayalım (çoklu client uyarılarını azaltır).
      storageKey: 'sb-public',
      storage,
    },
  })

  return g.__supabase_public_client__
}

export function getSupabaseClient(): AnySupabaseClient {
  // Server-side'da da aynı anon client yeterli (cookie/session yönetmiyoruz).
  if (typeof window === 'undefined') {
    const g = globalThis as unknown as {
      __supabase_public_server_client__?: AnySupabaseClient
    }
    if (!g.__supabase_public_server_client__) {
      g.__supabase_public_server_client__ = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
          storageKey: 'sb-public',
        },
      })
    }
    return g.__supabase_public_server_client__
  }

  return createSupabaseClientSingleton()
}

export const supabase = getSupabaseClient()

// Types
export interface Service {
  id: string
  title: string
  slug: string
  description: string
  content: string
  image?: string
  featured: boolean
  meta_title?: string
  meta_description?: string
  feature?: string
  features?: string[] // Özellikler array'i eklendi
  short_description?: string
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  title: string
  slug: string
  description: string
  content: string
  image?: string
  category: string
  location?: string
  completion_date?: string
  featured: boolean
  meta_title?: string
  meta_description?: string
  created_at: string
  updated_at: string
}
export interface Bolgeler {
  id?: number;
  created_at?: string;
  updated_at?: string;
  
  // Company fields
  company_name: string;
  company_fullName: string;
  company_phone: string;
  company_whatsappPhone: string;
  company_email: string;
  company_address: string;
  company_workingHours_weekdays: string;
  company_workingHours_saturday: string;
  
  // SEO fields
  seo_title: string;
  seo_description: string;
  
  // Navigation (array of objects)
  navigation: Array<{
    label: string;
    href: string;
  }>;
  
  // Hero section fields
  hero_title: string;
  hero_subtitle: string;
  hero_buttons: Array<{
    text: string;
    href: string;
    icon: string;
    primary: boolean;
  }>;
  
  // Stats (array of objects)
  stats: Array<{
    value: string;
    label: string;
  }>;
  
  // Service areas (array of strings)
  serviceAreas: string[];
  
  // Services (array of objects)
  services: Array<{
    icon: string;
    title: string;
    items: string[];
  }>;
  
  // Advantages (array of objects)
  advantages: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  
  // Social media (array of objects)
  socialMedia: Array<{
    platform: string;
    icon: string;
    href: string;
  }>;
  
  // Footer links (array of objects)
  footerLinks: Array<{
    label: string;
    href: string;
  }>;
}
export interface SiteSettings {
  id: string
  company_name: string
  company_description: string
  address: string
  phone: string
  email: string
  working_hours: string
  social_media: {
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
  }
  hero_title: string
  hero_subtitle: string
  about_title: string
  about_description: string
  services_title: string
  services_description: string
  projects_title: string
  projects_description: string
  contact_title: string
  contact_description: string
  created_at: string
  updated_at: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  order: number
  active: boolean
  created_at: string
  updated_at: string
}

export interface TeamMember {
  id: string
  name: string
  position: string
  bio: string
  image?: string
  email?: string
  phone?: string
  social_media?: {
    linkedin?: string
    twitter?: string
  }
  order: number
  active: boolean
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  image?: string
  author?: string
  category?: string
  tags?: string[]
  featured: boolean
  meta_title?: string
  meta_description?: string
  published_at?: string
  created_at: string
  updated_at: string
}

export interface AdminUser {
  id: string
  email: string
  role: string
  created_at: string
}

// Service functions
export async function getServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Service[]
}

export async function getServiceBySlug(slug: string) {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data as Service
}

export async function getServiceById(id: string) {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Service
}

export async function getFeaturedServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Service[]
}

// Project functions
export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Project[]
}

export async function getBolgeler() {
  const { data, error } = await supabase
    .from('bolgeler')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Bolgeler[]
}

export async function getProjectBySlug(slug: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data as Project
}



export async function getBolgelerBySlug(slug: string) {
  const { data, error } = await supabase
    .from('bolgeler')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  
  // Veritabanı JSONB alanlarını interface'e uygun hale getir
  const transformedData = {
    ...data,
    // Company bilgileri
    company_name: data.company?.name || '',
    company_fullName: data.company?.fullName || '',
    company_phone: data.company?.phone || '',
    company_whatsappPhone: data.company?.whatsappPhone || '',
    company_email: data.company?.email || '',
    company_address: data.company?.address || '',
    company_workingHours_weekdays: data.company?.workingHours?.weekdays || '',
    company_workingHours_saturday: data.company?.workingHours?.saturday || '',
    
    // SEO bilgileri
    seo_title: data.seo?.title || '',
    seo_description: data.seo?.description || '',
    
    // Hero bilgileri
    hero_title: data.hero?.title || '',
    hero_subtitle: data.hero?.subtitle || '',
    hero_buttons: data.hero?.buttons || [],
    
    // Diğer alanlar
    navigation: data.navigation || [],
    stats: data.stats || [],
    serviceAreas: data.service_areas || [],
    services: data.services || [],
    advantages: data.advantages || [],
    socialMedia: data.social_media || [],
    footerLinks: data.footer_links || []
  }
  
  return transformedData as Bolgeler
}

export async function getProjectById(id: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Project
}

export async function getFeaturedProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Project[]
}

// Services'den kategorileri çek
export async function getServiceCategories() {
  const { data, error } = await supabase
    .from('services')
    .select('title')
    .order('title', { ascending: true })

  if (error) throw error
  return data.map(service => service.title)
}

export async function getProjectsByCategory(category: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Project[]
}

// Admin functions
export async function isAdmin(email: string) {
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', email)
    .maybeSingle(); // single() yerine maybeSingle() kullanın

  if (error || !data) return false;
  return true;
}

// CRUD operations for admin
export async function createService(service: Omit<Service, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('services')
    .insert([service])
    .select()
    .single()

  if (error) throw error
  return data as Service
}

export async function updateService(id: string, service: Partial<Service>) {
  const { data, error } = await supabase
    .from('services')
    .update(service)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Service
}

export async function deleteService(id: string) {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single()

  if (error) throw error
  return data as Project
}

export async function updateProject(id: string, project: Partial<Project>) {
  const { data, error } = await supabase
    .from('projects')
    .update(project)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Project
}

export async function deleteProject(id: string) {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Image upload functions
export async function uploadImage(file: File, folder: string = 'images') {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
  const filePath = `${folder}/${fileName}`

  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) throw error

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('uploads')
    .getPublicUrl(filePath)

  return publicUrl
}

export async function deleteImage(filePath: string) {
  const { error } = await supabase.storage
    .from('uploads')
    .remove([filePath])

  if (error) throw error
}

// Site Settings functions
export async function getSiteSettings() {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .single()

  if (error) throw error
  return data as SiteSettings
}

export async function updateSiteSettings(settings: Partial<SiteSettings>) {
  const { data, error } = await supabase
    .from('site_settings')
    .update(settings)
    .eq('id', '1') // Assuming single record
    .select()
    .single()

  if (error) throw error
  return data as SiteSettings
}

// FAQ functions
export async function getFAQs() {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .order('order', { ascending: true })

  if (error) throw error
  return data as FAQ[]
}

export async function createFAQ(faq: Omit<FAQ, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('faqs')
    .insert([faq])
    .select()
    .single()

  if (error) throw error
  return data as FAQ
}

export async function updateFAQ(id: string, faq: Partial<FAQ>) {
  const { data, error } = await supabase
    .from('faqs')
    .update(faq)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as FAQ
}

export async function deleteFAQ(id: string) {
  const { error } = await supabase
    .from('faqs')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Team Member functions
export async function getTeamMembers() {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('order', { ascending: true })

  if (error) throw error
  return data as TeamMember[]
}

export async function createTeamMember(member: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('team_members')
    .insert([member])
    .select()
    .single()

  if (error) throw error
  return data as TeamMember
}

export async function updateTeamMember(id: string, member: Partial<TeamMember>) {
  const { data, error } = await supabase
    .from('team_members')
    .update(member)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as TeamMember
}

export async function deleteTeamMember(id: string) {
  const { error } = await supabase
    .from('team_members')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Blog functions
export async function getBlogPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as BlogPost[]
}

export async function getBlogPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data as BlogPost
}

export async function getFeaturedBlogPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as BlogPost[]
}

export async function getBlogPostsByCategory(category: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as BlogPost[]
}

export function generateBlogPostJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.meta_description || post.excerpt || post.content.substring(0, 160),
    "image": post.image,
    "datePublished": post.published_at || post.created_at,
    "dateModified": post.updated_at,
    "author": {
      "@type": "Organization",
      "name": "Zemin Ustası",
      "url": "https://www.zeminustasi.com.tr"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Zemin Ustası",
      "logo": {
        "@type": "ImageObject",
        "url": "https://zeminustasi.com.tr/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://zeminustasi.com.tr/blog/${post.slug}`
    },
    "articleSection": post.category || "Genel",
    "keywords": post.tags?.join(", ") || ""
  }
}

// Blog CRUD operations
export async function createBlogPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([post])
    .select()
    .single()

  if (error) throw error
  return data as BlogPost
}

export async function updateBlogPost(id: string, post: Partial<BlogPost>) {
  const { data, error } = await supabase
    .from('blog_posts')
    .update(post)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as BlogPost
}

export async function deleteBlogPost(id: string) {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function getBlogPostById(id: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as BlogPost
}

// JSON-LD helpers
export function generateServiceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "Zemin Ustası",
      "url": "https://BMÇ Zemin.com"
    },
    "areaServed": "Türkiye",
    "serviceType": "İnşaat Hizmeti",
    "image": service.image,
    "url": `https://BMÇ Zemin.com/hizmetler/${service.slug}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://BMÇ Zemin.com/hizmetler/${service.slug}`
    }
  }
}

export function generateProjectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description,
    "creator": {
      "@type": "Organization",
      "name": "Zemin Ustası",
      "url": "https://BMÇ Zemin.com"
    },
    "location": {
      "@type": "Place",
      "name": project.location || "İstanbul, Türkiye"
    },
    "image": project.image,
    "url": `https://BMÇ Zemin.com/projeler/${project.slug}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://BMÇ Zemin.com/projeler/${project.slug}`
    },
    "dateCreated": project.created_at,
    "dateModified": project.updated_at,
    "category": project.category
  }
}

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Zemin Ustası",
    "url": "https://BMÇ Zemin.com",
    "logo": "https://BMÇ Zemin.com/logo.png",
    "description": "Yenilikçi inşaat çözümleri için güvenilir ortağınız",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 BMÇ Zemin Cad., İnşaat Mahallesi",
      "addressLocality": "İstanbul",
      "postalCode": "34000",
      "addressCountry": "TR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "(0212) 456-7890",
      "contactType": "customer service",
      "email": "info@BMÇ Zemin.com"
    },
    "sameAs": [
      "https://facebook.com/BMÇ Zemin",
      "https://instagram.com/BMÇ Zemin",
      "https://linkedin.com/company/BMÇ Zemin"
    ]
  }
}