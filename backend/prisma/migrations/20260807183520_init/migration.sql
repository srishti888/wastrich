-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreferences" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "trackEmotion" BOOLEAN NOT NULL DEFAULT true,
    "trackLocation" BOOLEAN NOT NULL DEFAULT true,
    "trackTrigger" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EpisodeLog" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "targetArea" TEXT NOT NULL,
    "triggerTag" TEXT,
    "emotionTag" TEXT,
    "locationTag" TEXT,
    "isBlip" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EpisodeLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestLibraryItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "QuestLibraryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClockInSession" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "questId" INTEGER NOT NULL,
    "durationMin" INTEGER NOT NULL,
    "engaged" BOOLEAN,
    "interrupted" BOOLEAN NOT NULL DEFAULT false,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClockInSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreferences_userId_key" ON "UserPreferences"("userId");

-- AddForeignKey
ALTER TABLE "UserPreferences" ADD CONSTRAINT "UserPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EpisodeLog" ADD CONSTRAINT "EpisodeLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClockInSession" ADD CONSTRAINT "ClockInSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClockInSession" ADD CONSTRAINT "ClockInSession_questId_fkey" FOREIGN KEY ("questId") REFERENCES "QuestLibraryItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
