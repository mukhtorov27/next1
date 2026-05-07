import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Job } from "../../../lib/types";

const dbPath = path.join(process.cwd(), "db.json");

async function readDatabase() {
  const file = await fs.readFile(dbPath, "utf8");
  return JSON.parse(file) as { jobs: Job[]; applications: unknown[] };
}

async function writeDatabase(data: { jobs: Job[]; applications: unknown[] }) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}

export async function GET() {
  const db = await readDatabase();
  return NextResponse.json({ jobs: db.jobs ?? [] });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<Job>;

  if (
    !payload.title ||
    !payload.company ||
    !payload.location ||
    !payload.description
  ) {
    return NextResponse.json(
      {
        error:
          "Missing required fields: title, company, location, description.",
      },
      { status: 400 },
    );
  }

  const db = await readDatabase();
  const nextId =
    db.jobs.length > 0 ? Math.max(...db.jobs.map((job) => job.id)) + 1 : 1;
  const job: Job = {
    id: nextId,
    title: payload.title,
    company: payload.company,
    location: payload.location,
    salary: payload.salary ?? "Not specified",
    category: payload.category ?? "Other",
    type: payload.type ?? "Full-time",
    tags: payload.tags ?? [],
    description: payload.description,
  };

  db.jobs.push(job);
  await writeDatabase(db);

  return NextResponse.json({ job }, { status: 201 });
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing job id" }, { status: 400 });
  }

  const db = await readDatabase();
  const jobId = Number(id);
  const existing = db.jobs.find((job) => job.id === jobId);

  if (!existing) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  db.jobs = db.jobs.filter((job) => job.id !== jobId);
  await writeDatabase(db);

  return NextResponse.json({ success: true });
}
