import GroupIcon from "@mui/icons-material/Group";
import SummarizeIcon from "@mui/icons-material/Summarize";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CottageIcon from "@mui/icons-material/Cottage";

import SwipeUpSharpIcon from "@mui/icons-material/SwipeUpSharp";
import SwipeDownSharpIcon from "@mui/icons-material/SwipeDownSharp";
import SwipeLeftSharpIcon from "@mui/icons-material/SwipeLeftSharp";
import SwipeRightSharpIcon from "@mui/icons-material/SwipeRightSharp";

import * as t from "./_models";

const defaultPageSize = 10;

const defaultDateMask = "DD/MM/YYYY HH:mm:ss";

const footSizesList = [
  33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
  52,
];

const appConfig = Object.freeze({
  name: "marca passo 👟",
  title: "ERP | Marca-Passo 👟",
  titleTemplate: "ERP | Marca-Passo 👟 | %s",
  description:
    "O ERP Marca-Passo é a solução ideal para gerenciar sua sapataria com eficiência. Controle de estoque, vendas, finanças e mais, tudo em um único sistema. Simplifique o seu dia a dia e maximize seus lucros!",
});

const menuItems: Array<t.MenuItem> = [
  {
    lable: "Usuários",
    icon: GroupIcon,
    nav: t.NavigationPage.Users,
  },
  {
    beta: true,
    lable: "Calçados",
    icon: LocalShippingIcon,
    nav: t.NavigationPage.Shoe,
  },
  {
    beta: true,
    lable: "Relatórios",
    icon: SummarizeIcon,
    nav: t.NavigationPage.Reports,
  },
  {
    lable: "Histórico",
    icon: AccessAlarmIcon,
    nav: t.NavigationPage.Audit,
  },
  {
    lable: "Home",
    icon: CottageIcon,
    nav: t.NavigationPage.Home,
  },
];

const menuPositions: Array<t.MenuPosition> = [
  {
    anchor: "bottom",
    icon: SwipeUpSharpIcon,
  },
  {
    anchor: "right",
    icon: SwipeLeftSharpIcon,
  },
  {
    anchor: "left",
    icon: SwipeRightSharpIcon,
  },
  {
    anchor: "top",
    icon: SwipeDownSharpIcon,
  },
];

const reportTypes = [
  {
    lable: "Vendas",
    value: t.ReportType.Sales,
  },
  {
    lable: "Estoque",
    value: t.ReportType.Stock,
  },
];

export {
  defaultPageSize,
  defaultDateMask,
  footSizesList,
  menuPositions,
  menuItems,
  appConfig,
  reportTypes,
};
