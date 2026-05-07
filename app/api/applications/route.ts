import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Application } from "../../../lib/types";

const dbPath = path.join(process.cwd(), "db.json");

async function readDatabase() {
  const file = await fs.readFile(dbPath, "utf8");
  return JSON.parse(file) as { jobs: unknown[]; applications: Application[] };
}

async function writeDatabase(data: {
  jobs: unknown[];
  applications: Application[];
}) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}

export async function GET() {
  const db = await readDatabase();
  return NextResponse.json({ applications: db.applications ?? [] });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<Application>;

  if (!payload.name || !payload.email || !payload.jobId || !payload.jobTitle) {
    return NextResponse.json(
      { error: "Missing required application fields." },
      { status: 400 },
    );
  }

  const db = await readDatabase();
  const nextId =
    db.applications.length > 0
      ? Math.max(...db.applications.map((item) => item.id)) + 1
      : 1;

  const application: Application = {
    id: nextId,
    name: payload.name,
    email: payload.email,
    jobId: payload.jobId,
    jobTitle: payload.jobTitle,
    appliedDate:
      payload.appliedDate ??
      new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    message: payload.message,
  };

  db.applications.push(application);
  await writeDatabase(db);

  return NextResponse.json({ application }, { status: 201 });
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Missing application id" },
      { status: 400 },
    );
  }

  const db = await readDatabase();
  const applicationId = Number(id);
  const existing = db.applications.find((item) => item.id === applicationId);

  if (!existing) {
    return NextResponse.json(
      { error: "Application not found" },
      { status: 404 },
    );
  }

  db.applications = db.applications.filter((item) => item.id !== applicationId);
  await writeDatabase(db);

  return NextResponse.json({ success: true });
}
