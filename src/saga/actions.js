export const ADD_OBJECT_REQUESTED = 'ADD_OBJECT_REQUESTED';
export const ADD_ONE_OBJECT_SUCCEEDED = 'ADD_ONE_OBJECT_SUCCEEDED';
export const ADD_ALL_OBJECTS_SUCCEEDED = 'ADD_ALL_OBJECTS_SUCCEEDED';
export const ADD_OBJECT_FAILED = 'ADD_OBJECT_FAILED';

export const addObjectRequested = () => ({
  type: ADD_OBJECT_REQUESTED,
});

export const addOneObjectSucceeded = (loadStatus) => ({
  type: ADD_ONE_OBJECT_SUCCEEDED,
  payload: loadStatus
});

export const addAllObjectsSucceeded = (loadStatus) => ({
    type: ADD_ALL_OBJECTS_SUCCEEDED,
    payload: loadStatus
  });

export const addObjectFailed = (error) => ({
  type: ADD_OBJECT_FAILED,
  payload: error,
});