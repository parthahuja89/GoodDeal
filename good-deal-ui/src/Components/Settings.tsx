"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Save, Trash, User2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import getUserInfo, { saveUserInfo } from "@/Services/User";
import User from "@/models/User";
// Import your Redux actions
import { setUser, updateUser } from "@/store/slices/userSlice";
import { RootState } from "@/store/redux";

interface FormData {
  firstName: string;
  lastName: string;
  steamId: string;
  email: string;
}

interface DeleteFormData {
  confirmEmail: string;
}

export default function Settings() {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user.userData);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { register: registerDelete, handleSubmit: handleDeleteSubmit, formState: { errors: deleteErrors }, watch } = useForm<DeleteFormData>();

  const confirmEmail = watch("confirmEmail");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await getUserInfo();
        // Update Redux store with user data
        dispatch(setUser(res));
        reset({
          firstName: res.Firstname || "",
          lastName: res.Lastname || "",
          steamId: res.steam_id || "",
          email: res.email || ""
        });
      } catch (error) {
        toast({
          title: "Error loading user data",
          variant: "destructive"
        });
      }
    };
    fetchUserInfo();
  }, [dispatch, reset, toast]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const updatedUserData = {
        ...userData,
        Firstname: data.firstName,
        Lastname: data.lastName,
        steam_id: data.steamId,
      };

      // Update Redux store
      dispatch(updateUser(updatedUserData));
      
      // Save to backend
      await saveUserInfo(updatedUserData);

      toast({
        title: "User updated successfully",
        duration: 1300,
      });
    } catch (error) {
      toast({
        title: "Error updating user",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onDeleteAccount = async (data: DeleteFormData) => {
    if (data.confirmEmail !== userData.email) {
      return;
    }

    setDeleteLoading(true);
    
    try {
      // Add your delete account API call here
      // await deleteUserAccount();
      
      // Clear user from Redux store
      dispatch(setUser({
        Firstname: "",
        Lastname: "",
        picture_url: "",
        email: "",
      }));
      
      toast({
        title: "Account deleted successfully",
      });
      
      // Redirect or handle post-deletion logic
    } catch (error) {
      toast({
        title: "Error deleting account",
        variant: "destructive"
      });
    } finally {
      setDeleteLoading(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl py-10">
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Account Settings</CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="h-24 w-24 border-2 border-muted">
                <AvatarImage
                  src={userData.picture_url || "/placeholder.svg"}
                  alt="Profile picture"
                />
                <AvatarFallback>
                  <User2Icon className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName"
                  {...register("firstName", { required: true, minLength: 2 })}
                  placeholder="Enter your first name"
                />
              </div>
              
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName"
                  {...register("lastName", { required: true, minLength: 2 })}
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                {...register("email")}
                placeholder="email"
                disabled
              />
              <p className="text-xs text-muted-foreground mt-2">
                Accounts created with google login can't update their emails
              </p>
            </div>
            
            <div>
              <Label htmlFor="steamId">Steam ID</Label>
              <Input 
                id="steamId"
                {...register("steamId")}
                placeholder="Steam ID not setup"
                disabled
              />
              <p className="text-xs text-muted-foreground mt-2">
                You can update your Steam ID on the deals{" "}
                <a href="/steam-deals" className="underline">
                  page
                </a>
                .
              </p>
            </div>
            
            <div className="flex w-full justify-between">
              <Button
                type="button"
                className="w-2/3 md:w-1/3"
                disabled={isSubmitting}
                variant="destructive"
                onClick={() => setShowDeleteDialog(true)}
              >
                {isSubmitting ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Account
                  </>
                )}
              </Button>
              <Button
                type="submit"
                className="w-2/3 md:w-1/3"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      
      </Card>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              This action will delete all your data. If you'd like to continue, enter your email address.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleDeleteSubmit(onDeleteAccount)}>
            <div className="py-4">
              <Label htmlFor="confirmEmail">Email Address</Label>
              <Input
                id="confirmEmail"
                type="email"
                placeholder="Enter your email to confirm"
                {...registerDelete("confirmEmail", { 
                  required: "Email is required",
                  validate: value => value === userData.email || "Email does not match your account email"
                })}
              />
              {deleteErrors.confirmEmail && (
                <p className="text-sm text-red-500 mt-1">
                  {deleteErrors.confirmEmail.message}
                </p>
              )}
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="destructive" 
                disabled={deleteLoading || confirmEmail !== userData.email}
              >
                {deleteLoading ? "Deleting..." : "Delete Account"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <Toaster />
    </div>
  );
}