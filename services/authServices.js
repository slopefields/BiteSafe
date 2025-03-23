import { supabaseClient } from './supabase.js';

// Function for registering 
export const signUp = async (username, password, allergiesList) => {
    // Created a fake email here because supabase requires email and password (not username and password)
    const email = `${username}@example.com`;

    const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options : {
            data: { username, allergiesList }
        }
    });

    if (error) {
        console.error('Error during sign up: ', error.message);
        return null;
    }
    return data.user;
}

// Function for signing in
export const signIn = async (username, password) => {
    // Fake email again
    const email = `${username}@example.com`;
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });
    if (error) {
        console.error('Error logging in: ', error.message);
        return null;
    }
    return data.user;
}

// Maybe add signing out 