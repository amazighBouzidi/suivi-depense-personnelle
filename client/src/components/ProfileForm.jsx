import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import validationSchemaProfile from "../utils/validationSchemaProfile";
import toast, { Toaster } from "react-hot-toast";
import Images from "../helper/Images";
import { getProfileUser, updateProfileUser } from "../helper/helperUser";
import convertAndCompress from "../helper/convertAndCompress";

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

export default function ProfileForm() {
  const { profileImage } = Images;
  const [file, setFile] = React.useState("");
  const [user, setUser] = React.useState({});

  const onUpload = async (e) => {
    const base64 = await convertAndCompress(e.target.files[0]);
    setFile(base64);
  };
  const initialValues = {
    lastName: user?.lastName || "",
    firstName: user?.firstName || "",
    address: user?.address || "",
    email: user?.email || "",
  };

  const handleSubmit = (value) => {
    const values = {...value, profile: file}
    console.log(values)
    const createPromise = updateProfileUser(values);

    createPromise
      .then(({ msg }) => {
        toast.success("Votre Profile a été modifier avec succes")
      })
      .catch(({ error, msg }) => {
        toast.error(error); // Affiche le message d'erreur en cas d'échec
      });
  };

  useEffect(() => {
    const createPromise = getProfileUser();

    createPromise
      .then(({ user }) => {
        setUser(user);
        setFile(user?.profile || "");
      })
      .catch(({ error, msg }) => {
        toast.error(error); // Affiche le message d'erreur en cas d'échec
      });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-12 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-12">
            <div className="bg-white shadow rounded-lg p-6">
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
              <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchemaProfile}
                onSubmit={handleSubmit}
              >
                {() => (
                  <Form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Last Name */}
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Last Name
                        </label>
                        <Field
                          type="text"
                          id="lastName"
                          name="lastName"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      {/* First Name */}
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          First Name
                        </label>
                        <Field
                          type="text"
                          id="firstName"
                          name="firstName"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      {/* Address */}
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Address
                        </label>
                        <Field
                          type="text"
                          id="address"
                          name="address"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <ErrorMessage
                          name="address"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email
                        </label>
                        <Field
                          type="email"
                          id="email"
                          name="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex justify-center">
                      <div className="w-full">
                        <button
                          type="submit"
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                        >
                          Modifier
                        </button>
                      </div>
                      <div className="ml-2 w-full">
                        <button
                          type="reset"
                          className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
                        >
                          Annuler
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
