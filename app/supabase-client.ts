import { cache } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

// Instead of using cookies (server-side), use the appropriate client-side storage.
export const createClientSupabaseClient = cache(() => createClientComponentClient({}));

export async function getSupabaseSession() {
    const supabase = createClientSupabaseClient();
    try {
        const session = supabase.auth.getSession();
        return session;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export async function getAuthUser() {
    const supabase = createClientSupabaseClient();
    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return null;
        }
        // Combine the data from both sources
        const combinedInfo = {
            ...user
        };
        
        return combinedInfo;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export async function getUser() {
    const supabase = createClientSupabaseClient();
    try {
        const { data, error } = await supabase.from('users').select('*').single();

        if (error) {
            throw error;
        }

        console.log('logged id:', data.id);

        // Then, get the user profile from the public.user_profiles table
        const { data: userProfile } = await supabase.from('user_profiles').select('*').eq('uid', data?.id).single();

        // Combine the data from both sources
        const combinedUserInfo = {
            ...data,
            user_profile: userProfile,
        };

        return combinedUserInfo;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export async function logOutUser() {
    const supabase = createClientSupabaseClient();
    let { error } = await supabase.auth.signOut()
    
    if (!error) {
        // Redirect to the login page or home page as preferred
        window.location.href = '/play'; // Change '/login.html' to your login page or any other page
    } else {
        // Handle the error, maybe show a message to the user
        console.error('Logout failed', error.message);
    }


}