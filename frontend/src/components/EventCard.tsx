interface EventProps {
  event: {
    _id: string;
    title: string;
    description: string;
    date: string;
    location: string;
  };
}

const EventCard = ({ event }: EventProps) => {
  return (
    <div className="p-4 border rounded-lg shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{event.title}</h2>
      <p className="text-gray-600">{event.description}</p>
      <p className="text-sm mt-2">
        📍 {event.location} | 📅 {new Date(event.date).toLocaleDateString()}
      </p>
    </div>
  );
};

export default EventCard;
