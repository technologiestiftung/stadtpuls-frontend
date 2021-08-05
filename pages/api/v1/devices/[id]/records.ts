import { NextApiRequest, NextApiResponse } from "next";
import { RecordsType } from "@common/types/supabase";
import {
  getRecordsByDeviceId,
  GetRecordsOptionsType,
} from "@lib/requests/getRecordsByDeviceId";
import {
  isValidTimestamp,
  VALID_TIMESTAMP_EXAMPLE,
} from "@lib/timestampValidator";

const recordsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: RecordsType[];
    message?: string;
    [key: string]: unknown;
  }>
): Promise<void> => {
  const { id: requestDeviceId, startDate, endDate } = req.query;

  if (Array.isArray(requestDeviceId)) {
    return res
      .status(422)
      .json({ message: `Please provide a valid ID in your request` });
  }

  if (Array.isArray(startDate) || Array.isArray(endDate)) {
    return res
      .status(422)
      .json({ message: `Please provide a valid time range in your request` });
  }

  if (!isValidTimestamp(startDate) || !isValidTimestamp(endDate)) {
    return res.status(422).json({
      message: `startDate and / or endDate are invalid. Please provide valid timestamps such as: ${VALID_TIMESTAMP_EXAMPLE}`,
    });
  }

  const parsedRequestDeviceId = Number.parseInt(requestDeviceId, 10);

  const REQUEST_OPTIONS: GetRecordsOptionsType = {};
  startDate && (REQUEST_OPTIONS.startDate = startDate);
  endDate && (REQUEST_OPTIONS.endDate = endDate);

  try {
    const records = await getRecordsByDeviceId(
      parsedRequestDeviceId,
      REQUEST_OPTIONS
    );

    if (records && records.length === 0) {
      return res.status(404).json({
        message: `No records found`,
      });
    }

    return res.status(200).json({
      data: records,
    });
  } catch (error: unknown) {
    return res.status(422).json({
      message: `The request could not be processed`,
      //error: error,
    });
  }
};

export default recordsHandler;
