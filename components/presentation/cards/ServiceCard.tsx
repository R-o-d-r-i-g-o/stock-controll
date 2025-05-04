import Link from "next/link";
import React from "react";
import MainButton from "../common/MainButton";

interface IProps {
  iconUrl: string;
  title: string;
  description: string;
  action?: () => void;
}

function ServiceCard({ iconUrl, title, description, action }: IProps) {
  return (
    <div className="flex flex-grow flex-col gap-[2.56rem]  pt-[1.91rem] pb-[2.81rem] px-[2.56rem] items-center service-card-shadow rounded-[1.75rem]">
      <div>
        <img src={iconUrl} alt="service icon" className="h-[40px] md:h-[60px]" />
      </div>
      <p className="text-[2.25rem] font-[700]">{title}</p>
      <p className="text-normal">{description}</p>
      <Link href="/register">
        <MainButton text="Venha conhecer" action={action} classes="w-[10.125rem]" />
      </Link>
    </div>
  );
}

export default ServiceCard;
