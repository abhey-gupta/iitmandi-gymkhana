"use client";

import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Club = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const member_token = Cookies.get("member_token");
  const member_role = Cookies.get("member_role");

  if (!member_token) {
    router.push(`/club/login?id=${id}`);
  }

  if (member_role === "Core Member") {
    return (
      <div className="min-h-screen flex justify-center">
        <div className="max-w-xl p-8 bg-white shadow-md rounded-md mt-5 h-fit">
          <h1 className="text-3xl font-bold mb-4">Welcome, Club Member!</h1>
          <p className="text-lg mb-6">
            As a valued member of our gymkhana community, you have the power to
            shape our club landscape by proposing new additions and tracking
            their status
          </p>
          <div className="mb-6">
            <p className="text-lg font-bold mb-2">
              Here are the tasks you can perform:
            </p>
            <ul className="list-disc ml-8">
              <li className="mb-2">
                <strong>Submit New Requests:</strong> Propose new societies or
                clubs that align with your interests and passions, enriching our
                community with diverse activities and hobbies.
              </li>
              <li className="mb-2">
                <strong>View Request Status:</strong> Keep track of the status
                of your requests, whether they're pending, accepted, or
                rejected, ensuring transparency and involvement in the
                decision-making process.
              </li>
            </ul>
          </div>
          <p className="text-lg">
            Your contributions and engagement are essential in creating a
            vibrant and inclusive gymkhana environment. Thank you for being an
            active participant in our community's growth and development!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center">
      <div className="max-w-xl p-8 bg-white shadow-md rounded-md mt-5 h-fit">
        <h1 className="text-3xl font-bold mb-4">Welcome, Admin!</h1>
        <p className="text-lg mb-6">
          As an admin, you hold the key to managing our gymkhana community. Your
          role involves overseeing the addition of new societies, clubs, and
          club members.
        </p>
        <div className="mb-6">
          <p className="text-lg font-bold mb-2">
            Here are the tasks you can perform:
          </p>
          <ul className="list-disc ml-8">
            <li className="mb-2">
              <strong>Add New Societies:</strong> Introduce new societies to our
              gymkhana, providing opportunities for students to explore their
              interests and passions.
            </li>
            <li className="mb-2">
              <strong>Create New Clubs:</strong> Establish new clubs that cater
              to a wide range of activities and hobbies, enriching the
              experience of our members.
            </li>
            <li className="mb-2">
              <strong>Enroll Club Members:</strong> Invite and enroll members
              into existing clubs, fostering a sense of belonging and
              participation within our community.
            </li>
          </ul>
        </div>
        <p className="text-lg">
          With your ability to facilitate the growth and development of our
          gymkhana, you play a vital role in shaping the experiences of our
          members. Thank you for your dedication and commitment!
        </p>
      </div>
    </div>
  );
};

export default Club;
