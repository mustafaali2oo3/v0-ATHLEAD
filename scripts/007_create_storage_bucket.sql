-- Create storage bucket for posts
INSERT INTO storage.buckets (id, name, public) 
VALUES ('posts', 'posts', true);

-- Set up RLS policies for storage
CREATE POLICY "Users can upload their own files" ON storage.objects
FOR INSERT WITH CHECK (auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Anyone can view uploaded files" ON storage.objects
FOR SELECT USING (bucket_id = 'posts');

CREATE POLICY "Users can update their own files" ON storage.objects
FOR UPDATE USING (auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own files" ON storage.objects
FOR DELETE USING (auth.uid()::text = (storage.foldername(name))[1]);
