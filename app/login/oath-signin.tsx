"use client";
import { Button } from "@/components/ui/button";
import { Provider } from "@supabase/supabase-js";
import { Github } from "lucide-react";
import { oAuthSignIn, oAuthSignInWithGoogle } from "./actions";
import { JSX } from "react";
import Image from "next/image";

type OAuthProvider = {
  name: Provider;
  displayName: string;
  icon?: JSX.Element;
};

export function OAuthButtons() {
  const oAuthProviders: OAuthProvider[] = [
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
          className="w-full flex items-center justify-center gap-2 cursor-pointer"
          variant="outline"
          onClick={async () => {
            await oAuthSignIn(provider.name);
          }}
        >
          {provider.icon}
          Login with {provider.displayName}
        </Button>
      ))}
    </>
  );
}

export function SignWithGoogle() {
  const oAuthProviders: OAuthProvider[] = [
    {
      name: "google",
      displayName: "Google",
      icon: <Github className="size-5" />,
    },
  ];

  return (
    <>
      {oAuthProviders.map((provider) => (
        <Button
          key={provider.name}
          className="w-full flex items-center justify-center gap-2 cursor-pointer"
          variant="outline"
          onClick={async () => {
            await oAuthSignInWithGoogle(provider.name);
          }}
        >
          <Image
            src={"/gg.png"}
            alt="Google"
            width={20}
            height={20}
            className="mr-2"
          />{" "}
          Login with {provider.displayName}
        </Button>
      ))}
    </>
  );
}
