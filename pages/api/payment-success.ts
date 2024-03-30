import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { GameAccess } from '@/types/main';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { body } = req;
    // const { id } = req.query

    const {
            data: { user },
        } = await supabase.auth.getUser();

    if (!body.id) {
        return res.status(400).json({error: "No data received." });
    }

    console.log(user);

    const { data, error } = await supabase
    .from('payments')
    .update({ status: 'COMPLETED' })
    .eq('transaction_id', body.id)
    .select().single();


    console.log(data);


    if (error) {
        console.error('Error updating payment:', error);
        return res.status(500).json({ error: 'Failed to update payment status' });
    } else {
        const gameAccess: GameAccess = {
            uid: data.uid,
            gid: data.gid,
            access_type: 'one-time-purchase', 
            status: 'active', 
        };

        const { data: accessData, error: accessError } = await supabase
            .from('game_access')
            .insert([gameAccess]);

            if (accessError) {
                console.error('Error inserting game access:', accessError);
            } else {
                console.log('Inserted game access:', data);
                // res.redirect('/play');
                return res.status(200).json({ success: "PAYMENT SUCCESSFUL!" });
            }
    }

}