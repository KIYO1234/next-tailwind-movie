import Head from 'next/head';

type Props = {
  title: string,
  description: string,
}

const HeadTag = ({ title, description }: Props): JSX.Element => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  )
}

export default HeadTag;
