import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";

const COOKIE_NAME = "hannahm_session";
const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "default_hannahm_super_secret_session_key_32"
);

export interface SessionPayload {
  id: number;
  username: string;
}

export async function createSession(payload: SessionPayload) {
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return token;
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, SECRET);
    return {
      id: Number(payload.id),
      username: String(payload.username),
    };
  } catch {
    return null;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function requireAuth(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  return session;
}

export async function authenticate(username: string, password: string) {
  const account = await prisma.account.findUnique({
    where: { username },
  });

  if (!account) {
    return { success: false, error: "Invalid username or password" };
  }

  // Support both bcrypt hashes and legacy plain-text passwords
  let isValid = false;
  if (account.password.startsWith("$2a$") || account.password.startsWith("$2b$")) {
    isValid = await bcrypt.compare(password, account.password);
  } else {
    isValid = account.password === password;
    // Upgrade to bcrypt if plain text matched
    if (isValid) {
      const hashed = await bcrypt.hash(password, 10);
      await prisma.account.update({
        where: { id: account.id },
        data: { password: hashed },
      });
    }
  }

  if (!isValid) {
    return { success: false, error: "Invalid username or password" };
  }

  await createSession({
    id: account.id,
    username: account.username,
  });

  return { success: true };
}
