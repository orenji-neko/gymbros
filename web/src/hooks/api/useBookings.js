import { useState } from "react"

const useBookings = (token) => {

  const get = async () => {
    const response = await fetch("/api/bookings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    const result = await response.json();
    return result;
  }

  const post = async (program) => {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        programId: program.id
      })
    })
    const result = await response.json();
    console.log(result);
    return result;
  }

  const cancelBooking = async (booking) => {
    const response = await fetch(`/api/bookings/${booking.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        status: "Cancelled"
      })
    })
    const result = await response.json();
    return result;
  }

  const del = async (program) => {
    const response = await fetch(`/api/programs/${program.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    const result = await response.json();
    return result;
  }

  return { get, post, del, cancelBooking } 
}

export default useBookings;