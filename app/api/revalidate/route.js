import {revalidatePath} from "next/cache";
import {NextResponse} from "next/server";

export async function POST(request) {
  const secret =
    request.nextUrl.searchParams.get("secret") ||
    request.headers.get("x-revalidate-secret");

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  revalidatePath("/", "layout");
  return NextResponse.json({ revalidated: true, now: Date.now() });
}

export async function GET(request) {
  return POST(request);
}
