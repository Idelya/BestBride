import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";
import request from "../../config/requests";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = new Cookies(req, res);
  try {
    const response = await request.post("api/logout");
    cookies.set("jwt");

    return res.status(200).json({
      status: "success",
    });
  } catch (e) {
    return res.status(401).json({
      status: "fail",
      // @ts-ignore
      message: e.response?.data.message,
    });
  }
};

export default handler;
