// app/api/revalidate/route.ts — Manual cache-bust endpoint (DC-19)
// Akses: GET /api/revalidate?secret=<REVALIDATE_SECRET>
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (!process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { error: "REVALIDATE_SECRET tidak dikonfigurasi di server" },
      { status: 500 }
    );
  }

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { error: "unauthorized — secret salah atau tidak ada" },
      { status: 401 }
    );
  }

  revalidatePath("/");
  revalidatePath("/produk");

  return NextResponse.json({
    revalidated: true,
    paths: ["/", "/produk"],
    timestamp: new Date().toISOString(),
  });
}
