/*
  Warnings:

  - A unique constraint covering the columns `[projectId,email]` on the table `ProjectUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Logs" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "requestType" TEXT NOT NULL,
    "statusCode" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "error" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Logs_projectId_createdAt_idx" ON "Logs"("projectId", "createdAt");

-- CreateIndex
CREATE INDEX "Project_ownerId_idx" ON "Project"("ownerId");

-- CreateIndex
CREATE INDEX "ProjectApiKey_projectId_idx" ON "ProjectApiKey"("projectId");

-- CreateIndex
CREATE INDEX "ProjectJwtKey_projectId_idx" ON "ProjectJwtKey"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectUser_projectId_email_key" ON "ProjectUser"("projectId", "email");

-- AddForeignKey
ALTER TABLE "Logs" ADD CONSTRAINT "Logs_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
