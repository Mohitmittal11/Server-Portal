import { ReactNode } from "react";
import Header from "@/components/user/Header";
import Footer from "@/components/user/Footer";

// export const metadata: Metadata = {
//   title: "user-admin-public",
//   description: "Generated by create-next-app",
// };

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="relative">
        <Header />
        <main className="p-6">{children}</main>
      </div>
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
