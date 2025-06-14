import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import PageNotFound from '@assets/page_not_found.png'

export default function NotFound() {
  return (
    <div className="bg-gray-700 flex h-screen w-full justify-center items-center">
      <Card className="bg-slate-800 col-span-3 row-span-5 border-none">
        <CardHeader>
          <CardTitle className="text-slate-200 text-xl font-bold flex items-center gap-3">
            The road not taken
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="flex flex-col items-center text-slate-200">
            <img 
              src={PageNotFound} 
              className="w-32 h-32" 
              alt="Page Not Found" 
              style={{ clipPath: 'inset(5px)' }}
            />
            <span className="mt-5">You seem to be lost. This is not a valid path. That is all we know.</span>
            <Button 
              className="w-2/3 m-5" 
              onClick={() => window.location.href = '/home'}
            >
              Return Home
            </Button>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
