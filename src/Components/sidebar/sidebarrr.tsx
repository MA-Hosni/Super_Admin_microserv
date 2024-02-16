import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import { RxDashboard } from "react-icons/rx";
import { PiUsersThreeFill } from "react-icons/pi";
import { GoPackageDependencies } from "react-icons/go";
import { FaUserLock, FaBuildingUser } from "react-icons/fa6";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/",
        icon: <RxDashboard />,
      },
      {
        title: "Managers",
        path: "/managers/list",
        icon: <PiUsersThreeFill />,
      },
      {
        title: "Companies",
        path: "/companies/list",
        icon: <FaBuildingUser />,
      },
      {
        title: "Packages",
        path: "/packages/list",
        icon: <GoPackageDependencies />,
      },
      {
        title: "Permissions",
        path: "/permissions",
        icon: <FaUserLock />,
      },
    ],
  },
];

const Sidebar = async () => {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src="/images/favicon-removebg.png"
          alt=""
          width="85"
          height="90"
        />
        <h1 className="text-[22px] font-bold">Novencia RH</h1>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;