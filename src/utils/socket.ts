'use client';

import { io } from 'socket.io-client';

export const socket = io('0.0.0.0:3005');
