import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import AccountFormHeader from "./AccountFormHeader";
import FormFieldErrorMessage from "../FormFieldErrorMessage";
import AlertMessage from "../AlertMessage";
import { login } from "../../apis/users";

const LoginForm = () => {
  const [alertMessage, setAlertMessage] = useState("");

  const clearAlertMessage = useCallback(() => {
    setAlertMessage("");
  }, []);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const loginMutation = useMutation(login, {
    onSuccess: (data) => {
      const { isLoggedIn, username, message } = data;
      if(!isLoggedIn) {
        setAlertMessage(message);
        return;
      }
      queryClient.invalidateQueries("currentUser");
      navigate(`/@${username}`);
    }
  });

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onLoginFormSubmitted = useCallback(handleSubmit((data) => {
    loginMutation.mutate(data);
  }), []);

  return (
    <section className="w-80 space-y-8">
      <AccountFormHeader title="로그인" />
      {alertMessage && <AlertMessage message={alertMessage} onCloseButtonClicked={clearAlertMessage} />}
      <form noValidate onSubmit={onLoginFormSubmitted} className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-1.5">
          <label htmlFor="email" className="text-sm">이메일</label>
          <input id="email" type="email" className="form-input"
                 {...register("email", {
                   required: "이메일을 입력해주세요."
                 })}
          />
          {errors.email && <FormFieldErrorMessage>{errors.email.message}</FormFieldErrorMessage>}
        </div>
        <div className="flex flex-col gap-y-1.5">
          <label htmlFor="password" className="text-sm">비밀번호</label>
          <input id="password" type="password" className="form-input"
                 {...register("password", {
                   required: "비밀번호를 입력해주세요."
                 })}
          />
          {errors.password && <FormFieldErrorMessage>{errors.password.message}</FormFieldErrorMessage>}
        </div>
        <button
          disabled={loginMutation.isLoading}
          className="bg-indigo-500 text-white py-1.5 rounded hover:bg-indigo-700"
          type="submit"
        >
          로그인
        </button>
      </form>
      <div className="text-gray-600 text-sm text-center">
        아직 계정이 없으신가요? <Link className="hover:text-black hover:font-bold" to="/signup">계정 만들기 ></Link>
      </div>
    </section>
  );
};

export default LoginForm;
