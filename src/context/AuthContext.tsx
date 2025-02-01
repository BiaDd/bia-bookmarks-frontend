import { createContext, useEffect, useState, useContext } from "react";

// @ts-ignore
import { supabase } from '../supabaseClient';


const AuthContext = createContext<any>(null);

export const AuthContextProvider = ({ children }: any) => {
    const [session, setSession] = useState(undefined);

    const signUpNewUser = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        })

        if (error) {
            console.error("There was a problem with signing up a user");
            return { success: false, error }
        }

        return { success: true, data }
    };

    const signInUser = async (email: string, password: string) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });
            if (error) {
                console.error("Error signing in: ", error);
                return { success: false, error: error.message }
            }

            console.log("Sign in Success", data);
            return { success: true, data };
        } catch (error) {
            console.error("Error signing in: ", error);
        }
    }

    const signOutUser = () => {
        const { error } = supabase.auth.signOut();

        if (error) {
            console.error("Error signing out: ", error);
        }
    }


    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }: any) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event: any, session: any) => {
            setSession(session);
        })
    }, [])

    return (
        <AuthContext.Provider value={{ session, signUpNewUser, signInUser, signOutUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}