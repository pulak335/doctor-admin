// third-party
// assets
import {
  IconHome,
  IconUser,
  IconLockAccess,
  IconUserCheck,
  IconFingerprint,
  IconBuildingStore,
  IconBox,
  IconAffiliate,
  IconSettings,
  IconNotification,
  IconBrandDiscord,
  IconBrandReddit,
  IconCurrencyBitcoin,
  IconMail,
  IconArchive,
  IconTruck,
  IconReceiptTax,
  IconTicket,
  IconBucket,
  IconNotebook,
  IconId,
  IconEraser,
  IconLayoutList,
  IconBrandCodesandbox
} from "@tabler/icons"; 
import { FormattedMessage } from "react-intl";

// constant
const icons = {
  IconHome,
  IconUser,
  IconLockAccess,
  IconUserCheck,
  IconFingerprint,
  IconBuildingStore,
  IconBox,
  IconAffiliate,
  IconSettings,
  IconNotification,
  IconBrandDiscord,
  IconBrandReddit,
  IconCurrencyBitcoin,
  IconMail,
  IconArchive,
  IconTruck,
  IconReceiptTax,
  IconTicket,
  IconBucket,
  IconNotebook,
  IconId,
  IconEraser,
  IconLayoutList,
  IconBrandCodesandbox
};
// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: "sample-docs-roadmap",
  type: "group",
  children: [
    {
      id: "Dashboard",
      title: <FormattedMessage id="Dashboard" />,
      type: "item",
      icon: icons.IconHome,
      url: "/",
      breadcrumbs: true,
    },
    {
      id: "Shop",
      title: <FormattedMessage id="Shop" />,
      type: "collapse",
      icon: icons.IconBuildingStore,
     
      children:[
        {
          id: "Shops",
          title: <FormattedMessage id="Shops" />,
          type: "item",
          icon: icons.IconBuildingStore,
          url: "/reports/incidents-report",
          breadcrumbs: true,
        },
        {
          id: "My Shop",
          title: <FormattedMessage id="My Shop" />,
          type: "item",
          icon: icons.IconBuildingStore,
          url: "/reports/incidents-report",
          breadcrumbs: true,
        },

      ]
    },
    {
      id: "Product",
      title: <FormattedMessage id="Product" />,
      type: "item",
      icon:icons.IconBox,
      url: "/public/zone",
      breadcrumbs: true,
    },
    {
      id: "Attributes",
      title: <FormattedMessage id="Attributes" />,
      type: "item",
      icon: icons.IconAffiliate,
      url: "/hospital",
      breadcrumbs: true,
    },
    {
      id: "Groups",
      title: <FormattedMessage id="Groups" />,
      type: "item",
      icon:icons.IconBrandCodesandbox,
      url: "/responder",
      breadcrumbs: true,
    },
    {
      id: "Categories",
      title: <FormattedMessage id="Categories" />,
      type: "item",
      icon:icons.IconLayoutList,
      url: "/admin/user-manage",
      breadcrumbs: true,
    },
    {
      id: "Tags",
      title: <FormattedMessage id="Tags" />,
      type: "item",
      icon:icons.IconEraser,
      url: "/admin/user-manage",
      breadcrumbs: true,
    },
    {
      id: "Publications",
      title: <FormattedMessage id="Publications" />,
      type: "item",
      icon:icons.IconId,
      url: "/admin/user-manage",
      breadcrumbs: true,
    },
    {
      id: "Authors",
      title: <FormattedMessage id="Authors" />,
      type: "item",
      icon:icons.IconNotebook,
      url: "/admin/user-manage",
      breadcrumbs: true,
    },
    {
      id: "Orders",
      title: <FormattedMessage id="Orders" />,
      type: "item",
      icon:icons.IconBucket,
      url: "/admin/user-manage",
      breadcrumbs: true,
    },
    {
      id: "Users",
      title: <FormattedMessage id="Users" />,
      type: "item",
      icon:icons.IconUser,
      url: "/admin/user-manage",
      breadcrumbs: true,
    },
    {
      id: "Coupons",
      title: <FormattedMessage id="Coupons" />,
      type: "item",
      icon:icons.IconTicket,
      url: "/admin/user-manage",
      breadcrumbs: true,
    },
    {
      id: "Taxes",
      title: <FormattedMessage id="Taxes" />,
      type: "item",
      icon:icons.IconReceiptTax,
      url: "/admin/user-manage",
      breadcrumbs: true,
    },
    {
      id: "Shippings",
      title: <FormattedMessage id="Shippings" />,
      type: "item",
      icon:icons.IconTruck,
      url: "/admin/user-manage",
      breadcrumbs: true,
    },
    {
      id: "Withdrawals",
      title: <FormattedMessage id="Withdrawals" />,
      type: "item",
      icon:icons.IconArchive,
      url: "/admin/user-manage",
      breadcrumbs: true,
    },
    {
      id: "Mails",
      title: <FormattedMessage id="Mails" />,
      type: "item",
      icon:icons.IconMail,
      url: "/admin/user-manage",
      breadcrumbs: true,
    },
    {
      id: "Refunds",
      title: <FormattedMessage id="Refunds" />,
      type: "item",
      icon:icons.IconCurrencyBitcoin,
      url: "/admin/user-manage",
      breadcrumbs: true,
    },
    {
      id: "Questions",
      title: <FormattedMessage id="Questions" />,
      type: "item",
      icon:icons.IconBrandReddit,
      url: "/admin/user-manage",
      breadcrumbs: true,
    },
    {
      id: "Reviews",
      title: <FormattedMessage id="Reviews" />,
      type: "item",
      icon:icons.IconBrandDiscord,
      url: "/admin/user-manage",
      breadcrumbs: true,
    },
    {
      id: "Store Notices",
      title: <FormattedMessage id="Store Notices" />,
      type: "item",
      icon:icons.IconNotification,
      url: "/admin/user-manage",
      breadcrumbs: true,
    },
    {
      id: "Settings",
      title: <FormattedMessage id="Settings" />,
      type: "item",
      icon:icons.IconSettings,
      url: "/admin/user-manage",
      breadcrumbs: true,
    },
  ],
};

export default other;
