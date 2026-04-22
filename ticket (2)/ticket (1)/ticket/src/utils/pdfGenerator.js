import { jsPDF } from "jspdf";

export const generateTicketPDF = (ticket) => {
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [150, 100]
    });

    // Stil Ekleme
    doc.setFillColor(79, 70, 229); // Indigo renk
    doc.rect(0, 0, 150, 20, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text("KAMPUS ETKINLIK BILETI", 10, 13);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`Etkinlik: ${ticket.eventTitle}`, 10, 40);
    doc.text(`Katılımcı: ${ticket.userName}`, 10, 55);
    doc.text(`Tarih: ${ticket.date}`, 10, 70);
    doc.text(`Bilet No: ${ticket.id.toUpperCase()}`, 10, 85);

    doc.save(`Bilet-${ticket.id}.pdf`);
};