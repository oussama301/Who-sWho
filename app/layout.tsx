import type { Metadata } from "next";
import "./globals.css";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Employee Management",
  description: "Manage employee information and performance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* ✅ Topbar with Extended Logo and Dark Mode Button */}
        <header className="w-full bg-primary text-white p-4 shadow-md fixed top-0 left-0 z-50">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Logo Image with Larger Size */}
              <img src="/D&A_White.svg" alt="Logo" className="h-10 w-20" />
              <h1 className="text-2xl font-bold">Who's who</h1>
            </div>

            {/* Dark Mode Toggle Button */}
            <div>
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* ✅ Main Content with Margin to Avoid Overlap */}
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
