"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { button } from "framer-motion/client";

export default function GetInTouchForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // REPLACE THIS WITH YOUR ACTUAL FORM ID
  const GOOGLE_FORM_ID = "1FAIpQLSeXyz123...AbCdEfGhIjKlMnOpQrStUv"; // ← CHANGE THIS!

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    const formData = new FormData(e.currentTarget);

    const body = new FormData();
    body.append("entry.1255551185", formData.get("name") as string);     // Name
    body.append("entry.806982790", formData.get("email") as string);    // Email
    body.append("entry.826315012", formData.get("phone") as string);    // Phone
    body.append("entry.444555666", formData.get("reason") as string);   // Reason
    body.append("entry.777888999", formData.get("message") as string);  // Message

    try {
      await fetch(`https://docs.google.com/forms/d/e/1FAIpQLSd14ymiQVEyPE7vGeVZjxlM80EcxNddSdER_W2ytXvj9uzaHg/formResponse`, {
        method: "POST",
        body,
        mode: "no-cors",
      });

      setIsSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsSuccess(false);
        (e.target as HTMLFormElement).reset();
      }, 2000);
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="mx-auto cursor-pointer">
            Get in Touch
        </button>

        </>
  );
  }