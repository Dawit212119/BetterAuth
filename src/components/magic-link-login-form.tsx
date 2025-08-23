import { StarIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export const MagicLinkLoginForm = () => {
  const [isPending, setIsPending] = useState(false);
  const ref = useRef<HTMLDetailsElement>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.target as HTMLFormElement);
    const email = String(formdata.get("email"));
    if (!email) return toast.error("Email Required");

    await authClient.signIn.magicLink({
      email,
      name: email.split("@")[0],
      callbackURL: "/auth/magicLink",
      fetchOptions: {
        onError(ctx) {
          toast.error(ctx.error.message);
        },
        onSuccess() {
          toast.success("Please check your email ");
        },
        onRequest() {
          setIsPending(true);
        },
        onResponse() {
          setIsPending(false);
        },
      },
    });
  };
  return (
    <details
      ref={ref}
      className="max-w-sm rounded-md border border-purple-600 overflow-hidden"
    >
      <summary className="flex gap-2 items-center px-2 py-1 bg-purple-600 text-white hover:bg-purple-600/80 transition">
        Try Magic Link <StarIcon size={16} />
      </summary>

      <form onSubmit={handleSubmit}>
        <Label htmlFor="email" className="sr-only">
          Email
        </Label>
        <div className="flex gap-2 items-center">
          <Input type="email" id="email" name="email" />
          <Button disabled={isPending}>Send</Button>
        </div>
      </form>
    </details>
  );
};
