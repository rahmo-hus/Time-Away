/*
  Warnings:

  - Added the required column `monday` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tuesday` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wednesday` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thursday` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `friday` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saturday` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sunday` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "monday",
ADD COLUMN     "monday" BOOLEAN NOT NULL,
DROP COLUMN "tuesday",
ADD COLUMN     "tuesday" BOOLEAN NOT NULL,
DROP COLUMN "wednesday",
ADD COLUMN     "wednesday" BOOLEAN NOT NULL,
DROP COLUMN "thursday",
ADD COLUMN     "thursday" BOOLEAN NOT NULL,
DROP COLUMN "friday",
ADD COLUMN     "friday" BOOLEAN NOT NULL,
DROP COLUMN "saturday",
ADD COLUMN     "saturday" BOOLEAN NOT NULL,
DROP COLUMN "sunday",
ADD COLUMN     "sunday" BOOLEAN NOT NULL;
