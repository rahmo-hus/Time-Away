/*
  Warnings:

  - A unique constraint covering the columns `[companyId]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Schedule_companyId_key" ON "Schedule"("companyId");
