import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import request from "../../config/requests";
import Cookies from "cookies";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { headers, body } = req;
  const cookies = new Cookies(req, res);

  try {
    const response = await request.post("api/login", body);
    // @ts-ignore
    if (response?.data.message === "OK") {
      // @ts-ignore
      const regexp = new RegExp(`.*jwt=([^;]*)`);
      // @ts-ignore
      const token = regexp.exec(
        response?.headers["set-cookie"]?.join() || ""
      )[1];
      cookies.set("jwt", token, {
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
      message: e.response?.data.message,
    });
  }
};

export default handler;
