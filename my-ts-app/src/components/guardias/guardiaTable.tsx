import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { GuardiaTableProps } from "../../metrics/guardiasResponseDTO";
import { ArrowUpDownIcon } from "@chakra-ui/icons";

const GuardiaTableDetails: React.FC<GuardiaTableProps> = ({
  agentGuardias,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleAccordionClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <Box>
      {agentGuardias.map((guardia, index) => (
        <>
          <Accordion allowMultiple>
            <AccordionItem key={index}>
              {({ isExpanded }) => (
                <>
                  <AccordionButton
                    onClick={() => handleAccordionClick(index)}
                    display="flex"
                    justifyContent="space-between"
                    width="100%"
                  >
                    <Table variant="striped" colorScheme="teal">
                      <Thead>
                        <Tr>
                          <Th>ID Guardia</Th>
                          <Th>Estado de Guardia</Th>
                          <Th>Fecha de Guardia</Th>
                          <Th></Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <>
                          <Tr key={guardia.id_guardia}>
                            <Td>{guardia.id_guardia}</Td>
                            <Td>{guardia.estado_guardia}</Td>
                            <Td>{guardia.fecha_guardia}</Td>
                            <Td>
                              <ArrowUpDownIcon />
                            </Td>
                          </Tr>
                        </>
                      </Tbody>
                    </Table>
                    {isExpanded ? (
                      <i className="fas fa-chevron-up"></i>
                    ) : (
                      <i className="fas fa-chevron-down"></i>
                    )}
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <Table variant="simple" colorScheme="teal">
                      <Thead>
                        <Tr>
                          <Th>Nombre del agente:</Th>
                          <Th>Email del agente:</Th>
                          <Th>Estado del agente:</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr key={guardia.id_guardia}>
                          <Td>{guardia.agente.nom_agente}</Td>
                          <Td>{guardia.agente.email_agente}</Td>
                          <Td>{guardia.agente.estado_agente}</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          </Accordion>
        </>
      ))}
    </Box>
  );
};

export default GuardiaTableDetails;
