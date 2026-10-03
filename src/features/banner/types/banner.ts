export type Banner = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  mobileImage: string;
  buttonText: string;
  link: string;
  sortOrder: number;
  isActive: boolean;
  startDate: string;
  endDate: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

import type { Dayjs } from "dayjs";

export type BannerPayload = {
  title: string;
  subtitle: string;
  image: string;
  mobileImage: string;
  buttonText: string;
  link: string;
  sortOrder: number;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
};

export type BannerFormValues = Omit<BannerPayload, "startDate" | "endDate"> & {
  startDate?: Dayjs | null;
  endDate?: Dayjs | null;
};
