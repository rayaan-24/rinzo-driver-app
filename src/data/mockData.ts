export interface DriverStats {
  assigned: number;
  completed: number;
  pending: number;
  onlineHours: string;
  isOnline: boolean;
  driverName: string;
  driverAvatar: string;
}

export interface Order {
  id: string;
  customerName: string;
  orderNumber: string;
  serviceType: string;
  time: string;
  badge?: string; // e.g. "HIGH"
  infoText?: string; // e.g. "Est. 15 mins" or "3.8 km away"
  distanceText: string; // e.g. "2.4 km away"
  customerAvatar: string;
  hasMap: boolean;
  type: 'pickup' | 'delivery';
}

export const mockDriverStats: DriverStats = {
  assigned: 12,
  completed: 8,
  pending: 4,
  onlineHours: '6.5h today',
  isOnline: true,
  driverName: 'Driver',
  driverAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
};

export const mockPickupOrders: Order[] = [
  {
    id: 'pickup-1',
    customerName: 'Rahul Sharma',
    orderNumber: '#RD-7821',
    serviceType: 'Wash & Fold',
    time: '10:30 AM',
    badge: 'HIGH',
    infoText: 'Est. 15 mins',
    distanceText: '2.4 km away',
    customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    hasMap: true,
    type: 'pickup',
  },
];

export const mockDeliveryOrders: Order[] = [
  {
    id: 'delivery-1',
    customerName: 'Priya Singh',
    orderNumber: '#RD-7905',
    serviceType: 'Premium Dry Clean',
    time: '11:15 AM',
    infoText: '3.8 km away',
    distanceText: '3.8 km away',
    customerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    hasMap: false,
    type: 'delivery',
  },
];
