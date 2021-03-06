import { union, createAction } from '@ngrx/store';
import { Task } from './task.model';
import { Tasks } from './tasks.model';

export const taskFetch = createAction('[Task Page] List', (payload: Tasks) => ({ payload }));

export const taskFetchSuccess = createAction('[Task API] fetch_success', (payload: { tasks: Tasks }) => ({ payload }));

export const taskDelete = createAction('[Task API] Delete', (payload: number) => ({ payload }));

export const taskUpdate = createAction('[Task API] Update', (payload: { task: Task }) => ({ payload }));

export const taskEdit = createAction('[Task Page] Edit', (payload: { task: Task }) => ({ payload }));

export const taskCreate = createAction('[Task API] Create', (payload: { task: Task }) => ({ payload }));

const actions = union({
  taskFetch,
  taskFetchSuccess,
  taskDelete,
  taskUpdate,
  taskEdit,
  taskCreate,
});
export type TaskActions = typeof actions;
