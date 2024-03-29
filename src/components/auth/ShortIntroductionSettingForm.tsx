import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import useHandleUnauthenticated from "../../hooks/auth/useHandleUnauthenticated";
import useShortIntroductionSetting from "../../hooks/auth/useShortIntroductionSetting";

type ShortIntroductionSettingFormProps = {
  defaultShortIntroduction: string;
};

type ShortIntroductionSettingFormData = {
  shortIntroduction: string;
};

export default function ShortIntroductionSettingForm({
  defaultShortIntroduction,
}: ShortIntroductionSettingFormProps) {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<ShortIntroductionSettingFormData>({
    defaultValues: {
      shortIntroduction: defaultShortIntroduction,
    },
  });

  const shortIntroductionSettingMutation = useShortIntroductionSetting();

  const handleUnauthenticated = useHandleUnauthenticated();

  const handleSubmitShortIntroductionSettingForm = handleSubmit(
    ({ shortIntroduction }) => {
      shortIntroductionSettingMutation.mutate(shortIntroduction, {
        onSuccess: (result) => {
          switch (result.status) {
            case "submitted": {
              reset({
                shortIntroduction: result.shortIntroduction,
              });
              toast({
                description: "짧은 소개가 변경되었습니다",
                status: "success",
                position: "top",
                isClosable: true,
              });
              break;
            }
            case "unauthenticated": {
              handleUnauthenticated();
              break;
            }
            case "fieldsInvalid": {
              result.fieldValidationResults.forEach(({ field, reason }) => {
                if (field === "shortIntroduction") {
                  setError(field, {
                    type: "serverValidation",
                    message: reason,
                  });
                }
              });
              break;
            }
            default: {
              throw new Error(
                "unexpected result of updating user short introduction"
              );
            }
          }
        },
      });
    }
  );

  return (
    <Flex
      as="form"
      onSubmit={handleSubmitShortIntroductionSettingForm}
      direction="column"
      rowGap={4}
    >
      <FormControl
        isInvalid={Boolean(errors.shortIntroduction)}
        as={Flex}
        direction={{ base: "column", md: "row" }}
      >
        <FormLabel width="25%" htmlFor="shortIntroduction">
          짧은 소개
        </FormLabel>
        <Flex direction="column" rowGap={2} flexGrow={1}>
          <Textarea
            id="shortIntroduction"
            rows={6}
            {...register("shortIntroduction")}
          />
          {errors.shortIntroduction ? (
            <FormErrorMessage>
              {errors.shortIntroduction.message}
            </FormErrorMessage>
          ) : null}
        </Flex>
      </FormControl>
      <Button
        type="submit"
        size="sm"
        colorScheme="main"
        variant="ghost"
        isLoading={shortIntroductionSettingMutation.isLoading}
        loadingText="수정 중..."
        alignSelf="flex-end"
      >
        수정하기
      </Button>
    </Flex>
  );
}
