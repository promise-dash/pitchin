import UserStartups from '@/components/UserStartups';
import prisma from '@/lib/client';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image'
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

const page = async ({params}: {params: Promise<{id: string}>}) => {
  const id = (await params).id;

  const {userId: currentUserId} =await auth();

  if(!currentUserId) return "User is not authenticated";

  const user = await prisma.user.findFirst({
    where: {
      id
    },
    include: {
      posts: true,
    }
  });

  if(!user) return notFound();
  return (
    <>
    <section className="profile_container">
      <div className="profile_card">
        <div className="profile_title">
          <h3 className="text-24-black uppercase text-center line-clamp-1">
          {user.name && user.surname
              ? user.name + " " + user.surname
              : ""}
          </h3>
        </div>

        <Image
          src={user.avatar || "/noAvatar.png"}
          alt=""
          width={220}
          height={220}
          className="profile_image"
        />

        <p className="text-30-extrabold mt-7 text-center">
          @ {user.name && user.surname
              ? user.name + " " + user.surname
              : ""}
        </p>
        <p className="mt-1 text-center text-14-normal">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, soluta?\</p>
      </div>

      <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
        <p className="text-30-bold">
          {currentUserId === id ? "Your" : "All"} Startups
        </p>
        <ul className="card_grid-sm">
          <Suspense fallback="Loading">
            <UserStartups id={id} />
          </Suspense>
        </ul>
      </div>
    </section>
  </>
  )
}

export default page