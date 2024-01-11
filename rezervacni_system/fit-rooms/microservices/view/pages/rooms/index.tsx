import { GetStaticProps } from 'next'
import { Room } from '../../types'
import { sampleRoomsData } from '../../utils/sample-data'
import Layout from '../../components/Layout'
import List from '../../components/List'

type Props = {
  items: Room[]
}

const WithStaticProps = ({ items }: Props) => {

    return (
        <Layout title="Users List | Next.js + TypeScript Example">
            <h1>List of all available rooms</h1>
            <List items={items}/>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async () => {
  const items: Room[] = sampleRoomsData
  return { props: { items } }
}

export default WithStaticProps
