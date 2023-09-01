type UserCredentials = {
  email: string;
  password: string;
};

export async function authenticate({ email, password }: UserCredentials) {
  let body = JSON.stringify({ user: { email, password } });

  let response = await fetch("api/users/session", {
    method: "POST",
    body,
  });

  let json = await response.json();

  if (response.ok === false) {
    throw new Error(json.message);
  }
}
