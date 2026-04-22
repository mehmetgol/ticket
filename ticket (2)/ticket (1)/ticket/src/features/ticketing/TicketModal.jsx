import { useTicketStore } from '../../store/useTicketStore';
import { useAuthStore } from '../../store/useAuthStore';
import { generateTicketPDF } from '../../utils/pdfGenerator';
import toast from 'react-hot-toast';

export default function TicketModal() {
    // Global state'ten verileri çekiyoruz
    const { selectedEvent, selectEvent, confirmPurchase } = useTicketStore();
    const { user } = useAuthStore();

    // Eğer seçili bir etkinlik yoksa modalı gösterme
    if (!selectedEvent) return null;

    const handleConfirm = () => {
        // Yeni bir bilet objesi oluşturuyoruz
        const newTicket = {
            id: Math.random().toString(36).substr(2, 9).toUpperCase(),
            eventTitle: selectedEvent.title,
            userName: user?.name || "Misafir Kullanıcı",
            userEmail: user?.email || "E-posta yok",
            date: new Date().toLocaleDateString('tr-TR'),
            location: selectedEvent.location
        };

        // 1. State'e kaydet
        confirmPurchase(newTicket);

        // 2. Başarı bildirimi göster
        toast.success(`${selectedEvent.title} için biletiniz hazır!`, {
            icon: '🎫',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });

        // 3. Otomatik PDF İndirme (Opsiyonel: Kullanıcıya sormadan indirmek için)
        generateTicketPDF(newTicket);

        // 4. Modalı kapat
        selectEvent(null);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all">
                {/* Modal Header */}
                <div className="bg-indigo-600 p-6 text-white">
                    <h2 className="text-2xl font-bold">Bilet Onayı</h2>
                    <p className="opacity-80 text-sm">Son bir adım kaldı!</p>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-4">
                    <div className="border-b pb-4">
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Etkinlik Adı</p>
                        <p className="text-lg font-semibold text-gray-800">{selectedEvent.title}</p>
                    </div>

                    <div className="flex justify-between">
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Konum</p>
                            <p className="text-sm font-medium">📍 {selectedEvent.location}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-500 uppercase font-bold">Ücret</p>
                            <p className="text-sm font-bold text-indigo-600">
                                {selectedEvent.price === 0 ? 'Ücretsiz' : `${selectedEvent.price} TL`}
                            </p>
                        </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl text-xs text-amber-700">
                        <strong>Not:</strong> Biletiniz onaylandıktan sonra otomatik olarak PDF formatında indirilecektir.
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 bg-gray-50 flex gap-3">
                    <button
                        onClick={() => selectEvent(null)}
                        className="flex-1 py-3 px-4 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-100 transition-all"
                    >
                        Vazgeç
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="flex-1 py-3 px-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
                    >
                        Onayla ve İndir
                    </button>
                </div>
            </div>
        </div>
    );
}