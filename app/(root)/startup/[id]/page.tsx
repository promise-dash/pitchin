import prisma from "@/lib/client";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const post = await prisma.post.findFirst({
    where: {
      id,
    },
    include:{
      user: true
    }
  });

  if(!post) return null;

  return (
    <>
      <section className="orange_container !min-h-[230px]">
        <p className="tag">{formatDate(post.createdAt.toString())}</p>

        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos veniam
          nulla autem, repudiandae pariatur suscipit illo amet officia quae
          quis!
        </p>
      </section>

      <section className="section_container">
        <img
          src={post.image}
          alt="thumbnail"
          className="w-full rounded-xl h-[30rem] object-cover"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link href={`/user/${post.user.id}`} className="flex gap-2 items-center mb-3">
              <Image
                src={post.user.avatar || ""}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg w-12 h-12 object-cover"
              />

              <div>
                <p className="text-20-medium">{post.user.name}</p>
                <p className="text-16-medium !text-black-300">@{post.user.name}</p>
              </div>
            </Link>

            <p className="category-tag">{post.category}</p>
          </div>

          <h3 className="text-30-bold">Pitch Details</h3>
          <article className="prose max-w-4xl font-work-sans break-all">
            <p>{post.pitch}</p>
          </article>
        </div>

        <hr className="divider" />

        {/* <Suspense fallback={<Skeleton className="view_skeleton" />}>
        <View id={id} />
      </Suspense> */}
      </section>
    </>
  );
};

export default page;
