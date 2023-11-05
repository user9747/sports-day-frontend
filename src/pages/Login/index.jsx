import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useLogin } from "./apis";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const auth = useAuth();
  const loginMutation = useLogin();
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.appState.isAuthenticated) {
      navigate("/");
    }
  }, [auth.appState.isAuthenticated]);

  return (
    <div className="h-full w-full flex">
      <div className="flex-1 flex justify-center items-center">
        <div className="w-4/5 sm:w-3/5">
          <div className="-mt-24">
            <h1 className="font-semibold text-3xl text-neutral-800">
              Sports Day
            </h1>
            <p className="text-sm text-neutral-600 mt-1">
              Sign in to register for events
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                loginMutation.mutate({ userName });
              }}
              className="mt-8"
            >
              <label
                htmlFor="username"
                className="block text-sm text-neutral-800 font-medium"
              >
                User Name
              </label>
              <Input
                type="text"
                name="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <Button
                type="submit"
                className="mt-4"
                disabled={loginMutation.isLoading}
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden sm:block w-3/5 bg-blue-100"></div>
    </div>
  );
}

export default Login;
