import { getAntiCSRFToken, useRedirectAuthenticated } from '@blitzjs/auth';
import { BlitzPage } from '@blitzjs/next';
import { useRouter } from 'next/router';
import { SyntheticEvent, useState } from 'react';

const SignupPage: BlitzPage = () => {
  useRedirectAuthenticated("/user")

  const router = useRouter()
  const [email, setemail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const antiCSRFToken = getAntiCSRFToken()
    const response = await fetch("/api/signup", {
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
      <h1>Signup Form</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email: </label>
          <input 
            type="text" 
            id="email" 
            name="email" 
            value={email}
            onChange={e => setemail(e.target.value)}
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
    </div>
  );
}

export default SignupPage