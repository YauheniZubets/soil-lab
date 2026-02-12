export const ADD_OBJECT_REQUESTED = 'ADD_OBJECT_REQUESTED';
export const DEL_OBJECT_REQUESTED = 'DEL_OBJECT_REQUESTED';

export const addObjectRequested = () => ({
  type: ADD_OBJECT_REQUESTED,
});

export const delObjectRequested = (params) => ({ //параметры в сагу
  type: DEL_OBJECT_REQUESTED,
  payload: params
});
