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

export const Route = createFileRoute("/sign-in")({
  async beforeLoad() {
    const user = await getCurrentUser();

    if (user) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: SignInPage,
});

function SignInPage() {
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    try {
      const response = await fetch("/api/auth/sign-in/email", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        redirect({ to: "/dashboard" });
      }
    } catch (error) {
      console.log("Error logging in", error);
    }
  }

  // TODO: coming soon
  // function signInWithGoogle() {
  // 	window.location.href = "/api/auth/google";
  // }

  // function signInWithApple() {
  // 	window.location.href = "/api/auth/apple";
  // }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>Access your DailyWinLogger account</CardDescription>
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
                placeholder="Your password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>

          <div className="w-full">
            Don't have an account? <Link to="/sign-up">Sign up</Link>
          </div>

          {/*TODO: coming soon*/}
          {/*<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-background px-2 text-muted-foreground">
								Or continue with
							</span>
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
						<Button
							type="button"
							variant="outline"
							className="w-full"
							onClick={signInWithGoogle}
						>
							<span>Google</span>
						</Button>
						<Button
							type="button"
							variant="outline"
							className="w-full"
							onClick={signInWithApple}
						>
							<span>Apple</span>
						</Button>
					</div>*/}
        </CardContent>
      </Card>
    </div>
  );
}
