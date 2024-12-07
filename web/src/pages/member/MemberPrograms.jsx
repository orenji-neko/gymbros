import { useCallback, useEffect, useState } from "react";
import Grid, { GridItem } from "../../components/Grid";
import { Button, EditButton, DeleteButton, AddButton } from "../../components/buttons";
import LoadingCircle from "../../components/LoadingCircle";
import Modal from "../../components/modals/Modal";
import TextInput from "../../components/inputs/TextInput";
import usePrograms from "../../hooks/api/usePrograms";
import useEquipment from "../../hooks/api/useEquipment";
import MultiSelect from "../../components/inputs/MultiSelect";
import { useAuth } from "../../hooks/api/useAuth";
import useBookings from "../../hooks/api/useBookings";
import Selection from "../../components/inputs/Selection";

const MemberPrograms = () => {
  const { token, user } = useAuth();

  const [loading, setLoading] = useState(true);

  const [programs, setPrograms] = useState([]);
  const [programsData, setProgramsData] = useState([]);

  const [equipment, setEquipment] = useState([]);

  const progApi = usePrograms(token);
  const equipApi = useEquipment(token);
  const bookingApi = useBookings(token);

  useEffect(() => {
    const id = setTimeout(async () => {
      const res1 = await progApi.get();
      setProgramsData(res1.data);

      const res2 = await equipApi.get();
      setEquipment(res2.data);

      setLoading(false);
    }, 1000);

    return () => clearTimeout(id);
  }, [equipApi, progApi]);

  // Add & Edit Modal, Confirm Dialog
  const [isProgramModalOpen, setProgramModalOpen] = useState(false);
  const [programModalTitle, setProgramModalTitle] = useState("undefined");
  const [programModalData, setProgramModalData] = useState({
    id: undefined,
    name: "",
    type: "",
    targetMuscleGroup: "",
    description: "",
    equipment: [],
    duration: 1,
    difficulty: 1,
  });
  const [operation, setOperation] = useState("add");

  const [status, setStatus] = useState(0);

  const add = () => {
    setOperation("add");
    clearProgram();
    setProgramModalTitle("Add Program");
    setProgramModalOpen(true);
  };

  const edit = (program) => {
    setOperation("edit");
    setProgramModalData(program);
    setProgramModalTitle("Edit Program");
    setProgramModalOpen(true);
  };

  const del = async (program) => {
    const response = await progApi.del(program);
    console.log(response);
  };

  const clearProgram = () => {
    setProgramModalData({
      id: undefined,
      name: "",
      type: "",
      targetMuscleGroup: "",
      description: "",
      equipment: [],
      duration: 1,
      difficulty: 1,
    });
  };

  const confirmModal = async () => {
    let response;
    if(operation === "add") {
      response = await progApi.post(programModalData);
    }
    else if(operation === "edit") {
      response = await progApi.put(programModalData);
    }
    console.log(response);
    setProgramModalOpen(false);
  };

  const joinProgram = (program) => {
    bookingApi.post(program);
  }

  useEffect(() => {

    const tmpPrograms = programsData.filter(prog => {
      switch(status) {
        case 1: // joined
          return prog.isJoined === true
        case 2: // not joined
          return prog.isJoined === false
        default:
          return true;
      }
    });
    setPrograms(tmpPrograms);
    console.log(tmpPrograms);

  }, [programsData, status]);

  return (
    <div>
      {/* Modals */}
      <Modal show={isProgramModalOpen} onClose={() => setProgramModalOpen(false) }>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold"> {programModalTitle} </h1>
          <TextInput 
            placeholder="Name"
            label="Name"
            value={programModalData.name} 
            onChange={(value) => setProgramModalData(data => ({
              ...data, 
              name: value
            }))} 
          />
          <TextInput 
            label="Type" 
            value={programModalData.type} 
            onChange={(value) => setProgramModalData(data => ({
              ...data, 
              type: value
            }))} 
          />
          <TextInput 
            label="Target Muscle Group" 
            value={programModalData.targetMuscleGroup} 
            onChange={(value) => setProgramModalData(data => ({
              ...data, 
              targetMuscleGroup: value
            }))} 
          />
          <TextInput 
            label="Description"
            value={programModalData.description} 
            onChange={(value) => setProgramModalData(data => ({
              ...data, 
              description: value
            }))} 
          />
          <TextInput 
            label="Duration"
            type="number"
            value={programModalData.duration} 
            onChange={(value) => setProgramModalData(data => ({
              ...data, 
              duration: value
            }))} 
          />
          <TextInput 
            label="Difficulty"
            type="number"
            value={programModalData.difficulty} 
            onChange={(value) => setProgramModalData(data => ({
              ...data, 
              difficulty: value
            }))} 
          />
          <MultiSelect
            options={equipment.map(eq => ({ 
              value: eq.id, 
              label: eq.name 
            }))}
            value={programModalData.equipment.map(eq => ({ 
              value: eq.id, 
              label: eq.name 
            }))}
            onChange={(options) => {
              setProgramModalData(data => ({
                ...data, 
                equipment: options.map(opt => ({ 
                  id: opt.value, 
                  name: opt.label 
                })
            )}));
            }}
          />
          <Button onClick={confirmModal}> Confirm </Button>
        </div>
      </Modal>

      {/* Content */}
      {loading ? (
        <div className="flex w-full justify-center p-4">
          <LoadingCircle />
        </div>
      ) : (
        <div>
          <h1 className="p-4 text-3xl font-bold">Programs</h1>
          <div className="flex flex-row items-center gap-2 px-12">
            <p className=""> Status </p>
            <Selection
              value={status}
              options={[
                { value: 0, label: "All" },
                { value: 1, label: "Joined" },
                { value: 2, label: "Not Joined" },
              ]}
              onSelect={(value) => setStatus(value) }
              />
          </div>
          {programs ? (
            <Grid columns={2}>
              {programs.map(program => (
                <GridItem key={program.id} className="p-4 bg-white shadow-lg rounded-lg">
                  <div className="flex flex-row justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">{program.name}</h2>
                  </div>

                  {/* Type */}
                  <div className="mb-2">
                    <span className="font-semibold">Type:</span> 
                    &nbsp;{program.type}
                  </div>

                  {/* Difficulty */}
                  <div className="mb-2">
                    <span className="font-semibold">Difficulty:</span> 
                    &nbsp;{program.difficulty}
                  </div>

                  {/* Target Muscle Group */}
                  <div className="mb-2">
                    <span className="font-semibold">Target Muscle Group:</span> 
                    &nbsp;{program.targetMuscleGroup}
                  </div>

                  {/* Equipment */}
                  <div className="mb-2">
                    <span className="font-semibold">Equipment:</span>
                    {program.equipment && program.equipment.length > 0 ? (
                      <ul className="list-disc list-inside ml-4">
                        {program.equipment.map((eq) => (
                          <li key={eq.id} className="text-gray-700">{eq.name}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-700"> No equipment found.</span>
                    )}
                  </div>

                  {/* Description */}
                  <div className="mb-2">
                    <span className="font-semibold">Description:</span>
                    <p className="text-gray-700">{program.description}</p>
                  </div>

                  <div className="mb-2">
                    <Button 
                      onClick={() => joinProgram(program)}
                      disabled={program.isJoined}
                    > 
                      Join 
                    </Button>
                  </div>
                </GridItem>                
              ))}
            </Grid>
          ) : (
            <p className="text-center p-4">No programs found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MemberPrograms;
