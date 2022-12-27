import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "../store/store";
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_API || ""}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GoogleOAuthProvider>
    </Provider>
  );
}
