export const fetchToken = async () => {
  try {
    const response = await fetch('/api/requestToken');
    if (!response.ok) {
      throw new Error('Failed to fetch token');
    }
    const data = await response.json();
    const token = data.request_token;

    if (token) {
      localStorage.setItem('request_token', token);
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
    }
  } catch (error) {
    console.log('Error fetching token:', error.message);
  }
};

export const createSessionId = async () => {
  const token = localStorage.getItem('request_token');
  if (token) {
    try {
      const response = await fetch('/api/sessionId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ request_token: token }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch session id');
      }
      const data = await response.json();
      if (data.session_id) {
        localStorage.setItem('session_id', data.session_id);
        return data.session_id;
      } else {
        throw new Error('No session id in the response');
      }
    } catch (err) {
      console.error(err);
    }
  }
};

// get account details
export const getAccount = async (sessionId) => {
  try {
    const response = await fetch(`/api/getAccount?sessionId=${sessionId}`);

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || 'Failed to fetch account details');
    }

    const accountData = await response.json();
    console.log(accountData);
    return accountData;
  } catch (err) {
    console.error('Error fetching account details:', err);
    return null;
  }
};

