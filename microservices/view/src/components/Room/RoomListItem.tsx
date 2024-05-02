import React from "react";
import Link from "next/link";

import { Room } from "../../types";

type Props = {
  data: Room;
};

const RoomListItem = ({ data }: Props) => (
  <Link href="/room/[id]" as={`/room/${data.displayName}`}>
    {data.displayName}
  </Link>
);

export default RoomListItem;
