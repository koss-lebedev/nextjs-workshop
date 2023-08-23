"use client";

import { Button } from "@/components/button";
import { startRegistration } from "@simplewebauthn/browser";

const AddButton = () => {
  const handle = async () => {
    const response = await fetch("/api/passkeys/register", {
      cache: "no-cache",
    });
    const options = await response.json();

    console.log(options);

    const credential = await startRegistration(options);

    console.log(credential);

    const name = prompt("Name this key:");

    if (name) {
      await fetch("/api/passkeys/register", {
        method: "POST",
        body: JSON.stringify({
          ...credential,
          name,
        }),
      });

      location.reload();
    }
  };

  return <Button onClick={handle}>Add passkey</Button>;
};

export { AddButton };
