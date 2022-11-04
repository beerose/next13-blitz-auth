import { getAntiCSRFToken } from '@blitzjs/auth';
import { BlitzPage } from '@blitzjs/next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SyntheticEvent, useState } from 'react';

const LoginPage: BlitzPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    const antiCSRFToken = getAntiCSRFToken()

    e.preventDefault();
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "anti-csrf": antiCSRFToken
      },
      body: JSON.stringify({
        email,
        password
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    router.push("/user")
  };

  return (
    <div>
      <h1>Login Form</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email: </label>
          <input 
            type="text" 
            id="email" 
            name="email" 
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <Link href="/login">
        Or Create a New Account
      </Link>
    </div>
  );
}

LoginPage.redirectAuthenticatedTo = "/user"

export default LoginPage