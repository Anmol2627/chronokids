-- ChronoKids Leaderboard Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Create the leaderboard table
CREATE TABLE IF NOT EXISTS leaderboard (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  chapters_completed INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leaderboard_points ON leaderboard(points DESC);
CREATE INDEX IF NOT EXISTS idx_leaderboard_name ON leaderboard(name);
CREATE INDEX IF NOT EXISTS idx_leaderboard_updated_at ON leaderboard(updated_at DESC);

-- Add Row Level Security (RLS) policies
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read the leaderboard (for public viewing)
CREATE POLICY "Public read access to leaderboard" ON leaderboard
  FOR SELECT USING (true);

-- Allow anyone to insert/update their own score
CREATE POLICY "Allow insert and update for all users" ON leaderboard
  FOR ALL USING (true);

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at on row changes
CREATE TRIGGER update_leaderboard_updated_at
  BEFORE UPDATE ON leaderboard
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add some sample data for testing (optional)
INSERT INTO leaderboard (name, points, chapters_completed) VALUES
  ('TimeExplorer123', 150, 5),
  ('HistoryKid', 120, 4),
  ('ScienceWizard', 180, 6),
  ('AdventureSeeker', 90, 3),
  ('ChronoMaster', 200, 7);
