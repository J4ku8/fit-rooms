import * as React from 'react'
import RoomListItem from './RoomListItem'
import { Room } from '../../types'

type Props = {
  items: Room[]
}

const RoomList = ({ items }: Props) => (
  <ul>
    {items.map((item, i) => (
      <li key={i}>
        <RoomListItem data={item} />
      </li>
    ))}
  </ul>
)

export default RoomList
