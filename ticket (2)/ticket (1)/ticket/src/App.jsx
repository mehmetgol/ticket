import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Bileşenlerin Import Edilmesi
import Navbar from './components/Navbar';
import LoginForm from './features/auth/LoginForm';
import RegisterForm from './features/auth/RegisterForm';
import EventList from './features/events/EventList';
import AdminDashboard from './features/dashboard/AdminDashboard';
import UserDashboard from './features/dashboard/UserDashboard';
// --- YENİ EKLEME ---
import SupplierDashboard from './features/dashboard/SupplierDashboard';
// -------------------
import TicketModal from './features/ticketing/TicketModal';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <Toaster position="top-right" reverseOrder={false} />
            <TicketModal />
            <Navbar />

            <main className="container mx-auto px-4 py-6">
                <Routes>
                    {/* Herkese Açık Sayfalar */}
                    <Route path="/" element={<EventList />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />

                    {/* Öğrenci Paneli */}
                    <Route
                        path="/student-panel"
                        element={
                            <ProtectedRoute allowedRoles={['Student']}>
                                <UserDashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* --- TEDARİKÇİ PANELİ (YENİ EKLEME) --- */}
                    <Route
                        path="/supplier-panel"
                        element={
                            <ProtectedRoute allowedRoles={['Supplier']}>
                                <SupplierDashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* Admin Paneli */}
                    <Route
                        path="/admin-panel"
                        element={
                            <ProtectedRoute allowedRoles={['Admin']}>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* Hatalı adres yönetimi */}
                    <Route path="*" element={<EventList />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;