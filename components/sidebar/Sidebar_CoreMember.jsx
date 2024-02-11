"use client";

import { Sidebar } from "flowbite-react";
import { HiInbox } from "react-icons/hi";
import { CiLogout } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { MdManageHistory } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Sidebar_CoreMember() {
  const router = useRouter();
  const member_role = Cookies.get("member_role");
  return (
    <Sidebar
      aria-label="Sidebar with multi-level dropdown example"
      className="h-screen w-1/5"
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link
            className="flex items-center rounded-lg px-3 py-2 gap-4 text-base font-normal text-gray-900 hover:bg-gray-100"
            href="/club"
          >
            <RxDashboard />
            Welcome
          </Link>
          {member_role !== "Club FA" && (
            <Link
              className="flex items-center rounded-lg px-3 py-2 gap-4 text-base font-normal text-gray-900 hover:bg-gray-100"
              href="/club/add-request"
            >
              <IoMdAdd />
              Add a request
            </Link>
          )}
          <Sidebar.Collapse
            className="flex gap-5"
            icon={MdManageHistory}
            label="Manage Requests"
          >
            {member_role !== "Core Member" && (
              <Link
                className="flex items-center rounded-lg px-3 py-2 gap-4 text-base font-normal text-gray-900 hover:bg-gray-100 pl-10"
                href="/club/manage-recommendation-requests"
              >
                For recommendation
              </Link>
            )}
            <Link
              className="flex items-center rounded-lg px-3 py-2 gap-4 text-base font-normal text-gray-900 hover:bg-gray-100 pl-10"
              href="/club/manage-requests?filter=pending"
            >
              Pending
            </Link>

            <Link
              className="flex items-center rounded-lg px-3 py-2 gap-4 text-base font-normal text-gray-900 hover:bg-gray-100 pl-10"
              href="/club/manage-requests?filter=approved"
            >
              Approved
            </Link>

            <Link
              className="flex items-center rounded-lg px-3 py-2 gap-4 text-base font-normal text-gray-900 hover:bg-gray-100 pl-10"
              href="/club/manage-requests?filter=rejected"
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
              Cookies.remove("member_token");
              router.push("/club/login");
            }}
            className="flex items-center rounded-lg px-3 py-2 gap-4 text-base font-normal text-gray-900 hover:bg-gray-100 w-full"
          >
            <CiLogout />
            Logout
          </button>
          {/* <Link
            className="flex items-center rounded-lg px-3 py-2 gap-4 text-base font-normal text-gray-900 hover:bg-gray-100"
            href="#"
          >
            <HiUser />
            Users
          </Link> */}
        </Sidebar.ItemGroup>

        {/* <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiTable}>
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup> */}
      </Sidebar.Items>
    </Sidebar>
  );
}
