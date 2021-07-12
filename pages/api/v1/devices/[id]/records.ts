import { NextApiRequest, NextApiResponse } from "next";
import { RecordsType } from "@common/types/supabase";
import { getRecordsByDeviceId } from "@lib/requests/getRecordsByDeviceId";

const recordsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ data?: RecordsType[]; message?: string }>
): Promise<void> => {
  const { id: requestDeviceId } = req.query;

  if (Array.isArray(requestDeviceId)) {
    return res
      .status(404)
      .json({ message: `Please provide a valid ID in your request` });
  }

  const parsedRequestDeviceId = Number.parseInt(requestDeviceId, 10);

  const records = await getRecordsByDeviceId(parsedRequestDeviceId);

  if (!records || (records && records.length === 0)) {
    return res.status(404).json({
      message: `No records found for device ID: ${requestDeviceId}`,
    });
  }

  return res.status(200).json({
    data: records,
  });
};

export default recordsHandler;
