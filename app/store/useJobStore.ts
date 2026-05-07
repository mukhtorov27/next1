"use client";

import { create } from "zustand";
import { Job } from "../../lib/types";

interface JobStore {
  jobs: Job[];
  search: string;
  category: string;
  jobType: string;
  loading: boolean;
  selectedJob: Job | null;
  applicantName: string;
  applicantEmail: string;
  applicantMessage: string;
  applicationError: string;
  applicationSuccess: string;
  submitting: boolean;
  setJobs: (jobs: Job[]) => void;
  setSearch: (value: string) => void;
  setCategory: (value: string) => void;
  setJobType: (value: string) => void;
  setLoading: (value: boolean) => void;
  setSelectedJob: (job: Job | null) => void;
  setApplicantName: (value: string) => void;
  setApplicantEmail: (value: string) => void;
  setApplicantMessage: (value: string) => void;
  setApplicationError: (value: string) => void;
  setApplicationSuccess: (value: string) => void;
  setSubmitting: (value: boolean) => void;
  resetFilters: () => void;
  resetApplicationForm: () => void;
  openModal: (job: Job) => void;
  closeModal: () => void;
}

const useJobStore = create<JobStore>((set) => ({
  jobs: [],
  search: "",
  category: "All Categories",
  jobType: "All Types",
  loading: true,
  selectedJob: null,
  applicantName: "",
  applicantEmail: "",
  applicantMessage: "",
  applicationError: "",
  applicationSuccess: "",
  submitting: false,
  setJobs: (jobs) => set({ jobs }),
  setSearch: (value) => set({ search: value }),
  setCategory: (value) => set({ category: value }),
  setJobType: (value) => set({ jobType: value }),
  setLoading: (value) => set({ loading: value }),
  setSelectedJob: (job) => set({ selectedJob: job }),
  setApplicantName: (value) => set({ applicantName: value }),
  setApplicantEmail: (value) => set({ applicantEmail: value }),
  setApplicantMessage: (value) => set({ applicantMessage: value }),
  setApplicationError: (value) => set({ applicationError: value }),
  setApplicationSuccess: (value) => set({ applicationSuccess: value }),
  setSubmitting: (value) => set({ submitting: value }),
  resetFilters: () =>
    set({ search: "", category: "All Categories", jobType: "All Types" }),
  resetApplicationForm: () =>
    set({
      applicantName: "",
      applicantEmail: "",
      applicantMessage: "",
      applicationError: "",
      applicationSuccess: "",
      submitting: false,
    }),
  openModal: (job) =>
    set({
      selectedJob: job,
      applicationError: "",
      applicationSuccess: "",
      applicantName: "",
      applicantEmail: "",
      applicantMessage: "",
    }),
  closeModal: () =>
    set({ selectedJob: null, applicationError: "", applicationSuccess: "" }),
}));

export default useJobStore;
