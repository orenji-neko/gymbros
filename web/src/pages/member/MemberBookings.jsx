import { useEffect, useState } from "react";
import Grid, { GridItem } from "../../components/Grid";
import { Button, EditButton, DeleteButton, AddButton } from "../../components/buttons";
import LoadingCircle from "../../components/LoadingCircle";
import Modal from "../../components/modals/Modal";
import TextInput from "../../components/inputs/TextInput";
import useEquipment from "../../hooks/api/useEquipment";
import useBookings from "../../hooks/api/useBookings";
import { useAuth } from "../../hooks/api/useAuth";

const MemberBookings = () => {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const { token } = useAuth();
  const bookingApi = useBookings(token);

  useEffect(() => {
    const id = setTimeout(async () => {

      const res1 = await bookingApi.get();
      setBookings(res1.data);
      console.log(res1);

      setLoading(false);
    }, 1000);

    return () => clearTimeout(id);
  }, [bookingApi]);

  const cancelBooking = (booking) => {
    bookingApi.cancelBooking(booking);
  }

  return (
    <div>
      {/* Modals */}
      <Modal>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold"> Modal </h1>
        </div>
      </Modal>

      {/* Content */}
      {loading ? (
        <div className="flex w-full justify-center p-4">
          <LoadingCircle />
        </div>
      ) : (
        <div>
          <h1 className="p-4 text-3xl font-bold">Bookings</h1>
          {(bookings && bookings.length > 0) ? (
            <Grid columns={2}>
              {bookings.map((booking, index) => (
                <GridItem key={index} className="p-4 bg-white shadow-lg rounded-lg space-y-2">
                  <div className="flex flex-row justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">{booking.program.name}</h2>
                  </div>
                  <p className="text-md font-bold"> Description:  </p>
                  <p className="text-md"> &nbsp;{booking.program.description} </p>
                  <p className="text-md font-bold"> Status:  </p>
                  <p className={`
                    ${booking.status === 'Pending' ? 'text-yellow-500' : 
                      booking.status === 'Ongoing' ? 'text-green-500' :
                      booking.status === 'Cancelled' ? 'text-red-500' :
                      'text-blue-500'
                    }
                    `}
                    > 
                    &nbsp;{booking.status} 
                  </p>

                  <Button
                    disabled={booking.status === "Cancelled" || booking.status === "Finished"}
                    onClick={() => cancelBooking(booking)}
                  > Cancel 
                  </Button>
                </GridItem>                
              ))}
            </Grid>
          ) : (
            <p className="text-center p-4">No equipment found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MemberBookings;