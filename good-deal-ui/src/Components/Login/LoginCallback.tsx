import React, { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom";
import {
    Card,
    CardContent,
    CardDescription
  } from "@/Components/ui/card";
import { Spinner } from '../ui/spinner';
import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "../ui/alert";
import * as Auth from '../../Services/Auth'
const styles = {
    background: 'linear-gradient(300deg,#ff9200,#ff0093,#ff4700)',
    backgroundSize: '180% 180%',
    animation: 'gradient-animation 18s ease infinite',
}


export default function LoginCallback() {
    const [showError, setShowError] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect( () => {
        (async () => {
            await extractAuthCode();
        })();
     }, []); 

     async function extractAuthCode(){
        const authCode = searchParams.get("code");
        console.log(authCode)
        if (!authCode) {
            setShowError(true);
        }
        else{
          try {
            await Auth.getTokenFromCode(authCode)
          } catch (error) {
            setShowError(true)
          }
        }
    }
    
    return (
      <div
        className="w-dvw h-dvh flex items-center justify-center"
        style={styles}
      >
        <Card className="bg-neutral-900 text-white border-neutral-800 w-[90vw] xl:w-[35vw] h-[40vh] shadow-xl">
          <CardContent>
            {showError ? (
              <CardDescription className="mt-20 text-lg ex gap-2 flex-col items-center justify-center">
                <Alert>
                  <AlertTitle className="flex items-center text-red-500 gap-2">
                    Invalid login callback
                  </AlertTitle>
                  <AlertDescription className="mt-2">
                    There was an error logging you in.
                    <div className="my-1" />
                    Please submit a{" "}
                    <a className="underline" href="#">
                      ticket
                    </a>
                    , or Return to{" "}
                    <a className="underline" href="/login">
                      login
                    </a>
                    .
                  </AlertDescription>
                </Alert>
              </CardDescription>
            ) : (
              <CardDescription className="mt-20 font-bold text-xl text-slate-200 flex gap-2 flex-col items-center justify-center">
                <Spinner className="text-slate-50" />
                Authenticating
              </CardDescription>
            )}
          </CardContent>
        </Card>
      </div>
    );
  
}