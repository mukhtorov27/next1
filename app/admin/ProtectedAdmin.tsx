"use client";

import { useEffect, useState, type PropsWithChildren } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedAdmin({ children }: PropsWithChildren) {
  const [checked, setChecked] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jobportal-admin");
    if (token === "logged-in") {
      setAuthorized(true);
    } else {
      setAuthorized(false);
      router.replace("/admin");
    }
    setChecked(true);
  }, [router]);

  if (!checked || !authorized) {
    return null;
  }

  return <>{children}</>;
}
