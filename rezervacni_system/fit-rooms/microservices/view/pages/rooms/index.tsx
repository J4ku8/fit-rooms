import { GetStaticProps } from 'next'
import { Room } from '../../types'
import {sampleRoomsData} from '../../utils/sample-data'
import RoomList from '../../components/Room/RoomList'
import Providers from "../../components/Providers";

type Props = {
  items: Room[]
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
  const items: Room[] = sampleRoomsData
  return { props: { items } }
}

export default WithStaticProps
