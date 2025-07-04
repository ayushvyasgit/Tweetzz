import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useRef } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  async function signin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const response  = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password
      });

      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      alert("Signed in successfully!");
      navigate("/DashBoard");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-300 flex justify-center items-center">
      <div className="bg-white rounded-xl border min-w-48 p-8 flex flex-col space-y-4">
        <Input ref={usernameRef} placeholder="Username" />
        <Input ref={passwordRef}  placeholder="Password" />
        <div className="flex justify-center pt-4 rounded-xl">
          <Button
            onClick={signin}
            loading={false}
            fullWidth={true}
            variant="primary"
            size="sm"
            text="signin"
          />
        </div>
      </div>
    </div>
  );
}
