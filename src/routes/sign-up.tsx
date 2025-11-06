import React from "react";
import { createFileRoute, redirect, Link } from "@tanstack/react-router";

import { getCurrentUser } from "@/lib/auth.ts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/sign-up")({
  async beforeLoad() {
    const user = await getCurrentUser();

    if (user) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: SignUpPage,
});

function SignUpPage() {
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");
    if (password !== confirmPassword) {
      // Simple client-side check for now
      alert("Passwords do not match");
      return;
    }

    try {
      await fetch("/api/auth/sign-up/email", {
        method: "POST",
        body: JSON.stringify({ email, password, name: email.split("@")[0] }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error signing up:", error);
    }
  }

  // TODO: coming soon
  // function signUpWithGoogle() {
  //   window.location.href = "/api/auth/google?flow=signup";
  // }

  // function signUpWithApple() {
  //   window.location.href = "/api/auth/apple?flow=signup";
  // }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>Start logging your daily wins</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                onChange={(e) => console.log(e.target)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Repeat your password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Create account
            </Button>
          </form>

          <div className="w-full">
            Already have an account? <Link to="/sign-in">Sign up</Link>
          </div>

          {/*TODO: coming soon*/}
          {/*<div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or sign up with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={signUpWithGoogle}
            >
              <span>Google</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={signUpWithApple}
            >
              <span>Apple</span>
            </Button>
          </div>*/}
        </CardContent>
      </Card>
    </div>
  );
}
