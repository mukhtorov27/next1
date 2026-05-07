export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  category: string;
  type: string;
  tags: string[];
  description: string;
}

export interface Application {
  id: number;
  name: string;
  email: string;
  jobId: number;
  jobTitle: string;
  appliedDate: string;
  message?: string;
}
