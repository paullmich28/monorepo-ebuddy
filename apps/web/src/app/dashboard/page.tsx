"use client";
import React, { useEffect, useState } from "react";
import { useAuthListener } from "@/store/hooks/useAuthListener";
import NavbarDashboard from "../components/navbar/NavbarDashboard";
import { UserModel } from "@repo/shared";
import { auth } from "@/apis/firebaseConfig";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function DashboardPage() {
  useAuthListener();

  const currentUser = useSelector((state: RootState) => state.auth.user);
  const [users, setUsers] = useState<UserModel[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const idToken = await auth.currentUser?.getIdToken(true);

        if (!idToken) {
          setError("User is not authenticated")
          return;
        }

        const response = await axios.get<UserModel[]>(
          "http://localhost:5000/fetch-user-data",
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        
        setUsers(response.data);
      } catch (error: any) {
        setError(error)
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <NavbarDashboard />
      <div className="mt-20">
        {users.map((user, key) => (
          <h1 key={key}>{user.totalAverageWeightRatings}</h1>
        ))}

        <h1>{error}</h1>
      </div>
    </div>
  );
}
