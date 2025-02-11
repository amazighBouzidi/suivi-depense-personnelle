export async function authentificationUserWithForm(values){
    try {
        const response = await fetch(`http://localhost:8080/api/auth/authUser`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer`,
                'Content-type': 'application/json', 
            },
            body: JSON.stringify(values)
        })
        const { token, msg } = await response.json()

        if (response.status === 401) {
            return Promise.reject({ error: "Email ou mot de pas Incorrecte" }); // Unauthorized access
        }

        if(response.status == 200){
            localStorage.setItem('tokenUser', token)
            return Promise.resolve(msg)
        }

    } catch (error) {
        return Promise.reject({ error: "Erreur de connection veuillez réessayer" })
    }
}

export async function checkUserAccessibility() {
    const token = localStorage.getItem('tokenUser');

    if (!token) {
        return false; // No token means no access
    }

    try {
        const response = await fetch('http://localhost:8080/api/checkUser', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to check user accessibility');
        }

        const { isValid } = await response.json();
        return isValid;

    } catch (error) {
        console.error('Error checking user accessibility:', error);
        return false; // Return false if there's an error
    }
}

/** register user with form function */
export async function registerUserWithForm(values, file){
    const profileUser = JSON.stringify(values)
    try {
        const response = await fetch(`http://localhost:8080/api/auth/userForm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({parsedProfileUser : profileUser, file})
        });

        const { msg, token } = await response.json();       

        if (response.status === 401) {
            return Promise.reject({ error: "Utilisateur avec email existe déja" }); // Unauthorized access
        }

        if (response.status !== 201) {
            throw new Error("Erreur lors de l'inscription de l'utilisateur");
        }

        if (response.status == 201) { 
            return Promise.resolve(msg);
        }
    } catch (error) {
        return Promise.reject({ error: "Erreur de connection veuillez réessayer" });
    }  
}

export async function getProfileUser() {
    const token = localStorage.getItem('tokenUser');
  
    if (token) {
      try {
        // Assuming you have a backend endpoint to fetch the props based on userID
        const response = await fetch(`http://localhost:8080/api/getUser`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const { user } = await response.json()

        if (response.status === 401) {
            return Promise.reject({ error: "Email ou mot de pas Incorrecte" }); // Unauthorized access
        }

        if(response.status == 200){
            return Promise.resolve({ user})
        }
      } catch (error) {
        console.error('Error fetching props:', error);
      }
    }
};

export async function updateProfileUser(values){
    const token = localStorage.getItem('tokenUser');
    const profileUser = JSON.stringify(values)
   // console.log("Profile User Helper: ", profileUser)
    if (token) {
        try {
          // Assuming you have a backend endpoint to fetch the props based on userID
          const response = await fetch(`http://localhost:8080/api/updateProfile`, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({parsedProfileUser : profileUser})
          });

    
          const { msg } = await response.json()

          if (response.status === 401) {
              return Promise.reject({ error: "Erreur lors de la modification du profile, veuillez rééssayer!" }); // Unauthorized access
          }
  
          if(response.status == 201){
            return Promise.resolve({ msg })
          }
        } catch (error) {
          return Promise.reject(error)
        }
    }
}