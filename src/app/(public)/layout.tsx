import Navbar from "@/components/layout/Navbar";

import { getEventSettings } from "@/app/actions/settings";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const settings = await getEventSettings();
    console.log("DEBUG LAYOUT settings.logoUrl:", settings.logoUrl);

    return (
        <>
            <Navbar logoUrl={settings.logoUrl} />
            <main className="min-h-screen">
                {children}
            </main>
            <footer className="py-8 bg-neutral-900 border-t border-neutral-800 text-center text-neutral-500 text-sm">
                <p>© {new Date().getFullYear()} MMC VisionX. All rights reserved.</p>
            </footer>
        </>
    );
}
