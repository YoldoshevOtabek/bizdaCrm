export interface BannerType {
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
  }

  
export interface BannerForm {
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
}