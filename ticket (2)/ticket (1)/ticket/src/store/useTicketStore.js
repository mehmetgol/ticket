import { create } from 'zustand';

export const useTicketStore = create((set) => ({
    selectedEvent: null,
    purchasedTickets: [],

    selectEvent: (event) => set({ selectedEvent: event }),
    confirmPurchase: (ticket) => set((state) => ({
        purchasedTickets: [...state.purchasedTickets, ticket],
        selectedEvent: null
    })),
}));