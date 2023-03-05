import Head from "next/head";
import Clouds from "./index/clouds";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Pavel Franta - homepage</title>
        <meta
          name="description"
          content="Created without caffeine to learn react"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Clouds />
    </>
  );
}
