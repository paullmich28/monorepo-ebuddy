"use client";
import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  Link,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { LoginFormData, loginSchema } from "@/model/types";
import { auth } from "@/apis/firebaseConfig";
import { loginStart, loginSuccess } from "@/store/authSlice";
import { useAuthListener } from "@/store/hooks/useAuthListener";
import { useDispatch } from "react-redux";
import { useAuth } from "@/store/hooks/useAuth";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = loginSchema.safeParse(data);

    dispatch(loginStart());

    try {
      if (result.success) {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

        const jwt = await userCredential.user.getIdToken(true);

        const { uid, email, displayName } = userCredential.user;

        dispatch(loginSuccess({ uid, email, displayName, jwt }));
        router.push("/dashboard");
      }
    } catch (error: any) {
      setError("root", { message: error.message });
    }
  };

  useAuthListener();

  if (user) {
    return <></>;
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Sign In
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("email")}
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={!!errors.email || !!errors.root}
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
              autoComplete="current-password"
              error={!!errors.password || !!errors.root}
            />

            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {errors.password.message}
              </p>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
              disabled={isSubmitting}
              color="primary"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>

            {errors.root && (
              <p className="text-red-500 text-xs italic text-center">
                {errors.root.message}
              </p>
            )}

            <Box sx={{ textAlign: "center", mt: 1 }}>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginPage;
