import React from 'react'
import Link from 'next/link'

import { Event } from '../types'

type Props = {
  data: Event
}

const RoomListItem = ({ data }: Props) => (
  <Link href="/rooms/[id]" as={`/rooms/${data.room}`}>
    {data.room}
  </Link>
)

export default RoomListItem
