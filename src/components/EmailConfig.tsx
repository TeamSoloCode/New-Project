import * as React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// import Accordion from "react-bootstrap/Accordion";
import FormControl from "react-bootstrap/FormControl";
import { FETCH_EMAIL_CONFIG_API, UPDATE_EMAIL_CONFIG_API } from "../api/APIs";
import { EmailConfig } from "../ModelDeclare";

const EMAIL_CONFIG_ID = 1

export const EmailConfigComponent = React.memo(() => {
  const [emailConfig, setEmailConfig] = React.useState<EmailConfig>({
    emailSubject: "",
    receivingEmails: "",
    sendingEmail: "",
    sendingEmailPassword: "xxxxxx",
  });

  const [emailSubject, setEmailSubject] = React.useState<string>("");
  const [receivingEmails, setReceivingEmails] = React.useState<string[]>([]);
  const [sendingEmail, setSendingEmail] = React.useState<string>("");
  const [sendingEmailPassword, setSendingEmailPassword] = React.useState<string>("xxxxxx");

  const loadData = async () => {
    const response = await fetch(FETCH_EMAIL_CONFIG_API + `/${EMAIL_CONFIG_ID}`);
    if (response) {
      const results = await response.json();
      if (results.code != 0) {
        throw Error(results.message.sqlMessage);
      }
      setEmailConfig(results.data);
    }
  };

  const onChangeReceivingEmails = React.useCallback((e) => {
    const index = e.currentTarget.dataset.index
    const newEmails = [...receivingEmails]
    newEmails[index] = e.target.value
    setReceivingEmails(newEmails);
  }, [receivingEmails]);

  const onChangeEmailSubject = React.useCallback((e) => {
    setEmailSubject(e.currentTarget.value);
  }, []);

  const handleAddMoreReceivingAccount = React.useCallback((e) => {
    const length = receivingEmails.length
    if((receivingEmails[length - 1]|| "").replace(/\s/g, "") == "" && length > 0) return
    const emails = [...receivingEmails, ""]
    setReceivingEmails(emails);
  }, [receivingEmails])

  const handleRemoveReceivingEmail = React.useCallback((e) => {
    const index = e.currentTarget.dataset.index
    const newEmails = [...receivingEmails]
    newEmails.splice(index, 1);
    setReceivingEmails(newEmails);
  }, [receivingEmails])

  const updateEmailConfig = React.useCallback(async () => {
    try {
      const response = await fetch(UPDATE_EMAIL_CONFIG_API, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          receivingEmails: receivingEmails ? JSON.stringify(receivingEmails) : "", 
          emailSubject,
          emailConfigId: EMAIL_CONFIG_ID
        }),
      });

      if (response) {
        const results = await response.json();
        if (results.code != 0) {
          throw Error(results.message);
        }
        alert("Update email config success");
      }
    } catch (err) {
      console.log(err)
    }
  }, [receivingEmails, emailSubject]);

  React.useEffect(() => {
    loadData();
  }, []);

  React.useEffect(() => {
    const receivingEmail = emailConfig.receivingEmails ? JSON.parse(emailConfig.receivingEmails) : [];
    setReceivingEmails(receivingEmail);
    setSendingEmail(emailConfig.sendingEmail);
    setSendingEmailPassword(emailConfig.sendingEmailPassword);
    setEmailSubject(emailConfig.emailSubject);
  }, [emailConfig]);

  return (
    <>
      {/* {JSON.stringify(emailConfig)} */}
      <InputGroup className="mb-3">
        <InputGroup.Prepend style={{ width: "20%" }}>
          <InputGroup.Text className="w-100" id="basic-addon1">
            Sending Email
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl value={sendingEmail} disabled style={{ width: "80%" }} aria-describedby="basic-addon1" />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Prepend style={{ width: "20%" }}>
          <InputGroup.Text className="w-100" id="basic-addon1">
            Sending Email Password
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          value={sendingEmailPassword}
          disabled
          style={{ width: "80%" }}
          type="password"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <div>
        <Card className="p-2 mb-3">
          <Button className="mb-3" style={{width: "20%"}} variant="success" onClick={handleAddMoreReceivingAccount}>
            <strong> + </strong>Add more receiving email
          </Button>
          {receivingEmails.map((receivingEmail, index) => {
            return (
              <InputGroup className="mb-3">
                <InputGroup.Prepend style={{ width: "20%" }}>
                  <Button onClick={handleRemoveReceivingEmail} data-index={index} variant="outline-danger">x</Button>
                  <InputGroup.Text className="w-100" id="basic-addon1">
                    Receiver Emails {index}
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  data-index={index}
                  value={receivingEmail}
                  onChange={onChangeReceivingEmails}
                  style={{ width: "80%" }}
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            );
          })}
        </Card>
      </div>

      <InputGroup className="mb-3">
        <InputGroup.Prepend style={{ width: "20%" }}>
          <InputGroup.Text className="w-100" id="basic-addon1">
            Email Subject
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          value={emailSubject}
          onChange={onChangeEmailSubject}
          style={{ width: "80%" }}
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <div className="d-flex justify-content-end">
        <Button onClick={updateEmailConfig}>Save</Button>
      </div>
    </>
  );
});
