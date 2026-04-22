import { useForm } from 'react-hook-form';
import { supabase } from '../../api/supabaseClient';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function LoginForm() {
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        // Form verilerindeki olası boşlukları temizleyelim (trim)
        const email = data.email.trim();
        const password = data.password;

        try {
            // 1. Supabase Auth Girişi
            const { data: authResult, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) {
                // Eğer hata 'Invalid login credentials' ise kullanıcıya daha net bilgi verelim
                if (authError.message.includes("Invalid login credentials")) {
                    throw new Error("E-posta veya şifre hatalı.");
                }
                throw authError;
            }

            const user = authResult.user;

            // 2. Profil Bilgisini Çekme
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('role, full_name')
                .eq('id', user.id)
                .maybeSingle();

            if (profileError) throw profileError;

            // Eğer auth başarılı ama profile tablosunda satır yoksa (Trigger çalışmamış demektir)
            if (!profileData) {
                toast.error("Giriş başarılı ancak profil kaydınız bulunamadı. Lütfen yöneticiyle iletişime geçin.");
                return;
            }

            // 3. Store Güncelleme
            login({
                id: user.id,
                email: user.email,
                name: profileData.full_name,
                role: profileData.role
            });

            toast.success(`Hoş geldin ${profileData.full_name}!`);

            // 4. Yönlendirme
            if (profileData.role === 'Admin') {
                navigate('/admin-panel');
            } else {
                navigate('/student-panel');
            }

        } catch (error) {
            console.error("Login Error:", error);
            toast.error(error.message || "Giriş yapılırken bir hata oluştu.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border">
                <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Giriş Yap</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                        <input
                            {...register('email')}
                            type="email"
                            placeholder="E-posta"
                            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
                        <input
                            {...register('password')}
                            type="password"
                            placeholder="Şifre"
                            className="w-full p-3 border rounded-xl mb-2 outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <button
                        disabled={isSubmitting}
                        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 disabled:bg-gray-400 transition-colors shadow-lg shadow-indigo-100 mt-2"
                    >
                        {isSubmitting ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                    </button>
                </div>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Hesabınız yok mu?{' '}
                    <Link to="/register" className="text-indigo-600 font-bold hover:underline">
                        Hemen Kayıt Ol
                    </Link>
                </p>
            </form>
        </div>
    );
}