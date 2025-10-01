/*
  Warnings:

  - You are about to drop the column `required` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the `AnswerOption` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `optionId` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."AnswerOption" DROP CONSTRAINT "AnswerOption_answerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."AnswerOption" DROP CONSTRAINT "AnswerOption_optionId_fkey";

-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "optionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "required";

-- DropTable
DROP TABLE "public"."AnswerOption";

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE CASCADE ON UPDATE CASCADE;
