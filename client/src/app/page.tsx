import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900">RegulumAi</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex flex-1 flex-col">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-50/30" />
          <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700 ring-1 ring-primary-200/60">
                AI-Powered RegTech Platform
              </div>
              <h2 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Compliance Monitoring,
                <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                  {" "}Reimagined
                </span>
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Automate your regulatory compliance workflow with intelligent
                document analysis, real-time risk assessment, and comprehensive
                audit trails. Powered by advanced AI to keep your organization
                compliant.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <Link
                  href="/register"
                  className="rounded-lg bg-primary-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-primary-700 hover:shadow-xl"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/login"
                  className="rounded-lg border border-gray-300 px-8 py-3 text-base font-semibold text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="mx-auto max-w-7xl px-6 pb-24">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:border-primary-200 hover:shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-100">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">
                Compliance Checks
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Automated analysis of documents against regulatory frameworks
                and internal policies.
              </p>
            </div>
            <div className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:border-primary-200 hover:shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-100">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Risk Assessment</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Real-time risk scoring with actionable insights and
                recommendations.
              </p>
            </div>
            <div className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:border-primary-200 hover:shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-100">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Audit Trails</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Complete logging of all compliance activities for regulatory
                reporting.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
