import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Industrial Component Showcase',
    description: 'High-fidelity industrial electronics dashboard',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="font-sans antialiased bg-neutral-950 text-white h-screen w-screen overflow-hidden">
                {children}
            </body>
        </html>
    );
}
