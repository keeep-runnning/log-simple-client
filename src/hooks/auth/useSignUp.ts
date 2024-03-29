import { useMutation } from "@tanstack/react-query";

import apiClient, {
  ApiFieldValidationResult,
  ApiResponseError,
} from "../../lib/apiClient";
import { MyProfile } from "../../types/auth";

type SignUpData = {
  username: string;
  email: string;
  password: string;
};

type SignUpResponse = {
  id: number;
  username: string;
  email: string;
  shortIntroduction: string;
  introduction: string;
};

type Submitted = {
  status: "submitted";
  createdUserProfile: MyProfile;
};

type Failed = {
  status: "failed";
  message: string;
};

type FieldsInvalid = {
  status: "fieldsInvalid";
  fieldValidationResults: ApiFieldValidationResult[];
};

async function signUp(
  newUser: SignUpData
): Promise<Submitted | Failed | FieldsInvalid> {
  try {
    const { data } = await apiClient.post<SignUpResponse>(
      "/auth/signup",
      newUser
    );
    return {
      status: "submitted",
      createdUserProfile: data,
    };
  } catch (error) {
    if (error instanceof ApiResponseError) {
      switch (error.statusCode) {
        case 400: {
          return {
            status: "fieldsInvalid",
            fieldValidationResults: error.fieldValidationResults,
          };
        }
        case 409: {
          return {
            status: "failed",
            message: error.message,
          };
        }
      }
    }
    throw error;
  }
}

export default function useSignUp() {
  return useMutation({
    mutationFn: signUp,
  });
}
