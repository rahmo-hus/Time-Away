/*
  Warnings:

  - Made the column `shareAllAbsences` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isTeamViewHidden` on table `Company` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "shareAllAbsences" SET NOT NULL,
ALTER COLUMN "shareAllAbsences" SET DEFAULT true,
ALTER COLUMN "isTeamViewHidden" SET NOT NULL,
ALTER COLUMN "isTeamViewHidden" SET DEFAULT true;
