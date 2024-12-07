import { useEffect, useState } from "react";
import Grid, { GridItem } from "../../components/Grid";
import { Button, EditButton, DeleteButton, AddButton } from "../../components/buttons";
import LoadingCircle from "../../components/LoadingCircle";
import Modal from "../../components/modals/Modal";
import TextInput from "../../components/inputs/TextInput";
import useEquipment from "../../hooks/api/useEquipment";
import { useAuth } from "../../hooks/api/useAuth";

const TrainerPrograms = () => {
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [equipment, setEquipment] = useState([]);
  const equipApi = useEquipment(token);

  useEffect(() => {
    const id = setTimeout(async () => {

      const res1 = await equipApi.get();
      setEquipment(res1.data);

      setLoading(false);
    }, 1000);

    return () => clearTimeout(id);
  }, [equipApi]);

  // Add & Edit Modal, Confirm Dialog
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("undefined");
  const [modalData, setModalData] = useState({
    id: undefined,
    name: "",
    type: "",
  });
  const [operation, setOperation] = useState("add");

  const add = () => {
    setOperation("add");
    clearProgram();
    setModalTitle("Add Program");
    setModalOpen(true);
  };

  const edit = (program) => {
    setOperation("edit");
    setModalData(program);
    setModalTitle("Edit Program");
    setModalOpen(true);
  };

  const del = async (program) => {
    const response = await equipApi.del(program);
    console.log(response);
  };

  const clearProgram = () => {
    setModalData({
      id: undefined,
      name: "",
      type: "",
    });
  };

  const confirmModal = async () => {
    let response;
    if(operation === "add") {
      response = await equipApi.post(modalData);
    }
    else if(operation === "edit") {
      response = await equipApi.put(modalData);
    }
    console.log(response);
    setModalOpen(false);
  };

  return (
    <div>
      {/* Modals */}
      <Modal show={isModalOpen} onClose={() => setModalOpen(false) }>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold"> {modalTitle} </h1>
          <TextInput 
            placeholder="Name"
            label="Name"
            value={modalData.name} 
            onChange={(value) => setModalData(data => ({
              ...data, 
              name: value
            }))} 
          />
          <TextInput 
            label="Type" 
            value={modalData.type} 
            onChange={(value) => setModalData(data => ({
              ...data, 
              type: value
            }))} 
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
          <h1 className="p-4 text-3xl font-bold">Equipment</h1>
          <div className="flex justify-end px-4 py-2">
            <AddButton onClick={add} />
          </div>
          {equipment.length > 0 ? (
            <Grid columns={2}>
              {equipment.map((equipment, index) => (
                <GridItem key={index} className="p-4 bg-white shadow-lg rounded-lg">
                  <div className="flex flex-row justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">{equipment.name}</h2>
                    <div className="flex flex-row gap-2">
                      <EditButton onClick={() => edit(equipment)} />
                      <DeleteButton onClick={() => del(equipment)} />
                    </div>
                  </div>

                  {/* Type */}
                  <div className="mb-2">
                    <span className="font-semibold">Type:</span> 
                    &nbsp;{equipment.type}
                  </div>
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

export default TrainerPrograms;
