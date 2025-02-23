import { SvgIconComponent } from "@mui/icons-material";

type Anchor = "top" | "left" | "bottom" | "right";

type MenuItem = {
  lable: string;
  beta?: boolean;
  icon: SvgIconComponent;
  nav: NavigationPage;
};

type MenuPosition = {
  anchor: Anchor;
  icon: SvgIconComponent;
};

enum NavigationPage {
  Home = "/panel",
  Login = "/login",
  Shoe = "/panel/shoes",
  Users = "/panel/users",
  Audit = "/panel/audits",
  Reports = "/panel/reports",
  Products = "/panel/shoes/items",

  // create operations
  ShoesSale = "/panel/shoes/scan",
  UsersCreate = "/panel/users/create",
  ShoesCreate = "/panel/shoes/create",
  ProductsCreate = "/panel/shoes/items/create",
}

enum ReportType {
  Stock = "stock",
  Sales = "sales",
}

export {
  type Anchor,
  type MenuItem,
  type MenuPosition,
  ReportType,
  NavigationPage,
};
