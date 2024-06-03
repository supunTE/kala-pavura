import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { CaretRight } from "@phosphor-icons/react";
import cs from "classnames";
import { InferType, object, string } from "yup";

import { MAX_EMAIL_UI_LIMIT, MAX_PASSWORD_LENGTH } from "@kala-pavura/globals";
import { useAuth } from "@/modules/context";

const loginSchema = object({
  email: string()
    .email("වලංගු ඊ-තැපැල් ලිපිනයක් ඈතුළත් කරන්න.")
    .required("ඊ-තැපැල් ලිපිනය ඇතුළත් කරන්න."),
  password: string().required("මුරපදය ඇතුළත් කරන්න."),
});
type LoginInputs = InferType<typeof loginSchema>;
const defaultValues: LoginInputs = {
  email: "",
  password: "",
};

type LoginFormProps = {
  forceClose: () => void;
};

export function LoginForm({ forceClose }: LoginFormProps) {
  const { passwordLogin } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginInputs>({
    defaultValues,
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setIsLoggingIn(true);
    const result = await passwordLogin?.(data.email, data.password);
    setIsLoggingIn(false);
    if (!result) return;

    reset();
    forceClose();
  };

  return (
    <div className="max-h-[250px] overflow-hidden overflow-y-auto rounded-lg bg-neutral-200/40 dark:bg-neutral-900/40">
      <form
        className="flex w-full flex-col items-center justify-center p-4"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <TextInput
          variant="filled"
          size="xs"
          radius="xl"
          label="ඊ-තැපැල් ලිපිනය"
          placeholder="user@email.com"
          maxLength={MAX_EMAIL_UI_LIMIT}
          className={cs("w-full")}
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
        <Button
          type="submit"
          variant="filled"
          color="#2da1e4"
          size="xs"
          radius="xl"
          className={cs("z-20", "mt-6")}
          rightSection={<CaretRight size={16} weight="light" />}
          loading={isLoggingIn}
        >
          පුරන්න
        </Button>
      </form>
    </div>
  );
}
