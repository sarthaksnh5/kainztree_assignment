import React from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();

  const submitLoginForm = async (event) => {
    event.preventDefault();

    const formElement = document.querySelector("#loginForm");
    const formData = new FormData(formElement);
    const formDataJSON = Object.fromEntries(formData);

    const btnPointer = document.querySelector("#login-btn");
    btnPointer.innerHTML = "Please wait...";
    btnPointer.disabled = true;

    try {
      const response = await fetch("http://localhost:8000/api-user/token/", {
        method: "POST",
        body: JSON.stringify(formDataJSON),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        toast.error("Wrong username or password");
        console.log(await response.text());
      } else {
        var data = await response.json();
        localStorage.clear();
        localStorage.setItem("user-token", data["access"]);
        console.log(data['access'])
        toast.success("Welcome");
        setTimeout(() => {
          navigate("/");
        }, 500);
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error(error.message);
    }

    btnPointer.innerHTML = "Login";
    btnPointer.disabled = false;
  };

  const handleNavigatetoRegister = () => {
    navigate("/auth/register");
  };
  return (
    <React.Fragment>
      <Container className="my-5">
        <h2 className="fw-normal mb-5">
          Login To Sarthak - Kainztree Full Stack
        </h2>
        <Row>
          <Col md={{ span: 6 }}>
            <Form id="loginForm" onSubmit={submitLoginForm}>
              <FormGroup className="mb-3">
                <FormLabel htmlFor={"login-username"}>Username</FormLabel>
                <input
                  type={"text"}
                  className="form-control"
                  id={"login-username"}
                  name="email"
                  required
                />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel htmlFor={"login-password"}>Password</FormLabel>
                <input
                  type={"password"}
                  className="form-control"
                  id={"login-password"}
                  name="password"
                  required
                />
              </FormGroup>
              <Button type="submit" className="btn-success mt-2" id="login-btn">
                Login
              </Button>
            </Form>
            <Button
              variant="primary"
              className="mt-2"
              onClick={handleNavigatetoRegister}
            >
              Register
            </Button>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};
export default Login;
