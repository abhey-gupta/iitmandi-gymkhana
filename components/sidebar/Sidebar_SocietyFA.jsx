"use client";

import { Sidebar } from "flowbite-react";
import { HiInbox } from "react-icons/hi";
import { CiLogout } from "react-icons/ci";
import { MdManageHistory } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Sidebar_SocietyFA() {
  const router = useRouter();
  return (
    <Sidebar
      aria-label="Sidebar with multi-level dropdown example"
      className="h-screen w-1/5"
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link
            className="flex items-center rounded-lg px-3 py-2 gap-4 text-base font-normal text-gray-900 hover:bg-gray-100"
            href="/society/society-member"
          >
            <RxDashboard />
            Welcome
          </Link>
          <Sidebar.Collapse
            className="flex gap-5"
            icon={MdManageHistory}
            label="Manage Requests"
          >
            <Link
              className="flex items-center rounded-lg px-3 py-2 gap-4 text-base font-normal text-gray-900 hover:bg-gray-100 pl-10"
              href="/society/society-member/manage-recommendation-requests"
            >
              For recommendation
            </Link>
            <Link
              className="flex items-center rounded-lg px-3 py-2 gap-4 text-base font-normal text-gray-900 hover:bg-gray-100 pl-10"
              href="/society/society-member/manage-requests?filter=pending"
            >
              Pending
            </Link>

            <Link
              className="flex items-center rounded-lg px-3 py-2 gap-4 text-base font-normal text-gray-900 hover:bg-gray-100 pl-10"
              href="/society/society-member/manage-requests?filter=approved"
            >
              Approved
            </Link>

            <Link
              className="flex items-center rounded-lg px-3 py-2 gap-4 text-base font-normal text-gray-900 hover:bg-gray-100 pl-10"
              href="/society/society-member/manage-requests?filter=rejected"
            >
              Rejected
            </Link>
          </Sidebar.Collapse>
          <Link
            className="flex items-center rounded-lg px-3 py-2 gap-4 text-base font-normal text-gray-900 hover:bg-gray-100"
            href="#"
          >
            <HiInbox />
            Inbox
          </Link>
          <button
            onClick={() => {
              Cookies.remove("society_member_token");
              router.push("/society/login");
            }}
            className="flex items-center rounded-lg px-3 py-2 gap-4 text-base font-normal text-gray-900 hover:bg-gray-100 w-full"
          >
            <CiLogout />
            Logout
          </button>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
