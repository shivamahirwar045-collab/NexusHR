export type EmployeeStatus = 'active' | 'inactive' | 'on_leave' | 'probation' | 'terminated';
export type EmploymentType = 'full_time' | 'part_time' | 'contract' | 'internship';
export type Gender = 'male' | 'female' | 'non_binary' | 'prefer_not_to_say';

export interface Employee {
  id: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: Gender;
  avatarUrl?: string;
  
  // Employment
  departmentId: string;
  departmentName: string;
  designation: string;
  joiningDate: string;
  employmentType: EmploymentType;
  managerName?: string;
  managerId?: string;
  status: EmployeeStatus;
  
  // Location
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  
  // Compensation
  baseSalary: number;
  paymentFrequency: 'monthly' | 'biweekly' | 'weekly';
  bankName?: string;
  accountNumber?: string;
  
  // Stats
  attendanceRate: number;
  leaveBalance: number;
  performanceRating?: number;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  managerId?: string;
  managerName: string;
  managerAvatar?: string;
  employeeCount: number;
  budget: number;
  status: 'active' | 'archived';
  createdAt: string;
}

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'half_day' | 'on_leave';

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeCode: string;
  departmentName: string;
  avatarUrl?: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  workingHours: number | null;
  status: AttendanceStatus;
  notes?: string;
}

export type LeaveType = 'annual' | 'sick' | 'casual' | 'maternity' | 'paternity' | 'unpaid';
export type LeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeCode: string;
  departmentName: string;
  avatarUrl?: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  daysCount: number;
  reason: string;
  status: LeaveStatus;
  appliedOn: string;
  reviewedBy?: string;
  reviewedAt?: string;
  rejectionReason?: string;
  attachmentName?: string;
}

export type PayrollStatus = 'processed' | 'pending' | 'paid' | 'draft';

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeCode: string;
  departmentName: string;
  designation: string;
  avatarUrl?: string;
  monthYear: string;
  baseSalary: number;
  allowances: number;
  bonus: number;
  deductions: number;
  tax: number;
  netPay: number;
  status: PayrollStatus;
  payDate: string;
  paymentMethod: string;
  bankAccount: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'leave' | 'payroll' | 'employee' | 'attendance' | 'system';
  isRead: boolean;
  actionUrl?: string;
}

export interface AuditLogItem {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  action: 'create' | 'update' | 'delete' | 'approve' | 'reject' | 'export' | 'login';
  module: 'employees' | 'departments' | 'attendance' | 'leave' | 'payroll' | 'settings' | 'auth';
  description: string;
  ipAddress: string;
  timestamp: string;
}
