"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const StudentsOffice = () => {
  const router = useRouter();
  useEffect(() => {
    console.log("here");
    const soffice_token = Cookies.get("soffice_token");
    if (!soffice_token) {
      router.push("/students-office/login");
    }
  }, []);

  return (
    <div className="min-h-screen flex justify-center">
      <div className="max-w-xl p-8 bg-white shadow-md rounded-md mt-5 h-fit">
        <h1 className="text-3xl font-bold mb-4">Welcome, Student Office!</h1>
        <p className="text-lg mb-6">
          As a pivotal part of our gymkhana community, you hold the
          responsibility of overseeing the final stages of the approval process
          for club requests. Your role involves generating automated forms once
          all approvals are obtained, incorporating details of allocated
          resources and facilitating the completion of necessary information by
          club representatives.
        </p>
        <div className="mb-6">
          <p className="text-lg font-bold mb-2">
            Here are the tasks you can perform:
          </p>
          <ul className="list-disc ml-8">
            <li className="mb-2">
              <strong>Automated Form Generation:</strong>
              Generate automated forms containing details of approved requests,
              including allocated resources and necessary club information, upon
              completion of all approvals.
            </li>
            <li className="mb-2">
              <strong>Facilitate Information Completion:</strong> Assist club
              representatives in completing any required details on the
              generated forms, ensuring accuracy and completeness before final
              submission.
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
