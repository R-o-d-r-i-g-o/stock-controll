import { SvgIconComponent } from "@mui/icons-material"

type Anchor = 'top' | 'left' | 'bottom' | 'right';

type MenuItem = {
  lable: string
  icon: SvgIconComponent
}

type MenuPosition = {
  anchor: Anchor
  icon: SvgIconComponent
}

enum NavigationPage {
  Dash = "/painel",
  Login = "/entrar",
  Shoes = "/painel/calcados",
  Users = "/painel/usuarios",
}

export {
  type Anchor,
  type MenuItem,
  type MenuPosition,
  NavigationPage,
}