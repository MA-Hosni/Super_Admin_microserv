"use client"
import Image from "next/image";
import Sidebar from "@/Components/sidebar/sidebarrr"
import Navbar from "@/Components/NavBar";
import { BarChart, Bar, Cell, XAxis, YAxis, PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';


const datas = [
  { name: 'Business Premium', value: 400 },
  { name: 'Pro Entreprise', value: 320 },
  { name: 'Big Corp', value: 280 },
  { name: 'Custom Plus', value: 200 },
];
const COLORS = ['#fbcfe8', '#f9a8d4', '#f472b6', '#ec4899'];
const data = [
  {
    name: 'Jan',
    uv: 40,
  },
  {
    name: 'Feb',
    uv: 8,
  },
  {
    name: 'Mar',
    uv: 12,
  },
  {
    name: 'Apr',
    uv: 27,
  },
  {
    name: 'May',
    uv: 18,
  },
  {
    name: 'Jun',
    uv: 23,
  },
  {
    name: 'Jul',
    uv: 34,
  },
  {
    name: 'Aug',
    uv: 27,
  },
  {
    name: 'Sep',
    uv: 19,
  },
  {
    name: 'Oct',
    uv: 29,
  },
  {
    name: 'Nov',
    uv: 34,
  },
  {
    name: 'Dec',
    uv: 39,
  },
];

const getPath = (x:any, y:any, width:any, height:any) => {
  const radius = 15; // Adjust the radius as needed for the desired curvature

  return `
    M${x},${y + height - radius}
    L${x},${y + radius}
    Q${x},${y},${x + radius},${y}
    L${x + width - radius},${y}
    Q${x + width},${y},${x + width},${y + radius}
    L${x + width},${y + height - radius}
    Q${x + width},${y + height},${x + width - radius},${y + height}
    L${x + radius},${y + height}
    Q${x},${y + height},${x},${y + height - radius}
    Z
  `;
};

const TriangleBar = (props:any) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }:any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <g transform={`translate(${x},${y})`} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      <text className="font-medium text-xs" fill="black" >{name}</text>
      <text dy={20} className="font-medium text-xs" fill="black">{`${(percent * 100).toFixed(0)}%`}</text>
    </g>
  );
};

export default function Home() {
  return (
    <div className="container">
        <div className="menu">
            <Sidebar />    
        </div>    
        <div className="content">
            <Navbar />
            <main className="mr-2 border-2 border-slate-200 p-4 rounded-lg flex flex-col">
              <div className="tit mb-8">
                <h3 className="text-3xl font-semibold"> Dashboard 📈 </h3> 
                {/* ➡️ Statistics📈📉📊 */}
              </div>
              <section className="firlin">
                <section className="chiffres">
                  <div className="carre">
                    <div className="star">
                      <h5 className="font-semibold">Total Employees</h5>
                      <i className="fa-solid fa-address-card"></i>
                    </div>
                    <div className="starr">
                      <h3>57</h3>
                    </div>
                    <div className="starrr">
                      <i className="text-green-500">+3.5%</i>
                      <p className="text-gray-400">Since last month</p>
                    </div>
                  </div>
                  <div className="carre">
                    <div className="star">
                      <h5 className="font-semibold">Total Client Companies</h5>
                      <i className="fa-solid fa-users-rectangle"></i>
                    </div>
                    <div className="starr">
                      <h3>8912</h3>
                    </div>
                    <div className="starrr">
                      <i className="text-green-500">+0.13%</i>
                      <p className="text-gray-400">Since last month</p>
                    </div>
                  </div>
                  <div className="carre">
                    <div className="star">
                      <h5 className="font-semibold">Monthly Sales</h5>
                      <i className="fa-solid fa-wallet"></i>
                    </div>
                    <div className="starr">
                      <h3>17.8K</h3>
                    </div>
                    <div className="starrr">
                      <i className="text-green-500">+5%</i>
                      <p className="text-gray-400">Since last month</p>
                    </div>
                  </div>
                  <div className="carre">
                    <div className="star">
                      <h5 className="font-semibold">Yearly Sales</h5>
                      <i className="fa-solid fa-sack-dollar"></i>
                    </div>
                    <div className="starr">
                      <h3>2.48M</h3>
                    </div>
                    <div className="starrr">
                      <i className="text-red-500">-1.04%</i>
                      <p className="text-gray-400">Since last year</p>
                    </div>
                  </div>
                </section>
                <div className="graph">
                  <h5 className="char-title font-semibold mb-8">Subscriptions Per Month</h5>
                  <div id="spline-area-chart">
                  <BarChart
                    width={700}
                    height={270}
                    data={data}
                  >
                    {/* Removed CartesianGrid component */}
                    {/* <Tooltip /> */}
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} barSize={40}>
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={"#ff77d8"} />
                      ))}
                    </Bar>
                  </BarChart>
                  </div>
                </div>
              </section>
              <section className="seclin">
                <div className="clothing-brands">
                  <h5 className="char-title font-semibold mb-4">Subscription Packages Ranking 🥇</h5>
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                              <tr>
                                  <th scope="col" className="px-6 py-3">
                                      Pack name
                                  </th>
                                  <th scope="col" className="px-6 py-3">
                                      Category
                                  </th>
                                  <th scope="col" className="px-6 py-3">
                                      Price
                                  </th>
                                  <th scope="col" className="px-6 py-3">
                                      Rank
                                  </th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr className="odd:bg-white  even:bg-gray-50  border-b ">
                                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                      Business Premium
                                  </th>
                                  <td className="px-6 py-4">
                                      Per Month
                                  </td>
                                  <td className="px-6 py-4">
                                      25DT
                                  </td>
                                  <td className="px-6 py-4">
                                      <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">1</a>
                                  </td>
                              </tr>
                              <tr className="odd:bg-white  even:bg-gray-50  border-b ">
                                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                      Pro Entreprise
                                  </th>
                                  <td className="px-6 py-4">
                                  Per User
                                  </td>
                                  <td className="px-6 py-4">
                                      19DT
                                  </td>
                                  <td className="px-6 py-4">
                                      <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">2</a>
                                  </td>
                              </tr>
                              <tr className="odd:bg-white  even:bg-gray-50  border-b ">
                                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                      Big Corp
                                  </th>
                                  <td className="px-6 py-4">
                                      Per User
                                  </td>
                                  <td className="px-6 py-4">
                                      87DT
                                  </td>
                                  <td className="px-6 py-4">
                                      <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">3</a>
                                  </td>
                              </tr>
                              <tr className="odd:bg-white  even:bg-gray-50  border-b ">
                                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                      Custom Plus
                                  </th>
                                  <td className="px-6 py-4">
                                  Per User
                                  </td>
                                  <td className="px-6 py-4">
                                      7DT
                                  </td>
                                  <td className="px-6 py-4">
                                      <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">4</a>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
                </div>
                <div className="employees">
                  <h5 className="char-title font-semibold">Companies Per Pack</h5>
                  <div className="mt-4 w-full h-[270px] flex justify-center items-center">
                  <PieChart width={400} height={400}>
                      <Pie
                        data={datas}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={130}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </div>
                    

                </div>
              </section>
            </main>
        </div>
    </div>
    
  );
}