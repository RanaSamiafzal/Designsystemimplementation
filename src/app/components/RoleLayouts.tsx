import { Outlet, useNavigate } from 'react-router';
import { DashboardLayout } from './DashboardLayout';

export function BrandLayout() {
  const navigate = useNavigate();
  return (
    <DashboardLayout
      userRole="brand"
      userName="BravoTech"
      userEmail="contact@bravotech.com"
      notificationCount={3}
      onLogout={() => navigate('/login')}
    >
      <Outlet />
    </DashboardLayout>
  );
}

export function InfluencerLayout() {
  const navigate = useNavigate();
  return (
    <DashboardLayout
      userRole="influencer"
      userName="Sarah Johnson"
      userEmail="sarah@example.com"
      notificationCount={8}
      onLogout={() => navigate('/login')}
    >
      <Outlet />
    </DashboardLayout>
  );
}

export function AdminLayout() {
  const navigate = useNavigate();
  return (
    <DashboardLayout
      userRole="admin"
      userName="Admin User"
      userEmail="admin@brandly.com"
      notificationCount={1}
      onLogout={() => navigate('/login')}
    >
      <Outlet />
    </DashboardLayout>
  );
}
