import * as React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ActionEnum } from "../../App";
import { LOGIN_API } from "../../api/APIs";
import { setDataToLocalStorage, getDataFromLocalStorage } from "../../utils"

interface Props {
  showLoginModal?: boolean;
  handleCloseModal?: (status: boolean) => void;
  dispatch: (action: any) => void;
}

export default React.memo((props: Props) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onChangeUsername = React.useCallback((e) => {
    setUsername(e.currentTarget.value);
  }, []);

  const onChangePassword = React.useCallback((e) => {
    setPassword(e.currentTarget.value);
  }, []);

  const handleLogin = React.useCallback(async () => {
    try {
      const response = await fetch(LOGIN_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response) {
        const results = await response.json();
        if (results.code != 0) {
          throw Error(results.message);
        }
        setDataToLocalStorage("token", results.data)
        props.dispatch({ type: ActionEnum.LOGIN_SUCCESSFUL });
      }
    } catch (err) {
      alert(err.message);
    }
  }, [props.dispatch, username, password]);

  React.useEffect(() => {
    const token = getDataFromLocalStorage("token")
    if(token) props.dispatch({ type: ActionEnum.LOGIN_SUCCESSFUL });
  }, [])

  return (
    <Modal show={true}>
      <Modal.Header>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Prepend style={{ width: "25%" }}>
            <InputGroup.Text className="w-100" id="basic-addon1">
              Username
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={username}
            onChange={onChangeUsername}
            style={{ width: "65%" }}
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend style={{ width: "25%" }}>
            <InputGroup.Text className="w-100" id="basic-addon1">
              Password
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={password}
            type="password"
            onChange={onChangePassword}
            style={{ width: "65%" }}
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleLogin} variant="primary">
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
});
