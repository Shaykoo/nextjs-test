import { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const PasswordPrompt = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = process.env.NEXT_PUBLIC_APP_PASSWORD || 'mysecretpassword';

    if (password === correctPassword) {
      Cookies.set('appPassword', password); // Set cookie
      router.push('/'); // Redirect to the homepage or app
    } else {
      setError(true);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>Enter Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <button type="submit" style={{ marginLeft: '10px', padding: '10px 20px' }}>
          Submit
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>Incorrect password. Try again.</p>}
    </div>
  );
};

export default PasswordPrompt;
