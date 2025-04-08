import Overview from '../components/Overview';
import DataTable from '../components/DataTable';
import Header from "../components/Header";

const Dashboard = () => {
  return (
    <div className="space-y-4 bg-white-50 min-h-screen">
      <Header />
      <div className="grid gap-4">
        <Overview />
        <DataTable />
      </div>
    </div>
  );
};

export default Dashboard;
