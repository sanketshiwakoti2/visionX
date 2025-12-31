export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-neutral-400">Welcome to the MMC VisionX Control Room.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl">
                    <h3 className="text-lg font-semibold text-white mb-2">Event Status</h3>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-neutral-300">System Active</span>
                    </div>
                </div>

                {/* Add more stats cards here later */}
            </div>
        </div>
    );
}
