/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserAllowanceAdjustment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserAllowanceAdjustment_userId_key" ON "UserAllowanceAdjustment"("userId");
