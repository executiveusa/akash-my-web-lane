import type { Metadata } from "next";
import { ContactForm } from "./components/contact-form";

export const metadata: Metadata = {
  title: "Review the Evidence | MyWebLane",
  description:
    "Bring a measured website result to Akash and decide the smallest defensible next move: keep, clean up, or migrate.",
};

export default function Contact() {
  return <ContactForm />;
}
