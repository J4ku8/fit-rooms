import express, { Router, Request, Response } from 'express';
import axios from "axios";

const router: Router = express.Router();


router.get('/room/:roomKosId/', async (req: Request, res: Response) => {
    try {
        const response = await axios.get('https://api.example.com/data');
        const roomId = req.params.roomKosId;
        res.send(`Room id: ${roomId}`);
    } catch (error: any) {
        // Handle errors
        console.error('Error making API call:', error?.message);
    }
});

router.get('/rooms', async (req: Request, res: Response) => {
    try {
        const response = await axios.get('https://api.example.com/data');
        res.send(`Rooms`);
    } catch (error: any) {
        // Handle errors
        console.error('Error making API call:', error?.message);
    }
});

router.get('/events', async (req: Request, res: Response) => {
    try {
        const response = await axios.get('https://api.example.com/data');
        res.send(`events`);
    } catch (error: any) {
        // Handle errors
        console.error('Error making API call:', error?.message);
    }
});

export default router;
