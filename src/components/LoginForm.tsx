import { useState } from 'react';
import {
  Button,
  Column,
  FormControl,
  Input,
  KeyboardAvoidingView,
  useToast,
  WarningOutlineIcon,
} from 'native-base';
import { useForm, Controller } from 'react-hook-form';

import { loginResolver } from '@utils';

type FormData = {
  email: string;
  password: string;
};

type Props = {
  login: (data: FormData) => Promise<string>;
};

const LoginForm = ({ login }: Props) => {
  const { handleSubmit, control, formState: { errors }} = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: loginResolver,
    mode: 'onSubmit',
  }); // prettier-ignore
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await login(data);
    } catch (error: any) {
      toast.show({
        title: 'Algo salió mal',
        placement: 'bottom',
        bgColor: 'red.500',
        color: 'white',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView py={10} px={8} width="full" maxW="sm" mx="auto">
      <Column space={3}>
        {/* Email */}
        <FormControl isInvalid={Boolean(errors.email)}>
          <FormControl.Label>Correo electrónico</FormControl.Label>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                type="text"
                keyboardType="email-address"
                placeholder="Ingrese su correo..."
                accessibilityLabel="Correo electrónico"
              />
            )}
          />
          {errors.email && (
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon />}
              accessibilityRole="alert"
            >
              {errors.email.message}
            </FormControl.ErrorMessage>
          )}
        </FormControl>

        {/* Password */}
        <FormControl isInvalid={Boolean(errors.password)}>
          <FormControl.Label>Contraseña</FormControl.Label>
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                type="password"
                placeholder="Ingrese su contraseña..."
                accessibilityLabel="Contraseña"
              />
            )}
          />
          {errors.password && (
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon />}
              accessibilityRole="alert"
            >
              {errors.password.message}
            </FormControl.ErrorMessage>
          )}
        </FormControl>

        <Button
          onPress={handleSubmit(onSubmit)}
          mt={2}
          isLoading={isLoading}
          accessibilityRole="button"
        >
          Iniciar Sesión
        </Button>
      </Column>
    </KeyboardAvoidingView>
  );
};

export default LoginForm;
