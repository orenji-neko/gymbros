import { useState } from "react"

const useEquipment = (token) => {

  const get = async () => {
    const response = await fetch("/api/equipment", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    const result = await response.json();
    return result;
  }

  const post = async (program) => {
    const response = await fetch("/api/equipment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: program.name,
        type: program.type,
      })
    })
    const result = await response.json();
    return result;
  }

  const put = async (program) => {
    const response = await fetch(`/api/equipment/${program.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: program.name,
        type: program.type,
      })
    })
    const result = await response.json();
    return result;
  }

  const del = async (program) => {
    const response = await fetch(`/api/equipment/${program.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    const result = await response.json();
    return result;
  }

  return { get, post, put, del } 
}

export default useEquipment;