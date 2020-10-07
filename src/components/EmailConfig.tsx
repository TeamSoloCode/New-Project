import * as React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { FETCH_EMAIL_CONFIG_API, UPDATE_EMAIL_CONFIG_API } from "../api/APIs";
import { Button } from 'react-bootstrap';

export const EmailConfig = React.memo(() => {
  const [emailConfig, setEmailConfig] = React.useState<{
    hostEmail: string;
    receiveEmails: string[];
    emailSubject: string;
  }>({ hostEmail: "", receiveEmails: [], emailSubject: "" });

  const [hostEmail, setHostEmail] = React.useState<string>("");
  const [receiveEmails, setReceiveEmails] = React.useState<string[]>([]);
  const [emailSubject, setEmailSubject] = React.useState<string>("");

  const loadData = async () => {
    const response = await fetch(FETCH_EMAIL_CONFIG_API);
    if (response) {
      const results = await response.json();
      if (results.code != 0) {
        throw Error(results.message.sqlMessage);
      }
      setEmailConfig(results.data);
    }
  };

  const onChangeReceivingEmails = React.useCallback((e) => {
    setReceiveEmails(e.currentTarget.value.split(","));
  }, []);

  const onChangeEmailSubject = React.useCallback((e) => {
    setEmailSubject(e.currentTarget.value);
  }, []);

  const updateEmailConfig = React.useCallback(async () => {
    try {
        const response = await fetch(UPDATE_EMAIL_CONFIG_API, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({receiveEmails, emailSubject}),
        });
  
        if (response) {
          const results = await response.json();
          if (results.code != 0) {
            throw Error(results.message.sqlMessage);
          }
          alert("Update email config success")
        }
      } catch (err) {}
  }, [receiveEmails, emailSubject])

  React.useEffect(() => {
    loadData();
  }, []);

  React.useEffect(() => {
    setHostEmail(emailConfig.hostEmail);
    setReceiveEmails(emailConfig.receiveEmails);
    setEmailSubject(emailConfig.emailSubject);
  }, [emailConfig]);

  return (
    <>
      {/* {JSON.stringify(emailConfig)} */}
      <InputGroup className="mb-3">
        <InputGroup.Prepend style={{ width: "10%" }}>
          <InputGroup.Text className="w-100" id="basic-addon1">
            Sending Email
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl value={hostEmail} disabled style={{ width: "90%" }} aria-describedby="basic-addon1" />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Prepend style={{ width: "10%" }}>
          <InputGroup.Text className="w-100" id="basic-addon1">
            Receiver Emails
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          value={receiveEmails}
          onChange={onChangeReceivingEmails}
          style={{ width: "90%" }}
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Prepend style={{ width: "10%" }}>
          <InputGroup.Text className="w-100" id="basic-addon1">
            Email Subject
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          value={emailSubject}
          onChange={onChangeEmailSubject}
          style={{ width: "90%" }}
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <div className="d-flex justify-content-end">
        <Button onClick={updateEmailConfig}>Save</Button>
      </div>
    </>
  );
});
