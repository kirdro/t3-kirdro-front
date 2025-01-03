'use client';

import { io } from 'socket.io-client';

const urlTest = '0.0.0.0:3005';
const erlProd = 'https://kirdro-nest-prisma-socket-a987.twc1.net/';

export const socket = io(erlProd);
