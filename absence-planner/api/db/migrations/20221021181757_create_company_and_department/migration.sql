-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "startOfNewYear" INTEGER NOT NULL,
    "shareAllAbsences" BOOLEAN NOT NULL DEFAULT false,
    "isTeamViewHidden" BOOLEAN NOT NULL DEFAULT false,
    "ldapAuthEnabled" BOOLEAN NOT NULL,
    "ldapAuthConfig" TEXT NOT NULL,
    "dateFormat" TEXT NOT NULL,
    "companyWideMessage" TEXT NOT NULL,
    "mode" INTEGER NOT NULL,
    "timezone" TEXT NOT NULL,
    "carryOver" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "allowance" INTEGER NOT NULL,
    "includePublicHolidays" BOOLEAN NOT NULL,
    "isAccruedAllowance" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Department_companyId_key" ON "Department"("companyId");

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
