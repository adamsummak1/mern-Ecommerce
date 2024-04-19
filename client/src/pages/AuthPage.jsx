import { useState } from "react";
import AuthForm from "../feutures/auth/AuthForm";

function AuthPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <AuthForm />
    </div>
  );
}
export default AuthPage;
