"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";
import { getURL } from "@/utils/helpers";

export async function emailLogin(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/login?message=Could not authenticate user");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    console.error("Sign up error", error);
    redirect("/login?message=" + encodeURIComponent(error.message));
  }

  redirect("/login?message=Check your email for confirmation.");
}


export async function signOut() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function oAuthSignIn(provider: Provider) {
  if (!provider) {
    return redirect("/login?message=No provider selected");
  }

  const supabase = await createServerSupabaseClient();
  const redirectUrl = getURL("/auth/callback");
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl,
    },
  });

  if (error) {
    redirect("/login?message=Could not authenticate user");
  }

  return redirect(data.url);
}


export async function resetPassword(formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const email = formData.get("email") as string;
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo:
      `${process.env.NEXT_DOMAIN_URl}/login/update-password` ||
      "http://localhost:3000",
  });

  if (error) {
    console.error("Reset password error:", error.message);
    redirect("/forgot-password?message=" + encodeURIComponent(error.message));
  }

  redirect("/forgot-password?message=Check your email to reset your password.");
}

export async function updatePassword(formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const password = formData.get("password") as string;

  const { error } = await supabase.auth.updateUser({password});

  if (error) {
    console.error("Reset password error:", error.message);
    redirect("/login?message=" + encodeURIComponent(error.message));
  }

  redirect("/login?message=Check your email for confirmation.");
}
