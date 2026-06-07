import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Request Access",
  description: "Get in touch with the Lili-o team to request access to the Data Foundry.",
};

export default function ContactPage() {
  return <ContactForm />;
}
