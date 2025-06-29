export async function getFirestoreAccessToken() {
  const secretKey = 'F$7pZx@9!kWm#4Ru2&QyL*vTj63Eca^oNXdY!g0hzPKuB&1fAJnVb%MLq8w#rTXC';

  const response = await fetch("https://foto-social-web-function-513469743668.europe-west3.run.app", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': secretKey
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch Firestore token");
  }

  return data.firestoreToken;
}
