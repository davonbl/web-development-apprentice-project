/*
  Warnings:

  - Added the required column `client_id` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "client_id" VARCHAR(255) NOT NULL;
