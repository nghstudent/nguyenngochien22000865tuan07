// import Overview from '../components/Overview';
// import DataTable from '../components/DataTable';
// import Header from "../components/Header";

// const Dashboard = () => {
//   return (
//     <div className="space-y-4 bg-white-50 min-h-screen">
//       <Header />
//       <div className="grid gap-4">
//         <Overview />
//         <DataTable />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import Overview from '../components/Overview';
import DataTable from '../components/DataTable';
import Header from "../components/Header";

const Dashboard = () => {
  return (
    <div className="space-y-4 bg-white-50 min-h-screen" style={{ backgroundColor: '#f0f0f0', padding: '16px' }}>
      <div style={{ 
        border: '2px solid #007bff', 
        borderRadius: '8px', 
        padding: '16px', 
        backgroundColor: '#e9f5ff' 
      }}>
        <Header />
      </div>

      <div style={{ 
        border: '2px solid #28a745', 
        borderRadius: '8px', 
        padding: '16px', 
        backgroundColor: '#f0fff5' 
      }}>
        <div className="grid gap-4">
          <Overview />
          <DataTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
