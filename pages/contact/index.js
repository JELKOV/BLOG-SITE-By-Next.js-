import Head from "next/head";

import ContactForm from "../../components/contact/contact-form";
import { Fragment } from "react";

function ContactPage() {
  return (
    <Fragment>
      <Head>
        <title>Contact Me</title>
        <meta name="description" content="Send your message" />
      </Head>
      <ContactForm />
    </Fragment>
  );
}

export default ContactPage;
