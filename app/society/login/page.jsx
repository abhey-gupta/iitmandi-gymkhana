"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";

const SocietyLogin = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const society_id = searchParams.get("society_id");
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Society FA");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/society-member/login", {
        position: role,
        email,
        password,
      });
      console.log(data);
      if (data.success) {
        Cookies.set("society_member_token", data.member_token);
        Cookies.set("society_member_role", "Society FA");
        router.push(`/society?society_id=${society_id}`);
      } else {
        setError(data.message);
      }
    } catch (err) {
      toast({
        title: "A network error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(pathname);
    const society_member_token = Cookies.get("society_member_token");
    if (society_member_token) {
      router.push(`/society?society_id=${society_id}`);
    }
  }, []);

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 mt-10">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in - Society FA
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter your email here"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>
              <label className="mt-3 text-red-500 text-sm">{error}</label>
              {loading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <button
                  type="submit"
                  className="w-full text-white bg-[#353689] hover:bg-[#35368980] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign in
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocietyLogin;
