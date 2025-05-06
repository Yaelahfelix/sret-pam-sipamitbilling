"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface PasswordResetFormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function PasswordResetForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<PasswordResetFormValues>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  const validatePasswordMatch = (value: string) => {
    return value === newPassword || "Password tidak cocok";
  };

  const onSubmit = async (data: PasswordResetFormValues) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("oldPassword", data.oldPassword);
      formData.append("newPassword", data.newPassword);

      const response = await fetch("/api/users/reset-password", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Terjadi kesalahan saat memperbarui password"
        );
      }

      toast({
        title: "Berhasil!",
        description: "Password Anda berhasil diperbarui",
        variant: "default",

        duration: 3000,
      });

      reset();
    } catch (err) {
      toast({
        title: "Gagal!",
        description:
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan saat memperbarui password",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Perbarui password Anda dengan mengisi form di bawah ini
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="oldPassword">Password Lama</Label>
            <Input
              id="oldPassword"
              type="password"
              {...register("oldPassword", {
                required: "Password lama wajib diisi",
              })}
              className={errors.oldPassword ? "border-red-500" : ""}
            />
            {errors.oldPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.oldPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">Password Baru</Label>
            <Input
              id="newPassword"
              type="password"
              {...register("newPassword", {
                required: "Password baru wajib diisi",
              })}
              className={errors.newPassword ? "border-red-500" : ""}
            />
            {errors.newPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required: "Konfirmasi password wajib diisi",
                validate: validatePasswordMatch,
              })}
              className={errors.confirmPassword ? "border-red-500" : ""}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Success and error alerts removed, using toast instead */}
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          {isSubmitting ? "Memperbarui..." : "Perbarui Password"}
        </Button>
      </CardFooter>
    </Card>
  );
}
