/*
  Warnings:

  - You are about to drop the column `route` on the `Logs` table. All the data in the column will be lost.
  - Added the required column `endpoint` to the `Logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Logs" DROP COLUMN "route",
ADD COLUMN     "endpoint" TEXT NOT NULL;
