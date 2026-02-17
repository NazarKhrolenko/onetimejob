import React from "react";
import { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "./supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    async function getInitialSession() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        setSession(data.session);
      } catch (error) {
        console.error("Error getting session:", error.message);
      }
    }
    getInitialSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log("Session changed:", session);
    });
  }, []);

  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      });
      if (error) {
        console.error("Supabase sign-in error:", error.message);
        return { success: false, error: error.message };
      }
      return { success: true, data };
    } catch (error) {
      console.error("Unexpected error during sign-in:", error.message);
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Supabase sign-out error:", error.message);
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (error) {
      console.error("Unexpected error during sign-out:", error.message);
      return {
        success: false,
        error: "An unexpected error occurred during sign out.",
      };
    }
  };

  const signUpUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase(),
        password: password,
      });
      if (error) {
        console.error("Supabase sign-up error:", error.message);
        return { success: false, error: error.message };
      }
      console.log("Supabase sign-up success:", data);
      return { success: true, data };
    } catch (error) {
      console.error("Unexpected error during sign-up:", error.message);
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  };

  return (
    <AuthContext.Provider value={{ session, signInUser, signOut, signUpUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthContext;
