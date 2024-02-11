"use client";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const ManageRecommendationRequests = () => {
  const { toast } = useToast();

  const [requests, setRequests] = useState([]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [comment, setComment] = useState("");
  const [club, setClub] = useState({});

  const role = Cookies.get("member_role");

  const handleAddComment = async () => {
    try {
      const { data } = await axios.post("/api/request/add-comment", {
        member_token: Cookies.get("member_token"),
        comment,
        id: selectedRequest,
      });
      console.log(data);
    } catch (err) {
      toast({
        heading: "Error adding comment",
        description: "Seems like a network issue occurred",
      });
    }
  };

  const updateRecommendedStatus = async (id) => {
    try {
      const { data } = await axios.post(
        "/api/request/update-recommended-status",
        {
          id,
          member_token: Cookies.get("member_token"),
        }
      );

      console.log(data);

      if (data.success) {
        const updatedRequest = data.request;
        setRequests((prevRequests) => {
          const updatedRequests = prevRequests.map((request) =>
            request._id === updatedRequest._id ? updatedRequest : request
          );
          return updatedRequests;
        });
      }
    } catch (err) {
      toast({
        heading: "Error updating recommended status, network error",
      });
    }
  };

  const approveRequest = async (id) => {
    try {
      const { data } = await axios.post("/api/request/approve", {
        id,
        member_token: Cookies.get("member_token"),
      });

      console.log(data);

      if (data.success) {
        console.log("here");
        const updatedRequest = data.request;
        const club_res = await axios.post("/api/club/update-expense", {
          member_token: Cookies.get("member_token"),
          amount: updatedRequest.total_amount,
        });
        console.log("club res data", club_res.data);
        setRequests((prevRequests) => {
          const updatedRequests = prevRequests.map((request) =>
            request._id === updatedRequest._id ? updatedRequest : request
          );
          return updatedRequests;
        });
      }
    } catch (err) {
      toast({
        heading: "Error updating recommended status, network error",
      });
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.post("/api/club/fetch-by-name", {
        member_token: Cookies.get("member_token"),
      });

      if (data.success) {
        setClub(data.club);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          "/api/request/fetch-recommendations",
          {
            member_token: Cookies.get("member_token"),
          }
        );
        setRequests(data.requests);
      } catch (err) {
        toast({
          description: "oops, a network error occurred",
        });
      }
    })();
  }, []);

  if (!requests.length) {
    return <div>No latest requests</div>;
  }
  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sr No</TableHead>
            <TableHead className="w-[100px]">Date of submission</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Recommendation Status</TableHead>
            <TableHead>Heading</TableHead>
            <TableHead>Purpose</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Add Comment</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request._id}>
              <TableCell className="font-medium">
                {request._id.slice(-5)}
              </TableCell>
              <TableCell>
                {new Date(request.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{request.status}</Badge>
              </TableCell>
              <TableCell>
                {/* {request.recommendedBy.includes(role) ? (
                  <Badge variant="secondary">Verified</Badge>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="bg-green-500"
                      onClick={() => updateRecommendedStatus(request._id)}
                    >
                      <FaCheck color="white" />
                    </Button>
                    <Button variant="outline" className="bg-red-500">
                      <ImCross color="white" />
                    </Button>
                  </div>
                )} */}
                {request.recommendedBy.some(
                  (obj) => obj.memberRole === role
                ) ? (
                  <Badge
                    variant="secondary"
                    className="bg-green-500 text-white hover:bg-green-500"
                  >
                    {request.status === "approved" &&
                    request.recommendedBy.slice(-1).memberRole === role
                      ? "Approved"
                      : "Recommended"}{" "}
                    by you
                  </Badge>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="bg-green-500"
                      onClick={() => {
                        if (role === "Secretary") {
                          updateRecommendedStatus(request._id);
                          return;
                        }

                        const formattedDate = `${
                          new Date().getMonth() + 1
                        }/${new Date().getFullYear()}`;

                        console.log(club.monthly_expense);
                        if (
                          club.monthly_expense &&
                          Object.keys(club.monthly_expense).includes(
                            formattedDate
                          )
                        ) {
                          if (
                            club.monthly_expense[formattedDate] +
                              parseFloat(request.total_amount) <
                            15000
                          ) {
                            approveRequest(request._id);
                            console.log("approving here");
                          } else {
                            updateRecommendedStatus(request._id);
                            console.log("recommending here");
                          }
                        } else {
                          if (parseFloat(request.total_amount) < 15000) {
                            approveRequest(request._id);
                            console.log("approving");
                          } else {
                            updateRecommendedStatus(request._id);
                            console.log("recommending");
                          }
                        }
                      }}
                    >
                      <FaCheck color="white" />
                    </Button>
                    <Button variant="outline" className="bg-red-500">
                      <ImCross color="white" />
                    </Button>
                  </div>
                )}
              </TableCell>
              <TableCell>{request.heading}</TableCell>
              <TableCell>{request.purpose}</TableCell>
              <TableCell>{request.quantity}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger>
                    <Button
                      variant="secondary"
                      onClick={() => setSelectedRequest(request._id)}
                    >
                      Add
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add a comment</DialogTitle>
                      <DialogDescription>
                        This will add a comment to the request and will be
                        visible to everyone
                      </DialogDescription>
                    </DialogHeader>
                    <div>
                      <Input
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>
                    <DialogFooter>
                      <Button onClick={() => handleAddComment()} type="submit">
                        Confirm
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
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

export default ManageRecommendationRequests;
