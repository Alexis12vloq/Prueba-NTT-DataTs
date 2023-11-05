import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  Heading,
  VStack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormData, LoginResponse } from "../../metrics/loginResponseDTO";
import { useLoginApi } from "./hooks";
import { ChatIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().required("El User es requerido"),
  password: yup.string().required("La contraseña es requerida"),
});

const LoginForm: React.FC = () => {
  const [loginResponse, setLoginResponse] = useState<null | LoginResponse>(
    null
  );
  localStorage.setItem("token", "");
  const [error, setError] = useState<string | null>(null);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const { loginData, loading, error: loginError, submitLogin } = useLoginApi();
  useEffect(() => {
    if (loginData?.msg === "Validado.") {
      localStorage.setItem("token", loginData?.owl);
      navigate("/guardias");
    }
  }, [loginData, navigate]);
  const onSubmit = async (data: FormData) => {
    try {
      const { email, password } = data;
      if (!loading) {
        submitLogin(email, password);
        if (loginData) {
          setLoginResponse(loginData);
        } else {
          setError(loginError || "Error desconocido en el inicio de sesión.");
        }
      }
    } catch (error) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  return (
    <Center minH="100vh">
      <VStack spacing={4} align="center">
        <Heading as="h2">Registrate Para Acceder a Las Guardias</Heading>

        <Box w="md" borderWidth="1px" p={4} borderRadius="md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mt="20px">
              <FormLabel>User</FormLabel>
              <Controller
                name="email"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
              {errors.email && (
                <Alert status="error">
                  <AlertIcon />
                  {errors.email.message}
                </Alert>
              )}
            </FormControl>

            <FormControl mt="20px">
              <FormLabel>Contraseña</FormLabel>
              <Controller
                name="password"
                control={control}
                render={({ field }) => <Input type="password" {...field} />}
              />
              {errors.password && (
                <Alert status="error">
                  <AlertIcon />
                  {errors.password.message}
                </Alert>
              )}
            </FormControl>
            {loginData && (
              <Alert status="success">
                <ChatIcon mr="10px" />
                {loginData.msg}
              </Alert>
            )}

            <Button mt="40px" colorScheme="teal" type="submit">
              Iniciar Sesión
            </Button>
          </form>
        </Box>

        <Alert status="info">
          <AlertIcon />
          ¡LLena El Formulario Con tus Datos!
        </Alert>
      </VStack>
    </Center>
  );
};

export default LoginForm;
