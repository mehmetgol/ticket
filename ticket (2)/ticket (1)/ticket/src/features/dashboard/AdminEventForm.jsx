import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { supabase } from '../../api/supabaseClient.js';
import toast from 'react-hot-toast';

// 1. Validasyon Şeması (Madde 7 Gereksinimi)
const eventSchema = Yup.object().shape({
    title: Yup.string().required('Etkinlik adı zorunlu').min(5, 'En az 5 karakter olmalı'),
    category: Yup.string().required('Kategori seçiniz'),
    price: Yup.number().typeError('Sayı girilmelidir').min(0, 'Fiyat 0 veya daha fazla olmalı').required('Fiyat zorunlu'),
    location: Yup.string().required('Konum/Mekan zorunlu'),
    date: Yup.string().required('Tarih seçimi zorunlu'),
});

export default function AdminEventForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(eventSchema)
    });

    // 2. Supabase'e Veri Gönderme (Madde 3 Gereksinimi)
    const onSubmit = async (data) => {
        try {
            const { error } = await supabase
                .from('events')
                .insert([{
                    title: data.title,
                    category: data.category,
                    price: Number(data.price),
                    location: data.location,
                    date: data.date,
                    image_url: `https://picsum.photos/seed/${Math.random()}/400/200`
                }]);

            if (error) throw error;

            toast.success("Etkinlik başarıyla veritabanına eklendi! 🚀");
            reset(); // Formu temizle
        } catch (error) {
            toast.error("Hata: " + error.message);
        }
    };

    return (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">Yeni Etkinlik Oluştur</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Etkinlik Adı */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Etkinlik Başlığı</label>
                    <input
                        {...register('title')}
                        className={`w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${errors.title ? 'border-red-500' : 'border-gray-200'}`}
                        placeholder="Örn: Kariyer Zirvesi 2026"
                    />
                    <p className="text-xs text-red-500 mt-1">{errors.title?.message}</p>
                </div>

                {/* Kategori */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Kategori</label>
                    <select
                        {...register('category')}
                        className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Seçiniz</option>
                        <option value="Festival">Festival</option>
                        <option value="Eğitim">Eğitim</option>
                        <option value="Seminer">Seminer</option>
                        <option value="Spor">Spor</option>
                    </select>
                    <p className="text-xs text-red-500 mt-1">{errors.category?.message}</p>
                </div>

                {/* Fiyat */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Bilet Fiyatı (TL)</label>
                    <input
                        {...register('price')}
                        type="number"
                        className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="0 (Ücretsiz ise)"
                    />
                    <p className="text-xs text-red-500 mt-1">{errors.price?.message}</p>
                </div>

                {/* Konum */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Konum</label>
                    <input
                        {...register('location')}
                        className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Örn: Konferans Salonu A"
                    />
                    <p className="text-xs text-red-500 mt-1">{errors.location?.message}</p>
                </div>

                {/* Tarih */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Etkinlik Tarihi</label>
                    <input
                        {...register('date')}
                        type="date"
                        className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <p className="text-xs text-red-500 mt-1">{errors.date?.message}</p>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-4 text-white font-bold rounded-2xl shadow-lg transition-all ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'}`}
                    >
                        {isSubmitting ? 'Kaydediliyor...' : 'Etkinliği Yayınla'}
                    </button>
                </div>
            </form>
        </div>
    );
}