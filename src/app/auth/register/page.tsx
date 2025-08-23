"use client";
import { MagicLinkLoginForm } from "@/components/magic-link-login-form";
import SocialLoginButton from "@/components/socialLoginButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const Register = () => {
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.target as HTMLFormElement);

    // const { error } = await SignInWithEmail(formdata);
    // if (error) {
    //   toast.error(error);
    //   console.log(error);
    // } else {
    //   toast.success("Logging success");
    // }

    // setPending(false);

    const name = String(formdata.get("name"));
    if (!name) return toast.error("name required");
    const password = String(formdata.get("password"));
    if (!password) return toast.error("password required");
    const email = String(formdata.get("email"));
    if (!email) return toast.error("email required");
    console.log(name);
    console.log(e.target);

    const { data, error } = await authClient.signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onSuccess: () => {
          toast.success("registerd");
          router.push("/profile");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onResponse: () => {
          setPending(false);
        },
        onRequest: () => {
          setPending(true);
        },
      }
    );
  };
  return (
    <div className=" max-w-screen flex flex-col mt-15 p-20 space-y-8 ">
      <h1 className="text-2xl font-bold">Register Form</h1>
      <MagicLinkLoginForm />
      <form onSubmit={handleSubmit} className="space-y-8 ">
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="name">name</Label>
          <Input id="name" name="name" type="text" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="email">email</Label>
          <Input id="email" name="email" type="email" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <div className="flex justify-between">
            {" "}
            <Label htmlFor="password">password</Label>
            <p>
              {" "}
              <Link
                href="/auth/forgotPassword"
                className="text-sm italic underline"
              >
                {" "}
                forgot password?
              </Link>{" "}
            </p>
          </div>

          <Input id="password" name="password" type="password" />
        </div>
        <Button type="submit" className="cursor-pointer" disabled={pending}>
          Submit
        </Button>
      </form>
      <div>
        <span className="text-gray-500">Already have account </span>
        <Link href="/auth/login" className="">
          Login
        </Link>
      </div>
      <div className="flex flex-col space-y-3">
        <SocialLoginButton signup provider="google" />
        <SocialLoginButton signup provider="github" />
      </div>
    </div>
  );
};

export default Register;
