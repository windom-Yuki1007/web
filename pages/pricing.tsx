import { loadDefaultJapaneseParser } from "budoux";
const parser = loadDefaultJapaneseParser();

import Layout from "components/layout";
import Head from "components/head";
import ContactButton from "components/ContactButton/ContactButton"

import css_global from "styles/global.module.scss";
export default function Page({ wpDATA, experiencesData }) {
    return (
        <>
            <Head
                url={"/pricing"}
                title={wpDATA.title}
                description={wpDATA.summary.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')}
                breadcrumb={[
                    ["トップページ", ""],
                    [wpDATA.subTitle, "/news"]
                ]}
            />
            <article className={css_global.card}>
                <h1 dangerouslySetInnerHTML={{ __html: parser.translateHTMLString(wpDATA.title) }} />
                <div className="news" dangerouslySetInnerHTML={{ __html: parser.translateHTMLString(wpDATA.content) }} />
            </article>
            <ContactButton />
        </>
    );
}

Page.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export async function getStaticProps() {
    let wpDATA = await fetch(
        "https://yoshikitam.wpx.jp/akitani/wp-json/wp/v2/pages?slug=pricing"
    ).then((res) => res.json());
    wpDATA = wpDATA[0];

    let experiencesData = await fetch(
        "https://yoshikitam.wpx.jp/akitani/wp-json/wp/v2/categories"
    ).then((res) => res.json());

    return {
        props: {
            wpDATA, experiencesData
        },
    };
}
