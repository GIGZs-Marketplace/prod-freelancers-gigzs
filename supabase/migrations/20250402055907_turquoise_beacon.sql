/*
  # Add additional columns to waitlist table

  1. Changes
    - Add new columns to `waitlist` table:
      - `phone` (text)
      - `expertise` (text)
      - `experience` (text)
      - `availability` (text)
      - `portfolio` (text)
      - `country` (text)
      - `state` (text)
      - `city` (text)

  2. Security
    - No changes to RLS policies needed
*/

DO $$ 
BEGIN
  -- Add phone column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'waitlist' AND column_name = 'phone'
  ) THEN
    ALTER TABLE waitlist ADD COLUMN phone text;
  END IF;

  -- Add expertise column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'waitlist' AND column_name = 'expertise'
  ) THEN
    ALTER TABLE waitlist ADD COLUMN expertise text;
  END IF;

  -- Add experience column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'waitlist' AND column_name = 'experience'
  ) THEN
    ALTER TABLE waitlist ADD COLUMN experience text;
  END IF;

  -- Add availability column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'waitlist' AND column_name = 'availability'
  ) THEN
    ALTER TABLE waitlist ADD COLUMN availability text;
  END IF;

  -- Add portfolio column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'waitlist' AND column_name = 'portfolio'
  ) THEN
    ALTER TABLE waitlist ADD COLUMN portfolio text;
  END IF;

  -- Add country column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'waitlist' AND column_name = 'country'
  ) THEN
    ALTER TABLE waitlist ADD COLUMN country text;
  END IF;

  -- Add state column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'waitlist' AND column_name = 'state'
  ) THEN
    ALTER TABLE waitlist ADD COLUMN state text;
  END IF;

  -- Add city column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'waitlist' AND column_name = 'city'
  ) THEN
    ALTER TABLE waitlist ADD COLUMN city text;
  END IF;
END $$;