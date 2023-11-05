import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./context/AuthContext";
import AuthenticatedContainer from "./components/AuthenticatedContainer";
import Home from "./pages/Home";
import Admin from "./pages/Admin/Admin";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { LOCALSTORAGE_KEYS } from "./utils";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (count, error) => {
        if (
          error?.response?.status === 401 &&
          window.location.href !== "/login"
        ) {
          for (const key in Object.keys(LOCALSTORAGE_KEYS)) {
            localStorage.removeItem(key);
          }
          window.location.href = "/login";
          return false;
        }
        return count < 3;
      },
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: false,
    },
  },
});

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AuthenticatedContainer />}>
                <Route path="" element={<Home />} />
                <Route path="admin" element={<Admin />} />
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
