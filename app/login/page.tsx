import { emailLogin, signup } from "@/app/login/actions";
import { OAuthButtons, SignWithGoogle } from "@/app/login/oath-signin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/");
  }
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side with illustration */}
      <div className="relative hidden lg:flex flex-col items-center justify-center p-8 bg-[#B5CCBE] text-white">
        <div className="max-w-md mx-auto text-center space-y-6">
          <Image
            src="/login-banner.png"
            alt="Decorative bird illustration"
            width={300}
            height={300}
            className="mx-auto"
          />
          <h2 className="text-2xl font-medium">Maecenas mattis egestas</h2>
          <p className="text-sm text-white/80">
            Eidum et malesuada fames ac ante ipsum primis in faucibus
            suspendisse porta
          </p>
          {/* Dots navigation */}
          <div className="flex justify-center gap-2 pt-4">
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-white/40"></div>
            <div className="w-2 h-2 rounded-full bg-white/40"></div>
            <div className="w-2 h-2 rounded-full bg-white/40"></div>
          </div>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-script mb-6">StyleHub</h1>
            <h2 className="text-xl text-gray-600">Welcome to StyleHub</h2>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-500" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                className="w-full p-2 border rounded"
                name="email"
                type="email"
                placeholder="m@example.com"
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
                className="w-full p-2 border rounded"
              />
              {searchParams.message && (
                <div className="text-sm font-medium text-destructive">
                  {searchParams.message}
                </div>
              )}
              <div className="text-right">
                <Link
                  href="/login/forgot-password"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Forget password?
                </Link>
              </div>
            </div>

            <Button
              formAction={emailLogin}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white"
            >
              Sign in
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>
            <SignWithGoogle />
            <OAuthButtons />
            <p className="text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <button
                formAction={signup}
                className="text-gray-600 hover:text-gray-800"
              >
                Sign up
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
