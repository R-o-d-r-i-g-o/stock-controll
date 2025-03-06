import { SvgIconComponent } from "@mui/icons-material";

type Anchor = "top" | "left" | "bottom" | "right";

type MenuItem = {
  lable: string;
  beta?: boolean;
  icon: SvgIconComponent;
  nav: string;
};

type MenuPosition = {
  anchor: Anchor;
  icon: SvgIconComponent;
};

export type { Anchor, MenuItem, MenuPosition };
