"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAdminStore from "../store/useAdminStore";

export default function AdminLoginPage() {
  const router = useRouter();
  const email = useAdminStore((state) => state.email);
  const password = useAdminStore((state) => state.password);
  const loginError = useAdminStore((state) => state.loginError);
  const isLoggedIn = useAdminStore((state) => state.isLoggedIn);
  const setEmail = useAdminStore((state) => state.setEmail);
  const setPassword = useAdminStore((state) => state.setPassword);
  const setLoginError = useAdminStore((state) => state.setLoginError);
  const initializeAuth = useAdminStore((state) => state.initializeAuth);
  const login = useAdminStore((state) => state.login);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/admin/jobs");
    }
  }, [isLoggedIn, router]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError("");

    if (login()) {
      router.push("/admin/jobs");
      return;
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-border/70 bg-card p-10 shadow-sm shadow-black/5">
      <div className="mb-8 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Admin Dashboard
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-foreground">
          Sign in to manage job postings
        </h1>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="admin@jobportal.com"
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="admin123"
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {loginError ? (
          <div className="rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {loginError}
          </div>
        ) : null}

        <button
          type="submit"
          className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          Sign In
        </button>
      </form>

      <div className="mt-8 rounded-3xl border border-border/70 bg-muted/10 p-6 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Demo Credentials:</p>
        <p>Email: admin@jobportal.com</p>
        <p>Password: admin123</p>
      </div>
    </div>
  );
}
