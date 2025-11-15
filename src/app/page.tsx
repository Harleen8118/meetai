"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {
  const { data: session } = authClient.useSession() 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onError: (err) => {
          console.error(err);
          window.alert("Something went wrong");
        },
        onSuccess: () => {
          window.alert("Success!");
        },
      }
    );
  };

  const onLogin = async () => {
    authClient.signIn.email(
      {
        email,
        name,
        password,
      },
      {
        onError: (err) => {
          console.error(err);
          window.alert("Something went wrong");
        },
        onSuccess: () => {
          window.alert("Success!");
        },
      }
    );
  };


  if (session) {
    return (
      <div className = "flex flex-col p-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>
          Sign Out
        </Button>  
      </div>
    );
  }

  return (
    <div className = "flex flex-col gap-y-10">
    <div className="flex flex-col gap-4 max-w-sm mx-auto p-4">
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={onSubmit}>Create User</Button>
    </div>
    <div className="flex flex-col gap-4 max-w-sm mx-auto p-4">
      
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={onLogin}>
        Login
        </Button>
    </div>
    </div>
  );
}
