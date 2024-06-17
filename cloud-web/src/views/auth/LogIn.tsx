/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from "react";
import { useForm } from "react-hook-form";
import { css, jsx } from "@emotion/react";

import AuthTitle from "../../components/AuthTitle";
import Logo from "../../components/Logo";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import { RequestStatus, requestToken } from "../../api";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";

const boxContainerStyles = css`
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  justify-items: center;
  flex-direction: column;
`;

const boxStyles = css`
  width: 500px;
  position: relative;
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-items: center;
  height: 500px;
  border: none;
  border-radius: 7px;
`;

interface FormFields {
  email: string;
  password: string;
}

const LogIn: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const hasTokenStored = useSelector<RootState>(
    (state) => state.session.authToken !== null
  );
  const [status, setStatus] = React.useState<RequestStatus>({
    completed: false,
    success: false,
    errorMessage: null,
  });

  // Endpoints that require authentication will already implement the AuthProvider component,
  // and if the token is not valid, the session will be pruned and redirected to auth.
  if (hasTokenStored) return <Redirect to="/" />;

  const onSubmit = ({ email, password }: FormFields) => {
    console.log({ email, password });
    requestToken({ email, password })
      .then((value) => {
        setStatus({
          completed: true,
          success: value.data!.requestToken.success,
          errorMessage: value.data!.requestToken.errorMessage,
        });
      })
      .catch((reason) => {
        setStatus({
          completed: true,
          success: false,
          errorMessage: reason.message,
        });
      });
  };
  if (status?.success) return <Redirect to="/" />;

  return (
    <div css={boxContainerStyles}>
      <div css={boxStyles}>
        <Logo height="40px" />
        <AuthTitle>Iniciar Sesión</AuthTitle>
        <form
          onSubmit={handleSubmit(onSubmit)}
          css={css`
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
          `}
        >
          <InputField
            type="text"
            name="email"
            placeholder="Usuario"
            ref={register}
          />
          <InputField
            type="password"
            name="password"
            placeholder="Contraseña"
            ref={register}
          />
          <Button type="submit">Continuar</Button>
        </form>
        {status.errorMessage && (
          <div
            css={css`
              position: absolute;
              font-weight: 500;
              color: #f56a6a;
              bottom: 20px;
            `}
          >
            {status.errorMessage}
          </div>
        )}
      </div>
      <Footer fontColor="#888888" />
    </div>
  );
};

export default LogIn;
