import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { NewProject } from './pages/NewProject';
import { EditProject } from './pages/EditProject';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/new-project" element={<NewProject />} />
          <Route path="/edit-project/:id" element={<EditProject />} />
          <Route path="/settings" element={<div>Settings Page</div>} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;