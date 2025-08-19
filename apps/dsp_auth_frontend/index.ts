'''
Edge function to link agency and advertiser accounts.
'''
import { serve } from 'https://deno.land/std/http/server.ts';
serve(async (req) => {
  const { agencyId, advertiserId } = await req.json();
  // Logic to link agency and advertiser accounts
  return new Response('Accounts linked successfully', { status: 200 });
});