export async function authentificationUserWithForm(values){
    try {
        const response = await fetch(`http://localhost:8080/api/authUser`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer`,
                'Content-type': 'application/json', 
            },
            body: JSON.stringify(values)
        })
        if(!response.ok){
            throw new Error('nom d\'utilisateur ou mot de passse Incorrecte');  
        }
        const { token, user, msg } = await response.json()
        localStorage.setItem('tokenUser', token)
        
        return Promise.resolve(msg)

    } catch (error) {
        return Promise.reject(error)
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