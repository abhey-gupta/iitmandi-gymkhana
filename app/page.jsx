"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import axios from "axios";
import OvalLoader from "@/components/loaders/OvalLoader";

const Home = () => {
  const { toast } = useToast();

  const [societies, setSocieties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const { data } = await axios.post("/api/society/fetch-all");
        console.log(data);
        if (data.success) {
          setSocieties(data.societies);
        } else {
          toast({
            title: "Network error occurred",
          });
        }
      } catch (err) {
        toast({
          title: "Network error occurred",
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[75vh]">
        <OvalLoader />
      </div>
    );
  }

  return (
    <div className="flex p-5 gap-5 flex-wrap">
      {societies.map((society, index) => (
        <div
          key={index}
          className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] w-1/5"
        >
          <img className="rounded-t-lg" src={society.logo} alt="" />
          <div className="p-6">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800">
              {society.name}
            </h5>
            <p className="mb-4 text-base text-neutral-600">
              {society.description.slice(0, 130)}...
            </p>
            <Link
              type="button"
              className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
              href={`/society?society_id=${society._id}`}
            >
              Explore
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
