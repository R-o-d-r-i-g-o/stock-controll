import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import SwipeUpSharpIcon from '@mui/icons-material/SwipeUpSharp';
import SwipeDownSharpIcon from '@mui/icons-material/SwipeDownSharp';
import SwipeLeftSharpIcon from '@mui/icons-material/SwipeLeftSharp';
import SwipeRightSharpIcon from '@mui/icons-material/SwipeRightSharp';

import * as t from './_models'

const menuItems: Array<t.MenuItem> = [
  {
    lable: "Usuários",
    icon: MailIcon
  },
  {
    lable: "Calçados",
    icon: InboxIcon
  },
  {
    lable: "Home",
    icon: HomeIcon
  },
]

const menuPositions: Array<t.MenuPosition> = [
  {
    anchor: "bottom",
    icon: SwipeUpSharpIcon
  },
  {
    anchor: "right",
    icon: SwipeLeftSharpIcon
  },
  {
    anchor: "left",
    icon: SwipeRightSharpIcon
  },
  {
    anchor: "top",
    icon: SwipeDownSharpIcon
  }
]

export { menuItems, menuPositions }