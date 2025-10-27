import { Router, Request, Response } from 'express';
import { inMemoryDB } from '../../db/in-memory.db';
import { HttpStatus } from '../../core/types/http-statuses';

export const testingRouter = Router({});

testingRouter.delete('/all-data', (req: Request, res: Response) => {
  Object.keys(inMemoryDB).forEach(key => { 
    (inMemoryDB as any)[key] = [];
  });
  
  res.sendStatus(HttpStatus.NoContent);
});