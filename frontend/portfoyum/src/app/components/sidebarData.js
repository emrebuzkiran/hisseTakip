import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import QueueIcon from "@mui/icons-material/Queue";
import RemoveIcon from "@mui/icons-material/Remove";
import SettingsIcon from "@mui/icons-material/Settings";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import WorkIcon from "@mui/icons-material/Work";
const sidebarData = [
  {
    label: "Portföy",
    icon: <ShowChartIcon />,
    href: "/pages/dashboard",
  },
  {
    label: "Hisse işlemleri",
    icon: <QueueIcon/>,
    subItems: [
      { label: "Ekle", icon: <AddIcon /> ,href:"/pages/dashboard/ekle"},
      { label: "Çıkar", icon: <RemoveIcon /> },
        { label: "Düzenle", icon: <EditIcon /> }
    ],
  },
  {
    label: "Settings",
    icon: <SettingsIcon />,
    subItems: [
      { label: "General", icon: <SettingsIcon /> },
      { label: "Profile", icon: <AccountCircleIcon /> },
    ],
  },
];

export default sidebarData;
