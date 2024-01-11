import React from 'react'
import Link from 'next/link'

import { User } from '../types'

type Props = {
  data: User
}

const ListItem = ({ data }: Props) => (
  <Link href="/rooms/[id]" as={`/rooms/${data.id}`}>
    {data.id}:{data.name}
  </Link>
)

export default ListItem
