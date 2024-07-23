import React, { useRef, FormEvent } from "react";
import emailjs from "@emailjs/browser";

const ContactUs: React.FC = () => {
  // Typing the ref with HTMLFormElement
  const form = useRef<HTMLFormElement | null>(null);

  // Typing the event parameter
  const sendEmail = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Ensuring form.current is not null
    if (form.current) {
      emailjs
        .sendForm(
          "service_v6h9a1k",
          "template_l0ismu9",
          form.current,
          "uDUiT_0MIpJng0yuZ"
        )
        .then(
          () => {
            console.log("SUCCESS!");
          },
          (error: { text: string }) => {
            console.log("FAILED...", error.text);
          }
        );
    }
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label htmlFor="user_name">Name</label>
      <input type="text" id="user_name" name="user_name" required />

      <label htmlFor="user_email">Email</label>
      <input type="email" id="user_email" name="user_email" required />

      <label htmlFor="message">Message</label>
      <textarea id="message" name="message" required />

      <input type="submit" value="Send" />
    </form>
  );
};
