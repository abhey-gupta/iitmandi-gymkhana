"use client";

import Sidebar_SocietyFA from "@/components/sidebar/Sidebar_SocietyFA";

export default function RootLayout({ children }) {
  return (
    <div>
      <div className="flex">
        <Sidebar_SocietyFA />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
