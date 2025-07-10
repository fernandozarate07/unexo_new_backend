-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin', 'founder');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "profilePhoto" TEXT,
    "registerDate" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resetToken" VARCHAR(255),
    "resetTokenExpiration" TIMESTAMP(3),
    "role" "Role" NOT NULL DEFAULT 'user',
    "points" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContributionType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "ContributionType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contribution" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "typeId" INTEGER NOT NULL,
    "likesCount" INTEGER NOT NULL DEFAULT 0,
    "facultyId" INTEGER NOT NULL,
    "degreeId" INTEGER NOT NULL,
    "yearId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DownloadContribution" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "contributionId" INTEGER NOT NULL,
    "downloadedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DownloadContribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedContribution" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "contributionId" INTEGER NOT NULL,
    "savedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedContribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LikeContribution" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "contributionId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 1,
    "addedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LikeContribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportReason" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ReportReason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "contributionId" INTEGER NOT NULL,
    "reasonId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "NotificationType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "notificationTypeId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faculty" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Degree" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "facultyId" INTEGER NOT NULL,

    CONSTRAINT "Degree_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademicYear" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "degreeId" INTEGER NOT NULL,

    CONSTRAINT "AcademicYear_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "yearId" INTEGER NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ContributionType_name_key" ON "ContributionType"("name");

-- CreateIndex
CREATE INDEX "Contribution_userId_idx" ON "Contribution"("userId");

-- CreateIndex
CREATE INDEX "Contribution_facultyId_idx" ON "Contribution"("facultyId");

-- CreateIndex
CREATE INDEX "Contribution_degreeId_idx" ON "Contribution"("degreeId");

-- CreateIndex
CREATE INDEX "Contribution_yearId_idx" ON "Contribution"("yearId");

-- CreateIndex
CREATE INDEX "Contribution_subjectId_idx" ON "Contribution"("subjectId");

-- CreateIndex
CREATE INDEX "Contribution_typeId_idx" ON "Contribution"("typeId");

-- CreateIndex
CREATE INDEX "Contribution_isActive_idx" ON "Contribution"("isActive");

-- CreateIndex
CREATE INDEX "Contribution_createdAt_idx" ON "Contribution"("createdAt");

-- CreateIndex
CREATE INDEX "DownloadContribution_userId_idx" ON "DownloadContribution"("userId");

-- CreateIndex
CREATE INDEX "DownloadContribution_contributionId_idx" ON "DownloadContribution"("contributionId");

-- CreateIndex
CREATE INDEX "DownloadContribution_downloadedAt_idx" ON "DownloadContribution"("downloadedAt");

-- CreateIndex
CREATE UNIQUE INDEX "DownloadContribution_userId_contributionId_key" ON "DownloadContribution"("userId", "contributionId");

-- CreateIndex
CREATE INDEX "SavedContribution_contributionId_idx" ON "SavedContribution"("contributionId");

-- CreateIndex
CREATE INDEX "SavedContribution_savedAt_idx" ON "SavedContribution"("savedAt");

-- CreateIndex
CREATE UNIQUE INDEX "SavedContribution_userId_contributionId_key" ON "SavedContribution"("userId", "contributionId");

-- CreateIndex
CREATE INDEX "LikeContribution_contributionId_idx" ON "LikeContribution"("contributionId");

-- CreateIndex
CREATE UNIQUE INDEX "LikeContribution_userId_contributionId_key" ON "LikeContribution"("userId", "contributionId");

-- CreateIndex
CREATE UNIQUE INDEX "ReportReason_name_key" ON "ReportReason"("name");

-- CreateIndex
CREATE INDEX "Report_isResolved_idx" ON "Report"("isResolved");

-- CreateIndex
CREATE INDEX "Report_contributionId_idx" ON "Report"("contributionId");

-- CreateIndex
CREATE INDEX "Report_createdAt_idx" ON "Report"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationType_name_key" ON "NotificationType"("name");

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");

-- CreateIndex
CREATE INDEX "Notification_createdAt_idx" ON "Notification"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_name_key" ON "Faculty"("name");

-- CreateIndex
CREATE INDEX "Degree_facultyId_idx" ON "Degree"("facultyId");

-- CreateIndex
CREATE INDEX "AcademicYear_degreeId_idx" ON "AcademicYear"("degreeId");

-- CreateIndex
CREATE INDEX "Subject_yearId_idx" ON "Subject"("yearId");

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_degreeId_fkey" FOREIGN KEY ("degreeId") REFERENCES "Degree"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "AcademicYear"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ContributionType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DownloadContribution" ADD CONSTRAINT "DownloadContribution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DownloadContribution" ADD CONSTRAINT "DownloadContribution_contributionId_fkey" FOREIGN KEY ("contributionId") REFERENCES "Contribution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedContribution" ADD CONSTRAINT "SavedContribution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedContribution" ADD CONSTRAINT "SavedContribution_contributionId_fkey" FOREIGN KEY ("contributionId") REFERENCES "Contribution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeContribution" ADD CONSTRAINT "LikeContribution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeContribution" ADD CONSTRAINT "LikeContribution_contributionId_fkey" FOREIGN KEY ("contributionId") REFERENCES "Contribution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_reasonId_fkey" FOREIGN KEY ("reasonId") REFERENCES "ReportReason"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_contributionId_fkey" FOREIGN KEY ("contributionId") REFERENCES "Contribution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_notificationTypeId_fkey" FOREIGN KEY ("notificationTypeId") REFERENCES "NotificationType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Degree" ADD CONSTRAINT "Degree_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicYear" ADD CONSTRAINT "AcademicYear_degreeId_fkey" FOREIGN KEY ("degreeId") REFERENCES "Degree"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "AcademicYear"("id") ON DELETE CASCADE ON UPDATE CASCADE;
