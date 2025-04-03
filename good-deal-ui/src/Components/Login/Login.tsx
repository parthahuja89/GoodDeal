import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../ui/alert";
import { Info } from "lucide-react";
import { Button } from "../ui/button";
import GoogleLogo from '../../assets/google_logo.svg'
import GitHubMark from '../../assets/github-mark.svg'
import { MoveLeftIcon } from "lucide-react";
import * as Auth from '../../Services/Auth';

const styles = {
    background: 'linear-gradient(300deg,#ff9200,#ff0093,#ff4700)',
    backgroundSize: '180% 180%',
    animation: 'gradient-animation 18s ease infinite',
}
function LoginPage(){
    return (
      <div
        className="w-dvw h-dvh flex items-center justify-center"
        style={styles}
      >
        <Card className="bg-neutral-900 text-white border-neutral-800 w-[90vw] xl:w-[35vw] h-[40vh] shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-5">
              <Button variant="secondary" onClick={()=>window.location.href="/"}>
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
                <AlertDescription className="mt-2" >
                  You don't need an account created to sign in.
                  <div className="my-1" />
                  If you're having troubles signing in, please submit a <a className="underline" href="#">ticket</a>.
                </AlertDescription>
            </Alert>

            <CardDescription className="text-slate-200 flex flex-col items-center justify-center">
              <Button variant="secondary" className="mt-10" onClick={Auth.redirectToGoogleAuth}>
                <img src={GoogleLogo} className="w-5 h-5" alt="Google Logo"/>
                Sign in with Google
              </Button>
            </CardDescription>
          </CardContent>
          
        </Card>
      </div>
    );
}

export default LoginPage;