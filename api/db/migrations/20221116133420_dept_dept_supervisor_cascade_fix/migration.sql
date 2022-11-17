-- DropForeignKey
ALTER TABLE "DepartmentSupervisor" DROP CONSTRAINT "DepartmentSupervisor_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "DepartmentSupervisor" DROP CONSTRAINT "DepartmentSupervisor_userId_fkey";

-- AddForeignKey
ALTER TABLE "DepartmentSupervisor" ADD CONSTRAINT "DepartmentSupervisor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartmentSupervisor" ADD CONSTRAINT "DepartmentSupervisor_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;
