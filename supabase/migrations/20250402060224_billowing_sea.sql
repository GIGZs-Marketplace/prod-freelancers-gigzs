/*
  # Remove early access table

  1. Changes
    - Drop the `early_access` table as it's no longer needed

  2. Security
    - No changes to RLS policies needed
*/

DROP TABLE IF EXISTS early_access;