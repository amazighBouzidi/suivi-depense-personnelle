import * as React from "react";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import Images from "../helper/Images";
import LoginForm from "../components/auth/LoginForm";
import InscriptionForm from "../components/auth/InscriptionForm";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const { bgImage } = Images;
  const [isLoginFormVisible, setIsLoginFormVisible] = React.useState(true);
  const [toastShown, setToastShown] = React.useState(false);

  const toggleFormInscription = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
    // Check if the toast has already been shown
    if (!toastShown) {
      toast.success("Utilisateur inscrit avec succès");
      setToastShown(true); // Set the flag to true after showing the toast
    }
  };

  return (
    <div className="flex min-h-screen">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="w-full md:w-1/2 flex flex-col px-8 py-6">
        {/* Header */}
        <header className="flex justify-center items-center py-3">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold">Dépenses personnelle</h1>
          </div>
        </header>

        {/* Main content */}
        <main className="my-auto flex flex-col items-center mx-auto w-full max-w-md">
          <div className="w-full mb-4">
            <h2 className=" text-center text-3xl font-bold">
              {isLoginFormVisible ? "Connection" : "Inscription"}
            </h2>
            {isLoginFormVisible ? (
              <p className="mt-2">
                Vous n'etes pas inscrit?{" "}
                <a
                  style={{ cursor: "pointer" }}
                  className="text-blue-600"
                  onClick={() => {
                    setIsLoginFormVisible(!isLoginFormVisible);
                  }}
                >
                  Inscrivez-vous!
                </a>
              </p>
            ) : (
              <p className="mt-2">
                Vous etes déja inscrit?{" "}
                <a
                  style={{ cursor: "pointer" }}
                  className="text-blue-600"
                  onClick={() => {
                    setIsLoginFormVisible(!isLoginFormVisible);
                  }}
                >
                  Connectez-vous!
                </a>
              </p>
            )}
          </div>
          {isLoginFormVisible ? (
            <LoginForm />
          ) : (
            <InscriptionForm toggleFormInscription={toggleFormInscription} />
          )}
        </main>
      </div>

      {/* Right-side background */}
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${bgImage})`,
        }}
      ></div>
    </div>
  );
}
