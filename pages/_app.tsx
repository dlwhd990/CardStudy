import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { DefaultSeo } from "next-seo";
config.autoAddCss = false;

const DEFAULT_SEO = {
  keywords:
    "카드 스터디, Card Study, 플래시 카드, 카드 공부, 암기, 시험 공부, 공부, 시험, 영단어, 단어 외우기, 단어 암기, 영어 단어, 영어 단어 외우기",
  title: "카드 스터디",
  description: "플래시 카드로 공부하는 곳입니다.",
  canonical: "https://card-study.vercel.app/",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://card-study.vercel.app/",
    title: "카드 스터디",
    site_name: "카드 스터디",
    images: [
      {
        url: "https://card-study.vercel.app/images/top_banner.jpg",
        width: 285,
        height: 167,
        alt: "이미지",
      },
    ],
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_API || ""}>
        <DefaultSeo {...DEFAULT_SEO} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GoogleOAuthProvider>
    </Provider>
  );
}
