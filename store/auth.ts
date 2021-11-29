import request from "../config/requests";

export const authPage = async (ctx: { req: { cookies: { jwt: any } } }) => {
  const token = ctx.req.cookies.jwt;
  let apiResponse;

  if (!token) {
    return {
      props: {
        user: null,
      },
    };
  }
  try {
    apiResponse = await request.get("api/user", {
      headers: { Cookie: `jwt=${token}`, Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    return {
      props: {
        user: null,
      },
    };
  }
  return {
    props: {
      user: apiResponse.data,
    },
  };
};

export const authServicePage = async (ctx: {
  req: { cookies: { jwt: any } };
  query: { id: number };
}) => {
  const token = ctx.req.cookies.jwt;
  let apiResponse;
  let isOwner;
  if (!token) {
    return {
      props: {
        user: null,
      },
    };
  }
  try {
    apiResponse = await request.get("api/user", {
      headers: { Cookie: `jwt=${token}`, Authorization: `Bearer ${token}` },
    });

    isOwner = await request.get("/api/isservice/" + ctx.query.id, {
      headers: { Cookie: `jwt=${token}`, Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    return {
      props: {
        user: null,
        isOwner: null,
      },
    };
  }
  return {
    props: {
      user: apiResponse.data,
      isOwner: isOwner.data,
    },
  };
};

export const unauthPage = async (ctx: { req: { cookies: { jwt: any } } }) => {
  const token = ctx.req.cookies.jwt;
  let apiResponse;
  if (!token) {
    return {
      props: {
        user: null,
      },
    };
  }
  try {
    apiResponse = await request.get("api/user", {
      headers: { Cookie: `jwt=${token}`, Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    return {
      props: {
        user: null,
      },
    };
  }
  return {
    props: {
      user: apiResponse.data,
    },
  };
};
