import { Button } from "@mantine/core";
// import { PaperPlaneTilt, UserPlus } from "@phosphor-icons/react";
import Image from "next/image";

import { profile_sample } from "@/assets/images";
import { UserAdminFirestoreDao } from "@kala-pavura/db";
import { adminDB } from "../../../../firebase-admin.config";
import { DEFAULT_USER_IMG_URL } from "@kala-pavura/globals";
import moment  from "moment";
import 'moment/locale/si';

async function getUserData(
  id: string
) {
  const userdao = new UserAdminFirestoreDao(adminDB);
  const user = await userdao.getUser(id);
  console.log(user?.uid);
  return user;
}

export default async function ProfileBar(
  { params }: { params: { id: string } }
) {
  const user = await getUserData(params.id);

  if(!user) return null;

  console.log(new Date(user.joinedAt));
  moment.locale('si');
  return (
    <div
      className="z-5 flex h-1/2 w-full flex-col items-center justify-center rounded-b-3xl bg-neutral-900/80 shadow-lg backdrop-blur-lg">
      <div className="h-full w-full p-2">
        <div className="relative h-full w-full overflow-hidden rounded-2xl">
          <Image
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1798&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            fill={true}
            alt="user cover"
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-4 right-6">
            <div
              className="rounded-full border border-neutral-800 bg-white/40 px-4 py-2 text-sm text-black shadow-lg backdrop-blur-sm">
              {moment(user.joinedAt).format("YYYY MMMM")} සිට සාමාජිකයෙකි
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-8 p-8">
        <div
          className="from-curious-blue-600 via-curious-blue-500 to-curious-blue-400 rounded-full bg-gradient-to-r p-1">
          <Image
            src={user?.profilePicture || DEFAULT_USER_IMG_URL}
            alt="profile"
            width={200}
            height={200}
            className="aspect-square w-32 rounded-full object-cover shadow-lg"
          />
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-3xl font-extrabold text-white">{user?.username || "Account not found!"}</h4>
          <p className="line-clamp-2 max-w-96 text-sm text-gray-400/80">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div className="mt-2 flex gap-2">
            <div className="flex items-center justify-center gap-2">
              {/*<Button*/}
              {/*  variant="filled"*/}
              {/*  size="xs"*/}
              {/*  radius="xl"*/}
              {/*  leftSection={<UserPlus size={18} />}*/}
              {/*  rightSection={*/}
              {/*    <span*/}
              {/*      className="text-curious-blue-800 flex h-full w-12 items-center justify-center rounded-full bg-blue-100/40 text-sm">*/}
              {/*      156*/}
              {/*    </span>*/}
              {/*  }>*/}
              {/*  එක් කරගන්න*/}
              {/*</Button>*/}
            </div>
            {/*<Button*/}
            {/*  variant="filled"*/}
            {/*  size="xs"*/}
            {/*  radius="xl"*/}
            {/*  leftSection={<PaperPlaneTilt size={16} />}>*/}
            {/*  පණිවිඩ*/}
            {/*</Button>*/}
          </div>
        </div>
      </div>
    </div>
  );
}
