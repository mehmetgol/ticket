import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export default function Navbar() {
    const { user, isAuthenticated, logout } = useAuthStore();

    // ROL BAZLI PANEL YÖNLENDİRMESİ
    const getPanelLink = () => {
        if (user?.role === 'Admin') return '/admin-panel';
        if (user?.role === 'Supplier') return '/supplier-panel'; // Yeni eklediğimiz kısım
        return '/student-panel';
    };

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="text-xl font-bold text-indigo-600 tracking-tight flex items-center gap-1">
                    <span className="bg-indigo-600 text-white px-2 py-1 rounded">K</span>
                    <span>KAMPÜS<span className="text-gray-800">BİLET</span></span>
                </Link>

                <div className="flex items-center gap-6 text-sm font-medium">
                    <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors">Etkinlikler</Link>

                    {isAuthenticated ? (
                        <>
                            {/* Panelim linki kullanıcının rolüne göre dinamikleşti */}
                            <Link
                                to={getPanelLink()}
                                className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-all font-semibold border border-indigo-100"
                            >
                                {user?.role} Paneli
                            </Link>

                            <button
                                onClick={logout}
                                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors border border-red-100"
                            >
                                Çıkış Yap
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                to="/login"
                                className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-shadow shadow-md shadow-indigo-100 font-semibold"
                            >
                                Giriş Yap
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}