import {GetStaticProps, GetStaticPaths} from 'next'
import {Room as RoomType} from "../../src/types/index"
import Layout from '../../src/components/Layout'
import {Typography} from "@mui/material";
import Providers from "../../src/components/Providers";
import {getRooms} from "../../src/utils/db";
import Room from "../../src/components/Room";
import {sampleRoomsData} from "../../src/utils/sample-data";
import Calendar from "../../src/components/Calendar";

type Props = {
    item?: RoomType
    errors?: string
}

const StaticPropsDetail = ({item, errors}: Props) => {
    if (errors) {
        return (
            <Layout title="Error | Next.js + TypeScript Example">
                <p>
                    <Typography style={{color: 'red'}}>Error:</Typography> {errors}
                </p>
            </Layout>
        )
    }

    return (
        <Providers
            transparentFooter={true}
            title={`${
                item ? item.displayName : 'Room calendar'
            }`}
            isMobile={true}
        >
            {item ?
                <Calendar roomEmail={item.emailAddress} name={item.displayName}/> :
                <Calendar roomEmail={""} name={"Room detail"}/>}
        </Providers>
    )
}

export default StaticPropsDetail

export const getStaticPaths: GetStaticPaths = async () => {
    const {rooms} = await getRooms()
    const paths = rooms.map((room) => ({
        params: {id: room.displayName.toString()},
    }))
    return {paths, fallback: false}
}
export const getStaticProps: GetStaticProps = async ({params}) => {
    try {
        const {rooms} = await getRooms()
        const id = params?.id
        const item = rooms?.find((data) => data.displayName === String(id))
        return {props: {item}}
    } catch (err: any) {
        return {props: {errors: err.message}}
    }
}
