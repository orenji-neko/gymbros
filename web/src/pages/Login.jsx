import { useState } from "react";
import TextInput from "../components/inputs/TextInput"
import { Button } from "../components/buttons";
import { useAuth } from "../hooks/api/useAuth";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const loginHandler = async () => {
    if(!email && !password) 
      return

    const response = await login(email, password);
    const user = await response;

    if(user.isTrainer) {
      navigate("/trainer/")
    }
    else {
      navigate("/member/")
    }
  }

  return (
    <div className="flex justify-center p-4">

      <div className="ring-1 rounded-md p-4 sm:w-3/5 md:w-4/12 w-full flex flex-col p-4 gap-10">
        <h1 className="text-5xl font-bold p-4 text-center"> Gymbros </h1>
        <div className="flex flex-col p-4 gap-4">
          <TextInput label="Email" value={email} onChange={e => setEmail(e) } />
          <TextInput label="Password" type="password" value={password} onChange={e => setPassword(e) } />
          <Button
            onClick={loginHandler}
          >
            Login
          </Button>
          <Button>
            Register
          </Button>
        </div>
        
      </div>

    </div>
  );
}

export default Login;