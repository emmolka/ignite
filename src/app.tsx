import { QueryClient, QueryClientProvider } from "react-query";

import TablePage from "./pages/table";
const queryClient = new QueryClient();

const App = (): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <TablePage />
  </QueryClientProvider>
);

export default App;
