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
  Reports = "/painel/relatorios",
  History = "/painel/historico"
}

export {
  type Anchor,
  type MenuItem,
  type MenuPosition,
  NavigationPage,
}