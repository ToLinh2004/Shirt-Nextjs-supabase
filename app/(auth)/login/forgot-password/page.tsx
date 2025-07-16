import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/app/(auth)/login/actions";

export default async function ForgotPasswordPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await props.searchParams;

  const message =
    typeof resolvedSearchParams?.message === "string"
      ? resolvedSearchParams.message
      : undefined;
  return (
    <form
      className="w-full max-w-sm space-y-4 p-6 border rounded"
      action={resetPassword}
    >
      <h1 className="text-xl font-semibold">Reset Password</h1>

      <Input
        type="email"
        name="email"
        placeholder="Your email"
        required
        className="w-full"
      />

      {message && <p className="text-sm text-red-500">{message}</p>}

      <Button
        type="submit"
        className="w-full bg-gray-700 hover:bg-gray-800 text-white"
      >
        Send Reset Link
      </Button>
    </form>
  );
}
