import * as React from "react";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import Images from "../helper/Images";
import LoginForm from "../components/auth/LoginForm";
import InscriptionForm from "../components/auth/InscriptionForm";

export default function Login() {
  const { bgImage } = Images

  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-1/2 flex flex-col px-8 py-6">
        {/* Header */}
        <header className="flex justify-between py-3">
          <div className="flex items-center gap-2">
            <h1 className="ml-4 text-lg font-bold">Dépenses personnelle</h1>
          </div>
        </header>

        {/* Main content */}
        <main className="my-auto flex flex-col items-center mx-auto w-full max-w-md">
          <div className="w-full mb-4">
            <h2 className=" text-center text-3xl font-bold">Sign in</h2>
            <p className="mt-2">
              Vous etes déja inscrit?{' '}
              <a href="#sign-up" className="text-blue-600">
                Inscrivez-vous!
              </a>
            </p>
          </div>
          <InscriptionForm />
        </main> 
      </div>

      {/* Right-side background */}
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          transition:
            'background-image var(--Transition-duration), left var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${bgImage})`,
        }}
      ></div>
    </div>
  );
}
