// apps/web/src/app/page.tsx

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h2 className="text-4xl font-extrabold mb-4">Welcome to BestVision</h2>
        <p className="text-lg text-slate-600">RIA Account aggregation</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 机构管理卡片 */}
        <div className="p-6 bg-white rounded-xl border border-slate-200 hover:shadow-md transition">
          <h3 className="text-lg font-semibold mb-2">Firm Management</h3>
          <p className="text-sm text-slate-500 mb-4">Management, consultants, and customer lifecycle.</p>
          <Link href="/apply" className="text-blue-500 font-medium">Go to Apply →</Link>
        </div>

        {/* 数据汇聚卡片 */}
        <div className="p-6 bg-white rounded-xl border border-slate-200 hover:shadow-md transition">
          <h3 className="text-lg font-semibold mb-2">Aggregation</h3>
          <p className="text-sm text-slate-500 mb-4">Integrate Plaid API, support OAuth flows for Schwab and others.</p>
          <Link href="/integrations/plaid" className="text-blue-500 font-medium">Link Account →</Link>
        </div>

        {/* 审计日志卡片 */}
        <div className="p-6 bg-white rounded-xl border border-slate-200 hover:shadow-md transition">
          <h3 className="text-lg font-semibold mb-2">Compliance Audit</h3>
          <p className="text-sm text-slate-500 mb-4">All compliant/non-compliant operation logs to meet RIA regulatory requirements.</p>
          <button className="text-slate-400 font-medium cursor-not-allowed">Coming Soon</button>
        </div>
      </div>
    </div>
  );
}