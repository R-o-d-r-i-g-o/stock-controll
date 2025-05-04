import { forwardRef, ReactElement } from "react";
import { Button } from "../ui/button";
import Loader from "@/components/ui/loader";

type MainButtonProps = {
  text: string;
  isLoading?: boolean;
  action?: () => void;
  isSubmitable?: boolean;
  disabled?: boolean;
  width?: "full_width" | string;
  dataLoadingText?: string;
  backgroundColor?: string;
  textColor?: string;
  hoverBackgroundColor?: string;
  classes?: string;
  iconRoute?: string;
  rightIconRoute?: string;
  rightIconClass?: string;
  iconComponent?: ReactElement;
  size?: "small" | "normal" | "large";
};

const MainButton = forwardRef<HTMLButtonElement, MainButtonProps>(
  (
    {
      text,
      isLoading = false,
      action,
      disabled = false,
      isSubmitable,
      width,
      dataLoadingText = "Please wait ...",
      backgroundColor = "bg-blue-600",
      textColor = "text-white",
      hoverBackgroundColor = "hover:bg-blue-700",
      classes,
      iconRoute,
      rightIconRoute,
      rightIconClass = "w-[24px] h-[24px]",
      iconComponent,
      size = "normal",
    },
    ref
  ) => {
    const propWidth = width === "full_width" ? "w-full" : width ? width : "w-[7.4375rem]";
    const size_height = size === "normal" ? "h-[3.1215rem]" : size === "large" ? "h-[3.75rem]" : "h-[2.625rem]";

    return !isLoading ? (
      <Button
        className={`${backgroundColor} ${textColor} shadow-xl ${propWidth} md:${propWidth} border-white border-2 select-none rounded-[0.625rem] hover:opacity-90 ${hoverBackgroundColor} ${size_height} ${classes}`}
        onClick={!disabled ? action : () => undefined}
        type={isSubmitable ? "submit" : "button"}
        ref={ref}
        disabled={disabled}
      >
        {iconRoute && <img src={iconRoute} alt="left button icon" className="w-[24px] h-[24px]" />}
        {iconRoute && <span>&nbsp;</span>}
        {iconComponent}
        {iconComponent && <span>&nbsp;</span>}
        {text}
        {rightIconRoute && <span>&nbsp;</span>}
        {rightIconRoute && <img src={rightIconRoute} alt="right button icon" className={rightIconClass} />}
      </Button>
    ) : (
      <Button className={`bg-blue-600 text-white border-white border-2 ${propWidth} md:${propWidth} select-none rounded-[0.625rem] cursor-not-allowed ${size_height} ${classes ? classes : ""}`} ref={ref} disabled>
        <Loader />
        {dataLoadingText}
      </Button>
    );
  }
);

MainButton.displayName = "MainButton";

export default MainButton;
