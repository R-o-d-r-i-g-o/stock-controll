import GroupIcon from '@mui/icons-material/Group';
import SummarizeIcon from '@mui/icons-material/Summarize';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import SwipeUpSharpIcon from '@mui/icons-material/SwipeUpSharp';
import SwipeDownSharpIcon from '@mui/icons-material/SwipeDownSharp';
import SwipeLeftSharpIcon from '@mui/icons-material/SwipeLeftSharp';
import SwipeRightSharpIcon from '@mui/icons-material/SwipeRightSharp';

import * as t from './_models'

const menuItems: Array<t.MenuItem> = [
  {
    lable: "Usuários",
    icon: GroupIcon
  },
  {
    lable: "Calçados",
    icon: LocalShippingIcon
  },
  {
    lable: "Relatórios",
    icon: SummarizeIcon
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