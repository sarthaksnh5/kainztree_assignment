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

function Register() {
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
      const response = await fetch("http://localhost:8000/api-user/register/", {
        method: "POST",
        body: JSON.stringify(formDataJSON),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        toast.error("Error with the server");
        var error = JSON.parse(await response.text());
        var message = "";
        Object.keys(error).map((item) => {
          message += `${item.toUpperCase()}: `;
          error[item].map((mess) => {
            message += mess;
          });
          message += "\n";
        });
        toast.error(message);
      } else {
        toast.success("Logged in");
        var data = await response.json();
        toast.success("Registered! Now login");
        setTimeout(() => {
          navigate("/auth/login");
        }, 1500);
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error(error.message);
    }
    btnPointer.innerHTML = "Register";
    btnPointer.disabled = false;
  };

  return (
    <React.Fragment>
      <Container className="my-5">
        <h2 className="fw-normal mb-5">
          Register To Sarthak - Kainztree Full Stack
        </h2>
        <Row>
          <Col md={{ span: 6 }}>
            <Form id="loginForm" onSubmit={submitLoginForm}>
              <FormGroup className="mb-3">
                <FormLabel htmlFor={"login-full-name"}>Full Name</FormLabel>
                <input
                  type={"text"}
                  className="form-control"
                  id={"login-full-name"}
                  name="full_name"
                  required
                />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel htmlFor={"login-username"}>Email</FormLabel>
                <input
                  type={"text"}
                  className="form-control"
                  id={"login-username"}
                  name="email"
                  required
                />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel htmlFor={"login-mobile"}>Mobile</FormLabel>
                <input
                  type={"text"}
                  className="form-control"
                  id={"login-mobile"}
                  name="mobile_number"
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
                Register
              </Button>
            </Form>
            <Button
              variant="primary"
              className="mt-2"
              onClick={() => navigate("/auth/login")}
            >
              Login
            </Button>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default Register;
