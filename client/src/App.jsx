import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CitiesProvider } from "./contexts/CityContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import { lazy, Suspense } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Homepage from "./pages/Homepage";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";
//before
// dist/assets/index-CiyEZYJP.css   30.42 kB │ gzip:   5.05 kB
// dist/assets/index-B-lcOx0Z.js   506.29 kB │ gzip: 147.81 kB

// //after
// dist/assets/Logo-C5FiXW-Q.css             0.03 kB │ gzip:   0.05 kB
// dist/assets/Login-DAxOE0UR.css            0.35 kB │ gzip:   0.22 kB
// dist/assets/Product-BeL2-SDu.css          0.46 kB │ gzip:   0.27 kB
// dist/assets/Homepage-DOIO6DEl.css         0.48 kB │ gzip:   0.29 kB
// dist/assets/PageNav-DEaVLmCH.css          0.51 kB │ gzip:   0.28 kB
// dist/assets/AppLayout-xjZN7vYa.css        1.89 kB │ gzip:   0.68 kB
// dist/assets/index-C_0tZCMJ.css           26.81 kB │ gzip:   4.40 kB
// dist/assets/Product.module-WbSnXJvX.js    0.06 kB │ gzip:   0.07 kB
// dist/assets/PageNotFound-DIPfwRAQ.js      0.15 kB │ gzip:   0.15 kB
// dist/assets/Logo-BKfoG11O.js              0.21 kB │ gzip:   0.19 kB
// dist/assets/PageNav-CuZpJZhw.js           0.49 kB │ gzip:   0.28 kB
// dist/assets/Pricing-B3skbjQ6.js           0.65 kB │ gzip:   0.42 kB
// dist/assets/Homepage-BX0raPxa.js          0.67 kB │ gzip:   0.42 kB
// dist/assets/Product-D3VLzsFh.js           0.86 kB │ gzip:   0.49 kB
// dist/assets/Login-CIvbC4YR.js             1.01 kB │ gzip:   0.55 kB
// dist/assets/AppLayout-CAkf9fJF.js       157.04 kB │ gzip:  46.25 kB
// dist/assets/index-CeVQAT_d.js           347.60 kB │ gzip: 101.27 kB

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />

              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="cities" replace />} />
                <Route path="cities" element={<CityList />} />

                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
