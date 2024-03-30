import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { GameAccess } from '@/types/main';
import { getAuthUser } from '@/app/supabase-client';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { body } = req;

    const user = await getAuthUser();

    if (!body) {
        return res.status(400).json({error: "No data received." });
    }

    const { data, error } = await supabase
    .from('payments')
    .update({ status: 'COMPLETED' })
    .eq('transaction_id', body.id)
    .select()

    if (error) {
        console.error('Error updating payment:', error);
        return res.status(500).json({ error: 'Failed to update payment status' });
    } else {
        // const gameAccess: GameAccess = {
        //     uid: user?.id,
        //     gid: data.gid,
        //     access_type: 'one-time-purchase', 
        //     status: 'active', 
        // };

        // const { data: accessData, error: accessError } = await supabase
        //     .from('game_access')
        //     .insert([gameAccess]);

        //     if (accessError) {
        //         console.error('Error inserting game access:', accessError);
        //     } else {
        //         console.log('Inserted game access:', accessData);
        //         res.redirect('/play');
        //     }
        console.log("PAYMENT SUCCESS WORKED!")
    }

}