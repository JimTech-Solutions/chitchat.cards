import { cache } from 'react';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';

export const createServerSupabaseClient = cache(() => createServerComponentClient({ cookies }));

export async function getSupabaseSession() {
    const supabase = createServerSupabaseClient();
    try {
        const {
            data: { session },
        } = await supabase.auth.getSession();
        return session;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export async function getAuthUser() {
    const supabase = createServerSupabaseClient();
    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        // Combine the data from both sources
        const combinedInfo = {
            ...user
        };

        if (!user) {
            return null;
        }
        return combinedInfo;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export async function getUser() {
    const supabase = createServerSupabaseClient();
    try {
        const { data } = await supabase.from('users').select('*').single();

        // Then, get the user profile from the public.user_profiles table
        const { data: userProfile } = await supabase.from('user_profiles').select('*').eq('uid', data?.id).single();

        console.log('logged id:', data.id);

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

export async function getUserInfo(userId: any) {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!);

    try {
        // First, get the basic user info from Supabase Auth
        const {
            data: { user },
            error,
        } = await supabase.auth.admin.getUserById(userId);

        // Then, get the user profile from the public.user_profiles table
        const { data: userProfile } = await supabase.from('user_profiles').select('*').eq('uid', userId).single();

        // Combine the data from both sources
        const combinedUserInfo = {
            ...user,
            profile: userProfile,
        };

        return combinedUserInfo;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// export async function getPostForUser(postId: Post['id'], userId: User['id']) {
//     const supabase = createServerSupabaseClient();
//     const { data } = await supabase.from('posts').select('*').eq('id', postId).eq('author_id', userId).single();
//     return data ? { ...data, content: data.content as unknown as JSON } : null;
// }
