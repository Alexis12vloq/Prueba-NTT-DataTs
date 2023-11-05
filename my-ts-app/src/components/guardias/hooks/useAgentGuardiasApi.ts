import { useState, useEffect } from "react";
import axios from "axios";
import AgentGuardia from "../../../metrics/guardiasResponseDTO";

export const useAgentGuardiasApi = (
  equipoId: number,
  fechaInicio: string,
  fechaFin: string
) => {
  const [agentGuardias, setAgentGuardias] = useState<AgentGuardia[] | []>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    const baseUrl = `https://opembpo.emeal.nttdata.com/admin/guardias/equipo/${equipoId}`;
    setLoading(true);

    if (!authToken) {
      setLoading(false);
      setError("Token no encontrado en el localStorage.");
      return;
    }

    const url = `${baseUrl}?fecha_ini=${fechaInicio}&fecha_fin=${fechaFin}`;
    const headers = {
      AuthToken: authToken,
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(url, { headers });
        const responseData: AgentGuardia[] = response.data;

        setAgentGuardias(responseData);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError("Error al realizar la petición con el token.");
        setLoading(false);
      }
    };

    fetchData();
  }, [equipoId, fechaInicio, fechaFin]);

  return { agentGuardias, loading, error } as const;
};
