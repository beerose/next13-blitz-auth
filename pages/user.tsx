import { getAntiCSRFToken } from "@blitzjs/auth";
import { BlitzPage } from "@blitzjs/next";
import { useRouter } from "next/router";
import { SyntheticEvent } from "react";
import { useSession } from "../src/blitz-client"
import styles from '../app/page.module.css'

const UserPage: BlitzPage = () => {
  const router = useRouter()
  const session = useSession()

  const onLogout = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    const antiCSRFToken = getAntiCSRFToken()
    const response = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "anti-csrf": antiCSRFToken
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    router.push("/")
  };

  return (
    <main className={styles.main}>
      <div>
        <h2>User Page</h2>
        {session.userId ? (
          <>
            <p>User id: {session.userId}</p>
            <p>User email: {session.email}</p>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : "Not authenticated"}
      </div>
    </main>
  )
}

UserPage.authenticate = { redirectTo: "/login" }

export default UserPage