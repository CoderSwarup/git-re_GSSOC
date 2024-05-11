import Resume from "@/components/Resume";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: { username: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `git-re `,
    description: `resume generated by git-re for ${params.username}`,
    openGraph: {
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_URL}api/og?username=${params.username}`,
          width: 800,
          height: 600,
        },
      ],
    },
  };
}
export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/");
  }
  return (
    <div>
      <Resume />
    </div>
  );
}
