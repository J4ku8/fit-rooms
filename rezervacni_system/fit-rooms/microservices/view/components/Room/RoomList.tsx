import * as React from 'react'
import RoomListItem from './RoomListItem'
import { Event } from '../types'

type Props = {
  items: Event[]
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
