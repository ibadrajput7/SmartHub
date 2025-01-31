// actions.tsx
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const API_URL = "http://127.0.0.1:5000";

type LoginResponse = {
  access_token: string;
  token_type: string;
  user: string;
};

type SignupResponse = {
  message: string;
  user: string;
};

type ApiError = {
  detail: string;
};

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ email, password }),
    cache: 'no-store'
  });

  if (!response.ok) {
    const data = await response.json();
    const errorMessage = data.detail || "Login failed";
    redirect(`/login?message=${encodeURIComponent(errorMessage)}`);
  }

  const data: LoginResponse = await response.json();

  cookies().set({
    name: "access_token",
    value: data.access_token,
    httpOnly: false, // Change to false to allow JS access
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  });

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const username = formData.get('username') as string | null;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Construct the request body
  const requestBody: any = { email, password };
  if (username && username.trim() !== '') {
    requestBody.username = username;
  }

  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(requestBody),
    cache: 'no-store'
  });

  if (!response.ok) {
    const data = await response.json();
    const errorMessage = data.detail || "Signup failed";
    redirect(`/login?message=${encodeURIComponent(errorMessage)}`);
  }

  revalidatePath("/", "layout");
  redirect("/login?message=Account created. Please login.");
}


export async function signout() {
  // Clear the access token cookie
  cookies().delete("access_token");

  // Revalidate the layout to update the authentication state
  revalidatePath("/", "layout");

  // Redirect to the login page
  redirect("/login?message=You have been signed out");
}




