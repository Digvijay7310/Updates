import React from "react";

const DashboardCard = ({ title, count, icon }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
      {icon && (
        <div className="text-blue-500 text-4xl">
          {icon}
        </div>
      )}
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-3xl font-bold text-gray-900">{count}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
