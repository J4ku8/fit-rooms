import {GetStaticProps, GetStaticPaths} from 'next'
import { Room as RoomType } from "../../types/index"
import Layout from '../../components/Layout'
import Room from "../../components/Room/Room";
import {sampleRoomsData} from "../../utils/sample-data";
import {Typography} from "@mui/material";
import Providers from "../../components/Providers";

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
                title={`${
                    item ? item.id : 'Room Detail'
                }`}
            >
                <Room id={item ? item.id : 'Room Detail'}/>
            </Providers>
    )
}

export default StaticPropsDetail

export const getStaticPaths: GetStaticPaths = async () => {
    // Get the paths we want to pre-render based on users
    const paths = sampleRoomsData.map((room) => ({
        params: {id: room.id.toString()},
    }))
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return {paths, fallback: false}
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({params}) => {
    try {
        const id = params?.id
        const item = sampleRoomsData.find((data) => data.id === String(id))
        // By returning { props: item }, the StaticPropsDetail component
        // will receive `item` as a prop at build time
        return {props: { item }}
    } catch (err: any) {
        return {props: {errors: err.message}}
    }
}
