/*
  Warnings:

  - The values [safeNotes] on the enum `registerType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "registerType_new" AS ENUM ('credentials', 'safenotes', 'cards', 'wifi');
ALTER TABLE "registers" ALTER COLUMN "type" TYPE "registerType_new" USING ("type"::text::"registerType_new");
ALTER TYPE "registerType" RENAME TO "registerType_old";
ALTER TYPE "registerType_new" RENAME TO "registerType";
DROP TYPE "registerType_old";
COMMIT;
