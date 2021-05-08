// let url;
let url = 'https://ehtereum-developer-api.mobiloitte.com/api/v1/user';
// if (process.env.REACT_APP_ENV !== "live") {
//   url = "https://responsiveapp-api.mobiloitte.com";
// } else {
//   url = "https://responsiveapp-api.mobiloitte.com";
// }

const ApiConfig = {
  getSwapDetailsList: `${url}/getSwapDetailsList  `,
  getBasicAndAdvanceList: `${url}/getBasicAndAdvanceList`,
  getSwapPairList: `${url}/getSwapPairList`,
  getLatestDetailsOfPoolsTransaction: `${url}/getLatestDetailsOfPoolsTransaction`,
  getBiggestSwapDetails: `${url}/getBiggestSwapDetails`,
  cmcTopTen: `${url}/cmcTopTen`,
  getLiveETHPrice: `${url}/getLiveETHPrice`,
  getMarketCapSymbol: `${url}/getMarketCapSymbol`,
  addData: `${url}/addData`,
  getDataListing: `${url}/getDataListing`,
  getLatestData: `${url}/getLatestData`,
  downVote: `${url}/downVote`,
  upVote: `${url}/upVote`,
  viewData: `${url}/viewData`,
  login: `${url}/login`,
  signup: `${url}/signup`,
  WishUnWishedData: `${url}/WishUnWishedData`,
};

export default ApiConfig;
