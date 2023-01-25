import { GetServerSidePropsContext } from "next";
import { getServerSideSitemap } from "next-sitemap";
import { connectToDatabase } from "../util/mongodb";

const Sitemap = () => {};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const db = await connectToDatabase();
  const collection = db.collection("folder");
  const result = await collection.distinct("_id", {});
  const main = {
    loc: "https://card-study.vercel.app/",
    lastmod: new Date().toISOString(),
  };
  const study = {
    loc: "https://card-study.vercel.app/study",
    lastmod: new Date().toISOString(),
  };
  const sitemap = result.map((id) => ({
    loc: `https://card-study.vercel.app/study/${id.toString()}`,
    lastmod: new Date().toISOString(),
  }));
  const fields = [main, study, ...sitemap];

  return getServerSideSitemap(context, fields);
};

export default Sitemap;
