"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import Cookies from "js-cookie";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const ManageSocietyRequests = () => {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const member_role = Cookies.get("member_role");
  const { toast } = useToast();

  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          "/api/request/fetch-society-requests",
          {
            society_member_token: Cookies.get("society_member_token"),
          }
        );

        setRequests(data.requests);
        console.log(data.requests);
        let filteredRequests = data.requests.filter(
          (req) => req.status === filter
        );
        setFilteredRequests(filteredRequests);
      } catch (err) {
        toast({
          description: "oops, a network error occurred",
        });
      }
    })();
  }, []);

  useEffect(() => {
    let filteredRequests = requests.filter((req) => req.status === filter);
    setFilteredRequests(filteredRequests);
  }, [filter]);

  if (!filteredRequests.length) {
    return <div>No {filter} requests</div>;
  }
  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sr No</TableHead>
            <TableHead className="w-[100px]">Date of submission</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Heading</TableHead>
            <TableHead>Purpose</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRequests.map((request) => (
            <TableRow key={request._id}>
              <TableCell className="font-medium">
                {request._id.slice(-5)}
              </TableCell>
              <TableCell>
                {new Date(request.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge className="bg-green-500">{request.status}</Badge>
              </TableCell>
              <TableCell>{request.heading}</TableCell>
              <TableCell>{request.purpose}</TableCell>
              <TableCell>{request.quantity}</TableCell>
              <TableCell className="text-right">
                {request.total_amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageSocietyRequests;
