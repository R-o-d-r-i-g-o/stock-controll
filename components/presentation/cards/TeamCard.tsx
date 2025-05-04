import React from "react";
import Image from "next/image";

import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

type TeamCardProps = {
  name: string;
  imageUrl: string;
  profession: string;
};

const TeamCard: React.FC<TeamCardProps> = ({ imageUrl, name, profession }) => (
  <div className="flex flex-col gap-4 justify-center items-center border-2 border-white rounded-lg pt-[3rem] pb-4">
    <Image src={imageUrl} alt="team member photo" height={120} width={120} className="rounded-full" />
    <p className="text-lightBlue font-bold text-[1.2rem]">{name}</p>
    <p className="text-darkBlue font-bold opacity-[0.3]">{profession}</p>
    <div className="flex justify-around items-center w-full">
      <TwitterIcon />
      <FacebookIcon />
      <LinkedInIcon />
    </div>
  </div>
);

export default TeamCard;
