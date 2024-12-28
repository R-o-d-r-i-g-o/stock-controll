import { SvgIconComponent } from "@mui/icons-material"

type Anchor = 'top' | 'left' | 'bottom' | 'right';

type MenuItem = {
  lable: string
  icon: SvgIconComponent
  nav: NavigationPage
}

type MenuPosition = {
  anchor: Anchor
  icon: SvgIconComponent
}

enum NavigationPage {
  Home = "/panel",
  Login = "/login",
  Category = "/panel/shoes",
  Users = "/panel/users",
  History = "/panel/audits",
  Reports = "/panel/reports",
  Products = "/panel/shoes/items",

  // create operations
  ShoesSale = "/panel/shoes/debit",
  UsersCreate = "/panel/users/create",
  ShoesCreate = "/panel/shoes/create",
  ProductsCreate = "/panel/shoes/items/create",
}

export {
  type Anchor,
  type MenuItem,
  type MenuPosition,
  NavigationPage,
}