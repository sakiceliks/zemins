-- Create storage bucket for file uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'uploads',
  'uploads',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
);

-- Create storage policies for public read access
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'uploads');

-- Create storage policies for authenticated users to upload
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'uploads' AND auth.role() = 'authenticated');

-- Create storage policies for authenticated users to update their own files
CREATE POLICY "Authenticated users can update" ON storage.objects FOR UPDATE 
USING (bucket_id = 'uploads' AND auth.role() = 'authenticated');

-- Create storage policies for authenticated users to delete their own files
CREATE POLICY "Authenticated users can delete" ON storage.objects FOR DELETE 
USING (bucket_id = 'uploads' AND auth.role() = 'authenticated');
