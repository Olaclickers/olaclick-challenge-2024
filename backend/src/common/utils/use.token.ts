// import * as jwt from "jsonwebtoken";

// import {
//   IAuthTokenResult,
//   IUseToken,
// } from "src/common/interfaces/auth.interface";

// export const useToken = (token: string): IUseToken | string => {
//   try {
//     const decode = jwt.decode(token) as IAuthTokenResult;

//     const currentDate = new Date();

//     const expiresDate = new Date(decode.exp);

//     return {
//       sub: decode.sub,
//       isExpired: +expiresDate <= +currentDate / 1000,
//     };
//   } catch (error) {
//     return "Token is invalid";
//   }
// };
