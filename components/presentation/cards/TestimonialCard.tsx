import React from "react";
import Image from "next/image";
import QuoteLeftIcon from "@mui/icons-material/FormatQuote";

type TestimonialCardProps = {
  imageUrl: string;
  review: string;
  reviewerName: string;
  className?: string;
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ imageUrl, review, reviewerName, className = "" }) => (
  <div className={`flex flex-grow flex-col gap-[2.56rem]  pt-[1.91rem] pb-[2.81rem] px-[2.56rem] items-center ${className}`}>
    <Image src={imageUrl} alt={`Foto de ${reviewerName}`} height={90} width={90} className="rounded-full mb-4" />
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-center gap-2 text-gray-600">
        <QuoteLeftIcon className="text-white text-sm" />
        <p className="text-white italic text-sm md:text-base">{review}</p>
      </div>
      <p className="text-gray-600 font-semibold text-sm">- {reviewerName}</p>
    </div>
  </div>
);

export default TestimonialCard;
