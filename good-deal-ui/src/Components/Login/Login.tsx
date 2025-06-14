import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import GoogleLogo from "../../assets/google_logo.svg";
import { MoveLeftIcon } from "lucide-react";
import * as Auth from "../../Services/Auth";
import { useNavigate } from "react-router-dom";

const styles = {
  background: "linear-gradient(300deg,#ff9200,#ff0093,#ff4700)",
  backgroundSize: "180% 180%",
  animation: "gradient-animation 18s ease infinite",
};
function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      
      if (await Auth.getAuthStatus()) {
        navigate('/home');
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div
      className="w-dvw h-dvh flex items-center justify-center"
      style={styles}
    >
      <Card className="bg-neutral-900 text-white border-neutral-800 w-[90vw] xl:w-[35vw] h-[40vh] shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-5">
            <Button
              variant="secondary"
              onClick={() => (window.location.href = "/")}
            >
              <MoveLeftIcon className="h-5 w-5" />
            </Button>
            Login to continue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTitle className="flex items-center gap-2">
              Heads up!
            </AlertTitle>
            <AlertDescription className="mt-2">
              You don't need an account created to sign in.
            </AlertDescription>
          </Alert>

          <CardDescription className="text-slate-200 flex flex-col items-center justify-center">
            <Button
              variant="secondary"
              className="mt-10"
              onClick={Auth.redirectToGoogleAuth}
            >
              <img src={GoogleLogo} className="w-5 h-5" alt="Google Logo" />
              Sign in with Google
            </Button>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;
