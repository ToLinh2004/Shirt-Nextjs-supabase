"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async () => {
    setLoading(true);
    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      router.push("/login?message=Password updated successfully.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-sm space-y-4 p-6 border rounded">
      <h1 className="text-xl mb-4">Set your new password</h1>
      <input
        minLength={6}
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
      />
      {error && <div className="text-red-500">{error}</div>}
      <button
        onClick={handleUpdate}
        disabled={loading}
        className="w-full bg-black text-white py-2 cursor-pointer rounded hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </div>
  );
}
