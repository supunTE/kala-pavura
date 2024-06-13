import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, PasswordInput, TextInput} from "@mantine/core";
import {CaretRight} from "@phosphor-icons/react";
import cs from "classnames";
import {InferType, object, ref, string} from "yup";

import {
  MAX_EMAIL_UI_LIMIT,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
} from "@kala-pavura/globals";

import {useAuth} from "@/modules/context";

const registerSchema = object({
  username: string()
      .required("පරිශීලක නාමය ඇතුළත් කරන්න.")
      .min(
          MIN_USERNAME_LENGTH,
          `පරිශීලක නාමයක අක්ෂරාංක ${MIN_USERNAME_LENGTH}ක්වත් තිබිය යුතු ය.`
      ),
  email: string()
      .email("වලංගු ඊ-තැපැල් ලිපිනයක් ඈතුළත් කරන්න.")
      .required("ඊ-තැපැල් ලිපිනය ඇතුළත් කරන්න."),
  password: string()
      .required("මුරපදය ඇතුළත් කරන්න.")
      .min(
          MIN_PASSWORD_LENGTH,
          `මුරපදයක අක්ෂරාංක ${MIN_PASSWORD_LENGTH}ක්වත් තිබිය යුතු ය.`
      ),
  confirmPassword: string()
      .oneOf([ref("password")], "මුරපදය නොගැළපේ.")
      .required("මුරපදය ඇතුළත් කරන්න."),
});
type LoginInputs = InferType<typeof registerSchema>;
const defaultValues: LoginInputs = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

type RegisterFormProps = {
  close: () => void;
};

export function RegisterForm({close}: RegisterFormProps) {
  const {passwordRegister} = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<LoginInputs>({
    defaultValues,
    resolver: yupResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setIsRegistering(true);
    const result = await passwordRegister?.(
        data.username,
        data.email,
        data.password
    );
    setIsRegistering(false);
    if (!result) return;

    reset();
    close();
  };

  return (
      <div
          className="max-h-[250px] overflow-hidden overflow-y-auto rounded-lg bg-neutral-200/40 dark:bg-neutral-900/40">
        <form
            className="flex h-full w-full flex-col items-center justify-center p-4"
            onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          <TextInput
              variant="filled"
              size="xs"
              radius="xl"
              label="පරිශීලක නාමය"
              placeholder="පරිශීලක නාමය"
              maxLength={MAX_EMAIL_UI_LIMIT}
              className={cs("w-full text-black dark:text-white")}
              error={errors.username?.message}
              {...register("username")}
          />

          <TextInput
              variant="filled"
              size="xs"
              radius="xl"
              label="ඊ-තැපැල් ලිපිනය"
              placeholder="user@email.com"
              maxLength={MAX_EMAIL_UI_LIMIT}
              className={cs("mt-4 w-full")}
              error={errors.email?.message}
              {...register("email")}
          />
          <PasswordInput
              variant="filled"
              size="xs"
              radius="xl"
              label="මුරපදය"
              placeholder="***"
              maxLength={MAX_PASSWORD_LENGTH}
              className={cs("mt-4 w-full")}
              error={errors.password?.message}
              {...register("password")}
          />
          <PasswordInput
              variant="filled"
              size="xs"
              radius="xl"
              label="මුරපදය තහවුරු කරන්න"
              placeholder="***"
              maxLength={MAX_PASSWORD_LENGTH}
              className={cs("mt-4 w-full")}
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
          />
          <Button
              type="submit"
              variant="filled"
              color="#2da1e4"
              size="xs"
              radius="xl"
              className={cs("z-20", "mt-6")}
              rightSection={<CaretRight size={16} weight="light"/>}
              loading={isRegistering}
          >
            ලියාපදිංචි වන්න
          </Button>
        </form>
      </div>
  );
}
