import { GetStaticProps } from 'next'
import { RoomListType } from '../../src/types'
import RoomList from '../../src/components/Room/RoomList'
import Providers from "../../src/components/Providers";
import {getRooms} from "../../src/utils/db";


const WithStaticProps = ({ rooms }: RoomListType) => {
    return (
        <Providers transparentFooter title="Users List">
            <h1>List of all available rooms</h1>
            <RoomList rooms={rooms}/>
        </Providers>

    );
}

export const getStaticProps: GetStaticProps = async () => {
  const { rooms } = await getRooms()
  return { props: { rooms } }
}

export default WithStaticProps
