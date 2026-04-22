import { useForm } from 'react-hook-form';
import { supabase } from '../../api/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function RegisterForm() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm();

    const onSubmit = async (data) => {
        try {
            // 1. Supabase Auth ile kullanıcı oluşturma
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    // Bu kısım SQL trigger'ın full_name'i yakalamasını sağlar
                    data: {
                        full_name: data.fullName,
                    },
                },
            });

            if (authError) throw authError;

            if (authData.user) {
                toast.success("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
                // Kayıt sonrası kullanıcıyı giriş sayfasına yönlendiriyoruz
                navigate('/login');
            }

        } catch (error) {
            toast.error("Kayıt işlemi başarısız: " + error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-indigo-600">Hesap Oluştur</h2>
                    <p className="text-gray-500 mt-2">Kampüs etkinliklerine katılmak için kayıt ol.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Ad Soyad */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Ad Soyad</label>
                        <input
                            {...register('fullName', { required: "Ad Soyad gereklidir" })}
                            type="text"
                            className={`w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${errors.fullName ? 'border-red-500' : 'border-gray-200'}`}
                            placeholder="Örn: Ahmet Yılmaz"
                        />
                        {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>}
                    </div>

                    {/* E-posta */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">E-posta Adresi</label>
                        <input
                            {...register('email', {
                                required: "E-posta gereklidir",
                                pattern: { value: /^\S+@\S+$/i, message: "Geçerli bir e-posta giriniz" }
                            })}
                            type="email"
                            className={`w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                            placeholder="okulno@edu.tr"
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Şifre */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Şifre</label>
                        <input
                            {...register('password', {
                                required: "Şifre gereklidir",
                                minLength: { value: 6, message: "Şifre en az 6 karakter olmalı" }
                            })}
                            type="password"
                            className={`w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${errors.password ? 'border-red-500' : 'border-gray-200'}`}
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Kayıt Butonu */}
                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:bg-gray-400"
                    >
                        {isSubmitting ? 'Hesap Oluşturuluyor...' : 'Kayıt Ol'}
                    </button>
                </form>

                {/* Giriş Linki */}
                <div className="mt-8 text-center border-t pt-6">
                    <p className="text-gray-600 text-sm">
                        Zaten bir hesabın var mı?{' '}
                        <Link to="/login" className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors">
                            Giriş Yap
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}