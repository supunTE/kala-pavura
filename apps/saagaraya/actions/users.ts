"use server";

import { adminDB } from "../firebase-admin.config";
import { UserAdminFirestoreDao } from "@kala-pavura/db";
import { UserSchema } from "@kala-pavura/models";

const userdao = new UserAdminFirestoreDao(adminDB);

export async function getUser(uid: string) {
  const extendedUser = await userdao.getUser(uid);
  return JSON.stringify(extendedUser);
}

export async function getUserByUsername(username: string) {
  const extendedUser = await userdao.getUserByUsername(username);
  return JSON.stringify(extendedUser);
}

export async function addOrUpdateUser(uid: string, userJSON: string) {
  const user = UserSchema.parse(JSON.parse(userJSON));
  const extendedUser = await userdao.addOrUpdateUser(uid, user);
  return JSON.stringify(extendedUser);
}

export async function addUser(uid: string, userJSON: string) {
  const user = UserSchema.parse(JSON.parse(userJSON));
  const extendedUser = await userdao.addUser(uid, user);
  return JSON.stringify(extendedUser);
}

export async function updateLastLoginAt(uid: string) {
  const timestamp = await userdao.updateLastLoginAt(uid);
  return JSON.stringify(timestamp);
}
