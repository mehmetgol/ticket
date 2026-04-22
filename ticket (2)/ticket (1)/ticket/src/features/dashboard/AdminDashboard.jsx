import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

// Sahte İstatistik Verileri (Hocanın istediği analizler için)
const salesData = [
    { name: 'Pzt', sales: 40 },
    { name: 'Sal', sales: 30 },
    { name: 'Çar', sales: 60 },
    { name: 'Per', sales: 45 },
    { name: 'Cum', sales: 90 },
    { name: 'Cmt', sales: 120 },
    { name: 'Paz', sales: 80 },
];

const categoryData = [
    { name: 'Festival', value: 400, color: '#4f46e5' },
    { name: 'Eğitim', value: 300, color: '#10b981' },
    { name: 'Seminer', value: 200, color: '#f59e0b' },
];

export default function AdminDashboard() {
    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Yönetim Paneli</h1>

            {/* İstatistik Özet Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm">Toplam Bilet Satışı</p>
                    <h2 className="text-3xl font-bold text-indigo-600">1,240</h2>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm">Aktif Etkinlikler</p>
                    <h2 className="text-3xl font-bold text-green-600">12</h2>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm">Toplam Gelir</p>
                    <h2 className="text-3xl font-bold text-orange-600">₺14,500</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Çizgi Grafiği - Satış Trendi */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Haftalık Bilet Satış Trendi</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={3} dot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Bar Grafiği - Kategorilere Göre Dağılım */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Kategoriye Göre İlgi</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={categoryData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}