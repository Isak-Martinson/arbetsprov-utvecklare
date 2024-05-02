import { NextResponse } from 'next/server';
import { API_URL } from '@/config';

export const POST = async (request: Request) => {
  const data = await request.json();

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const responseStatus = await response.json();
  console.log(data, responseStatus);

  return new Response(JSON.stringify(responseStatus));
};
