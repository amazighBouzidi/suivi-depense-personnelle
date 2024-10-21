import React from "react";
import SideBar from "../components/SideBar";
import BarsDataset from "../components/charts/BarsDataset";
import ActiveArc from "../components/charts/ActiveArc";

function BoxWrapper({ children }) {
	return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
}

export default function Home() {
  return (
    <div className="flex">
      <SideBar />
      <div className="m-3 text-xl text-gray-900 font-semibold flex-1">
        <h1 className="text-3xl text-center font-semibold mb-5 text-gray-800">
          Acceuil
        </h1>
        <BarsDataset />
        <div className="mt-10">
          <ActiveArc />
        </div>
      </div>
    </div>
  );
}
