
import { 
  Calendar,
  Users,
  BarChart3,
  BellRing,
  Settings,
  HelpCircle,
  Home,
  receipt,
} from "lucide-react";

export type Currency = {
  code: string;
  symbol: string;
  name: string;
};

export type DebtStatus = 'owes_me' | 'i_owe' | 'pending' | 'recurring';

export type Party = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  totalOwed: number;
  totalOwes: number;
  currency: string;
};

export type Debt = {
  id: string;
  partyId: string;
  partyName: string;
  amount: number;
  currency: string;
  description: string;
  status: DebtStatus;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  isPaid: boolean;
};

export type Transaction = {
  id: string;
  debtId: string;
  amount: number;
  currency: string;
  date: string;
  method: string;
  notes?: string;
};

export type NavItem = {
  title: string;
  href: string;
  icon: any;
  submenu?: NavItem[];
};

export type UserStats = {
  totalOwed: number;
  totalOwes: number;
  pendingCount: number;
  activeDebtors: number;
  currency: string;
};

export const currencies: Currency[] = [
  {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
  },
  {
    code: "EUR",
    symbol: "€",
    name: "Euro",
  },
  {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
  },
  {
    code: "VND",
    symbol: "₫",
    name: "Vietnamese Dong",
  },
];

export const parties: Party[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "555-1234",
    totalOwed: 500,
    totalOwes: 0,
    currency: "USD",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "555-5678",
    totalOwed: 0,
    totalOwes: 300,
    currency: "USD",
  },
  {
    id: "3",
    name: "Alex Johnson",
    email: "alex@example.com",
    totalOwed: 250,
    totalOwes: 120,
    currency: "USD",
  }
];

export const debts: Debt[] = [
  {
    id: "1",
    partyId: "1",
    partyName: "John Doe",
    amount: 500,
    currency: "USD",
    description: "Dinner at Restaurant",
    status: "owes_me",
    dueDate: "2025-05-01",
    createdAt: "2025-04-01",
    updatedAt: "2025-04-01",
    isPaid: false,
  },
  {
    id: "2",
    partyId: "2",
    partyName: "Jane Smith",
    amount: 300,
    currency: "USD",
    description: "Concert tickets",
    status: "i_owe",
    dueDate: "2025-05-15",
    createdAt: "2025-04-02",
    updatedAt: "2025-04-02",
    isPaid: false,
  },
  {
    id: "3",
    partyId: "3",
    partyName: "Alex Johnson",
    amount: 250,
    currency: "USD",
    description: "Shared groceries",
    status: "owes_me",
    createdAt: "2025-04-03",
    updatedAt: "2025-04-03",
    isPaid: false,
  },
  {
    id: "4",
    partyId: "3",
    partyName: "Alex Johnson",
    amount: 120,
    currency: "USD",
    description: "Uber ride",
    status: "i_owe",
    createdAt: "2025-04-04",
    updatedAt: "2025-04-04",
    isPaid: false,
  },
  {
    id: "5",
    partyId: "1",
    partyName: "John Doe",
    amount: 75,
    currency: "USD",
    description: "Monthly subscription",
    status: "recurring",
    dueDate: "2025-05-01",
    createdAt: "2025-04-05",
    updatedAt: "2025-04-05",
    isPaid: false,
  },
];

export const transactions: Transaction[] = [
  {
    id: "1",
    debtId: "1",
    amount: 200,
    currency: "USD",
    date: "2025-04-10",
    method: "Cash",
    notes: "Partial payment",
  },
  {
    id: "2",
    debtId: "3",
    amount: 100,
    currency: "USD",
    date: "2025-04-12",
    method: "Bank Transfer",
  },
];

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Debts",
    href: "/debts",
    icon: receipt,
  },
  {
    title: "Parties",
    href: "/parties",
    icon: Users,
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: BellRing,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Help",
    href: "/help",
    icon: HelpCircle,
  },
];

export const userStats: UserStats = {
  totalOwed: 825,
  totalOwes: 420,
  pendingCount: 2,
  activeDebtors: 3,
  currency: "USD",
};
