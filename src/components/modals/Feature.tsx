import * as React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

export default React.memo(() => {
  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Prepend style={{ width: "10%" }}>
          <InputGroup.Text className="w-100" id="basic-addon1">
            Event name
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          value={""}
          style={{ width: "90%" }}
          aria-describedby="basic-addon1"
        />
      </InputGroup>
    </>
  );
});
