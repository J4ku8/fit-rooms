import { GetStaticProps } from 'next'
import { Event } from '../../types'
import {sampleEventsData} from '../../utils/sample-data'
import RoomList from '../../components/Room/RoomList'
import Providers from "../../components/Providers";

type Props = {
  items: Event[]
}


const WithStaticProps = ({ items }: Props) => {

    return (
        <Providers transparentFooter title="Users List">
            <h1>List of all available rooms</h1>
            <RoomList items={items}/>
        </Providers>

    );
}

export const getStaticProps: GetStaticProps = async () => {
  const items: Event[] = sampleEventsData
  return { props: { items } }
}

export default WithStaticProps
