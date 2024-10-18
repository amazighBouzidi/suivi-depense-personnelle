import React from "react";
import { useNavigate } from "react-router-dom";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function LoginForm() {
  const navigate = useNavigate()

  return (
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
          navigate("/Home");
        }}
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Se Connecter
      </button>
    </form>
  );
}
