import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import request from "../../config/requests";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { headers, body } = req;

  try {
    const response = await request.post("api/login", body, {
      headers: headers,
    });
    Object.entries(response.headers).forEach((keyArr) =>
      res.setHeader(keyArr[0], keyArr[1] as string)
    );

    res.send(response);
  } catch (e) {
    res.status(500);
  }
};

export default handler;
