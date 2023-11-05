import { useState } from "react";
import axios from "axios";
import { LoginResponse } from "../../../metrics/loginResponseDTO";

export const useLoginApi = () => {
  const [loginData, setLoginData] = useState<LoginResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const submitLogin = async (usuario: string, password: string) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://opembpo.emeal.nttdata.com/pre/validar_usuario",
        null,
        {
          params: {
            usuario: usuario,
            password: password,
          },
        }
      );

      const responseData: LoginResponse = response.data;

      setLoginData(responseData);
      setLoading(false);
      setError(null);
    } catch (error) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
      setLoading(false);
    }
  };

  return { loginData, loading, error, submitLogin } as const;
};
