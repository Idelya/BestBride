import axios from "axios";
import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";
import request from "../../../config/requests";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get("jwt");
  const { id } = req.query;

  try {
    if (!!token) {
      const response = await request.get("/api/isservice/" + id, {
        headers: { Cookie: `jwt=${token}`, Authorization: `Bearer ${token}` },
      });

      return res.status(200).json(response.data);
    }
    return res.status(200).json({ isMyService: false });
  } catch (e: any) {
    console.log(e);
    return res.status(401).json({
      status: "fail",
      response: e.response.data,
    });
  }
};

export default handler;
