"use client";

import { Label, TextInput } from "flowbite-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Input } from "../ui/input";
import Cookies from "js-cookie";

const AddRequestForm = () => {
  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    quantity: "",
    total_amount: "",
    purpose: "",
    attachment: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    console.log(formData);

    try {
      const { data } = await axios.post("/api/request/add", {
        heading: formData.heading,
        member_token: Cookies.get("member_token"),
        description: formData.description,
        quantity: formData.quantity,
        total_amount: formData.total_amount,
        purpose: formData.purpose,
        attachment: formData.attachment,
      });

      console.log(data);

      if (data.success) {
        toast({
          title: "Request created successfully",
          description: "You can view the request in the 'pending requests'",
        });
        setFormData({
          heading: "",
          description: "",
          quantity: "",
          total_amount: "",
          purpose: "",
          attachment: "",
        });
      }
    } catch (err) {
      toast({
        title: "Oops, an error occurred while creating the request",
      });
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-2 w-full flex h-full ml-5 mt-5">
      {/* <div className="p-2 w-full flex h-full justify-center"> */}
      <form className="flex flex-col gap-4 w-1/3" onSubmit={handleSubmit}>
        <h1 className="text-2xl">Create a new request</h1>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Heading" />
          </div>
          <TextInput
            id="heading"
            type="text"
            placeholder="Enter the heading for this request"
            value={formData.heading}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, heading: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="description" value="Description" />
          </div>
          <Textarea
            className="bg-gray-50"
            id="description"
            type="text"
            placeholder="Enter the description for this request"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="quantity" value="Quantity" />
          </div>
          <TextInput
            id="quantity"
            type="text"
            placeholder="Enter the quantity"
            value={formData.quantity}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, quantity: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="total_amount" value="Total amount" />
          </div>
          <TextInput
            id="total_amount"
            type="text"
            placeholder="Enter the total amount"
            value={formData.total_amount}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, total_amount: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="purpose" value="Purpose" />
          </div>
          <TextInput
            id="purpose"
            type="text"
            placeholder="Enter the purpose of this request"
            value={formData.purpose}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, purpose: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="purpose" value="Attachment (optional)" />
          </div>
          <Input id="attachment" type="file" />
        </div>
        {submitting ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding, Please Wait
          </Button>
        ) : (
          <Button className="bg-[#303184]" type="submit">
            Add Request
          </Button>
        )}
      </form>
    </div>
  );
};

export default AddRequestForm;
