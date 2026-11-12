import type { Metadata } from "next";
import SignupForm from "./SignupForm";

export const metadata: Metadata = {
  title: "Create your Account — PulseOps AI",
  description: "Join PulseOps AI to diagnose CI/CD failures, fix Kubernetes crashes, and eliminate cloud cost waste automatically.",
};

export default function SignupPage() {
  return <SignupForm />;
}

