import axios from "axios";
import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";
import request from "../../../config/requests";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get("jwt");
  const { id } = req.query;
  const { body } = req;
  console.log({ status: 3, ...body });
  try {
    const response = await request.put(
      "api/servicestatusadmin/" + id,
      { status: 3, ...body },
      {
        headers: { Cookie: `jwt=${token}`, Authorization: `Bearer ${token}` },
      }
    );

    console.log(response);

    return res.status(200).json({ data: response.data });
  } catch (e: any) {
    console.log(e);
    return res.status(400).json({
      status: "fail",
      response: e.response.data,
    });
  }
};

export default handler;
