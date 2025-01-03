"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";

export const createStartup = async (
    prevState: { success: boolean; error: boolean },
    payload: { formData: FormData }
  ) => {
    const { formData } = payload;
  
    const formObject = Object.fromEntries(formData.entries());
  
    const { userId } = await auth();
  
    if (!userId) throw new Error("User is not authenticated!");
  
    const { title, description, category, img, pitch } = formObject;
  
    try {
      await prisma.post.create({
        data: {
          userId,
          title: title.toString(),
          description: description.toString(),
          category: category.toString(),
          image: img.toString(),
          pitch: pitch.toString(),
        },
      });
      return { success: true, error: false };
    } catch (err) {
      console.log(err);
      return { success: false, error: true };
    }
  };
  
