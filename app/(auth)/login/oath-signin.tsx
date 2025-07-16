"use client";

import { Button } from "@/components/ui/button";
import { Provider } from "@supabase/supabase-js";
import { Github } from "lucide-react";
import Image from "next/image";
import { oAuthSignIn } from "./actions";
import { JSX } from "react";

type OAuthProvider = {
  name: Provider;
  displayName: string;
  icon: JSX.Element;
};

export function OAuthButtons() {
  const oAuthProviders: OAuthProvider[] = [
    {
      name: "google",
      displayName: "Google",
      icon: (
        <Image
          src={"/gg.png"}
          alt="Google"
          width={20}
          height={20}
          className="mr-2"
        />
      ),
    },
    {
      name: "github",
      displayName: "GitHub",
      icon: <Github className="size-5" />,
    },
  ];

  return (
    <>
      {oAuthProviders.map((provider) => (
        <Button
          key={provider.name}
          className="w-full flex items-center justify-center py-2 cursor-pointer rounded-full"
          variant="outline"
          onClick={async () => {
            await oAuthSignIn(provider.name);
          }}
        >
          {provider.icon}
          Sign In with {provider.displayName}
        </Button>
      ))}
    </>
  );
}
