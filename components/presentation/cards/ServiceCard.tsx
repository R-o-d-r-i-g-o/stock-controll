import Link from "next/link";
import React from "react";
import MainButton from "../common/MainButton";

type ServiceCardProps = {
  icon: React.ReactElement;
  title: string;
  description: string;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => (
  <div className="flex flex-grow flex-col gap-[2.56rem] pt-[1.91rem] pb-[2.81rem] px-[2.56rem] items-center service-card-shadow rounded-[1.75rem]">
    {icon}
    <p className="text-[2.25rem] font-[700]">{title}</p>
    <p className="text-normal">{description}</p>
    <Link href="/register">
      <MainButton text="Venha conhecer" classes="w-[10.125rem]" />
    </Link>
  </div>
);

export default ServiceCard;
