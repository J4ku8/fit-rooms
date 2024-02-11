import React from 'react'
import Link from 'next/link'

import { Room } from '../../types'

type Props = {
  data: Room
}

const RoomListItem = ({ data }: Props) => (
  <Link href="/rooms/[id]" as={`/rooms/${data.name}`}>
    {data.name}
  </Link>
)

export default RoomListItem
