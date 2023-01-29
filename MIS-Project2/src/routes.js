
import Dashboard from "views/Dashboard.js";
import TableList from "views/TableList.js";
import Form1 from "views/Form1.js";
import ProductForm from "views/Product";
import Orders from "views/Orders"

var routes = [
  {
    path: "/dashboard",
    name: "Home",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/sale",
    name: "Enter Order",
    icon: "tim-icons icon-bank",
    component: Form1,
    layout: "/admin",
  },  
  {
    path: "/product",
    name: "Enter new Product",
    icon: "tim-icons icon-bank",
    component: ProductForm,
    layout: "/admin",
  },
 
  {
    path: "/viewproduct",
    name: "View All Products",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/vieworder",
    name: "View All Orders",
    icon: "tim-icons icon-puzzle-10",
    component: Orders,
    layout: "/admin",
  },
];
export default routes;
