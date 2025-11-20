import { MotionValue } from "framer-motion";
import { StaticImageData } from "next/image";
import { ReactNode } from "react";

export interface CardProps {
  icon: string;
  title: string;
  description: string;
  image: StaticImageData;
  index: number;
  targetScale: number;
  range: number[];
  progress: MotionValue<number>; // Updated to MotionValue<number>
}
export type TVersesCard = {
  number: number;
  title: string;
  fleetBloxDes: string;
  traditionDes: string;
  index: number;
  targetScale: number;
  range: number[];
  progress: MotionValue<number>;
};
export type TCards = {
  number: number;
  title: string;
  fleetbloxText: string;
  traditionalText: string;
};

export type TContactFormData = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phoneNumber: string;
  message: string;
  countryCode: string;
  flag: StaticImageData;
};
export type TFeedbackFormData = {
  brandName: string;
  brandEmail: string;
  brandPhoneNumber: string;
  message: string;
  countryCode: string;
  flag: StaticImageData;
};

export type TSalesFormData = {
  fleetSize: string;
  firstName: string;
  lastName: string;
  companyName: string;
  phoneNumber: string;
  companyEmail: string;
  additionalMessage: string;
  countryCode: string;
  flag: StaticImageData;
};

export type TStaterPlanData = {
  id: string;
  name: string;
  subHeading: string;
  extraDescription: string;
  description: string[];
  price: number;
  slotMinimum: number;
  createdAt: string;
  updatedAt: string;
};
export type NavbarItem = {
  title: string;
  description?: string;
  href: string;
  isUpcoming?: boolean;
  icon?: ReactNode;
};
