import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  if (amount >= 10000000) return `Rs.${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `Rs.${(amount / 100000).toFixed(2)} L`;
  if (amount >= 1000) return `Rs.${(amount / 1000).toFixed(1)}K`;
  return `Rs.${amount.toLocaleString('en-IN')}`;
}

export function formatNumber(num: number): string {
  return num.toLocaleString('en-IN');
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
