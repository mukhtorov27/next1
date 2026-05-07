"use client";

import { create } from "zustand";
import { Job, Application } from "../../lib/types";

const ADMIN_EMAIL = "admin@jobportal.com";
const ADMIN_PASSWORD = "admin123";

interface AdminStore {
  email: string;
  password: string;
  loginError: string;
  isLoggedIn: boolean;
  jobs: Job[];
  jobsLoading: boolean;
  jobsError: string;
  applications: Application[];
  appsLoading: boolean;
  appsError: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  category: string;
  type: string;
  description: string;
  tags: string;
  createError: string;
  createStatus: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setLoginError: (value: string) => void;
  initializeAuth: () => void;
  login: () => boolean;
  logout: () => void;
  setJobs: (jobs: Job[]) => void;
  setJobsLoading: (value: boolean) => void;
  setJobsError: (value: string) => void;
  setApplications: (apps: Application[]) => void;
  setAppsLoading: (value: boolean) => void;
  setAppsError: (value: string) => void;
  setTitle: (value: string) => void;
  setCompany: (value: string) => void;
  setLocation: (value: string) => void;
  setSalary: (value: string) => void;
  setCategory: (value: string) => void;
  setType: (value: string) => void;
  setDescription: (value: string) => void;
  setTags: (value: string) => void;
  setCreateError: (value: string) => void;
  setCreateStatus: (value: string) => void;
  resetCreateForm: () => void;
  loadJobs: () => Promise<void>;
  deleteJob: (id: number) => Promise<boolean>;
  createJob: () => Promise<boolean>;
  loadApplications: () => Promise<void>;
  deleteApplication: (id: number) => Promise<boolean>;
}

const useAdminStore = create<AdminStore>((set, get) => ({
  email: "",
  password: "",
  loginError: "",
  isLoggedIn: false,
  jobs: [],
  jobsLoading: true,
  jobsError: "",
  applications: [],
  appsLoading: true,
  appsError: "",
  title: "",
  company: "",
  location: "",
  salary: "",
  category: "Technology",
  type: "Full-time",
  description: "",
  tags: "",
  createError: "",
  createStatus: "",
  setEmail: (value) => set({ email: value }),
  setPassword: (value) => set({ password: value }),
  setLoginError: (value) => set({ loginError: value }),
  initializeAuth: () => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("jobportal-admin");
    set({ isLoggedIn: token === "logged-in" });
  },
  login: () => {
    const { email, password } = get();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("jobportal-admin", "logged-in");
      set({ isLoggedIn: true, loginError: "" });
      return true;
    }
    set({ loginError: "Invalid email or password. Please try again." });
    return false;
  },
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jobportal-admin");
    }
    set({ isLoggedIn: false });
  },
  setJobs: (jobs) => set({ jobs }),
  setJobsLoading: (value) => set({ jobsLoading: value }),
  setJobsError: (value) => set({ jobsError: value }),
  setApplications: (apps) => set({ applications: apps }),
  setAppsLoading: (value) => set({ appsLoading: value }),
  setAppsError: (value) => set({ appsError: value }),
  setTitle: (value) => set({ title: value }),
  setCompany: (value) => set({ company: value }),
  setLocation: (value) => set({ location: value }),
  setSalary: (value) => set({ salary: value }),
  setCategory: (value) => set({ category: value }),
  setType: (value) => set({ type: value }),
  setDescription: (value) => set({ description: value }),
  setTags: (value) => set({ tags: value }),
  setCreateError: (value) => set({ createError: value }),
  setCreateStatus: (value) => set({ createStatus: value }),
  resetCreateForm: () =>
    set({
      title: "",
      company: "",
      location: "",
      salary: "",
      category: "Technology",
      type: "Full-time",
      description: "",
      tags: "",
      createError: "",
      createStatus: "",
    }),
  loadJobs: async () => {
    set({ jobsLoading: true, jobsError: "" });
    try {
      const response = await fetch("/api/jobs");
      const data = await response.json();
      set({ jobs: data.jobs ?? [] });
    } catch {
      set({ jobsError: "Unable to load jobs. Please try again." });
    } finally {
      set({ jobsLoading: false });
    }
  },
  deleteJob: async (id) => {
    const response = await fetch(`/api/jobs?id=${id}`, { method: "DELETE" });
    if (!response.ok) {
      set({ jobsError: "Failed to remove job." });
      return false;
    }
    await get().loadJobs();
    return true;
  },
  createJob: async () => {
    const {
      title,
      company,
      location,
      salary,
      category,
      type,
      description,
      tags,
    } = get();
    set({ createError: "", createStatus: "" });

    if (!title || !company || !location || !description) {
      set({ createError: "Please fill in all required fields." });
      return false;
    }

    const payload = {
      title,
      company,
      location,
      salary,
      category,
      type,
      description,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const body = await response.json();
      set({ createError: body.error || "Unable to create job." });
      return false;
    }

    set({ createStatus: "Job successfully created." });
    get().resetCreateForm();
    return true;
  },
  loadApplications: async () => {
    set({ appsLoading: true, appsError: "" });
    try {
      const response = await fetch("/api/applications");
      const data = await response.json();
      set({ applications: data.applications ?? [] });
    } catch {
      set({ appsError: "Unable to load applications." });
    } finally {
      set({ appsLoading: false });
    }
  },
  deleteApplication: async (id) => {
    const response = await fetch(`/api/applications?id=${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      set({ appsError: "Failed to delete application." });
      return false;
    }
    await get().loadApplications();
    return true;
  },
}));

export default useAdminStore;
