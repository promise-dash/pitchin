import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { EyeIcon } from "lucide-react";
import { Post, User } from "@prisma/client";
import { formatDate } from "@/lib/utils";

type StartupType = Post & { user: User };

const StartupCard = ({ post }: { post: StartupType }) => {
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(post.createdAt.toString())}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">123</span>
        </div>
      </div>

      <div className="flex-col mt-5 gap-5">
        <div className="flex items-center">
          <Link href={`/user/${post?.userId}`} className="flex items-center gap-2">
            <Image
              src={post?.user?.avatar || "/noAvatar.png"}
              alt="author name"
              width={48}
              height={48}
              className="rounded-full w-12 h-12 object-cover"
            />
            <p className="text-16-medium line-clamp-1">{post?.user?.name}</p>
          </Link>
        </div>
        <Link href={`/startup/${post?.id}`}>
          <h3 className="text-26-semibold line-clamp-1">{post?.title}</h3>
        </Link>
      </div>

      <Link href={`/startup/${post.id}`}>
        <p className="startup-card_desc">
         {post?.description}
        </p>

        <img
          src={post?.image}
          alt="placeholder"
          className="startup-card_img"
        />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${post.category}`}>
          <p className="text-16-medium">{post?.category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${post?.id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default StartupCard;
