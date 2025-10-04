import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import axios from "axios";
import { auth } from "@/auth"; // thiis will come form nextAuth installation use Boltgate for that

//  List of public routes (prefix-based)
const PUBLIC_ROUTES: string[] = [
  "/api/proxy/v1/form/getForm", // example
];

// Check if a given path is public
// function isPublicRoute(pathname: string): boolean {
//   return PUBLIC_ROUTES.includes(pathname);
// }


function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
}

// Utility to sign internal JWT
function signInternalJwt(userId: string) {
  if (!process.env.INTERNAL_JWT_SECRET) {
    throw new Error("INTERNAL_JWT_SECRET is not set in env");
  }
  return jwt.sign({ userId }, process.env.INTERNAL_JWT_SECRET, {
    expiresIn: "5m",
  });
}

async function proxyRequest(req: NextRequest, path: string[]) {
  const { nextUrl } = req;
  const publicAllowed = isPublicRoute(nextUrl.pathname);
  let userId: string | null = null;

  console.log("publicAllowed", publicAllowed);
  //  Session check only for non-public routes
  if (!publicAllowed) {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Session Error" }, { status: 401 });
    }
    userId = session.user.id;
  }

  // 2. Construct backend URL
  const backendUrl = `${process.env.EXPRESS_URL}/${path.join("/")}`;
  // 3. Prepare headers
  const headers: Record<string, string> = {
    "Content-Type": req.headers.get("content-type") || "application/json",
  };

  //  Add Authorization only for authenticated requests
  if (userId) {
    headers.Authorization = `Bearer ${signInternalJwt(userId)}`;
  }

  try {
    const response = await axios({
      url: backendUrl,
      method: req.method,
      headers,
      data: ["POST", "PUT", "PATCH"].includes(req.method)
        ? await req.json()
        : undefined,
      params: ["GET", "DELETE"].includes(req.method)
        ? Object.fromEntries(req.nextUrl.searchParams)
        : undefined,
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { error: "Internal Proxy Error" };
    return NextResponse.json(data, { status });
  }
}

// Handlers
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  return proxyRequest(req, path);
}
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  return proxyRequest(req, path);
}
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  return proxyRequest(req, path);
}
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  return proxyRequest(req, path);
}