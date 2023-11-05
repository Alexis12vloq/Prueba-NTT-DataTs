import React from "react";
import { Box, Spinner, Button } from "@chakra-ui/react";
import { useAgentGuardiasApi } from "./hooks";
import { useState } from "react";
import GuardiaTableDetails from "./guardiaTable";
import { SmallAddIcon } from "@chakra-ui/icons";

import {
  ChakraProvider,
  CSSReset,
  extendTheme,
  Heading,
} from "@chakra-ui/react";
import RangoFechas from "../datepicker/datepicker";
import NuevoGuardiaModal from "./addGuardiasModal";

const GuardiaTable: React.FC = () => {
  const [fechaInicio, setFechaInicio] = useState<string>("2023-11-01");
  const [fechaFin, setFechaFin] = useState<string>("2023-11-03");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { agentGuardias, loading } = useAgentGuardiasApi(
    55,
    fechaInicio,
    fechaFin
  );

  const theme = extendTheme({});

  const handleSeleccionarRango = (fechaInicio: string, fechaFin: string) => {
    setFechaInicio(fechaInicio);
    setFechaFin(fechaFin);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Box m={"50px"}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Heading as="h2" marginBottom="50px">
          Lista de las Guardias
        </Heading>
        <Box display="flex" justifyContent="space-between">
          <RangoFechas onSeleccionarRango={handleSeleccionarRango} />
          <Button
            onClick={openModal}
            marginBottom="30px"
            backgroundColor="#90EE90"
          >
            <SmallAddIcon fontSize="20px" />
            <p style={{ marginBottom: "3px" }}>Agregar Nueva Guardia</p>
          </Button>
        </Box>
        {loading ? (
          <Spinner />
        ) : (
          <GuardiaTableDetails agentGuardias={agentGuardias || []} />
        )}
        <div>
          <NuevoGuardiaModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
      </ChakraProvider>
    </Box>
  );
};

export default GuardiaTable;
