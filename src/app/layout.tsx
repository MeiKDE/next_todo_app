import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next.js Todo App",
  description: "A simple app built with Next.js, Typescript, and Tailwind CSS",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col items-center ">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            {" "}
            Next Todo App
          </h1>
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
