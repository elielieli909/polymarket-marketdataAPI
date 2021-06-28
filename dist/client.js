// import { ApolloClient, createHttpLink, DefaultOptions, InMemoryCache } from "@apollo/client/core";
// import fetch from "cross-fetch";
// const defaultOptions: DefaultOptions = {
//   watchQuery: {
//     fetchPolicy: "no-cache",
//     errorPolicy: "ignore",
//   },
//   query: {
//     fetchPolicy: "no-cache",
//     errorPolicy: "all",
//   },
// };
// const client = new ApolloClient({
//   link: createHttpLink({
//     uri:
//       process.env.SUBGRAPH_URL ||
//       process.env.REACT_APP_SUBGRAPH_URL ||
//       process.env.NEXT_PUBLIC_SUBGRAPH_URL ||
//       "https://api.thegraph.com/subgraphs/name/polymarket/polymarket-matic-trading",
//     fetch,
//   }),
//   cache: new InMemoryCache(),
//   defaultOptions,
// });
// export default client;
//# sourceMappingURL=client.js.map