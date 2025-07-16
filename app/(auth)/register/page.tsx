import {  signup } from "@/app/(auth)/login/actions";
import { OAuthButtons } from "@/app/(auth)/login/oath-signin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function RegisterPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/");
  }
  const resolvedSearchParams = await props.searchParams;

  const message =
    typeof resolvedSearchParams?.message === "string"
      ? resolvedSearchParams.message
      : undefined;
  return (
    <>
      <form className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm text-gray-500" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            className="w-full p-2 border rounded-full"
            name="email"
            type="email"
            placeholder="stylehub@gmail.com"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-500" htmlFor="password">
            Password
          </label>
          <Input
            minLength={6}
            name="password"
            id="password"
            type="password"
            required
            className="w-full p-2 border rounded-full"
          />
          {message && (
            <div className="text-sm font-medium text-destructive">
              {message}
            </div>
          )}
        </div>

        <Button
          formAction={signup}
          className="w-full bg-black text-white py-2 cursor-pointer rounded-full hover:bg-gray-800 disabled:opacity-50"
        >
          Sign Up
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>
        <OAuthButtons />
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-black cursor-pointer underline">
            Sign in
          </Link>
        </p>
      </form>
    </>
  );
}
