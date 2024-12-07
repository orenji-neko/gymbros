import { useState } from "react"

const usePrograms = (token) => {

  const get = async () => {
    const response = await fetch("/api/programs", {
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
    const response = await fetch("/api/programs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: program.name,
        type: program.type,
        targetMuscleGroup: program.targetMuscleGroup,
        description: program.description,
        equipment: program.equipment,
        duration: parseInt(program.duration),
        difficulty: parseInt(program.difficulty)
      })
    })
    const result = await response.json();
    return result;
  }

  const put = async (program) => {
    const response = await fetch(`/api/programs/${program.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: program.name,
        type: program.type,
        targetMuscleGroup: program.targetMuscleGroup,
        description: program.description,
        equipment: program.equipment,
        duration: program.duration,
        difficulty: program.difficulty
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

  return { get, post, put, del } 
}

export default usePrograms;