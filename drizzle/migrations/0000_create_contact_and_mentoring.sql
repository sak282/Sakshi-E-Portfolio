CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  subject text NOT NULL DEFAULT '' CHECK (char_length(subject) <= 150),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can send a contact message"
  ON public.contact_messages FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE TABLE public.mentoring_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  session_type text NOT NULL CHECK (session_type IN ('python', 'sql-analytics', 'project-guidance')),
  preferred_date date,
  notes text NOT NULL DEFAULT '' CHECK (char_length(notes) <= 1000),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'confirmed', 'cancelled')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.mentoring_requests TO anon, authenticated;
GRANT ALL ON public.mentoring_requests TO service_role;
ALTER TABLE public.mentoring_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can request a mentoring session"
  ON public.mentoring_requests FOR INSERT TO anon, authenticated
  WITH CHECK (status = 'pending');