import { useUser } from "../contexts/UserContext";
import BookingSummary from "./BookingSummary";

interface BookingSummaryWrapperProps {
  bookingData: {
    vehicle: any;
    details: any;
  };
  onBack: () => void;
  onSuccess: () => void;
}

export default function BookingSummaryWrapper({ bookingData, onBack, onSuccess }: BookingSummaryWrapperProps) {
  const { customerName } = useUser();

  return (
    <BookingSummary
      onBack={onBack}
      onConfirmBooking={async () => {
        // Handle booking confirmation
        const bookingDataPayload = {
          vehicle: bookingData.vehicle.id,
          customer_name: customerName,
          start_time: bookingData.details.startTime.toISOString(),
          end_time: bookingData.details.endTime.toISOString(),
          distance_km: bookingData.details.distanceKm,
          passengers: bookingData.details.passengers
        };

        const response = await fetch('http://127.0.0.1:8000/api/bookings/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingDataPayload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create booking');
        }

        const data = await response.json();
        alert(`Booking successful! Total price: R${data.price}`);
        onSuccess();
      }}
      vehicle={bookingData.vehicle}
      bookingDetails={bookingData.details}
    />
  );
}
