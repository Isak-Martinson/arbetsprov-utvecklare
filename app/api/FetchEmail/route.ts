import { API_URL } from '@/config';

export const POST = async (request: Request) => {
  const data = await request.json();
  let responseStatus;
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    responseStatus = await response.json();
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify('api call failed'), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(responseStatus));
};
