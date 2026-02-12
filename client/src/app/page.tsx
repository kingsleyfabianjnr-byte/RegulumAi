import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold text-primary-700">RegulumAi</h1>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex flex-1 items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <h2 className="text-5xl font-bold tracking-tight text-gray-900">
            AI-Powered
            <span className="text-primary-600"> Compliance Monitoring</span>
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            Automate your regulatory compliance workflow with intelligent
            document analysis, real-time risk assessment, and comprehensive
            audit trails. Powered by advanced AI to keep your organization
            compliant.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/register"
              className="rounded-lg bg-primary-600 px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-700"
            >
              Start Free Trial
            </Link>
            <Link
              href="/login"
              className="rounded-lg border border-gray-300 px-8 py-3 text-base font-semibold text-gray-700 hover:bg-gray-50"
            >
              Sign In
            </Link>
          </div>

          {/* Feature highlights */}
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="mb-3 text-3xl">&#x1f6e1;&#xfe0f;</div>
              <h3 className="font-semibold text-gray-900">
                Compliance Checks
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Automated analysis of documents against regulatory frameworks
                and internal policies.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="mb-3 text-3xl">&#x1f4ca;</div>
              <h3 className="font-semibold text-gray-900">Risk Assessment</h3>
              <p className="mt-2 text-sm text-gray-600">
                Real-time risk scoring with actionable insights and
                recommendations.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="mb-3 text-3xl">&#x1f4dd;</div>
              <h3 className="font-semibold text-gray-900">Audit Trails</h3>
              <p className="mt-2 text-sm text-gray-600">
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
