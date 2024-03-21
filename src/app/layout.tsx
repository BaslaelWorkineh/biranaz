
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactFlowProvider } from "reactflow";
import FlowLayout from "base/layouts/reactflowLayout";
import AuthSession from "base/layouts/sessionProvider";

const inter = Inter({ subsets: ["latin"] });

 
export const metadata: Metadata = {
  title: 'Branaz',
  description: 'The #1 go to knowledge management tools out there'
  
}
 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
            <AuthSession>
                <FlowLayout>
                  {children}
                </FlowLayout>
            </AuthSession>
          </body>
    </html>
  );
}
