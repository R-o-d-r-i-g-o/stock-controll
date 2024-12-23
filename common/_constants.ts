import GroupIcon from '@mui/icons-material/Group';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CottageIcon from '@mui/icons-material/Cottage';

import SwipeUpSharpIcon from '@mui/icons-material/SwipeUpSharp';
import SwipeDownSharpIcon from '@mui/icons-material/SwipeDownSharp';
import SwipeLeftSharpIcon from '@mui/icons-material/SwipeLeftSharp';
import SwipeRightSharpIcon from '@mui/icons-material/SwipeRightSharp';

import * as t from './_models'

const menuItems: Array<t.MenuItem> = [
  {
    lable: "Usuários",
    icon: GroupIcon,
    nav: t.NavigationPage.Users
  },
  {
    lable: "Calçados",
    icon: LocalShippingIcon,
    nav: t.NavigationPage.Shoes
  },
  {
    lable: "Relatórios",
    icon: SummarizeIcon,
    nav: t.NavigationPage.Reports
  },
  {
    lable: "Histórico",
    icon: AccessAlarmIcon,
    nav: t.NavigationPage.History
  },
  {
    lable: "Home",
    icon: CottageIcon,
    nav: t.NavigationPage.Home
  }
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

export {
  menuPositions,
  menuItems,
}