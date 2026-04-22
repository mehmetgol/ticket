import { useTicketStore } from '../../store/useTicketStore';
import { useAuthStore } from '../../store/useAuthStore';
import { generateTicketPDF } from '../../utils/pdfGenerator';

export default function UserDashboard() {
    const { purchasedTickets } = useTicketStore();
    const { user } = useAuthStore();

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Profilim</h1>
                    <p className="text-gray-600">Hoş geldin, <span className="font-semibold text-indigo-600">{user?.name || 'Öğrenci'}</span></p>
                </header>

                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800">Aldığım Biletler</h2>
                    </div>

                    {purchasedTickets.length === 0 ? (
                        <div className="p-10 text-center text-gray-500">
                            <p className="mb-4">Henüz bir bilet almadınız.</p>
                            <a href="/" className="text-indigo-600 font-semibold hover:underline">Etkinliklere göz at →</a>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {purchasedTickets.map((ticket) => (
                                <div key={ticket.id} className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 hover:bg-gray-50 transition-colors">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800">{ticket.eventTitle}</h3>
                                        <p className="text-sm text-gray-500">📅 {ticket.date} | 🎫 ID: {ticket.id}</p>
                                    </div>
                                    <button
                                        onClick={() => generateTicketPDF(ticket)}
                                        className="w-full md:w-auto px-6 py-2 bg-white border border-indigo-600 text-indigo-600 rounded-xl font-bold hover:bg-indigo-600 hover:text-white transition-all"
                                    >
                                        PDF İndir
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}