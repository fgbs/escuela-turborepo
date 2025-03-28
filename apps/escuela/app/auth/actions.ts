"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { encodedRedirect } from "@repo/ui/utils/encode-redirect";
import { createClient } from "@repo/supabase/lib/server";


export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required",
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
};

export const signInWithOAuthAction = async (provider: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'https://aula.escuelatvp.cl/auth/callback',
    },
  })

  if (error) {
    return encodedRedirect("error", "/auth/login", error.message);
  }

  if (data.url) {
    redirect(data.url) // use the redirect API for your server framework
  }
}

export const signInWithMagicLinkAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const origin = (await headers()).get("origin");
  const supabase = await createClient();

  if (!email) {
    return encodedRedirect(
      "error",
      "/auth/magiclink",
      "Email es obligatorio",
    );
  }

  const { error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: `${origin}/`,
      shouldCreateUser: false
    },
  })

  if (error) {
    return encodedRedirect(
      "error",
      "/auth/magiclink",
      "Error en el link magico, solicita uno nuevo.",
    );
  }

  return encodedRedirect(
    "success",
    "/auth/magiclink",
    "Revisa tu correo por un link para ingresar.",
  );
}

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/auth/login", error.message);
  }

  return redirect("/");
};


export const setPassword = async (formData: FormData) => {
  const supabase = await createClient()
  const password = formData.get('password') as string

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    return redirect('/error')
  }

  return redirect('/')
}

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/auth/forgot-password", "Email es obligatorio");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/auth/set-password`,
  });

  if (error) {
    return encodedRedirect(
      "error",
      "/auth/forgot-password",
      "No se pudo resetear la contraseña.",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/auth/forgot-password",
    "Revisa tu correo por un link para resetear tu contraseña.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/auth/set-password",
      "Las contraseñas son obligatorias.",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/auth/set-password",
      "Las contraseñas son distintas.",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/auth/set-password",
      "Falló la actualización de contraseña.",
    );
  }

  encodedRedirect("success", "/auth/set-password", "Contraseña actualizada.");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/auth/login");
};