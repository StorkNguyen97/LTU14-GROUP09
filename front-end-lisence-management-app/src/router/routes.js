import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/license",
    children: [
      {
        path: "license",
        name: "license",
        component: Dashboard
      },
      {
        path: "user",
        name: "user",
        component: UserProfile
      },
      {
        path: "app",
        name: "app",
        component: TableList
      }
    ]
  },
  { path: "*", component: NotFound }
];

export default routes;
