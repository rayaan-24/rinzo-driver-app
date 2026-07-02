export interface PersonalInformation {
  name: string;
  email: string;
  phone: string;
  avatar: any;
  activeSince: string;
  badges: string[];
  deliveries: string;
  rating: string;
  address: string;
  identityVerified: boolean;
  alertsEnabled: boolean;
  lastUpdated: string;
}

export const personalData: PersonalInformation = {
  name: "Alex Thompson",
  email: "alex.thompson@conciergelogistics.com",
  phone: "+1 (555) 012-3456",
  avatar: require('../assets/images/driver_avatar.png'),
  activeSince: "2022",
  badges: ["Verified Driver", "Gold Status"],
  deliveries: "1,284",
  rating: "4.9",
  address: "422 Corporate Pl, Suite 100\nSan Francisco, CA 94105",
  identityVerified: true,
  alertsEnabled: true,
  lastUpdated: "12 days ago"
};
