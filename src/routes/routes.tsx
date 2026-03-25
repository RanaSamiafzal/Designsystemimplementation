import { createBrowserRouter } from 'react-router';
// Import layouts
import { BrandLayout, InfluencerLayout, AdminLayout } from '../components/layout/RoleLayouts';

// Public pages
import { LandingPage } from '../components/common/LandingPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { SignupPage } from '../pages/auth/SignupPage';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';
import { VerifyOtpPage } from '../pages/auth/VerifyOtpPage';
import { NewPasswordPage } from '../pages/auth/NewPasswordPage';
import { PrivacyPolicyPage } from '../pages/features/PrivacyPolicyPage';
import { AboutUsPage } from '../pages/features/AboutUsPage';
import { ContactPage } from '../pages/features/ContactPage';
import { BlogPage } from '../pages/features/BlogPage';
import { CaseStudiesPage } from '../pages/features/CaseStudiesPage';
import { HelpCenterPage } from '../pages/features/HelpCenterPage';
import { FeaturesPage } from '../pages/features/FeaturesPage';
import { FindMatchesPage } from '../pages/features/FindMatchesPage';
import { CampaignManagementPage } from '../pages/features/CampaignManagementPage';
import { AnalyticsPage } from '../pages/features/AnalyticsPage';
import { VerifiedProfilesPage } from '../pages/features/VerifiedProfilesPage';

// Brand pages
import { BrandDashboard } from '../pages/dashboard/BrandDashboard';
import { SearchInfluencers } from '../pages/dashboard/SearchInfluencers';
import { MyRequests } from '../pages/dashboard/MyRequests';
import { ProfileSettings } from '../pages/profile/ProfileSettings';
import { CreateCampaign } from '../pages/campaigns/CreateCampaign';
import { CollaborationRequestsPage } from '../pages/campaigns/CollaborationRequestsPage';
import { ActiveCampaignsPage } from '../pages/campaigns/ActiveCampaignsPage';
import { PendingCampaignsPage } from '../pages/campaigns/PendingCampaignsPage';
import { InfluencerFoundPage } from '../pages/dashboard/InfluencerFoundPage';
import { CollaborationsPage } from '../pages/campaigns/CollaborationsPage';
import { BrandAnalyticsPage } from '../pages/features/BrandAnalyticsPage';
import { BrandProfileSettings } from '../pages/profile/BrandProfileSettings';
import { CollaborationHubPage } from '../pages/campaigns/CollaborationHubPage';
import { CampaignHubPage } from '../pages/campaigns/CampaignHubPage';
import { CollaborationDetailsPage } from '../pages/campaigns/CollaborationDetailsPage';
import { DeliverableBoardPage } from '../pages/campaigns/DeliverableBoardPage';
import { InfluencerProfilePage } from '../pages/profile/InfluencerProfilePage';

// Influencer pages
import { InfluencerDashboard } from '../pages/dashboard/InfluencerDashboard';
import { InfluencerDashboardPage } from '../pages/dashboard/InfluencerDashboardPage';
import { InfluencerPortfolioPage } from '../pages/profile/InfluencerPortfolioPage';
import { SearchBrandsPage } from '../pages/profile/SearchBrandsPage';
import { InfluencerCollaborationsPage } from '../pages/campaigns/InfluencerCollaborationsPage';
import { InfluencerRequestsPage } from '../pages/campaigns/InfluencerRequestsPage';
import { InfluencerAnalyticsPage } from '../pages/features/InfluencerAnalyticsPage';
import { InfluencerProfileSettings } from '../pages/profile/InfluencerProfileSettings';
import { InfluencerCollaborationDetailsPage } from '../pages/campaigns/InfluencerCollaborationDetailsPage';

// Admin pages
import { AdminPanel } from '../pages/dashboard/AdminPanel';
import { AdminUsers } from '../pages/dashboard/AdminUsers';
import { AdminReports } from '../pages/dashboard/AdminReports';
import { AdminSettings } from '../pages/dashboard/AdminSettings';
import { AdminVerificationsPage } from '../pages/dashboard/AdminVerificationsPage';

export const router = createBrowserRouter([
  // Public Routes
  { path: '/', Component: LandingPage },
  { path: '/login', Component: LoginPage },
  { path: '/signup', Component: SignupPage },
  { path: '/forgot-password', Component: ForgotPasswordPage },
  { path: '/verify-otp', Component: VerifyOtpPage },
  { path: '/new-password', Component: NewPasswordPage },
  { path: '/privacy-policy', Component: PrivacyPolicyPage },
  { path: '/about', Component: AboutUsPage },
  { path: '/contact', Component: ContactPage },
  { path: '/blog', Component: BlogPage },
  { path: '/case-studies', Component: CaseStudiesPage },
  { path: '/help-center', Component: HelpCenterPage },
  { path: '/features', Component: FeaturesPage },
  { path: '/features/find-matches', Component: FindMatchesPage },
  { path: '/features/campaign-management', Component: CampaignManagementPage },
  { path: '/features/analytics', Component: AnalyticsPage },
  { path: '/features/verified-profiles', Component: VerifiedProfilesPage },

  // Brand Routes
  {
    element: <BrandLayout />,
    children: [
      { path: '/dashboard', Component: BrandDashboard },
      { path: '/search', Component: SearchInfluencers },
      { path: '/requests', Component: MyRequests },
      { path: '/create-campaign', Component: CreateCampaign },
      { path: '/settings', Component: ProfileSettings },
      { path: '/profile', Component: ProfileSettings },
      { path: '/influencer/:name', Component: InfluencerProfilePage },
      { path: '/brand/collaboration-requests', Component: CollaborationRequestsPage },
      { path: '/brand/active-campaigns', Component: ActiveCampaignsPage },
      { path: '/brand/pending-campaigns', Component: PendingCampaignsPage },
      { path: '/brand/influencer-found', Component: InfluencerFoundPage },
      { path: '/brand/collaborations', Component: CollaborationsPage },
      { path: '/brand/collaboration/:id', Component: CollaborationDetailsPage },
      { path: '/brand/deliverable-board/:id', Component: DeliverableBoardPage },
      { path: '/brand/analytics', Component: BrandAnalyticsPage },
      { path: '/brand/settings', Component: BrandProfileSettings },
      { path: '/brand/profile-settings', Component: BrandProfileSettings },
      { path: '/brand/collaboration-hub', Component: CollaborationHubPage },
      { path: '/brand/campaign-hub', Component: CampaignHubPage },
    ],
  },

  // Influencer Routes
  {
    element: <InfluencerLayout />,
    children: [
      { path: '/influencer/dashboard', Component: InfluencerDashboard },
      { path: '/influencer/dashboard-page', Component: InfluencerDashboardPage },
      { path: '/influencer/portfolio-page', Component: InfluencerPortfolioPage },
      { path: '/influencer/search-brands', Component: SearchBrandsPage },
      { path: '/influencer/collaborations-page', Component: InfluencerCollaborationsPage },
      { path: '/influencer/collaboration/:id', Component: InfluencerCollaborationDetailsPage },
      { path: '/influencer/deliverable-board/:id', Component: DeliverableBoardPage },
      { path: '/influencer/requests-page', Component: InfluencerRequestsPage },
      { path: '/influencer/analytics-page', Component: InfluencerAnalyticsPage },
      { path: '/influencer/settings', Component: InfluencerProfileSettings },
      { path: '/influencer/profile-settings', Component: InfluencerProfileSettings },
    ],
  },

  // Admin Routes
  {
    element: <AdminLayout />,
    children: [
      { path: '/admin', Component: AdminPanel },
      { path: '/admin/users', Component: AdminUsers },
      { path: '/admin/reports', Component: AdminReports },
      { path: '/admin/settings', Component: AdminSettings },
      { path: '/admin/verifications', Component: AdminVerificationsPage },
    ],
  },

  // Fallback 404
  {
    path: '*',
    Component: () => (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fafb]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#111827] mb-4">404</h1>
          <p className="text-[#6b7280] mb-4">Page not found</p>
          <a href="/" className="text-[#3b82f6] hover:underline">
            Go to Home
          </a>
        </div>
      </div>
    ),
  },
]);