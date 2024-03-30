import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { transaction_id } = req.query;

    console.log('transaction id', transaction_id);

    if (!transaction_id) {
        return res.status(400).json({ error: 'Transaction ID is required', req: req.query });
    }

    const { data, error } = await supabase
        .from('payments')
        .update({ status: 'FAILED' })
        .match({ transaction_id });

    if (error) {
        console.error('Error updating payment:', error);
        return res.status(500).json({ error: 'Failed to update payment status' });
    } else {
        res.redirect('/play');
    }

}