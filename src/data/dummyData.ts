// ============================================================
// AutoDesk Pro - Dummy Data for Automobile Manufacturer
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
  { label: "Today's Production", value: 124, unit: 'units', change: 5.2, icon: 'factory' },
  { label: 'Assembly Line Efficiency', value: 94.2, unit: '%', change: 1.8, icon: 'gauge' },
  { label: 'Defect Rate', value: 1.8, unit: '%', change: -0.3, icon: 'shield' },
  { label: 'Pending Dispatch', value: 85, unit: 'units', change: -12, icon: 'truck' },
  { label: 'Active Models', value: 6, unit: 'models', change: 0, icon: 'car' },
  { label: 'Workforce On Shift', value: 486, unit: 'workers', change: 2.1, icon: 'users' },
];

// --- Vehicle Models ---
export interface VehicleModel {
  id: string;
  name: string;
  type: string;
  dailyTarget: number;
  achieved: number;
  variantCount: number;
  basePrice: number;
  color: string;
}

export const vehicleModels: VehicleModel[] = [
  { id: 'SX1', name: 'Sedan X1', type: 'Sedan', dailyTarget: 30, achieved: 28, variantCount: 4, basePrice: 1250000, color: '#3b82f6' },
  { id: 'THU', name: 'SUV Thunder', type: 'SUV', dailyTarget: 25, achieved: 26, variantCount: 5, basePrice: 2450000, color: '#10b981' },
  { id: 'SPK', name: 'Hatchback Spark', type: 'Hatchback', dailyTarget: 35, achieved: 33, variantCount: 3, basePrice: 750000, color: '#f59e0b' },
  { id: 'EVB', name: 'EV Bolt', type: 'Electric', dailyTarget: 15, achieved: 14, variantCount: 3, basePrice: 3200000, color: '#8b5cf6' },
  { id: 'TIT', name: 'Pickup Titan', type: 'Pickup', dailyTarget: 12, achieved: 13, variantCount: 2, basePrice: 1850000, color: '#ef4444' },
  { id: 'ZIP', name: 'Mini Zippy', type: 'Mini', dailyTarget: 20, achieved: 10, variantCount: 2, basePrice: 520000, color: '#06b6d4' },
];

// --- Assembly Lines ---
export interface AssemblyLine {
  id: string;
  name: string;
  models: string;
  status: 'running' | 'slow' | 'stopped';
  capacity: number;
  currentOutput: number;
  efficiency: number;
  shift: string;
  supervisor: string;
}

export const assemblyLines: AssemblyLine[] = [
  { id: 'LA', name: 'Line A', models: 'Sedan X1 / Hatchback Spark', status: 'running', capacity: 70, currentOutput: 61, efficiency: 95.3, shift: 'Morning', supervisor: 'Rajesh Kumar' },
  { id: 'LB', name: 'Line B', models: 'SUV Thunder / Pickup Titan', status: 'slow', capacity: 40, currentOutput: 35, efficiency: 88.7, shift: 'Morning', supervisor: 'Priya Sharma' },
  { id: 'LC', name: 'Line C', models: 'EV Bolt / Mini Zippy', status: 'running', capacity: 35, currentOutput: 28, efficiency: 92.1, shift: 'Morning', supervisor: 'Anil Verma' },
];

// --- Production Planning (Weekly) ---
export interface ProductionPlanRow {
  model: string;
  modelId: string;
  mon: { target: number; actual: number };
  tue: { target: number; actual: number };
  wed: { target: number; actual: number };
  thu: { target: number; actual: number };
  fri: { target: number; actual: number };
  sat: { target: number; actual: number };
  monthlyTarget: number;
  monthlyAchieved: number;
}

export const productionPlan: ProductionPlanRow[] = [
  { model: 'Sedan X1', modelId: 'SX1', mon: { target: 30, actual: 29 }, tue: { target: 30, actual: 31 }, wed: { target: 30, actual: 28 }, thu: { target: 30, actual: 30 }, fri: { target: 30, actual: 27 }, sat: { target: 20, actual: 20 }, monthlyTarget: 720, monthlyAchieved: 658 },
  { model: 'SUV Thunder', modelId: 'THU', mon: { target: 25, actual: 24 }, tue: { target: 25, actual: 26 }, wed: { target: 25, actual: 25 }, thu: { target: 25, actual: 23 }, fri: { target: 25, actual: 26 }, sat: { target: 15, actual: 15 }, monthlyTarget: 600, monthlyAchieved: 542 },
  { model: 'Hatchback Spark', modelId: 'SPK', mon: { target: 35, actual: 34 }, tue: { target: 35, actual: 36 }, wed: { target: 35, actual: 33 }, thu: { target: 35, actual: 35 }, fri: { target: 35, actual: 32 }, sat: { target: 20, actual: 18 }, monthlyTarget: 840, monthlyAchieved: 782 },
  { model: 'EV Bolt', modelId: 'EVB', mon: { target: 15, actual: 14 }, tue: { target: 15, actual: 15 }, wed: { target: 15, actual: 13 }, thu: { target: 15, actual: 14 }, fri: { target: 15, actual: 15 }, sat: { target: 10, actual: 9 }, monthlyTarget: 360, monthlyAchieved: 318 },
  { model: 'Pickup Titan', modelId: 'TIT', mon: { target: 12, actual: 12 }, tue: { target: 12, actual: 13 }, wed: { target: 12, actual: 11 }, thu: { target: 12, actual: 12 }, fri: { target: 12, actual: 13 }, sat: { target: 8, actual: 8 }, monthlyTarget: 288, monthlyAchieved: 265 },
  { model: 'Mini Zippy', modelId: 'ZIP', mon: { target: 20, actual: 18 }, tue: { target: 20, actual: 19 }, wed: { target: 20, actual: 20 }, thu: { target: 20, actual: 17 }, fri: { target: 20, actual: 19 }, sat: { target: 12, actual: 10 }, monthlyTarget: 480, monthlyAchieved: 412 },
];

// --- Quality Control ---
export interface DefectRecord {
  id: string;
  model: string;
  defectType: string;
  severity: 'Critical' | 'Major' | 'Minor';
  station: string;
  actionTaken: string;
  date: string;
  inspector: string;
}

export const defectRecords: DefectRecord[] = [
  { id: 'D001', model: 'Sedan X1', defectType: 'Paint', severity: 'Minor', station: 'Paint Booth 2', actionTaken: 'Re-spray scheduled', date: '2026-03-02', inspector: 'Ramesh T.' },
  { id: 'D002', model: 'SUV Thunder', defectType: 'Fitment', severity: 'Major', station: 'Body Assembly', actionTaken: 'Door realignment done', date: '2026-03-02', inspector: 'Sunita K.' },
  { id: 'D003', model: 'EV Bolt', defectType: 'Electrical', severity: 'Critical', station: 'Wiring Station', actionTaken: 'Battery harness replaced', date: '2026-03-01', inspector: 'Vikram S.' },
  { id: 'D004', model: 'Hatchback Spark', defectType: 'Engine', severity: 'Major', station: 'Engine Bay', actionTaken: 'Coolant line re-routed', date: '2026-03-01', inspector: 'Deepa M.' },
  { id: 'D005', model: 'Pickup Titan', defectType: 'Body', severity: 'Minor', station: 'Weld Shop', actionTaken: 'Weld spot touched up', date: '2026-02-28', inspector: 'Amol P.' },
  { id: 'D006', model: 'Mini Zippy', defectType: 'Paint', severity: 'Minor', station: 'Paint Booth 1', actionTaken: 'Buffing and polish', date: '2026-02-28', inspector: 'Ramesh T.' },
  { id: 'D007', model: 'Sedan X1', defectType: 'Fitment', severity: 'Minor', station: 'Trim Line', actionTaken: 'Dashboard clip replaced', date: '2026-02-27', inspector: 'Sunita K.' },
  { id: 'D008', model: 'SUV Thunder', defectType: 'Electrical', severity: 'Major', station: 'ECU Station', actionTaken: 'ECU reflashed', date: '2026-02-27', inspector: 'Vikram S.' },
  { id: 'D009', model: 'EV Bolt', defectType: 'Body', severity: 'Minor', station: 'Weld Shop', actionTaken: 'Panel gap adjusted', date: '2026-02-26', inspector: 'Deepa M.' },
  { id: 'D010', model: 'Hatchback Spark', defectType: 'Paint', severity: 'Minor', station: 'Paint Booth 2', actionTaken: 'Color match corrected', date: '2026-02-26', inspector: 'Amol P.' },
];

export interface DefectHeatmapCell {
  defectType: string;
  station: string;
  count: number;
}

export const defectHeatmap: DefectHeatmapCell[] = [
  { defectType: 'Paint', station: 'Paint Booth 1', count: 8 },
  { defectType: 'Paint', station: 'Paint Booth 2', count: 12 },
  { defectType: 'Paint', station: 'Trim Line', count: 2 },
  { defectType: 'Fitment', station: 'Body Assembly', count: 10 },
  { defectType: 'Fitment', station: 'Trim Line', count: 7 },
  { defectType: 'Fitment', station: 'Final QC', count: 3 },
  { defectType: 'Electrical', station: 'Wiring Station', count: 9 },
  { defectType: 'Electrical', station: 'ECU Station', count: 6 },
  { defectType: 'Electrical', station: 'Final QC', count: 4 },
  { defectType: 'Engine', station: 'Engine Bay', count: 5 },
  { defectType: 'Engine', station: 'Dyno Test', count: 3 },
  { defectType: 'Engine', station: 'Final QC', count: 1 },
  { defectType: 'Body', station: 'Weld Shop', count: 11 },
  { defectType: 'Body', station: 'Body Assembly', count: 6 },
  { defectType: 'Body', station: 'Paint Booth 1', count: 2 },
];

export interface DefectTrend {
  week: string;
  paint: number;
  fitment: number;
  electrical: number;
  engine: number;
  body: number;
}

export const defectTrends: DefectTrend[] = [
  { week: 'W1', paint: 5, fitment: 4, electrical: 3, engine: 2, body: 4 },
  { week: 'W2', paint: 7, fitment: 3, electrical: 5, engine: 1, body: 3 },
  { week: 'W3', paint: 4, fitment: 6, electrical: 4, engine: 3, body: 5 },
  { week: 'W4', paint: 6, fitment: 5, electrical: 2, engine: 2, body: 6 },
  { week: 'W5', paint: 3, fitment: 4, electrical: 6, engine: 1, body: 3 },
  { week: 'W6', paint: 5, fitment: 3, electrical: 3, engine: 2, body: 4 },
  { week: 'W7', paint: 4, fitment: 2, electrical: 4, engine: 3, body: 2 },
  { week: 'W8', paint: 3, fitment: 3, electrical: 2, engine: 1, body: 3 },
];

// --- Supply Chain / Parts Inventory ---
export interface PartInventory {
  id: string;
  name: string;
  supplier: string;
  currentStock: number;
  dailyConsumption: number;
  daysOfStock: number;
  reorderLevel: number;
  status: 'Adequate' | 'Reorder Soon' | 'Critical Low' | 'On Order';
  unit: string;
  lastDelivery: string;
}

export const partsInventory: PartInventory[] = [
  { id: 'P001', name: 'Engine Assembly', supplier: 'Tata AutoComp', currentStock: 320, dailyConsumption: 45, daysOfStock: 7, reorderLevel: 200, status: 'Adequate', unit: 'units', lastDelivery: '2026-02-28' },
  { id: 'P002', name: 'Gearbox', supplier: 'ZF India', currentStock: 180, dailyConsumption: 40, daysOfStock: 4, reorderLevel: 200, status: 'Reorder Soon', unit: 'units', lastDelivery: '2026-02-25' },
  { id: 'P003', name: 'Axle Set', supplier: 'Dana India', currentStock: 250, dailyConsumption: 35, daysOfStock: 7, reorderLevel: 150, status: 'Adequate', unit: 'sets', lastDelivery: '2026-02-27' },
  { id: 'P004', name: 'ECU Module', supplier: 'Bosch India', currentStock: 90, dailyConsumption: 42, daysOfStock: 2, reorderLevel: 150, status: 'Critical Low', unit: 'units', lastDelivery: '2026-02-20' },
  { id: 'P005', name: 'Dashboard Assembly', supplier: 'Motherson Sumi', currentStock: 200, dailyConsumption: 38, daysOfStock: 5, reorderLevel: 180, status: 'Reorder Soon', unit: 'units', lastDelivery: '2026-02-24' },
  { id: 'P006', name: 'Wiring Harness', supplier: 'Motherson Sumi', currentStock: 410, dailyConsumption: 48, daysOfStock: 8, reorderLevel: 200, status: 'Adequate', unit: 'sets', lastDelivery: '2026-03-01' },
  { id: 'P007', name: 'Body Panels', supplier: 'JBM Auto', currentStock: 150, dailyConsumption: 50, daysOfStock: 3, reorderLevel: 200, status: 'Critical Low', unit: 'sets', lastDelivery: '2026-02-22' },
  { id: 'P008', name: 'Tires', supplier: 'MRF Ltd.', currentStock: 600, dailyConsumption: 80, daysOfStock: 7, reorderLevel: 350, status: 'Adequate', unit: 'pcs', lastDelivery: '2026-03-01' },
  { id: 'P009', name: 'Battery Pack (EV)', supplier: 'Exide Energy', currentStock: 45, dailyConsumption: 15, daysOfStock: 3, reorderLevel: 60, status: 'On Order', unit: 'units', lastDelivery: '2026-02-18' },
  { id: 'P010', name: 'Seats', supplier: 'Lear India', currentStock: 280, dailyConsumption: 44, daysOfStock: 6, reorderLevel: 200, status: 'Adequate', unit: 'sets', lastDelivery: '2026-02-26' },
  { id: 'P011', name: 'Headlight Assembly', supplier: 'Lumax Industries', currentStock: 350, dailyConsumption: 46, daysOfStock: 7, reorderLevel: 200, status: 'Adequate', unit: 'pairs', lastDelivery: '2026-02-27' },
  { id: 'P012', name: 'Brake System', supplier: 'Brakes India', currentStock: 120, dailyConsumption: 44, daysOfStock: 2, reorderLevel: 180, status: 'Critical Low', unit: 'sets', lastDelivery: '2026-02-19' },
];

// --- Dealer Network ---
export interface Dealer {
  id: string;
  name: string;
  city: string;
  zone: 'North' | 'South' | 'East' | 'West';
  pendingOrders: number;
  dispatchedThisMonth: number;
  revenue: number;
  rating: number;
  contact: string;
}

export const dealers: Dealer[] = [
  { id: 'DLR01', name: 'Sharma AutoWorld', city: 'Delhi', zone: 'North', pendingOrders: 45, dispatchedThisMonth: 120, revenue: 185000000, rating: 4.5, contact: '+91 98100 12345' },
  { id: 'DLR02', name: 'SouthStar Motors', city: 'Chennai', zone: 'South', pendingOrders: 32, dispatchedThisMonth: 95, revenue: 142000000, rating: 4.3, contact: '+91 98400 23456' },
  { id: 'DLR03', name: 'Royal Drive', city: 'Mumbai', zone: 'West', pendingOrders: 58, dispatchedThisMonth: 145, revenue: 225000000, rating: 4.7, contact: '+91 98200 34567' },
  { id: 'DLR04', name: 'Eastern Wheels', city: 'Kolkata', zone: 'East', pendingOrders: 22, dispatchedThisMonth: 68, revenue: 98000000, rating: 4.1, contact: '+91 98300 45678' },
  { id: 'DLR05', name: 'Punjab Motors', city: 'Chandigarh', zone: 'North', pendingOrders: 38, dispatchedThisMonth: 88, revenue: 135000000, rating: 4.4, contact: '+91 97200 56789' },
  { id: 'DLR06', name: 'Deccan Auto Hub', city: 'Pune', zone: 'West', pendingOrders: 28, dispatchedThisMonth: 76, revenue: 112000000, rating: 4.2, contact: '+91 98500 67890' },
  { id: 'DLR07', name: 'Bengaluru Drives', city: 'Bengaluru', zone: 'South', pendingOrders: 41, dispatchedThisMonth: 110, revenue: 168000000, rating: 4.6, contact: '+91 98800 78901' },
  { id: 'DLR08', name: 'Gateway Motors', city: 'Ahmedabad', zone: 'West', pendingOrders: 19, dispatchedThisMonth: 55, revenue: 82000000, rating: 4.0, contact: '+91 97900 89012' },
];

// --- Shift Data ---
export interface ShiftInfo {
  id: string;
  name: string;
  time: string;
  workers: number;
  output: number;
  efficiency: number;
  color: string;
}

export const shifts: ShiftInfo[] = [
  { id: 'S1', name: 'Morning', time: '6:00 AM - 2:00 PM', workers: 486, output: 58, efficiency: 95.3, color: '#3b82f6' },
  { id: 'S2', name: 'Afternoon', time: '2:00 PM - 10:00 PM', workers: 412, output: 44, efficiency: 91.7, color: '#f59e0b' },
  { id: 'S3', name: 'Night', time: '10:00 PM - 6:00 AM', workers: 245, output: 22, efficiency: 87.4, color: '#8b5cf6' },
];

// --- Monthly Production ---
export interface MonthlyProduction {
  month: string;
  produced: number;
  dispatched: number;
}

export const monthlyProduction: MonthlyProduction[] = [
  { month: 'Apr', produced: 2800, dispatched: 2650 },
  { month: 'May', produced: 2950, dispatched: 2780 },
  { month: 'Jun', produced: 3100, dispatched: 2900 },
  { month: 'Jul', produced: 2750, dispatched: 2820 },
  { month: 'Aug', produced: 3200, dispatched: 3050 },
  { month: 'Sep', produced: 3050, dispatched: 2980 },
  { month: 'Oct', produced: 3350, dispatched: 3200 },
  { month: 'Nov', produced: 3400, dispatched: 3150 },
  { month: 'Dec', produced: 2900, dispatched: 3100 },
  { month: 'Jan', produced: 3500, dispatched: 3300 },
  { month: 'Feb', produced: 3450, dispatched: 3280 },
  { month: 'Mar', produced: 1240, dispatched: 980 },
];

// --- Live Feed Events ---
export interface LiveEvent {
  id: string;
  message: string;
  time: string;
  type: 'production' | 'quality' | 'dispatch' | 'alert' | 'maintenance';
}

export const liveEvents: LiveEvent[] = [
  { id: 'E01', message: 'SUV Thunder #4521 completed final QC - PASS', time: '11:42 AM', type: 'quality' },
  { id: 'E02', message: 'EV Bolt battery module installed on unit #2187', time: '11:38 AM', type: 'production' },
  { id: 'E03', message: 'Sedan X1 batch of 5 dispatched to Royal Drive, Mumbai', time: '11:35 AM', type: 'dispatch' },
  { id: 'E04', message: 'Paint Booth 2 temperature alert - recalibrating', time: '11:30 AM', type: 'alert' },
  { id: 'E05', message: 'Hatchback Spark #7892 passed emission test', time: '11:28 AM', type: 'quality' },
  { id: 'E06', message: 'Line B speed reduced - bearing replacement in progress', time: '11:22 AM', type: 'maintenance' },
  { id: 'E07', message: 'Pickup Titan #1203 body welding complete', time: '11:18 AM', type: 'production' },
  { id: 'E08', message: 'ECU Module shipment received from Bosch India (qty: 200)', time: '11:15 AM', type: 'dispatch' },
  { id: 'E09', message: 'Mini Zippy #3301 paint defect detected - sent to rework', time: '11:10 AM', type: 'quality' },
  { id: 'E10', message: 'Shift A handover summary submitted by Rajesh Kumar', time: '11:05 AM', type: 'production' },
  { id: 'E11', message: 'Gearbox stock below reorder level - PO raised', time: '11:00 AM', type: 'alert' },
  { id: 'E12', message: 'Sedan X1 #4520 engine dyno test cleared', time: '10:55 AM', type: 'quality' },
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
  { id: 'C01', name: 'Manufacturing License', authority: 'Dept. of Industrial Policy', status: 'Active', validUntil: '2027-12-31', category: 'License' },
  { id: 'C02', name: 'ARAI Type Approval - Sedan X1', authority: 'ARAI Pune', status: 'Active', validUntil: '2027-06-30', category: 'Certification' },
  { id: 'C03', name: 'ARAI Type Approval - SUV Thunder', authority: 'ARAI Pune', status: 'Active', validUntil: '2027-03-15', category: 'Certification' },
  { id: 'C04', name: 'BS-VI Emission Compliance', authority: 'MoRTH', status: 'Active', validUntil: '2028-03-31', category: 'Emission' },
  { id: 'C05', name: 'FAME-II EV Subsidy Registration', authority: 'DHI', status: 'Active', validUntil: '2027-03-31', category: 'Subsidy' },
  { id: 'C06', name: 'ISO 9001:2015 QMS', authority: 'Bureau Veritas', status: 'Active', validUntil: '2026-11-30', category: 'Quality' },
  { id: 'C07', name: 'ISO 14001 Environment', authority: 'Bureau Veritas', status: 'Expiring Soon', validUntil: '2026-04-15', category: 'Environment' },
  { id: 'C08', name: 'Factory Act License', authority: 'State Labour Dept.', status: 'Active', validUntil: '2026-12-31', category: 'License' },
  { id: 'C09', name: 'Fire Safety Certificate', authority: 'Fire Dept.', status: 'Expiring Soon', validUntil: '2026-03-31', category: 'Safety' },
  { id: 'C10', name: 'Pollution Control Consent', authority: 'SPCB', status: 'Active', validUntil: '2027-06-30', category: 'Environment' },
  { id: 'C11', name: 'ARAI Type Approval - EV Bolt', authority: 'ARAI Pune', status: 'Pending Renewal', validUntil: '2026-02-28', category: 'Certification' },
  { id: 'C12', name: 'IATF 16949 Automotive QMS', authority: 'TUV SUD', status: 'Active', validUntil: '2027-09-30', category: 'Quality' },
];

// --- Dispatch Records ---
export interface DispatchRecord {
  id: string;
  model: string;
  quantity: number;
  dealer: string;
  city: string;
  date: string;
  status: 'Dispatched' | 'In Transit' | 'Delivered';
  transporter: string;
}

export const dispatchRecords: DispatchRecord[] = [
  { id: 'DSP001', model: 'Sedan X1', quantity: 5, dealer: 'Royal Drive', city: 'Mumbai', date: '2026-03-02', status: 'Dispatched', transporter: 'Gati Logistics' },
  { id: 'DSP002', model: 'SUV Thunder', quantity: 3, dealer: 'Sharma AutoWorld', city: 'Delhi', date: '2026-03-02', status: 'In Transit', transporter: 'Maruti Transport' },
  { id: 'DSP003', model: 'Hatchback Spark', quantity: 8, dealer: 'Bengaluru Drives', city: 'Bengaluru', date: '2026-03-01', status: 'Delivered', transporter: 'TCI Express' },
  { id: 'DSP004', model: 'EV Bolt', quantity: 2, dealer: 'SouthStar Motors', city: 'Chennai', date: '2026-03-01', status: 'In Transit', transporter: 'Blue Dart Express' },
  { id: 'DSP005', model: 'Pickup Titan', quantity: 4, dealer: 'Punjab Motors', city: 'Chandigarh', date: '2026-02-28', status: 'Delivered', transporter: 'Gati Logistics' },
  { id: 'DSP006', model: 'Mini Zippy', quantity: 6, dealer: 'Eastern Wheels', city: 'Kolkata', date: '2026-02-28', status: 'Delivered', transporter: 'Rivigo' },
  { id: 'DSP007', model: 'Sedan X1', quantity: 4, dealer: 'Deccan Auto Hub', city: 'Pune', date: '2026-02-27', status: 'Delivered', transporter: 'Maruti Transport' },
  { id: 'DSP008', model: 'SUV Thunder', quantity: 5, dealer: 'Gateway Motors', city: 'Ahmedabad', date: '2026-02-27', status: 'Delivered', transporter: 'TCI Express' },
];
