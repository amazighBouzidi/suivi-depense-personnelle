import React from "react";
import SideBar from "../components/SideBar";
import BarsDataset from "../components/charts/BarsDataset";
import ActiveArc from "../components/charts/ActiveArc";
import CategoriesAmountTotal from "../components/charts/CategoriesAmounTotal";

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-[20px] p-4 flex-1 border border-gray-200 shadow-md flex items-center overflow-x-auto">
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex">
      <SideBar />
      <div className="m-3 text-xl text-gray-900 font-semibold flex-1 overflow-y-auto">
        <h1 className="text-3xl text-center font-semibold mb-5 text-gray-800">Acceuil</h1>
        <CategoriesAmountTotal />
        {/* This div will stack on small and medium screens, and show in one row on large screens */}
        <div className="flex flex-col lg:flex-row gap-4 mt-7">
          <BoxWrapper>
            <BarsDataset />
          </BoxWrapper>
          <BoxWrapper>
            <ActiveArc />
          </BoxWrapper>
        </div>
      </div>
    </div>
  );
}
