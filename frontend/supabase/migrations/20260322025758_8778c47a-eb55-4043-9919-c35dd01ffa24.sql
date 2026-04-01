ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS company_name text,
ADD COLUMN IF NOT EXISTS company_address text,
ADD COLUMN IF NOT EXISTS profession text,
ADD COLUMN IF NOT EXISTS college_name text,
ADD COLUMN IF NOT EXISTS workplace_name text,
ADD COLUMN IF NOT EXISTS retired_department text,
ADD COLUMN IF NOT EXISTS other_specify text;