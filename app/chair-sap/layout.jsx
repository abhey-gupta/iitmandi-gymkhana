"use client";

import Sidebar_ChairSAP from "@/components/sidebar/Sidebar_ChairSAP";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <div>
      <div className="flex">
        {pathname !== "/chair-sap/login" && <Sidebar_ChairSAP />}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
