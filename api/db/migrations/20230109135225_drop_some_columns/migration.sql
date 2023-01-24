/*
  Warnings:

  - You are about to drop the column `entityId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `entityType` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `dateFormat` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `ldapAuthConfig` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `ldapAuthEnabled` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `mode` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `isAccruedAllowance` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the column `sortOrder` on the `LeaveType` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "entityId",
DROP COLUMN "entityType";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "dateFormat",
DROP COLUMN "ldapAuthConfig",
DROP COLUMN "ldapAuthEnabled",
DROP COLUMN "mode";

-- AlterTable
ALTER TABLE "Department" DROP COLUMN "isAccruedAllowance";

-- AlterTable
ALTER TABLE "LeaveType" DROP COLUMN "sortOrder";
