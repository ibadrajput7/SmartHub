'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const API_URL = 'http://127.0.0.1:5000';

type AdminLoginResponse = {
  access_token: string;
  token_type: string;
};

export async function adminLogin(formData: FormData) {
  const adminId = formData.get('adminId');
  const password = formData.get('password');

  const response = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ 
      user_id: Number(adminId), 
      password 
    }),
    cache: 'no-store'
  });

  if (!response.ok) {
    const data = await response.json();
    const errorMessage = data.detail || "Login failed";
    redirect(`/admin-login?message=${encodeURIComponent(errorMessage)}`);
  }

  const data: AdminLoginResponse = await response.json();

  cookies().set({
    name: "admin_token",
    value: data.access_token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  });

  revalidatePath("/", "layout");
  redirect("/admin-dashboard");
}

export async function adminLogout() {
  cookies().delete("admin_token");
  revalidatePath("/admin", "layout");
  redirect("/admin/login?message=You have been logged out");
}