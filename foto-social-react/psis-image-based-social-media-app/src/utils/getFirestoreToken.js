import { getAuth } from "firebase/auth";

export async function getFirestoreAccessToken() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) throw new Error("User not authenticated");

  const idToken = await user.getIdToken();

  const response = await fetch("https://foto-social-web-function-513469743668.europe-west3.run.app", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firebaseIdToken: idToken }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch Firestore token");
  }

  return data.firestoreToken;
}
