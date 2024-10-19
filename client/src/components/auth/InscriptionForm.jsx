import React from "react";
import Images from "../../helper/Images";
import convertAndCompress from "../../helper/convertAndCompress.js";
import { useFormik } from "formik";
import validationSchema from "../../utils/validationSchemaUser.js";
import { registerUserWithForm } from "../../helper/helperUser.js";
import toast, { Toaster } from 'react-hot-toast';

const styles = {
  profile: {
    display: "flex",
    justifyContent: "center",
    padding: "1rem",
  },
  profileImg: {
    border: "4px solid #E5E7EB",
    width: "135px",
    height: "135px",
    borderRadius: "50%",
    cursor: "pointer",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    "&:hover": {
      border: "4px solid #D1D5DB",
    },
  },
  input: {
    display: "none",
  },
};

export default function InscriptionForm({ toggleFormInscription}) {
  const { profileImage } = Images;
  const [file, setFile] = React.useState("");

  const onUpload = async (e) => {
    const base64 = await convertAndCompress(e.target.files[0]);
    setFile(base64);
  };

  const formik = useFormik({
    initialValues: {
      lastName: "",
      firstName: "",
      address: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const createPromise = registerUserWithForm(values, file);

      createPromise
        .then(({ msg }) => {
          toast.success(msg); // Affiche le message en cas de succès
          formik.resetForm()
          toggleFormInscription()
        })
        .catch(({ error, msg }) => {
          toast.error(msg || error); // Affiche le message d'erreur en cas d'échec
        });
    },
  });

  return (
    <main className="my-auto flex flex-col items-center mx-auto w-full max-w-md">
      <div style={styles.profile}>
        <label htmlFor="profile">
          <img
            alt="avatar"
            src={file || profileImage}
            style={styles.profileImg}
          />
        </label>

        <input
          onChange={onUpload}
          accept="image/*"
          style={styles.input}
          id="profile"
          type="file"
        />
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col gap-4"
      >
        {/* Row for Nom and Prénom */}
        <div className="flex flex-col md:flex-row gap-4 mt-3">
          <div className="flex flex-col gap-1 w-full md:w-1/2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Nom
            </label>
            <input
              type="text"
              {...formik.getFieldProps("lastName")}
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                formik.touched.lastName && formik.errors.lastName
                  ? "ring-red-500"
                  : ""
              }`}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
            )}
          </div>
          <div className="flex flex-col gap-1 w-full md:w-1/2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Prénom
            </label>
            <input
              type="text"
              {...formik.getFieldProps("firstName")}
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                formik.touched.firstName && formik.errors.firstName
                  ? "ring-red-500"
                  : ""
              }`}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
            )}
          </div>
        </div>

        {/* Row for Adresse and Email */}
        <div className="flex flex-col md:flex-row gap-4 mt-3">
          {/* Address Input */}
          <div className="flex flex-col gap-1 w-full md:w-1/2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Adresse
            </label>
            <input
              type="text"
              {...formik.getFieldProps("address")}
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                formik.touched.address && formik.errors.address
                  ? "ring-red-500"
                  : ""
              }`}
            />
            {formik.touched.address && formik.errors.address && (
              <p className="text-red-500 text-sm">{formik.errors.address}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-1 w-full md:w-1/2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <input
              type="email"
              {...formik.getFieldProps("email")}
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                formik.touched.email && formik.errors.email
                  ? "ring-red-500"
                  : ""
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>
        </div>

        {/* Password Input */}
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Mot De Passe
          </label>
          <input
            type="password"
            {...formik.getFieldProps("password")}
            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
              formik.touched.password && formik.errors.password
                ? "ring-red-500"
                : ""
            }`}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4"
        >
          S'inscrire
        </button>
      </form>
    </main>
  );
}
