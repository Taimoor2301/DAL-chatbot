import useAuth from "@/context/AuthContext";
import { useRouter } from "next/router";

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div className="flex h-screen w-screen bg-neutral-800">Loading...</div>
    );
  if (!loading && !user) router.push("/auth/login");
  return user && <div>{children}</div>;
}
