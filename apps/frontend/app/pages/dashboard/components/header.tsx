import { cn } from "@/lib/utils";
import { interFont } from "@/app/fonts/fonts";
import React from "react";
import UserAvatar from "../ui/user-avatar";
import { auth } from "@/auth";

const Header = async () => {
  const session = await auth();
  if (!session?.user) {
    return (
      <div className="bg-emerald-100 w-full h-10 flex items-center justify-center text-sm text-red-500">
        No active session
      </div>
    );
  }
  const { name, image, email } = session.user;
  if (name == null || name == undefined) {
    return;
  }
  if (email == null || email == undefined) {
    return;
  }
  if (image == null || image == undefined) {
    return;
  }
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "NA";
  if (initials == null || initials == undefined) {
    return;
  }
  return (
    <div className="px-2 py-4 flex items-center justify-between sticky top-0 bg-white z-10">
      <div className={cn("text-xl font-bold", interFont.className)}>Quizly</div>
      <div>
        <UserAvatar
          name={name}
          image={image}
          email={email}
          initials={initials}
        />
      </div>
    </div>
  );
};

export default Header;
