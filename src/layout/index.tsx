import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import PageLoading from "@/components/Loading/PageLoading";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export default function Layout() {
  return (
    <div className="text-white">
      <Suspense fallback={<PageLoading />}>
        <Header />
        <Outlet />
        {/* <Footer /> */}
      </Suspense>
    </div>
  );
}
