import * as React from "react";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import Images from "../helper/Images";
import { useNavigate } from "react-router-dom";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function Login() {
  const { bgImage } = Images
  const navigate = useNavigate()

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

          <form
            className="w-full flex flex-col gap-4"
            onSubmit={(event: React.FormEvent<SignInFormElement>) => {
              event.preventDefault();
              const formElements = event.currentTarget.elements;
              const data = {
                email: formElements.email.value,
                password: formElements.password.value,
                persistent: formElements.persistent.checked,
              };
              alert(JSON.stringify(data, null, 2));
            }}
          >
            <div className="mt-3 flex flex-col gap-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Mot De Passe
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2">
                <input type="checkbox" name="persistent" /> Se souvenir de moi
              </label>
              <a href="#forgot-password" className="text-blue-600 text-sm">
                Mot De Passe Oublié?
              </a>
            </div>

            <button
              type="submit"
              onClick={() => {
                navigate('/Home')
              }}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Se Connecter
            </button>
          </form>
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
