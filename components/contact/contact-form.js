import { useState } from "react";
import classes from "./contact-form.module.css";

function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");

  const [isInvalid, setIsInvalid] = useState(false);

  //양식이 제출될때 트리거 함수를 만들어야 함
  function sendMessageHandler(event) {
    event.preventDefault();

    //클라이언트 유효성 검사
    if (
      !enteredEmail ||
      !enteredEmail.includes("@") ||
      !enteredName ||
      enteredName.trim() === "" ||
      !enteredName.trim() ||
      enteredMessage.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }

    setIsInvalid(false); // 유효하면 다시 false로

    // API 요청
    fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows="5"
            required
            value={enteredMessage}
            onChange={(event) => setEnteredMessage(event.target.value)}
          />
        </div>

        {isInvalid && (
          <p className={classes.error}>Please make sure all fields are filled in correctly.</p>
        )}

        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
    </section>
  );
}

export default ContactForm;
