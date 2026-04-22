import { useState } from 'react';
import { DUMMY_EVENTS } from './eventData';
import EventCard from './EventCard';

export default function EventList() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredEvents = DUMMY_EVENTS.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-3xl font-bold text-gray-800">Kampüs Etkinlikleri</h1>
                <input
                    type="text"
                    placeholder="Etkinlik ara..."
                    className="px-4 py-2 border rounded-lg w-full md:w-64 focus:ring-2 focus:ring-indigo-500 outline-none"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
}