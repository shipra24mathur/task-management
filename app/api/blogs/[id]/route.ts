import { getById } from "@/app/lib/data";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const id = req.url.split("blogs/")[1];
    const post = getById(id);
    console.log(id);
    if (!post) {
      return NextResponse.json({ message: "Error" }, { status: 404 });
    }
    return NextResponse.json({ message: "OK", post }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "ERROR", err }, { status: 500 });
  }
};
export const POST = async (req: Request) => {
  console.log("post req 11");
};

export const PUT = async (req: Request) => {
  console.log("PUT req 22");
};

export const DELETE = async (req: Request) => {
  console.log("DELETE req 33");
};
