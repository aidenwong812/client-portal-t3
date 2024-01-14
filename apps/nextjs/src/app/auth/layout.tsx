import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="container relative grid min-h-dvh	flex-col items-center justify-center lg:max-w-none lg:px-0">
    <div className="lg:p-8">{children}</div>
  </div>
);

export default Layout;
