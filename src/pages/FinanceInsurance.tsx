import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Wallet, CheckCircle, Clock, XCircle, Shield, AlertTriangle } from 'lucide-react';
import { loanApplications, insuranceRecords } from '../data/dummyData.ts';
import { cn, formatCurrency, formatDate } from '../lib/utils.ts';

const loanStatusConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  'Approved': { icon: <CheckCircle size={14} />, color: 'text-green-700', bg: 'bg-green-100' },
  'Processing': { icon: <Clock size={14} />, color: 'text-yellow-700', bg: 'bg-yellow-100' },
  'Rejected': { icon: <XCircle size={14} />, color: 'text-red-700', bg: 'bg-red-100' },
  'Disbursed': { icon: <CheckCircle size={14} />, color: 'text-blue-700', bg: 'bg-blue-100' },
};

const insStatusConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  'Active': { icon: <CheckCircle size={14} />, color: 'text-green-700', bg: 'bg-green-100' },
  'Expiring Soon': { icon: <AlertTriangle size={14} />, color: 'text-yellow-700', bg: 'bg-yellow-100' },
  'Expired': { icon: <XCircle size={14} />, color: 'text-red-700', bg: 'bg-red-100' },
};

// Summary
const totalDisbursed = loanApplications.filter((l) => l.status === 'Disbursed').reduce((s, l) => s + l.loanAmount, 0);
const pendingLoans = loanApplications.filter((l) => l.status === 'Processing').length;
const approvedLoans = loanApplications.filter((l) => l.status === 'Approved').length;
const avgLoanAmount = loanApplications.reduce((s, l) => s + l.loanAmount, 0) / loanApplications.length;

// Bank-wise distribution
const bankData = ['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank'].map((bank) => {
  const bankLoans = loanApplications.filter((l) => l.bank === bank);
  return {
    bank: bank.replace(' Bank', ''),
    count: bankLoans.length,
    amount: bankLoans.reduce((s, l) => s + l.loanAmount, 0) / 100000,
  };
});

export default function FinanceInsurance() {
  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: 'Total Disbursed', value: formatCurrency(totalDisbursed), icon: <Wallet size={18} />, color: 'from-blue-500 to-blue-600' },
          { label: 'Pending Applications', value: pendingLoans, icon: <Clock size={18} />, color: 'from-yellow-500 to-yellow-600' },
          { label: 'Approved', value: approvedLoans, icon: <CheckCircle size={18} />, color: 'from-green-500 to-green-600' },
          { label: 'Avg Loan Amount', value: formatCurrency(avgLoanAmount), icon: <Shield size={18} />, color: 'from-purple-500 to-purple-600' },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
          >
            <div className={cn('w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center text-white mb-3', item.color)}>
              {item.icon}
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-900">{item.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{item.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Loan Applications Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Loan Applications</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Customer</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Vehicle</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Bank</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">Loan Amount</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500">Tenure</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">EMI</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500">Rate</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loanApplications.map((loan) => {
                const statusCfg = loanStatusConfig[loan.status];
                return (
                  <tr key={loan.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">{loan.customerName}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{loan.vehicleModel}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{loan.bank}</td>
                    <td className="px-4 py-3 text-right text-sm font-bold text-gray-900">{formatCurrency(loan.loanAmount)}</td>
                    <td className="px-4 py-3 text-center text-sm text-gray-700">{loan.tenure} mo</td>
                    <td className="px-4 py-3 text-right text-sm font-medium text-gray-700">{formatCurrency(loan.emi)}</td>
                    <td className="px-4 py-3 text-center text-sm text-gray-600">{loan.interestRate}%</td>
                    <td className="px-4 py-3 text-center">
                      <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', statusCfg.bg, statusCfg.color)}>
                        {statusCfg.icon}
                        {loan.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{formatDate(loan.applicationDate)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Insurance + Bank Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Insurance Records */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Insurance Records</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Customer</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Vehicle</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Provider</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500">Type</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">Premium</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Expiry</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {insuranceRecords.map((ins) => {
                    const statusCfg = insStatusConfig[ins.status];
                    return (
                      <tr key={ins.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900">{ins.customerName}</td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-700">{ins.vehicleModel}</p>
                          <p className="text-[10px] text-gray-400 font-mono">{ins.regNumber}</p>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">{ins.provider}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={cn(
                            'text-[10px] font-semibold px-2 py-0.5 rounded-full',
                            ins.type === 'Comprehensive' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                          )}>
                            {ins.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right text-sm font-medium text-gray-700">{formatCurrency(ins.premium)}</td>
                        <td className="px-4 py-3 text-xs text-gray-500">{formatDate(ins.expiryDate)}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', statusCfg.bg, statusCfg.color)}>
                            {statusCfg.icon}
                            {ins.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Bank Distribution Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
        >
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Bank-wise Loans</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bankData} barCategoryGap="25%">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="bank" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                  formatter={(value, name) => {
                    if (name === 'amount') return [`Rs.${Number(value).toFixed(1)}L`, 'Amount'];
                    return [value, 'Applications'];
                  }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Applications" />
                <Bar dataKey="amount" fill="#10b981" radius={[6, 6, 0, 0]} name="Amount (Lakhs)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
            {bankData.map((b) => (
              <div key={b.bank} className="flex items-center justify-between text-xs">
                <span className="text-gray-600">{b.bank}</span>
                <span className="font-bold text-gray-900">{b.count} loans | Rs.{b.amount.toFixed(1)}L</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
