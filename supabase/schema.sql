CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  link TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir leitura pública dos produtos"
ON public.products FOR SELECT
USING (true);

CREATE POLICY "Permitir escrita no painel administrativo"
ON public.products FOR INSERT
WITH CHECK (true);

CREATE POLICY "Permitir atualização no painel administrativo"
ON public.products FOR UPDATE
USING (true)
WITH CHECK (true);

CREATE POLICY "Permitir exclusão no painel administrativo"
ON public.products FOR DELETE
USING (true);
