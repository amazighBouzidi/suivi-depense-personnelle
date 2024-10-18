
import { Navigate } from "react-router-dom";
import { checkUserAccessibility } from "../helper/helperUser";
import { useState, useEffect } from "react";
import "liquid-loading";
import { Box } from "@mui/joy";

export const AuthorizeUser = ({ children }) => {
    const token = localStorage.getItem('tokenUser');

    if(!token){
        return <Navigate to={'/'} replace={true}></Navigate>
    }

    return children;
}


export const ProtectRoute = ({ children }) => {
    const [isValid, setIsValid] = useState(null); // `null` means loading
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkAccess() {
            const token = localStorage.getItem('tokenUser');
            if (!token) {
                setIsValid(false);
                setLoading(false);
                return;
            }

            try {
                const result = await checkUserAccessibility();
                setIsValid(result);
            } catch (error) {
                console.error('Error checking user accessibility:', error);
                setIsValid(false);
            } finally {
                setLoading(false);
            }
        }

        checkAccess();
    }, []);

    if (loading) {
        return (
            <Box 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '100vh', // Full viewport height
                    mt: 5
                }}
            >
                <liquid-loading></liquid-loading>
            </Box>
        ); // Show a loading state while checking access
    }

    if (!isValid) {
        return <Navigate to='/' replace={true} />;
    }

    return children;
};