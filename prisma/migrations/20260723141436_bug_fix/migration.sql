/*
  Warnings:

  - You are about to drop the column `studentId` on the `Teacher` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    CONSTRAINT "Student_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("id", "name") SELECT "id", "name" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_id_key" ON "Student"("id");
CREATE TABLE "new_Teacher" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "subject" TEXT NOT NULL
);
INSERT INTO "new_Teacher" ("id", "name", "subject") SELECT "id", "name", "subject" FROM "Teacher";
DROP TABLE "Teacher";
ALTER TABLE "new_Teacher" RENAME TO "Teacher";
CREATE UNIQUE INDEX "Teacher_id_key" ON "Teacher"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
