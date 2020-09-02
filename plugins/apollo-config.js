export default function(context) {
  return {
    httpEndpoint:
      process.env.GRAPHQL_SERVER_HTTP || "http://localhost:1337/graphql",
    getAuth: () => {
      const token = this.$apolloHelpers.getToken();
      if (token) {
        return `Bearer ${token}`;
      } else {
        return "";
      }
    }
  };
}
