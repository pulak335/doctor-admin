import MainLayout from "layout/MainLayout";
import { lazy } from "react";
import Loadable from "ui-component/Loadable";
import AuthGuard from "utils/route-guard/AuthGuard";
import Users from "../views/userManage/index"
import AddUserType from "../views/userManage/AddUserType"
import AccessControl from "views/userManage/AccessControl";
import ViewRole from "views/userManage/Role/index"
import AddRole from "views/userManage/Role/Add"
import EditRole from "views/userManage/Role/Edit"
import UpdateUser from "views/userManage/UpdateUser";
import Notfound from "views/Notfound/Notfound";

// sample page routing
const Homepage = Loadable(lazy(() => import("views/homepage")));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/admin/user-manage",
      element:<Users/>
    },
    
    {
      path: "/admin/user-manage/add",
      element:<AddUserType/>
    },
    {
      path: "/admin/user-manage/edit/:id",
      element:<UpdateUser/>
    },
    {
      path: "/admin/user-access-control/:id",
      element: <AccessControl />
    },
    {
      path:"/admin/role-management",
      element: <ViewRole/>
    },
    {
      path:"/admin/role-management/add",
      element: <AddRole/>
    }
    ,
    {
      path:"/admin/role-management/edit/:id",
      element: <EditRole/>
    }
    ,
    {
      path:"/403",
      element:<Notfound/>
    }
  ],
};

export default MainRoutes;


