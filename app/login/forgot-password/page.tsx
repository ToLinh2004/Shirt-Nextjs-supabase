import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/app/login/actions";

export default function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: { message?: string };
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
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

        {searchParams?.message && (
          <p className="text-sm text-red-500">{searchParams.message}</p>
        )}

        <Button
          type="submit"
          className="w-full bg-gray-700 hover:bg-gray-800 text-white"
        >
          Send Reset Link
        </Button>
      </form>
    </div>
  );
}
