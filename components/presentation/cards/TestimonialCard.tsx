import React from "react";
import QuoteLeftIcon from "@mui/icons-material/FormatQuote";

interface IProps {
  imageUrl: string;
  review: string;
  reviewerName: string;
  className?: string;
}

function TestimonialCard({ imageUrl, review, reviewerName, className = "" }: IProps) {
  return (
    <div className={`flex flex-grow flex-col gap-[2.56rem]  pt-[1.91rem] pb-[2.81rem] px-[2.56rem] items-center ${className}`}>
      <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
        <img src={imageUrl} alt={`Foto de ${reviewerName}`} className="object-cover w-full h-full" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <QuoteLeftIcon className="text-blue-500 text-sm" />
          <p className="text-gray-800 italic text-sm md:text-base">{review}</p>
        </div>
        <p className="text-gray-500 font-semibold text-sm">- {reviewerName}</p>
      </div>
    </div>
  );
}

export default TestimonialCard;
