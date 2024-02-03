import { GetStaticProps } from 'next'
import { Room } from '../../types'
import RoomList from '../../components/Room/RoomList'
import Providers from "../../components/Providers";
import {getRooms} from "../../db";

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
  const items: Room[] = await getRooms()
  return { props: { items } }
}

export default WithStaticProps
