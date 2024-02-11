"use client";
import Sidebar_CoreMember from "@/components/sidebar/Sidebar_CoreMember";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <div>
      <div className="flex">
        {pathname !== "/club/login" && <Sidebar_CoreMember />}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
