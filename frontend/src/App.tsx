import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'
import { AppLayout } from './app/layout/AppLayout'
import { PortalLayout } from './app/layout/PortalLayout'
import { AdminLayout } from './app/layout/AdminLayout'
import { AuthProvider, ProtectedRoute } from './hooks/AuthContext'

const HomePage = lazy(() => import('./pages/home/HomePage').then(m => ({ default: m.HomePage })))
const AboutPage = lazy(() => import('./pages/about/AboutPage').then(m => ({ default: m.AboutPage })))
const TeamPage = lazy(() => import('./pages/about/TeamPage').then(m => ({ default: m.TeamPage })))
const TeamProfilePage = lazy(() =>
  import('./pages/about/TeamProfilePage').then(m => ({ default: m.TeamProfilePage })),
)
const PartnersPage = lazy(() => import('./pages/about/PartnersPage').then(m => ({ default: m.PartnersPage })))
const CataloguePage = lazy(() => import('./pages/catalogue/CataloguePage').then(m => ({ default: m.CataloguePage })))
const ResearchPage = lazy(() => import('./pages/research/ResearchPage').then(m => ({ default: m.ResearchPage })))
const ResourcesPage = lazy(() => import('./pages/resources/ResourcesPage').then(m => ({ default: m.ResourcesPage })))
const GovernanceStructurePage = lazy(() =>
  import('./pages/resources/GovernanceStructurePage').then(m => ({ default: m.GovernanceStructurePage })),
)
const DataManagementPage = lazy(() =>
  import('./pages/resources/DataManagementPage').then(m => ({ default: m.DataManagementPage })),
)
const SteeringCommitteePage = lazy(() =>
  import('./pages/governance/SteeringCommitteePage').then(m => ({ default: m.SteeringCommitteePage })),
)
const SteeringCommitteeProfilePage = lazy(() =>
  import('./pages/governance/SteeringCommitteeProfilePage').then(m => ({ default: m.SteeringCommitteeProfilePage })),
)
const DataAccessCommitteePage = lazy(() =>
  import('./pages/governance/DataAccessCommitteePage').then(m => ({ default: m.DataAccessCommitteePage })),
)
const DataAccessCommitteeProfilePage = lazy(() =>
  import('./pages/governance/DataAccessCommitteeProfilePage').then(m => ({ default: m.DataAccessCommitteeProfilePage })),
)
const DataSubmitAccessPage = lazy(() =>
  import('./pages/data/DataSubmitAccessPage').then(m => ({ default: m.DataSubmitAccessPage })),
)
const DataBenefitsPage = lazy(() =>
  import('./pages/data/DataBenefitsPage').then(m => ({ default: m.DataBenefitsPage })),
)
const DataPrivacyPage = lazy(() =>
  import('./pages/data/DataPrivacyPage').then(m => ({ default: m.DataPrivacyPage })),
)
const QAPage = lazy(() => import('./pages/qa/QAPage').then(m => ({ default: m.QAPage })))
const LoginPage = lazy(() => import('./pages/auth/LoginPage').then(m => ({ default: m.LoginPage })))
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage').then(m => ({ default: m.RegisterPage })))
const DashboardOverviewPage = lazy(() =>
  import('./portal/dashboard/DashboardOverviewPage').then(m => ({ default: m.DashboardOverviewPage })),
)
const InternalCataloguePage = lazy(() =>
  import('./portal/catalogue/InternalCataloguePage').then(m => ({ default: m.InternalCataloguePage })),
)
const SubmitDatasetPage = lazy(() =>
  import('./portal/submit-dataset/SubmitDatasetPage').then(m => ({ default: m.SubmitDatasetPage })),
)
const MySubmissionsPage = lazy(() =>
  import('./portal/my-submissions/MySubmissionsPage').then(m => ({ default: m.MySubmissionsPage })),
)
const RequestAccessPage = lazy(() =>
  import('./portal/request-access/RequestAccessPage').then(m => ({ default: m.RequestAccessPage })),
)
const MyRequestsPage = lazy(() =>
  import('./portal/my-requests/MyRequestsPage').then(m => ({ default: m.MyRequestsPage })),
)
const MetadataReviewPage = lazy(() =>
  import('./portal/metadata-review/MetadataReviewPage').then(m => ({ default: m.MetadataReviewPage })),
)
const AdminDashboardPage = lazy(() =>
  import('./admin/admin-dashboard/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })),
)
const ReviewRequestsPage = lazy(() =>
  import('./admin/review-requests/ReviewRequestsPage').then(m => ({ default: m.ReviewRequestsPage })),
)
const QaMetadataPage = lazy(() =>
  import('./admin/qa-metadata/QaMetadataPage').then(m => ({ default: m.QaMetadataPage })),
)
const UserManagementPage = lazy(() =>
  import('./admin/user-management/UserManagementPage').then(m => ({ default: m.UserManagementPage })),
)
const GovernanceCrmPage = lazy(() =>
  import('./admin/governance-crm/GovernanceCrmPage').then(m => ({ default: m.GovernanceCrmPage })),
)

function App() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center text-xs text-text/70">
            Loading HDRWA interface…
          </div>
        }
      >
        <ScrollToTop />
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/team/:slug" element={<TeamProfilePage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/governance/steering-committee" element={<SteeringCommitteePage />} />
            <Route path="/governance/steering-committee/:slug" element={<SteeringCommitteeProfilePage />} />
            <Route path="/governance/data-access-committee" element={<DataAccessCommitteePage />} />
            <Route path="/governance/data-access-committee/:slug" element={<DataAccessCommitteeProfilePage />} />
            <Route path="/data/submit" element={<DataSubmitAccessPage />} />
            <Route path="/data/access" element={<DataSubmitAccessPage />} />
            <Route path="/data/benefits" element={<DataBenefitsPage />} />
            <Route path="/data/privacy" element={<DataPrivacyPage />} />
            <Route path="/catalogue" element={<CataloguePage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/resources/governance-structure" element={<GovernanceStructurePage />} />
            <Route path="/resources/data-management" element={<DataManagementPage />} />
            <Route path="/qa" element={<QAPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route
            path="/portal"
            element={
              <ProtectedRoute>
                <PortalLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardOverviewPage />} />
            <Route path="dashboard" element={<DashboardOverviewPage />} />
            <Route path="catalogue" element={<InternalCataloguePage />} />
            <Route path="submit-dataset" element={<SubmitDatasetPage />} />
            <Route path="my-submissions" element={<MySubmissionsPage />} />
            <Route path="request-access" element={<RequestAccessPage />} />
            <Route path="my-requests" element={<MyRequestsPage />} />
            <Route path="metadata-review" element={<MetadataReviewPage />} />
          </Route>

          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboardPage />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="review-requests" element={<ReviewRequestsPage />} />
            <Route path="qa-metadata" element={<QaMetadataPage />} />
            <Route path="user-management" element={<UserManagementPage />} />
            <Route path="governance-crm" element={<GovernanceCrmPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  )
}

export default App
