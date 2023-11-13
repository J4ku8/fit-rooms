import {Request, Response} from "express";
import axios from "axios/index";
import router from "../ms-teams/getTeamsRoutes";

router.get('/events', async (req: Request, res: Response) => {
    try {
        const response = await axios.get('https://api.example.com/data');
        res.send(`events`);
    } catch (error: any) {
        // Handle errors
        console.error('Error making API call:', error?.message);
    }
});

router.get('/event', async (req: Request, res: Response) => {
    try {
        const response = await axios.get('https://api.example.com/data');
        res.send(`events`);
    } catch (error: any) {
        // Handle errors
        console.error('Error making API call:', error?.message);
    }
});

router.get('/rooms', async (req: Request, res: Response) => {
    try {
        const response = await axios.get('https://api.example.com/data');
        res.send(`events`);
    } catch (error: any) {
        // Handle errors
        console.error('Error making API call:', error?.message);
    }
});

router.get('/room', async (req: Request, res: Response) => {
    try {
        const response = await axios.get('https://api.example.com/data');
        res.send(`events`);
    } catch (error: any) {
        // Handle errors
        console.error('Error making API call:', error?.message);
    }
});

router.get('/user', async (req: Request, res: Response) => {
    try {
        const response = await axios.get('https://api.example.com/data');
        res.send(`events`);
    } catch (error: any) {
        // Handle errors
        console.error('Error making API call:', error?.message);
    }
});

router.get('/users', async (req: Request, res: Response) => {
    try {
        const response = await axios.get('https://api.example.com/data');
        res.send(`events`);
    } catch (error: any) {
        // Handle errors
        console.error('Error making API call:', error?.message);
    }
});
