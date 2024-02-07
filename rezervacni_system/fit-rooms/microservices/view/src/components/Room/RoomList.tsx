import * as React from 'react'
import RoomListItem from './RoomListItem'
import { RoomListType } from '../../types'


const RoomList = ({ rooms }: RoomListType) => {
  return (
      <ul>
        {rooms.map((item, i) => (
            <li key={i}>
              <RoomListItem data={item}/>
            </li>
        ))}
      </ul>
  );
}

export default RoomList
