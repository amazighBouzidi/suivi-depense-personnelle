import React from 'react';
import SideBar from '../components/SideBar';

export default function PersonelSpent() {
  return (
    <div className="flex">
      <SideBar />
      <div className="m-3 text-xl text-gray-900 font-semibold flex-1">
        <h1>Personnel Spent</h1>
      </div>
    </div>
  );
}
