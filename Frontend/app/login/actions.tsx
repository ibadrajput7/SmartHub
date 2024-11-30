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
    httpOnly: true,
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


export async function logout() {
  cookies().delete("access_token");
  revalidatePath("/", "layout");
  redirect("/");
}



// // actions.tsx
// // actions.tsx
// "use server"

// import { revalidatePath } from "next/cache"
// import { redirect } from "next/navigation"
// import { cookies } from "next/headers"

// const API_URL = "http://127.0.0.1:5000"

// interface LoginResponse {
//   message: string
//   user: string
// }

// interface ErrorResponse {
//   detail: string
// }

// export async function login(prevState: any, formData: FormData) {
//   try {
//     if (!formData) {
//       return "Invalid form data"
//     }

//     const email = formData.get("email")?.toString()
//     const password = formData.get("password")?.toString()

//     if (!email || !password) {
//       return "Email and password are required"
//     }

//     const response = await fetch(`${API_URL}/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       },
//       body: JSON.stringify({ email, password }),
//     })

//     const data = await response.json() as LoginResponse | ErrorResponse

//     if (!response.ok) {
//       return 'detail' in data ? data.detail : "Login failed"
//     }

//     const loginData = data as LoginResponse
//     cookies().set({
//       name: "user",
//       value: loginData.user,
//       httpOnly: true,
//       path: "/"
//     })

//     revalidatePath("/", "layout")
//     redirect("/dashboard")
//   } catch (error) {
//     console.error("Login error:", error)
//     return "An error occurred during login"
//   }
// }

// export async function signup(prevState: any, formData: FormData) {
//   try {
//     if (!formData) {
//       return "Invalid form data"
//     }

//     const username = formData.get("username")?.toString()
//     const email = formData.get("email")?.toString()
//     const password = formData.get("password")?.toString()

//     if (!username || !email || !password) {
//       return "All fields are required"
//     }

//     const response = await fetch(`${API_URL}/signup`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       },
//       body: JSON.stringify({ username, email, password }),
//     })

//     const data = await response.json() as LoginResponse | ErrorResponse

//     if (!response.ok) {
//       return 'detail' in data ? data.detail : "Signup failed"
//     }

//     revalidatePath("/", "layout")
//     return (data as LoginResponse).message || "Check your email to continue sign in process"
//   } catch (error) {
//     console.error("Signup error:", error)
//     return "An error occurred during signup"
//   }
// }

// export async function logout() {
//   cookies().delete("user")
//   revalidatePath("/", "layout")
//   redirect("/login")
// }