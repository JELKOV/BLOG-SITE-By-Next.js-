import { useState, useEffect } from "react";
import classes from "./contact-form.module.css";
import Notification from "../../ui/notification";

// API로 메시지를 보내는 비동기 함수
async function sendContactData(contactDetails) {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    // 응답이 실패하면 에러발생
    throw new Error(data.message || "Something went wrong!");
  }

  return data; // 응답 데이터 반환
}

function ContactForm() {
  //입력필드 상태관리
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");
  // 유효성 검사 실패 상태
  const [isInvalid, setIsInvalid] = useState(false);

  // 요청상태관리 상태 'pending', 'success', 'error'
  const [requestStatus, setRequestStatus] = useState();
  // 에러 메시지 상태
  const [requestError, setRequestError] = useState();

  // 요청 완료후 3초뒤에 상태 초기화
  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer); // 정리 함수로 타이머 제거
    }
  }, [requestStatus]);

  //양식이 제출될때 트리거 함수를 만들어야 함
  async function sendMessageHandler(event) {
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
    setRequestStatus("pending");

    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      });
      setRequestStatus("success");
      setEnteredEmail("");
      setEnteredName("");
      setEnteredMessage("");
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus("error");
    }
  }

  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending message ...",
      message: "Your message is on its way!",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Message sent successfully!",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: requestError || "Something went wrong!",
    };
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
          <p className={classes.error}>
            Please make sure all fields are filled in correctly.
          </p>
        )}

        {notification && (
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        )}

        <div className={classes.actions}>
          <button disabled={requestStatus === "pending"}>
            {requestStatus === "pending" ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default ContactForm;
