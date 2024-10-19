import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import validationSchemaAuth from "../../utils/validationSchemaAuth"; // Import your validation schema
import { authentificationUserWithForm } from "../../helper/helperUser";
import toast, { Toaster } from "react-hot-toast";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function LoginForm() {
  const navigate = useNavigate();

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      persistent: false,
    },
    validationSchema: validationSchemaAuth, // Validation schema
    onSubmit: (values) => {
      const createPromise = authentificationUserWithForm(values);

      createPromise
        .then(({ msg }) => {
          navigate("/Home"); // Navigate after form submission
        })
        .catch(({ error, msg }) => {
          toast.error(error); // Affiche le message d'erreur en cas d'échec
        });
    },
  });

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={formik.handleSubmit} // Use Formik's handleSubmit
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
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={formik.values.email} // Bind Formik value
            onChange={formik.handleChange} // Handle change with Formik
            onBlur={formik.handleBlur} // Handle blur with Formik
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-600 text-sm">{formik.errors.email}</div>
          ) : null}
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
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={formik.values.password} // Bind Formik value
            onChange={formik.handleChange} // Handle change with Formik
            onBlur={formik.handleBlur} // Handle blur with Formik
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-600 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="persistent"
            checked={formik.values.persistent} // Bind Formik value for checkbox
            onChange={formik.handleChange} // Handle change with Formik
          />
          Se souvenir de moi
        </label>
        <a href="#forgot-password" className="text-blue-600 text-sm">
          Mot De Passe Oublié?
        </a>
      </div>

      <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Se Connecter
      </button>
    </form>
  );
}
