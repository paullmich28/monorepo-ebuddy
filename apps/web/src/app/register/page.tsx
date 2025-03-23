"use client";
import React, { useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  Link,
} from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { RegisterFormData, registerSchema } from "@/model/types";
import { useAuthListener } from "@/store/hooks/useAuthListener";
import { useDispatch } from "react-redux";
import { db } from "@/apis/firebaseConfig";
import { useAuth } from "@/store/hooks/useAuth";
import { auth } from "@/apis/firebaseConfig";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { loginSuccess } from "@/store/authSlice";
import { doc, setDoc } from "firebase/firestore";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    const result = registerSchema.safeParse(data);

    try {
      if (result.success) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

        let jwt = ""

        userCredential.user.getIdToken(true).then((token) => {
          jwt = token
        })

        const { uid, email, displayName } = userCredential.user;

        const reference = doc(db, "USERS", uid);

        await setDoc(
          reference,
          {
            fullName: data.name,
            numberOfRents: 0,
            recentlyActive: Date.now(),
            totalAverageWeightRatings: 0.0,
          },
          { merge: true }
        );

        dispatch(loginSuccess({ uid, email, displayName, jwt }));

        router.push("/login");
      }
    } catch (error) {
      setError("root", { message: "Invalid email or password" });
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);

  if (user) {
    return <></>;
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Create an Account
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("name")}
              margin="normal"
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              error={!!errors.name}
            />

            {errors.name && (
              <p className="text-red-500 text-xs italic">
                {errors.name.message}
              </p>
            )}

            <TextField
              {...register("email")}
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={!!errors.email}
            />

            {errors.email && (
              <p className="text-red-500 text-xs italic">
                {errors.email.message}
              </p>
            )}

            <TextField
              {...register("password")}
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              error={!!errors.password}
            />

            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {errors.password.message}
              </p>
            )}

            <TextField
              {...register("confirmPassword")}
              margin="normal"
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              error={!!errors.confirmPassword}
            />

            {errors.confirmPassword && (
              <p className="text-red-500 text-xs italic">
                {errors.confirmPassword.message}
              </p>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>

            <Box sx={{ textAlign: "center" }}>
              <Link href="/login" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default RegisterPage;
