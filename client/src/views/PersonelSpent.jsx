import React, { useState } from "react";
import SideBar from "../components/SideBar";
import TableList from "../components/expense/TableList";

export default function PersonelSpent() {

  return (
    <div className="flex">
      <SideBar />
      <div className="m-3 text-xl text-gray-900 font-semibold flex-1">
        <h1 className="text-3xl text-center font-semibold mb-5 text-gray-800">
          Dépenses Personnelles
        </h1>
        <TableList />
      </div>
    </div>
  );
}
