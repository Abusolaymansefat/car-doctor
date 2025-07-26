"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import SocialLogin from "@/app/login/components/SocialLogin";
import { registerUser } from "@/app/actions/auth/registerUser";

export default function RegisterForm() {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      // Register the user
      const result = await registerUser({ name, email, password });

      if (result) {
        toast.success("Registered successfully! Logging you in...");

        // Auto login after registration
        const loginResponse = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (loginResponse?.ok) {
          router.push("/");
        } else {
          toast.error(
            "Login failed after registration. Please login manually."
          );
        }
      } else {
        toast.error("User already exists or registration failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-8">
      <label className="form-control w-full">
        <div className="label w-full">
          <span className="label-text font-bold">Name</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
          name="name"
          required
        />
      </label>
      <label className="form-control w-full">
        <div className="label w-full">
          <span className="label-text font-bold">Email</span>
        </div>
        <input
          type="email"
          name="email"
          placeholder="Type here"
          className="input input-bordered w-full"
          required
        />
      </label>
      <label className="form-control w-full">
        <div className="label w-full">
          <span className="label-text font-bold">Password</span>
        </div>
        <input
          type="password"
          name="password"
          placeholder="Type here"
          className="input input-bordered w-full"
          required
          minLength={6}
        />
      </label>
      <button
        type="submit"
        className="w-full h-12 bg-orange-500 text-white font-bold"
      >
        Sign Up
      </button>

      <p className="text-center">Or Sign In with</p>
      <SocialLogin />

      <p className="text-center">
        Already have an account?{" "}
        <a href="/login" className="text-orange-500 font-bold">
          Login
        </a>
      </p>
    </form>
  );
}
