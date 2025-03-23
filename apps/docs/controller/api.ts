import {
  getDocs,
  collection,
  updateDoc,
  doc
} from "@firebase/firestore/lite";
import { Response } from "express";
import { db } from "../config/firebaseConfig";
import { UserModel } from "@repo/shared";

export async function updateUser(data: Partial<UserModel> & { uid: string }, res: Response) {
  try {
    const { uid, totalAverageWeightRatings, numberOfRents, recentlyActive, fullName, totalScore } = data;

    if (!uid) {
      return res.status(400).json({ error: "Username is required." });
    }

    const userRef = doc(db, "USERS", uid);
    const updateData: Partial<UserModel> = {};

    if (totalAverageWeightRatings !== undefined) {
      updateData.totalAverageWeightRatings = totalAverageWeightRatings
    }

    if (numberOfRents !== undefined) {
      updateData.numberOfRents = numberOfRents
    }

    if (recentlyActive !== undefined) {
      updateData.recentlyActive = recentlyActive
    }

    if (fullName !== undefined) {
      updateData.fullName = fullName
    }

    if (totalScore !== undefined) {
      updateData.totalScore = totalScore
    }

    await updateDoc(userRef, updateData);

    return res.status(200).json({
      message: "User updated successfully",
      updatedData: updateData,
    });
  } catch (err) {
    return res.status(400).json({ error: err || "An unknown error occurred." });
  }
}

export async function getUsers(res: Response) {
  try {
    const usersRef = collection(db, "USERS");
    const users = await getDocs(usersRef);

    const usersList: UserModel[] = users.docs.map((doc) => {
      const data = doc.data();

      return {
        fullName: data.fullName || "",
        totalAverageWeightRatings: data.totalAverageWeightRatings || 0,
        numberOfRents: data.numberOfRents || 0,
        recentlyActive: data.recentlyActive?.toDate() || new Date(),
        totalScore: data.totalScore || 0
      };
    });

    console.log("Data retrieved successfully");
    return res.status(200).json({ users: usersList });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
}