import ApiResponse from './api-response';

class BaseResponse {
  /**
   * Base response is a standardized response used by Pegadaian, consisting of:
   * - responseCode: a combination of a 3-digit HTTP status, 5-digit service code, and 2-digit case code
   * - responseDesc: a description of the response code or message to be conveyed
   * - timestamp: the time the response was created
   * - httpRequestId: the ID of the request made
   * - data: the data to be sent
   */
  constructor(
    private responseCode: number,
    private responseDesc: string,
    private data: any,
  ) {}

  public buildResponse(): ApiResponse {
    const apiResponse = new ApiResponse();
    apiResponse.responseCode = this.responseCode;
    apiResponse.responseDesc = this.responseDesc;
    apiResponse.data = this.data;
    return apiResponse;
  }
}

export const setResponse = (data: any, status: number, message: string) => {
  return new BaseResponse(
    generateResponseCode(status),
    message,
    data,
  ).buildResponse();
};

function generateResponseCode(status: number): number {
  if (status < 100 || status > 599) {
    throw new Error('Invalid status code');
  }

  const httpStatus = Math.floor(status / 100) + '00';
  const caseCode = status % 100;
  const paddedCaseCode = caseCode.toString().padStart(2, '00');
  const serviceCode = '50001';

  return +`${httpStatus}${serviceCode}${paddedCaseCode}`;
}

export default BaseResponse;
