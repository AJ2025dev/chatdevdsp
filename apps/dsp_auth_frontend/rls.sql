-- Row-level security policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow logged-in users to view their own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);