
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_type TEXT,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT,
  postal_code TEXT,
  province TEXT,
  credit_score TEXT,
  job_type TEXT,
  income TEXT,
  employer TEXT,
  years_employed TEXT,
  monthly_budget TEXT,
  down_payment TEXT,
  has_trade TEXT,
  timeline TEXT,
  preferred_contact TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON public.leads
  FOR INSERT TO anon WITH CHECK (true);
