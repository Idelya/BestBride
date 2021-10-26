import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import request from "../../config/requests";
import cookies from "cookies";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { headers, body } = req;

  try {
    const response = await request.post("api/login", body, {
      // @ts-ignore
      headers: headers,
    });
    // @ts-ignore
    if (response?.data.status === "success") {
      // @ts-ignore
      cookies.set("jwt", response.data.token, {
        httpOnly: true,
        expires: new Date(
          // @ts-ignore
          Date.now() + 10 * 60 * 60 * 1000
        ),
      });

      return res.status(200).json({
        status: "success",
      });
    }
    return null;
  } catch (e) {
    return res.status(401).json({
      status: "fail",
      // @ts-ignore
      message: e.response.data.message,
    });
  }
};

export default handler;
