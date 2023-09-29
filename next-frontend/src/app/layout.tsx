import "@/styles/globals.css";
import { Metadata } from "next";
import { DashboardLayout } from "@/components/layout/dashboard";
import { ClientProvider } from "@/config/client-provider";
import { fontPoppins } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    default: "NestJS-NextJS User-CRUD",
    template: `%s - NestJS-NextJS User-CRUD`,
  },
  description: "Create, Read, Update, and Delete Users in a NestJS Application",
  themeColor: "#006141",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontPoppins.variable
          )}
        >
          <ClientProvider>
            <DashboardLayout>{children}</DashboardLayout>
          </ClientProvider>
        </body>
      </html>
    </>
  );
};

export default RootLayout;
