import React from "react";

const DashboardCard = ({ title, count, icon }) => {
  return (
    <div className="bg-white w-full shadow-md rounded-lg p-4 flex items-center gap-4 hover:shadow-lg transition">
      {icon && (
        <div className="text-sky-700 text-4xl">
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
