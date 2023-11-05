import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Stack,
  Spinner,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import { useAgentAddGuardiasApi } from "./hooks";
import { format } from "date-fns";
import "../../App.css";

const NuevoGuardiaModal = ({
  isOpen,
  onClose,
}: {
  isOpen: any;
  onClose: any;
}) => {
  const [fechaGuardia, setFechaGuardia] = useState(new Date());
  const equipoId = 55;
  const { agentGuardias, loading, addGuardia } =
    useAgentAddGuardiasApi(equipoId);

  useEffect(() => {
    if (agentGuardias !== undefined) {
      if (agentGuardias === "Listo") {
        onClose();
      }
    }
  }, [agentGuardias, onClose]);
  const handleGuardarGuardia = () => {
    addGuardia(format(fechaGuardia, "yyyy-MM-dd"));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agregar una Nueva Guardia</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" justifyContent="center">
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Fecha de Guardia</FormLabel>
              <DatePicker
                className="custom-datepicker"
                selected={fechaGuardia}
                onChange={(date: any) => setFechaGuardia(date)}
              />
            </FormControl>
            <p>{agentGuardias}</p>
          </Stack>
        </ModalBody>
        <ModalFooter>
          {loading ? (
            <Spinner />
          ) : (
            <Button colorScheme="teal" mr={3} onClick={handleGuardarGuardia}>
              Guardar
            </Button>
          )}
          <Button variant="ghost" onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NuevoGuardiaModal;
