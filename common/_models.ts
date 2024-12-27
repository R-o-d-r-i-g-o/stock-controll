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
  Home = "/painel",
  Login = "/entrar",
  Shoes = "/painel/calcados",
  Users = "/painel/usuarios",
  SKUs = "/painel/calcados/sku",
  History = "/painel/historico",
  Reports = "/painel/relatorios",
  Products = "/painel/calcados/produtos",

  // create operations
  UsersCreate = "/painel/usuarios/criar",
  ShoesCreate = "/painel/calcados/criar",
}

export {
  type Anchor,
  type MenuItem,
  type MenuPosition,
  NavigationPage,
}