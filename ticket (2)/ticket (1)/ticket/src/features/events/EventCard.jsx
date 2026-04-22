export default function EventCard({ event }) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
            <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
            <div className="p-4">
        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-indigo-600 bg-indigo-100 last:mr-0 mr-1">
          {event.category}
        </span>
                <h3 className="mt-2 text-xl font-bold text-gray-800">{event.title}</h3>
                <p className="text-gray-600 text-sm mt-1">📍 {event.location}</p>
                <p className="text-gray-500 text-sm">📅 {event.date}</p>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-indigo-600">{event.price === 0 ? 'Ücretsiz' : `${event.price} TL`}</span>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                        Bilet Al
                    </button>
                </div>
            </div>
        </div>
    );
}