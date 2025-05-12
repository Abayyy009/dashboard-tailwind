import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const DashboardCharts = ({ ownerId }) => {
  const [clickData, setClickData] = useState([]);
  const [conversionData, setConversionData] = useState([]);
  const API_ENDPOINT = `https://dev.katib.cloud/stats/${ownerId}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINT, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer DpacnJf3uEQeM7HN",
          },
        });
        const result = await response.json();

        if (response.ok) {
          setClickData(result.data.click_stats);
          setConversionData([
            { name: "CS Count", value: result.data.cs_count },
            { name: "Click Count", value: result.data.click_count },
          ]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [ownerId]);

  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <div className="grid grid-cols-2 gap-6 mt-6">
      {/* Grafik Statistik Klik */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">
          Grafik Statistik Klik Mingguan/Harian
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={clickData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="clicks" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Grafik Konversi */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Grafik Konversi</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={conversionData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {conversionData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;
