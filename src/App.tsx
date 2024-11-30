import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { NewProject } from './pages/NewProject';

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/new-project" element={<NewProject />} />
          <Route path="/settings" element={<div>Settings Page</div>} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;