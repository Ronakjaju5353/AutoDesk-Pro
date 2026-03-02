// ============================================================
// AutoDesk Pro - Dummy Data for Automobile DEALERSHIP
// ============================================================

// --- Dashboard KPIs ---
export interface DashboardKPI {
  label: string;
  value: number | string;
  unit?: string;
  change?: number;
  icon: string;
}

export const dashboardKPIs: DashboardKPI[] = [
  { label: "Today's Walk-ins", value: 24, unit: 'visitors', change: 8.5, icon: 'users' },
  { label: 'Bookings This Month', value: 38, unit: 'bookings', change: 12.3, icon: 'cart' },
  { label: 'Revenue MTD', value: '8.5 Cr', unit: 'INR', change: 15.2, icon: 'wallet' },
  { label: 'Vehicles In Stock', value: 87, unit: 'units', change: -3.1, icon: 'car' },
  { label: 'Pending Deliveries', value: 15, unit: 'vehicles', change: -5.0, icon: 'truck' },
  { label: 'Service Appointments', value: 42, unit: 'today', change: 6.7, icon: 'wrench' },
];

// --- Vehicle Stock (Showroom / Yard) ---
export interface StockVehicle {
  id: string;
  vin: string;
  model: string;
  type: string;
  variant: string;
  color: string;
  colorHex: string;
  exShowroomPrice: number;
  status: 'In Showroom' | 'In Yard' | 'In Transit' | 'Booked';
  stockAgeDays: number;
  fuelType: string;
  year: number;
}

export const vehicleStock: StockVehicle[] = [
  { id: 'V001', vin: 'MAT12345678901234', model: 'Sedan X1', type: 'Sedan', variant: 'ZX+ Petrol', color: 'Pearl White', colorHex: '#f5f5f5', exShowroomPrice: 1285000, status: 'In Showroom', stockAgeDays: 12, fuelType: 'Petrol', year: 2026 },
  { id: 'V002', vin: 'MAT12345678901235', model: 'Sedan X1', type: 'Sedan', variant: 'VX Diesel', color: 'Metallic Grey', colorHex: '#6b7280', exShowroomPrice: 1452000, status: 'In Yard', stockAgeDays: 28, fuelType: 'Diesel', year: 2026 },
  { id: 'V003', vin: 'MAT12345678901236', model: 'SUV Thunder', type: 'SUV', variant: 'ZX+ AT 4WD', color: 'Ruby Red', colorHex: '#dc2626', exShowroomPrice: 2280000, status: 'In Showroom', stockAgeDays: 5, fuelType: 'Diesel', year: 2026 },
  { id: 'V004', vin: 'MAT12345678901237', model: 'SUV Thunder', type: 'SUV', variant: 'VX MT 2WD', color: 'Deep Blue', colorHex: '#2563eb', exShowroomPrice: 1920000, status: 'In Yard', stockAgeDays: 45, fuelType: 'Diesel', year: 2025 },
  { id: 'V005', vin: 'MAT12345678901238', model: 'Hatchback Spark', type: 'Hatchback', variant: 'ZXi+ AMT', color: 'Sunrise Orange', colorHex: '#f97316', exShowroomPrice: 852000, status: 'In Showroom', stockAgeDays: 8, fuelType: 'Petrol', year: 2026 },
  { id: 'V006', vin: 'MAT12345678901239', model: 'Hatchback Spark', type: 'Hatchback', variant: 'LXi', color: 'Silky Silver', colorHex: '#9ca3af', exShowroomPrice: 685000, status: 'Booked', stockAgeDays: 18, fuelType: 'Petrol', year: 2026 },
  { id: 'V007', vin: 'MAT12345678901240', model: 'EV Bolt', type: 'Electric', variant: 'LR 500km', color: 'Ocean Teal', colorHex: '#14b8a6', exShowroomPrice: 3200000, status: 'In Showroom', stockAgeDays: 3, fuelType: 'Electric', year: 2026 },
  { id: 'V008', vin: 'MAT12345678901241', model: 'EV Bolt', type: 'Electric', variant: 'SR 350km', color: 'Pearl White', colorHex: '#f5f5f5', exShowroomPrice: 2650000, status: 'In Transit', stockAgeDays: 0, fuelType: 'Electric', year: 2026 },
  { id: 'V009', vin: 'MAT12345678901242', model: 'Pickup Titan', type: 'Pickup', variant: 'Adventure 4x4', color: 'Forest Green', colorHex: '#16a34a', exShowroomPrice: 1850000, status: 'In Yard', stockAgeDays: 62, fuelType: 'Diesel', year: 2025 },
  { id: 'V010', vin: 'MAT12345678901243', model: 'Pickup Titan', type: 'Pickup', variant: 'Work Pro', color: 'Metallic Grey', colorHex: '#6b7280', exShowroomPrice: 1620000, status: 'In Yard', stockAgeDays: 35, fuelType: 'Diesel', year: 2025 },
  { id: 'V011', vin: 'MAT12345678901244', model: 'Mini Zippy', type: 'Mini', variant: 'Turbo', color: 'Candy Red', colorHex: '#ef4444', exShowroomPrice: 598000, status: 'In Showroom', stockAgeDays: 14, fuelType: 'Petrol', year: 2026 },
  { id: 'V012', vin: 'MAT12345678901245', model: 'Mini Zippy', type: 'Mini', variant: 'Base', color: 'Sky Blue', colorHex: '#38bdf8', exShowroomPrice: 520000, status: 'Booked', stockAgeDays: 22, fuelType: 'Petrol', year: 2026 },
  { id: 'V013', vin: 'MAT12345678901246', model: 'SUV Thunder', type: 'SUV', variant: 'ZX Petrol AT', color: 'Midnight Black', colorHex: '#1f2937', exShowroomPrice: 2150000, status: 'In Transit', stockAgeDays: 0, fuelType: 'Petrol', year: 2026 },
  { id: 'V014', vin: 'MAT12345678901247', model: 'Sedan X1', type: 'Sedan', variant: 'ZX Petrol', color: 'Champagne Gold', colorHex: '#d4a574', exShowroomPrice: 1180000, status: 'In Yard', stockAgeDays: 95, fuelType: 'Petrol', year: 2025 },
  { id: 'V015', vin: 'MAT12345678901248', model: 'Hatchback Spark', type: 'Hatchback', variant: 'VXi CNG', color: 'Pearl White', colorHex: '#f5f5f5', exShowroomPrice: 795000, status: 'In Yard', stockAgeDays: 40, fuelType: 'CNG', year: 2025 },
];

// --- Sales & Bookings ---
export interface Booking {
  id: string;
  customerName: string;
  phone: string;
  model: string;
  variant: string;
  color: string;
  bookingDate: string;
  expectedDelivery: string;
  bookingAmount: number;
  totalPrice: number;
  salesperson: string;
  status: 'Confirmed' | 'Pending Finance' | 'Ready for Delivery' | 'Delivered';
}

export const bookings: Booking[] = [
  { id: 'BK001', customerName: 'Rajesh Sharma', phone: '+91 98200 11234', model: 'SUV Thunder', variant: 'ZX+ AT 4WD', color: 'Ruby Red', bookingDate: '2026-02-18', expectedDelivery: '2026-03-08', bookingAmount: 100000, totalPrice: 2280000, salesperson: 'Amit Deshmukh', status: 'Confirmed' },
  { id: 'BK002', customerName: 'Priya Mehta', phone: '+91 98765 43210', model: 'EV Bolt', variant: 'LR 500km', color: 'Ocean Teal', bookingDate: '2026-02-20', expectedDelivery: '2026-03-15', bookingAmount: 75000, totalPrice: 3200000, salesperson: 'Sneha Patil', status: 'Pending Finance' },
  { id: 'BK003', customerName: 'Vikram Singh', phone: '+91 99100 55678', model: 'Sedan X1', variant: 'ZX+ Petrol', color: 'Pearl White', bookingDate: '2026-02-22', expectedDelivery: '2026-03-05', bookingAmount: 50000, totalPrice: 1285000, salesperson: 'Amit Deshmukh', status: 'Ready for Delivery' },
  { id: 'BK004', customerName: 'Ananya Iyer', phone: '+91 98400 87654', model: 'Hatchback Spark', variant: 'ZXi+ AMT', color: 'Sunrise Orange', bookingDate: '2026-02-15', expectedDelivery: '2026-02-28', bookingAmount: 50000, totalPrice: 852000, salesperson: 'Rohan Joshi', status: 'Delivered' },
  { id: 'BK005', customerName: 'Suresh Patel', phone: '+91 97250 12345', model: 'Mini Zippy', variant: 'Base', color: 'Sky Blue', bookingDate: '2026-02-25', expectedDelivery: '2026-03-10', bookingAmount: 25000, totalPrice: 520000, salesperson: 'Sneha Patil', status: 'Confirmed' },
  { id: 'BK006', customerName: 'Meena Reddy', phone: '+91 98860 44321', model: 'SUV Thunder', variant: 'VX MT 2WD', color: 'Deep Blue', bookingDate: '2026-02-12', expectedDelivery: '2026-02-26', bookingAmount: 75000, totalPrice: 1920000, salesperson: 'Rohan Joshi', status: 'Delivered' },
  { id: 'BK007', customerName: 'Arun Nair', phone: '+91 94950 78901', model: 'Pickup Titan', variant: 'Adventure 4x4', color: 'Forest Green', bookingDate: '2026-02-28', expectedDelivery: '2026-03-18', bookingAmount: 100000, totalPrice: 1850000, salesperson: 'Amit Deshmukh', status: 'Pending Finance' },
  { id: 'BK008', customerName: 'Deepa Kulkarni', phone: '+91 98500 34567', model: 'Hatchback Spark', variant: 'LXi', color: 'Silky Silver', bookingDate: '2026-03-01', expectedDelivery: '2026-03-12', bookingAmount: 30000, totalPrice: 685000, salesperson: 'Sneha Patil', status: 'Confirmed' },
  { id: 'BK009', customerName: 'Karthik Rajan', phone: '+91 98410 22233', model: 'EV Bolt', variant: 'SR 350km', color: 'Pearl White', bookingDate: '2026-03-02', expectedDelivery: '2026-03-20', bookingAmount: 75000, totalPrice: 2650000, salesperson: 'Rohan Joshi', status: 'Pending Finance' },
  { id: 'BK010', customerName: 'Neha Gupta', phone: '+91 99100 11122', model: 'Sedan X1', variant: 'VX Diesel', color: 'Metallic Grey', bookingDate: '2026-02-10', expectedDelivery: '2026-02-22', bookingAmount: 50000, totalPrice: 1452000, salesperson: 'Amit Deshmukh', status: 'Delivered' },
];

// --- Service Center ---
export interface ServiceAppointment {
  id: string;
  regNumber: string;
  customerName: string;
  phone: string;
  model: string;
  serviceType: 'Free Service' | 'Paid Service' | 'Accidental Repair' | 'Body Work' | 'Insurance Claim';
  estimatedCost: number;
  status: 'Scheduled' | 'In Progress' | 'Waiting for Parts' | 'Completed';
  bayNumber: number;
  mechanic: string;
  scheduledDate: string;
  progress: number;
}

export const serviceAppointments: ServiceAppointment[] = [
  { id: 'SRV001', regNumber: 'MH-12-AB-1234', customerName: 'Ravi Desai', phone: '+91 98200 55001', model: 'Sedan X1', serviceType: 'Free Service', estimatedCost: 0, status: 'In Progress', bayNumber: 1, mechanic: 'Ganesh Mane', scheduledDate: '2026-03-02', progress: 65 },
  { id: 'SRV002', regNumber: 'MH-12-CD-5678', customerName: 'Kavita Joshi', phone: '+91 98765 55002', model: 'SUV Thunder', serviceType: 'Paid Service', estimatedCost: 8500, status: 'In Progress', bayNumber: 2, mechanic: 'Santosh Pawar', scheduledDate: '2026-03-02', progress: 40 },
  { id: 'SRV003', regNumber: 'MH-14-EF-9012', customerName: 'Prasad Rao', phone: '+91 99100 55003', model: 'Hatchback Spark', serviceType: 'Accidental Repair', estimatedCost: 45000, status: 'Waiting for Parts', bayNumber: 3, mechanic: 'Rajendra Shinde', scheduledDate: '2026-03-01', progress: 20 },
  { id: 'SRV004', regNumber: 'MH-12-GH-3456', customerName: 'Sunita Patil', phone: '+91 98400 55004', model: 'EV Bolt', serviceType: 'Free Service', estimatedCost: 0, status: 'Completed', bayNumber: 4, mechanic: 'Ganesh Mane', scheduledDate: '2026-03-02', progress: 100 },
  { id: 'SRV005', regNumber: 'MH-12-IJ-7890', customerName: 'Mahesh Kulkarni', phone: '+91 97250 55005', model: 'Pickup Titan', serviceType: 'Body Work', estimatedCost: 22000, status: 'In Progress', bayNumber: 5, mechanic: 'Santosh Pawar', scheduledDate: '2026-03-02', progress: 55 },
  { id: 'SRV006', regNumber: 'MH-04-KL-2345', customerName: 'Ashwini Deshpande', phone: '+91 98860 55006', model: 'SUV Thunder', serviceType: 'Insurance Claim', estimatedCost: 78000, status: 'Waiting for Parts', bayNumber: 6, mechanic: 'Rajendra Shinde', scheduledDate: '2026-02-28', progress: 10 },
  { id: 'SRV007', regNumber: 'MH-12-MN-6789', customerName: 'Vijay Bhosale', phone: '+91 94950 55007', model: 'Mini Zippy', serviceType: 'Paid Service', estimatedCost: 4500, status: 'Scheduled', bayNumber: 0, mechanic: 'Ganesh Mane', scheduledDate: '2026-03-03', progress: 0 },
  { id: 'SRV008', regNumber: 'MH-12-OP-0123', customerName: 'Rekha Wagh', phone: '+91 98500 55008', model: 'Sedan X1', serviceType: 'Paid Service', estimatedCost: 12000, status: 'Scheduled', bayNumber: 0, mechanic: 'Santosh Pawar', scheduledDate: '2026-03-03', progress: 0 },
  { id: 'SRV009', regNumber: 'MH-12-QR-4567', customerName: 'Nilesh Jadhav', phone: '+91 98410 55009', model: 'Hatchback Spark', serviceType: 'Free Service', estimatedCost: 0, status: 'Completed', bayNumber: 2, mechanic: 'Rajendra Shinde', scheduledDate: '2026-03-01', progress: 100 },
  { id: 'SRV010', regNumber: 'MH-20-ST-8901', customerName: 'Pooja Kale', phone: '+91 99100 55010', model: 'SUV Thunder', serviceType: 'Paid Service', estimatedCost: 6800, status: 'Scheduled', bayNumber: 0, mechanic: 'Ganesh Mane', scheduledDate: '2026-03-04', progress: 0 },
];

// --- Service Bay Status ---
export interface ServiceBay {
  bayNumber: number;
  currentVehicle: string | null;
  regNumber: string | null;
  serviceType: string | null;
  mechanic: string;
  progress: number;
  estimatedCompletion: string | null;
}

export const serviceBays: ServiceBay[] = [
  { bayNumber: 1, currentVehicle: 'Sedan X1', regNumber: 'MH-12-AB-1234', serviceType: 'Free Service', mechanic: 'Ganesh Mane', progress: 65, estimatedCompletion: '12:30 PM' },
  { bayNumber: 2, currentVehicle: 'SUV Thunder', regNumber: 'MH-12-CD-5678', serviceType: 'Paid Service', mechanic: 'Santosh Pawar', progress: 40, estimatedCompletion: '2:00 PM' },
  { bayNumber: 3, currentVehicle: 'Hatchback Spark', regNumber: 'MH-14-EF-9012', serviceType: 'Accidental Repair', mechanic: 'Rajendra Shinde', progress: 20, estimatedCompletion: '4:30 PM' },
  { bayNumber: 4, currentVehicle: null, regNumber: null, serviceType: null, mechanic: 'Ganesh Mane', progress: 0, estimatedCompletion: null },
  { bayNumber: 5, currentVehicle: 'Pickup Titan', regNumber: 'MH-12-IJ-7890', serviceType: 'Body Work', mechanic: 'Santosh Pawar', progress: 55, estimatedCompletion: '3:00 PM' },
  { bayNumber: 6, currentVehicle: 'SUV Thunder', regNumber: 'MH-04-KL-2345', serviceType: 'Insurance Claim', mechanic: 'Rajendra Shinde', progress: 10, estimatedCompletion: 'Tomorrow' },
];

// --- Customers ---
export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicleOwned: string;
  purchaseDate: string;
  serviceHistoryCount: number;
  insuranceExpiry: string;
  nextServiceDue: string;
  loyaltyTier: 'Platinum' | 'Gold' | 'Silver';
}

export const customers: Customer[] = [
  { id: 'CUS001', name: 'Rajesh Sharma', phone: '+91 98200 11234', email: 'rajesh.sharma@email.com', vehicleOwned: 'SUV Thunder ZX+ AT', purchaseDate: '2024-06-15', serviceHistoryCount: 6, insuranceExpiry: '2026-06-14', nextServiceDue: '2026-04-15', loyaltyTier: 'Platinum' },
  { id: 'CUS002', name: 'Priya Mehta', phone: '+91 98765 43210', email: 'priya.mehta@email.com', vehicleOwned: 'Sedan X1 VX Diesel', purchaseDate: '2025-01-10', serviceHistoryCount: 3, insuranceExpiry: '2027-01-09', nextServiceDue: '2026-03-10', loyaltyTier: 'Gold' },
  { id: 'CUS003', name: 'Vikram Singh', phone: '+91 99100 55678', email: 'vikram.s@email.com', vehicleOwned: 'Hatchback Spark ZXi+', purchaseDate: '2023-11-22', serviceHistoryCount: 8, insuranceExpiry: '2026-11-21', nextServiceDue: '2026-05-22', loyaltyTier: 'Platinum' },
  { id: 'CUS004', name: 'Ananya Iyer', phone: '+91 98400 87654', email: 'ananya.iyer@email.com', vehicleOwned: 'EV Bolt LR 500km', purchaseDate: '2025-08-05', serviceHistoryCount: 2, insuranceExpiry: '2027-08-04', nextServiceDue: '2026-08-05', loyaltyTier: 'Gold' },
  { id: 'CUS005', name: 'Suresh Patel', phone: '+91 97250 12345', email: 'suresh.patel@email.com', vehicleOwned: 'Mini Zippy Turbo', purchaseDate: '2024-03-18', serviceHistoryCount: 5, insuranceExpiry: '2026-03-17', nextServiceDue: '2026-03-18', loyaltyTier: 'Gold' },
  { id: 'CUS006', name: 'Meena Reddy', phone: '+91 98860 44321', email: 'meena.reddy@email.com', vehicleOwned: 'Pickup Titan Adventure', purchaseDate: '2024-09-01', serviceHistoryCount: 4, insuranceExpiry: '2026-08-31', nextServiceDue: '2026-03-01', loyaltyTier: 'Silver' },
  { id: 'CUS007', name: 'Arun Nair', phone: '+91 94950 78901', email: 'arun.nair@email.com', vehicleOwned: 'Sedan X1 ZX Petrol', purchaseDate: '2025-05-20', serviceHistoryCount: 2, insuranceExpiry: '2027-05-19', nextServiceDue: '2026-05-20', loyaltyTier: 'Silver' },
  { id: 'CUS008', name: 'Deepa Kulkarni', phone: '+91 98500 34567', email: 'deepa.k@email.com', vehicleOwned: 'SUV Thunder VX MT', purchaseDate: '2023-07-12', serviceHistoryCount: 10, insuranceExpiry: '2026-07-11', nextServiceDue: '2026-04-12', loyaltyTier: 'Platinum' },
  { id: 'CUS009', name: 'Karthik Rajan', phone: '+91 98410 22233', email: 'karthik.r@email.com', vehicleOwned: 'Hatchback Spark LXi', purchaseDate: '2025-02-14', serviceHistoryCount: 3, insuranceExpiry: '2027-02-13', nextServiceDue: '2026-08-14', loyaltyTier: 'Silver' },
  { id: 'CUS010', name: 'Neha Gupta', phone: '+91 99100 11122', email: 'neha.gupta@email.com', vehicleOwned: 'EV Bolt SR 350km', purchaseDate: '2025-11-30', serviceHistoryCount: 1, insuranceExpiry: '2027-11-29', nextServiceDue: '2026-05-30', loyaltyTier: 'Silver' },
];

// --- Finance & Insurance - Loan Applications ---
export interface LoanApplication {
  id: string;
  customerName: string;
  vehicleModel: string;
  loanAmount: number;
  bank: string;
  tenure: number;
  emi: number;
  interestRate: number;
  status: 'Approved' | 'Processing' | 'Rejected' | 'Disbursed';
  applicationDate: string;
}

export const loanApplications: LoanApplication[] = [
  { id: 'LN001', customerName: 'Rajesh Sharma', vehicleModel: 'SUV Thunder ZX+', loanAmount: 1800000, bank: 'SBI', tenure: 60, emi: 36200, interestRate: 8.5, status: 'Disbursed', applicationDate: '2026-02-15' },
  { id: 'LN002', customerName: 'Priya Mehta', vehicleModel: 'EV Bolt LR', loanAmount: 2500000, bank: 'HDFC Bank', tenure: 72, emi: 44800, interestRate: 8.75, status: 'Processing', applicationDate: '2026-02-20' },
  { id: 'LN003', customerName: 'Vikram Singh', vehicleModel: 'Sedan X1 ZX+', loanAmount: 1000000, bank: 'ICICI Bank', tenure: 48, emi: 24600, interestRate: 9.0, status: 'Approved', applicationDate: '2026-02-22' },
  { id: 'LN004', customerName: 'Arun Nair', vehicleModel: 'Pickup Titan 4x4', loanAmount: 1500000, bank: 'Axis Bank', tenure: 60, emi: 30800, interestRate: 8.9, status: 'Processing', applicationDate: '2026-02-28' },
  { id: 'LN005', customerName: 'Deepa Kulkarni', vehicleModel: 'Hatchback Spark LXi', loanAmount: 500000, bank: 'SBI', tenure: 36, emi: 15900, interestRate: 8.5, status: 'Approved', applicationDate: '2026-03-01' },
  { id: 'LN006', customerName: 'Karthik Rajan', vehicleModel: 'EV Bolt SR', loanAmount: 2100000, bank: 'HDFC Bank', tenure: 60, emi: 42500, interestRate: 8.5, status: 'Processing', applicationDate: '2026-03-02' },
  { id: 'LN007', customerName: 'Suresh Patel', vehicleModel: 'Mini Zippy Base', loanAmount: 400000, bank: 'ICICI Bank', tenure: 36, emi: 12800, interestRate: 9.25, status: 'Rejected', applicationDate: '2026-02-10' },
  { id: 'LN008', customerName: 'Meena Reddy', vehicleModel: 'SUV Thunder VX', loanAmount: 1500000, bank: 'Axis Bank', tenure: 48, emi: 37200, interestRate: 8.75, status: 'Disbursed', applicationDate: '2026-02-08' },
];

// --- Insurance Records ---
export interface InsuranceRecord {
  id: string;
  customerName: string;
  vehicleModel: string;
  regNumber: string;
  provider: string;
  type: 'Comprehensive' | 'Third Party';
  premium: number;
  expiryDate: string;
  status: 'Active' | 'Expiring Soon' | 'Expired';
}

export const insuranceRecords: InsuranceRecord[] = [
  { id: 'INS001', customerName: 'Rajesh Sharma', vehicleModel: 'SUV Thunder', regNumber: 'MH-12-AB-1234', provider: 'ICICI Lombard', type: 'Comprehensive', premium: 48000, expiryDate: '2027-06-14', status: 'Active' },
  { id: 'INS002', customerName: 'Priya Mehta', vehicleModel: 'Sedan X1', regNumber: 'MH-12-CD-5678', provider: 'HDFC Ergo', type: 'Comprehensive', premium: 32000, expiryDate: '2027-01-09', status: 'Active' },
  { id: 'INS003', customerName: 'Vikram Singh', vehicleModel: 'Hatchback Spark', regNumber: 'MH-14-EF-9012', provider: 'Bajaj Allianz', type: 'Third Party', premium: 8500, expiryDate: '2026-11-21', status: 'Active' },
  { id: 'INS004', customerName: 'Ananya Iyer', vehicleModel: 'EV Bolt', regNumber: 'MH-12-GH-3456', provider: 'ICICI Lombard', type: 'Comprehensive', premium: 55000, expiryDate: '2027-08-04', status: 'Active' },
  { id: 'INS005', customerName: 'Suresh Patel', vehicleModel: 'Mini Zippy', regNumber: 'MH-12-IJ-7890', provider: 'Bajaj Allianz', type: 'Comprehensive', premium: 12000, expiryDate: '2026-03-17', status: 'Expiring Soon' },
  { id: 'INS006', customerName: 'Meena Reddy', vehicleModel: 'Pickup Titan', regNumber: 'MH-04-KL-2345', provider: 'HDFC Ergo', type: 'Third Party', premium: 15000, expiryDate: '2026-08-31', status: 'Active' },
  { id: 'INS007', customerName: 'Deepa Kulkarni', vehicleModel: 'SUV Thunder', regNumber: 'MH-12-MN-6789', provider: 'ICICI Lombard', type: 'Comprehensive', premium: 42000, expiryDate: '2026-07-11', status: 'Active' },
  { id: 'INS008', customerName: 'Neha Gupta', vehicleModel: 'EV Bolt', regNumber: 'MH-12-OP-0123', provider: 'Bajaj Allianz', type: 'Comprehensive', premium: 52000, expiryDate: '2027-11-29', status: 'Active' },
];

// --- Test Drives ---
export interface TestDrive {
  id: string;
  timeSlot: string;
  customerName: string;
  phone: string;
  model: string;
  variant: string;
  salesperson: string;
  status: 'Completed' | 'In Progress' | 'Scheduled' | 'Cancelled';
}

export const testDrives: TestDrive[] = [
  { id: 'TD001', timeSlot: '09:00 AM', customerName: 'Amit Verma', phone: '+91 98200 99001', model: 'SUV Thunder', variant: 'ZX+ AT 4WD', salesperson: 'Amit Deshmukh', status: 'Completed' },
  { id: 'TD002', timeSlot: '09:30 AM', customerName: 'Shalini Kapoor', phone: '+91 98765 99002', model: 'EV Bolt', variant: 'LR 500km', salesperson: 'Sneha Patil', status: 'Completed' },
  { id: 'TD003', timeSlot: '10:00 AM', customerName: 'Rohit Malhotra', phone: '+91 99100 99003', model: 'Sedan X1', variant: 'ZX+ Petrol', salesperson: 'Rohan Joshi', status: 'Completed' },
  { id: 'TD004', timeSlot: '10:30 AM', customerName: 'Divya Menon', phone: '+91 98400 99004', model: 'Hatchback Spark', variant: 'ZXi+ AMT', salesperson: 'Amit Deshmukh', status: 'In Progress' },
  { id: 'TD005', timeSlot: '11:00 AM', customerName: 'Sandeep Tiwari', phone: '+91 97250 99005', model: 'SUV Thunder', variant: 'VX MT 2WD', salesperson: 'Sneha Patil', status: 'Scheduled' },
  { id: 'TD006', timeSlot: '11:30 AM', customerName: 'Pooja Banerjee', phone: '+91 98860 99006', model: 'Mini Zippy', variant: 'Turbo', salesperson: 'Rohan Joshi', status: 'Scheduled' },
  { id: 'TD007', timeSlot: '12:00 PM', customerName: 'Manish Agarwal', phone: '+91 94950 99007', model: 'Pickup Titan', variant: 'Adventure 4x4', salesperson: 'Amit Deshmukh', status: 'Cancelled' },
  { id: 'TD008', timeSlot: '02:00 PM', customerName: 'Lakshmi Rao', phone: '+91 98500 99008', model: 'EV Bolt', variant: 'SR 350km', salesperson: 'Sneha Patil', status: 'Scheduled' },
  { id: 'TD009', timeSlot: '02:30 PM', customerName: 'Harish Bhat', phone: '+91 98410 99009', model: 'Sedan X1', variant: 'VX Diesel', salesperson: 'Rohan Joshi', status: 'Scheduled' },
  { id: 'TD010', timeSlot: '03:00 PM', customerName: 'Nisha Pillai', phone: '+91 99100 99010', model: 'SUV Thunder', variant: 'ZX Petrol AT', salesperson: 'Amit Deshmukh', status: 'Scheduled' },
];

// --- Monthly Sales Data ---
export interface MonthlySales {
  month: string;
  vehiclesSold: number;
  revenue: number;
  target: number;
}

export const monthlySales: MonthlySales[] = [
  { month: 'Apr', vehiclesSold: 32, revenue: 48500000, target: 35 },
  { month: 'May', vehiclesSold: 28, revenue: 42200000, target: 35 },
  { month: 'Jun', vehiclesSold: 35, revenue: 51800000, target: 35 },
  { month: 'Jul', vehiclesSold: 30, revenue: 45600000, target: 35 },
  { month: 'Aug', vehiclesSold: 38, revenue: 56200000, target: 38 },
  { month: 'Sep', vehiclesSold: 42, revenue: 62400000, target: 38 },
  { month: 'Oct', vehiclesSold: 45, revenue: 68500000, target: 40 },
  { month: 'Nov', vehiclesSold: 40, revenue: 61200000, target: 40 },
  { month: 'Dec', vehiclesSold: 36, revenue: 54800000, target: 40 },
  { month: 'Jan', vehiclesSold: 44, revenue: 67200000, target: 42 },
  { month: 'Feb', vehiclesSold: 41, revenue: 63500000, target: 42 },
  { month: 'Mar', vehiclesSold: 18, revenue: 28500000, target: 42 },
];

// --- Live Feed Events ---
export interface LiveEvent {
  id: string;
  message: string;
  time: string;
  type: 'sale' | 'service' | 'delivery' | 'walkin' | 'testdrive';
}

export const liveEvents: LiveEvent[] = [
  { id: 'E01', message: 'Customer Rajesh Sharma booked SUV Thunder ZX+ in Ruby Red', time: '11:42 AM', type: 'sale' },
  { id: 'E02', message: 'Sedan X1 MH-12-AB-3456 delivered to Vikram Singh', time: '11:38 AM', type: 'delivery' },
  { id: 'E03', message: 'Service completed for EV Bolt MH-12-GH-3456 - Free Service', time: '11:35 AM', type: 'service' },
  { id: 'E04', message: 'Walk-in customer Divya Menon interested in Hatchback Spark', time: '11:30 AM', type: 'walkin' },
  { id: 'E05', message: 'Test drive completed - Amit Verma drove SUV Thunder ZX+', time: '11:28 AM', type: 'testdrive' },
  { id: 'E06', message: 'Loan approved for Deepa Kulkarni - SBI Rs.5L for Spark LXi', time: '11:22 AM', type: 'sale' },
  { id: 'E07', message: 'Pickup Titan MH-12-IJ-7890 body work in progress - Bay 5', time: '11:18 AM', type: 'service' },
  { id: 'E08', message: 'New stock arrived: 2x SUV Thunder ZX Petrol AT in Black', time: '11:15 AM', type: 'delivery' },
  { id: 'E09', message: 'Walk-in customer Sandeep Tiwari scheduled test drive for 11 AM', time: '11:10 AM', type: 'walkin' },
  { id: 'E10', message: 'Insurance renewal reminder sent to Suresh Patel - expires 17 Mar', time: '11:05 AM', type: 'service' },
  { id: 'E11', message: 'Booking confirmed: Suresh Patel - Mini Zippy Base in Sky Blue', time: '11:00 AM', type: 'sale' },
  { id: 'E12', message: 'EV Bolt SR 350km in Pearl White arriving tomorrow from factory', time: '10:55 AM', type: 'delivery' },
];

// --- Compliance Data ---
export interface ComplianceItem {
  id: string;
  name: string;
  authority: string;
  status: 'Active' | 'Expiring Soon' | 'Expired' | 'Pending Renewal';
  validUntil: string;
  category: string;
}

export const complianceRecords: ComplianceItem[] = [
  { id: 'C01', name: 'Dealership License', authority: 'RTO / Transport Dept.', status: 'Active', validUntil: '2027-12-31', category: 'License' },
  { id: 'C02', name: 'GST Registration', authority: 'GST Council', status: 'Active', validUntil: '2028-03-31', category: 'Tax' },
  { id: 'C03', name: 'Trade License', authority: 'Municipal Corporation', status: 'Active', validUntil: '2027-03-31', category: 'License' },
  { id: 'C04', name: 'Environmental Clearance', authority: 'State Pollution Board', status: 'Expiring Soon', validUntil: '2026-04-30', category: 'Environment' },
  { id: 'C05', name: 'Fire Safety Certificate', authority: 'Fire Department', status: 'Active', validUntil: '2027-06-30', category: 'Safety' },
  { id: 'C06', name: 'Brand Authorization Certificate', authority: 'AutoDesk Motors OEM', status: 'Active', validUntil: '2028-12-31', category: 'Authorization' },
  { id: 'C07', name: 'Shops & Establishment Act', authority: 'Labour Department', status: 'Active', validUntil: '2026-12-31', category: 'License' },
  { id: 'C08', name: 'Service Center Certification', authority: 'AutoDesk Motors OEM', status: 'Active', validUntil: '2027-09-30', category: 'Authorization' },
  { id: 'C09', name: 'Signage Permit', authority: 'Municipal Corporation', status: 'Expiring Soon', validUntil: '2026-03-31', category: 'License' },
  { id: 'C10', name: 'Pollution Under Control (PUC) Station', authority: 'RTO', status: 'Active', validUntil: '2027-03-31', category: 'Environment' },
  { id: 'C11', name: 'Insurance - Showroom Property', authority: 'ICICI Lombard', status: 'Active', validUntil: '2027-01-15', category: 'Insurance' },
  { id: 'C12', name: 'Weighbridge Certification', authority: 'Weights & Measures Dept.', status: 'Pending Renewal', validUntil: '2026-02-28', category: 'License' },
];

// --- Booking Pipeline ---
export interface PipelineStage {
  stage: string;
  count: number;
  color: string;
}

export const bookingPipeline: PipelineStage[] = [
  { stage: 'Enquiry', count: 12, color: '#93c5fd' },
  { stage: 'Test Drive', count: 8, color: '#60a5fa' },
  { stage: 'Negotiation', count: 5, color: '#3b82f6' },
  { stage: 'Booking', count: 3, color: '#2563eb' },
  { stage: 'Finance', count: 2, color: '#1d4ed8' },
  { stage: 'Delivery', count: 1, color: '#1e40af' },
];

// --- Showroom Featured Vehicles ---
export interface ShowroomVehicle {
  model: string;
  variant: string;
  color: string;
  colorHex: string;
  price: string;
  status: 'Available' | 'Booked' | 'Test Drive';
  type: string;
}

export const showroomVehicles: ShowroomVehicle[] = [
  { model: 'SUV Thunder', variant: 'ZX+ AT 4WD', color: 'Ruby Red', colorHex: '#dc2626', price: '22.8L', status: 'Available', type: 'SUV' },
  { model: 'EV Bolt', variant: 'LR 500km', color: 'Ocean Teal', colorHex: '#14b8a6', price: '32.0L', status: 'Available', type: 'Electric' },
  { model: 'Sedan X1', variant: 'ZX+ Petrol', color: 'Pearl White', colorHex: '#f5f5f5', price: '12.85L', status: 'Test Drive', type: 'Sedan' },
  { model: 'Hatchback Spark', variant: 'ZXi+ AMT', color: 'Sunrise Orange', colorHex: '#f97316', price: '8.52L', status: 'Available', type: 'Hatchback' },
  { model: 'Mini Zippy', variant: 'Turbo', color: 'Candy Red', colorHex: '#ef4444', price: '5.98L', status: 'Booked', type: 'Mini' },
];

// --- Salesperson Leaderboard ---
export interface Salesperson {
  name: string;
  salesCount: number;
  revenue: number;
  testDrives: number;
  conversionRate: number;
}

export const salespersonLeaderboard: Salesperson[] = [
  { name: 'Amit Deshmukh', salesCount: 16, revenue: 32500000, testDrives: 42, conversionRate: 38.1 },
  { name: 'Sneha Patil', salesCount: 12, revenue: 24800000, testDrives: 35, conversionRate: 34.3 },
  { name: 'Rohan Joshi', salesCount: 10, revenue: 18200000, testDrives: 30, conversionRate: 33.3 },
];

// --- Upcoming Follow-ups ---
export interface FollowUp {
  id: string;
  customerName: string;
  type: 'Insurance Renewal' | 'Service Due' | 'Birthday' | 'Loan Closure';
  dueDate: string;
  details: string;
}

export const upcomingFollowUps: FollowUp[] = [
  { id: 'FU01', customerName: 'Suresh Patel', type: 'Insurance Renewal', dueDate: '2026-03-17', details: 'Mini Zippy comprehensive policy expiring' },
  { id: 'FU02', customerName: 'Meena Reddy', type: 'Service Due', dueDate: '2026-03-01', details: '4th service due for Pickup Titan' },
  { id: 'FU03', customerName: 'Priya Mehta', type: 'Service Due', dueDate: '2026-03-10', details: '3rd free service due for Sedan X1' },
  { id: 'FU04', customerName: 'Vikram Singh', type: 'Birthday', dueDate: '2026-03-15', details: 'Platinum customer birthday - send wishes' },
  { id: 'FU05', customerName: 'Rajesh Sharma', type: 'Loan Closure', dueDate: '2026-06-15', details: 'Car loan from SBI nearing closure' },
  { id: 'FU06', customerName: 'Deepa Kulkarni', type: 'Service Due', dueDate: '2026-04-12', details: '10th service milestone for SUV Thunder' },
];

// --- Test Drive Model Popularity ---
export interface ModelPopularity {
  model: string;
  testDrives: number;
  conversions: number;
  color: string;
}

export const testDrivePopularity: ModelPopularity[] = [
  { model: 'SUV Thunder', testDrives: 45, conversions: 18, color: '#3b82f6' },
  { model: 'EV Bolt', testDrives: 38, conversions: 12, color: '#8b5cf6' },
  { model: 'Sedan X1', testDrives: 32, conversions: 14, color: '#10b981' },
  { model: 'Hatchback Spark', testDrives: 28, conversions: 10, color: '#f59e0b' },
  { model: 'Mini Zippy', testDrives: 18, conversions: 8, color: '#06b6d4' },
  { model: 'Pickup Titan', testDrives: 15, conversions: 5, color: '#ef4444' },
];
