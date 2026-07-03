export interface MaintenanceItem {
  id: string;
  title: string;
  subtitle: string;
  iconType: 'calendar' | 'warning';
  urgent?: boolean;
}

export interface VehicleInformation {
  name: string;
  edition: string;
  plate: string;
  mileage: string;
  fuelLevel: number;
  range: string;
  fuelType: string;
  image: any;
  maintenanceItems: MaintenanceItem[];
  lastUpdated: string;
}

export const vehicleData: VehicleInformation = {
  name: "Mercedes Sprinter",
  edition: "High-Roof Cargo Edition",
  plate: "RNZ-2024",
  mileage: "12,450",
  fuelLevel: 0.85,
  range: "~420 km",
  fuelType: "PREMIUM DIESEL",
  image: require('../assets/images/van_image.png'),
  maintenanceItems: [
    {
      id: "service",
      title: "Last Service",
      subtitle: "October 12, 2023",
      iconType: "calendar",
    },
    {
      id: "inspection",
      title: "Safety Inspection",
      subtitle: "Due in 15 days",
      iconType: "warning",
      urgent: true,
    },
  ],
  lastUpdated: "12 days ago",
};
