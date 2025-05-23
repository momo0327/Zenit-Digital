import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
    title: "Zenit Digital",
    description: "Landing page for Zenit Digital",
    icons: {
        icon: "/favicon.svg",
    },
    robots: "index, follow",
    openGraph: {
        title: "Zenit Digital",
        description: "Landing page for Zenit Digital",
        type: "website",
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
}; 