import React, { useState } from 'react';
import { Plus, Trash2, Calendar, LayoutDashboard, LogOut, X, MapPin } from 'lucide-react';

const SupplierDashboard = () => {
    // Varsayılan Etkinlikler
    const [events, setEvents] = useState([
        { id: 1, title: 'AI ve Gelecek Konferansı', date: '2026-05-10', location: 'İstanbul' },
        { id: 2, title: 'React Performance Workshop', date: '2026-06-15', location: 'Online' },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', date: '', location: '' });

    // YENİ ETKİNLİK EKLEME FONKSİYONU
    const handleAddEvent = (e) => {
        e.preventDefault();

        // Basit bir ID oluşturma ve listeye ekleme
        const eventToAdd = {
            ...newEvent,
            id: Date.now()
        };

        setEvents([eventToAdd, ...events]); // Yeni geleni en başa ekle
        setShowModal(false); // Modalı kapat
        setNewEvent({ title: '', date: '', location: '' }); // Formu temizle
    };

    // ETKİNLİK SİLME FONKSİYONU
    const handleDelete = (id) => {
        if(window.confirm("Bu etkinliği silmek istediğinize emin misiniz?")) {
            setEvents(events.filter(event => event.id !== id));
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">

            {/* SIDEBAR */}
            <div className="w-64 bg-gray-900 text-white p-6 hidden md:flex flex-col">
                <h1 className="text-xl font-bold mb-10 border-b border-gray-700 pb-4">Tedarikçi Paneli</h1>
                <nav className="flex-1 space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-blue-600 rounded-lg cursor-pointer transition-all">
                        <LayoutDashboard size={20}/> Dashboard
                    </div>
                    <div className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg cursor-pointer transition-colors text-gray-400 hover:text-white">
                        <Calendar size={20}/> Etkinliklerim
                    </div>
                </nav>
                <button className="flex items-center gap-3 p-3 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors mt-auto">
                    <LogOut size={20}/> Çıkış Yap
                </button>
            </div>

            {/* ANA İÇERİK ALANI */}
            <main className="flex-1 p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Etkinlik Yönetimi</h2>
                            <p className="text-gray-500 mt-1">Toplam {events.length} aktif etkinliğiniz var.</p>
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
                        >
                            <Plus size={20}/> Yeni Etkinlik
                        </button>
                    </div>

                    {/* ETKİNLİK KARTLARI LİSTESİ */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <div key={event.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative group hover:shadow-md transition-shadow">
                                <button
                                    onClick={() => handleDelete(event.id)}
                                    className="absolute top-4 right-4 text-gray-300 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-full"
                                    title="Etkinliği Sil"
                                >
                                    <Trash2 size={18}/>
                                </button>

                                <div className="space-y-4">
                                    <div className="bg-blue-50 text-blue-600 w-10 h-10 rounded-lg flex items-center justify-center">
                                        <Calendar size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-gray-800 mb-2 leading-tight">{event.title}</h3>
                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-500 flex items-center gap-2">
                                                <Calendar size={14} className="text-blue-500"/> {new Date(event.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </p>
                                            <p className="text-sm text-gray-500 flex items-center gap-2 italic">
                                                <MapPin size={14} className="text-red-400"/> {event.location}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* BOŞ DURUM MESAJI */}
                    {events.length === 0 && (
                        <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                <Calendar size={32} />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">Henüz etkinlik yok</h3>
                            <p className="text-gray-500">Yeni bir etkinlik oluşturarak başlayın.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* EKLEME MODAL (POP-UP) */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl transform transition-all">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-800">Yeni Etkinlik Ekle</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={24}/>
                            </button>
                        </div>

                        <form onSubmit={handleAddEvent} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700">Etkinlik Adı</label>
                                <input
                                    required
                                    placeholder="Örn: Teknoloji Zirvesi"
                                    type="text"
                                    className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    value={newEvent.title}
                                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-700">Tarih</label>
                                    <input
                                        required
                                        type="date"
                                        className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        value={newEvent.date}
                                        onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-700">Konum</label>
                                    <input
                                        required
                                        placeholder="Şehir veya Online"
                                        type="text"
                                        className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        value={newEvent.location}
                                        onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                                >
                                    İptal
                                </button>
                                <button
                                    type="submit"
                                    className="flex-[2] bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
                                >
                                    Etkinliği Oluştur
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SupplierDashboard;