import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { loginUser } from '../../utils/api';
import { setCookie } from '../../utils/cookie';
import { useNavigate } from "react-router-dom";
import { PATH } from "../../utils/constants";

export const SignInPage = () => {
  const [userData, setUserData] = useState({ login: "", password: "" });
  const [errors, setErrors] = useState({ loginErr: false, passwordErr: false });

  const navigate = useNavigate();

  const onChangeInput = (e: { target: { name: string; value: string; } }) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // Проверка валидации в процессе введения value
  useEffect(() => {
    if (
      (!userData.password && !userData.login) ||
      (userData.password && userData.login)
    ) {
      // При пустых userData скрывать сообщения об ошибках
      setErrors({ loginErr: false, passwordErr: false });
    } else if (!userData.password && userData.login) {
      // При пустом поле пароля показывать сообщение об ошибке
      setErrors((prevErrors) => ({ ...prevErrors, passwordErr: true }));
    } else if (!userData.login && userData.password) {
      // При пустом поле логина показывать сообщение об ошибке
      setErrors((prevErrors) => ({ ...prevErrors, loginErr: true }));
    }
  }, [userData]);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
   
    try {
      const response = await loginUser(userData.login, userData.password); // Отправляем данные на сервер, получаем токен
      setCookie('accessToken', `Bearer ${response.data.token}`, { path: PATH.HOME }); // Устанавливаем токен в куки

      setUserData({ login: "", password: "" }); // Устанавливаем пустые поля
      setErrors({ loginErr: false, passwordErr: false }); // Убираем сообщения об ошибках
      navigate("/", { replace: true });
    } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error("Неизвестная ошибка");
        }
    }
  };

  return (
    <Container 
      component="main" 
      maxWidth="sm" 
      sx={{ position: 'absolute', top: '50%', left: '50%', marginRight: '-50%', transform: 'translate(-50%, -50%)', }}
    >
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 1,
          px: 4,
          py: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          Вход
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            color={errors.loginErr ? "error" : "primary"}
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="login"
            name="login"
            label="Логин"
            type="text"
            autoComplete="login"
            autoFocus
            value={userData.login}
            onChange={onChangeInput}
            helperText={
              errors.loginErr ? "Поле обязательно" : "Пожалуйста, введите логин"
            }
          />
          <TextField
            color={errors.passwordErr ? "error" : "primary"}
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Пароль"
            type="password"
            autoComplete="current-password"
            value={userData.password}
            onChange={onChangeInput}
            helperText={ errors.passwordErr ? "Поле обязательно" : "Пожалуйста, введите пароль" }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={!userData.login || !userData.password}
          >
            Войти
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
