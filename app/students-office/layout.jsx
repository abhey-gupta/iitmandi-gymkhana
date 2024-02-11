"use client";

import Sidebar_StudentOffice from "@/components/sidebar/Sidebar_StudentOffice";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <div>
      <div className="flex">
        {pathname !== "/students-office/login" && <Sidebar_StudentOffice />}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
