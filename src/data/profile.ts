export interface MenuItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  warning?: boolean;
}

export interface DriverData {
  name: string;
  employeeId: string;
  avatar: any;
  stats: {
    totalOrders: string;
    today: string;
    onTime: string;
    hours: string;
  };
  menuItems: MenuItem[];
}

export const driverData: DriverData = {
  name: "Alex Thompson",
  employeeId: "RD-9021",
  avatar: require('../assets/images/driver_avatar.png'),
  stats: {
    totalOrders: "1,284",
    today: "12",
    onTime: "98%",
    hours: "8.5h",
  },
  menuItems: [
    { id: "personal", title: "Personal Info", subtitle: "Manage your profile details", icon: "user" },
    { id: "vehicle", title: "Vehicle Info", subtitle: "Toyota HiAce – KRA 452X", icon: "truck" },
    { id: "documents", title: "Documents", subtitle: "1 document expiring soon", icon: "file", warning: true },
    { id: "bank", title: "Bank Details", subtitle: "Manage payouts and accounts", icon: "bank" },
    { id: "performance", title: "Performance", subtitle: "View ratings and reviews", icon: "performance" },
    { id: "settings", title: "Settings", subtitle: "App preferences and privacy", icon: "settings" },
    { id: "terms", title: "Terms & Privacy", subtitle: "View terms of service and privacy policy", icon: "shield" },
  ]
};
