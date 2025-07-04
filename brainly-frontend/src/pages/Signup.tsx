import { Input } from "../components/ui/Input";

import { Button } from "../components/ui/Button";
import { useRef } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
export function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    
    await axios.post(`${BACKEND_URL}` +"/api/v1/signup" , { 
        username,
        password
    })
    alert("you have signedup")
  }
  return (
    <div className="h-screen w-screen bg-gray-300 flex justify-center items-center">
      <div className="bg-white rounded-xl border min-w-48 p-8 flex flex-col space-y-4">
        <Input ref={usernameRef} placeholder="Username" />
        <Input ref={passwordRef} placeholder="Password" />
        <div className="flex justify-center pt-4 rounded-xl">
          <Button
            onClick={signup}
            loading={false}
            fullWidth={true}
            variant="primary"
            size="sm"
            text="Signup"
          />
        </div>
      </div>
    </div>
  );
}
