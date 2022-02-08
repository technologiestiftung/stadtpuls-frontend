import http from "http";

export interface UserSignupDataType {
  email: string;
  name: string;
}

const options = {
  host: "localhost",
  port: 4000,
  path: "/api/v3/signup",
  method: "POST",
  headers: {
    apikey: `${process.env.NEXT_PUBLIC_API_URL || ""}`,
    "Content-Type": "application/json",
  },
};

export const createUser = (user: UserSignupDataType): void => {
  const data = JSON.stringify({
    email: user.email,
    name: user.name,
  });

  const req = http.request(options, res => {
    res.on("data", d => {
      process.stdout.write(d);
    });
  });

  req.on("error", error => {
    console.error(error);
  });

  req.write(data);
  req.end();
};
