import axios from "axios";
import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";
import request from "../../config/requests";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { entity } = req.body;

  const cookies = new Cookies(req, res);
  const token = cookies.get("jwt");

  try {
    await request.post(entity, req.body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (e: any) {
    return res.status(401).json({
      status: "fail",
      response: e.response.data,
    });
  }

  return res.status(200).json({
    status: "success",
  });
};

export default handler;
