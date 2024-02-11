"use client";

import OvalLoader from "@/components/loaders/OvalLoader";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Society = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const [clubs, setClubs] = useState([]);
  const society_id = searchParams.get("society_id");
  const society_member_token = Cookies.get("society_member_token");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post("/api/society/fetch", {
          id: society_id,
        });
        if (res.data.success) {
          const { data } = await axios.post("/api/club/fetch-by-society", {
            society: res.data.society.name,
          });

          if (data.success) {
            setClubs(data.clubs);
          }
        }
      } catch (err) {
        toast({
          title: "Error fetching the clubs...",
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (society_member_token) {
    router.push(`/society/society-member?society_id=${society_id}`);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[75vh]">
        <OvalLoader />
      </div>
    );
  }

  return (
    <div className="flex p-5 gap-5 flex-wrap">
      {clubs.map((club, index) => (
        <div
          key={index}
          className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] w-1/5"
        >
          <img
            className="rounded-t-lg aspect-square object-contain"
            src={club.logo}
            alt=""
          />
          <div className="p-6">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800">
              {club.name}
            </h5>
            {/* <p className="mb-4 text-base text-neutral-600">
              {club.description.slice(0, 130)}...
            </p> */}
            <Link
              type="button"
              className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
              href={`/club?id=${club._id}`}
            >
              Explore
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Society;
