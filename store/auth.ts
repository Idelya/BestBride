import request from "../config/requests";

export const authPage = async (ctx: { req: { cookies: { jwt: any } } }) => {
  const token = ctx.req.cookies.jwt;
  let apiResponse;
  try {
    apiResponse = await request.get("api/user", {
      headers: { Cookie: `jwt=${token}`, Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: apiResponse.data,
    },
  };
};
