import React from "react";
import SideBar from "../components/SideBar";

function BoxWrapper({ children }) {
	return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
}

export default function Home() {
  return (
    <div className="flex">
      <SideBar />
      <h1>home</h1>
    </div>
  );
}
