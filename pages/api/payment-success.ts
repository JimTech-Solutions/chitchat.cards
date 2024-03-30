import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { GameAccess } from '@/types/main';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    return res.status(200).json({req_query: req.query,  body: req.body, previewData: req.previewData  });

    // const { data, error } = await supabase
    //     .from('payments')
    //     .update({ status: 'COMPLETED' })
    //     .match({ transaction_id });

    // if (error) {
    //     console.error('Error updating payment:', error);
    //     return res.status(500).json({ error: 'Failed to update payment status' });
    // } else {
        // const gameAccess: GameAccess = {
        //     uid: user?.id,
        //     gid: game.game_gid,
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
    //     res.redirect('/play');
    // }

}