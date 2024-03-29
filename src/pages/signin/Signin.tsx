import { useState } from "react";
import swal from "sweetalert";
import {
  SigninImg,
  SigninButton,
  SigninContainer,
  SigninForm,
  SigninInput,
  TitleSignin,
  SubTitleSignin,
  AccountTitleSignin,
  SigninHome,
  SigninSelect,
  SigninOption,
} from "./styleSignin";
import imgLogo from "../../assets/img/icon.png";
import home from "../../assets/img/home.png";
import { useNavigate } from "react-router-dom";
import { ISignin } from "../../interfaces/ISignin";
import { signinService } from "../../service/authentcation/signinAuth";

export const Signin = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    credential: "",
    password: "",
    type: "",
  });

  const handleChangesValues = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setValues((values: ISignin) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignin = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const response: any = await signinService.Login(values);

    if (!response) {
      swal({
        title: "Erro de login",
        text: "Usuário e/ou senha inválidos",
        icon: "error",
        timer: 6000,
      });
    }

    const jwt = response.data.token;
    const type = response.data.type;

    if (jwt) {
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("type", type);
      swal({
        title: "Bem vindo",
        icon: "success",
        timer: 3000,
      });
      if (values.type === "psicologo") {
        navigate("/psychologistprofile");
      } else {
        navigate("/patientProfile");
      }
    }
  };

  return (
    <SigninContainer>
      <SigninForm onSubmit={handleSignin}>
        <SigninHome src={home} onClick={() => navigate("/")} />
        <SigninImg src={imgLogo} />
        <TitleSignin>Acesse o Buddy Care</TitleSignin>
        <SubTitleSignin>Informe seus dados e acesse sua conta:</SubTitleSignin>

        <SigninInput
          type="email"
          name="credential"
          id="email"
          placeholder="Digite seu e-mail"
          required
          onChange={handleChangesValues}
        />

        <SigninInput
          type="password"
          name="password"
          id="password"
          placeholder="Digite sua senha"
          required
          onChange={handleChangesValues}
        />

        <SigninSelect name="type" id="type" onChange={handleChangesValues}>
          <SigninOption>Selecione o tipo Usuário</SigninOption>
          <SigninOption value="psicologo">Psicológo</SigninOption>
          <SigninOption value="paciente">Paciente</SigninOption>
        </SigninSelect>

        <SigninButton type="submit">Entrar</SigninButton>
        <SubTitleSignin>Não possui uma conta?</SubTitleSignin>
        <AccountTitleSignin onClick={() => navigate("/signup")}>
          Clique aqui!
        </AccountTitleSignin>
      </SigninForm>
    </SigninContainer>
  );
};
