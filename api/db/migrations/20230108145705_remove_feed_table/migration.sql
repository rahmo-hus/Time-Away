/*
  Warnings:

  - You are about to drop the `Feed` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Feed" DROP CONSTRAINT "Feed_userId_fkey";

-- DropTable
DROP TABLE "Feed";
