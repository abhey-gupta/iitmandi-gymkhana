"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const StudentsOffice = () => {
  const router = useRouter();
  useEffect(() => {
    const chairsap_token = Cookies.get("chairsap_token");
    if (!chairsap_token) {
      router.push("/chair-sap/login");
    }
  }, []);

  return (
    <div className="min-h-screen flex justify-center">
      <div className="max-w-xl p-8 bg-white shadow-md rounded-md mt-5 h-fit">
        <h1 className="text-3xl font-bold mb-4">
          Welcome, Chair of Student Activities Panel (SAP)!
        </h1>
        <p className="text-lg mb-6">
          As the leader of our Student Activities Panel, you hold a position of
          significant responsibility, with the authority to oversee and manage
          all requests submitted by club members.
        </p>
        <div className="mb-6">
          <p className="text-lg font-bold mb-2">Here's what you can do:</p>
          <ul className="list-disc ml-8">
            <li className="mb-2">
              <strong>Approve Payments:</strong>
              With the exclusive authority to approve payments without any
              limit, you ensure that club activities and initiatives are
              adequately funded, fostering a thriving and vibrant community.
            </li>
            <li className="mb-2">
              <strong>Review and Manage Requests:</strong> Oversee and manage
              all requests submitted by club members, ensuring they align with
              our club's mission and objectives. Your oversight guarantees
              transparency and accountability in the decision-making process.
            </li>
            <li className="mb-2">
              <strong>Collaborate with Club Members:</strong> Work closely with
              club members to address their needs and concerns, providing
              guidance and support throughout the request process.
            </li>
          </ul>
        </div>
        <p className="text-lg">
          Your contributions ensure the seamless execution of club initiatives
          and the efficient utilization of gymkhana resources. Thank you for
          your commitment to fostering a dynamic and supportive environment for
          our student clubs.
        </p>
      </div>
    </div>
  );
};

export default StudentsOffice;
