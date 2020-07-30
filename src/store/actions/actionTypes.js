
// actions for loading devices from database
export const LOAD_DEVICES = 'LOAD_DEVICES'; // async call
export const LOAD_DEVICES_START = 'LOAD_DEVICES_START';
export const LOAD_DEVICES_SUCCESS = 'LOAD_DEVICES_SUCCESS';
export const LOAD_DEVICES_FAIL = 'LOAD_DEVICES_FAIL';

// actions for saving devices in the database
export const SAVE_DEVICES = 'SAVE_DEVICES'; // async call
export const SAVE_DEVICES_START = 'SAVE_DEVICES_START';
export const SAVE_DEVICES_SUCCESS = 'SAVE_DEVICES_SUCCESS';
export const SAVE_DEVICES_FAIL = 'SAVE_DEVICES_FAIL';

// actions to handle the state of the devices (switch them ON/Off)
export const CHANGE_DEVICE_STATE = 'CHANGE_DEVICE_STATE';
export const CHANGE_DEVICE_STATE_SUCCESS = 'CHANGE_DEVICE_STATE_SUCCESS';


// actions for loading rooms from database
export const LOAD_ROOMS = 'LOAD_ROOMS'; // async call
export const LOAD_ROOMS_START = 'LOAD_ROOMS_START';
export const LOAD_ROOMS_SUCCESS = 'LOAD_ROOMS_SUCCESS';
export const LOAD_ROOMS_FAIL = 'LOAD_ROOMS_FAIL';


// actions for loading categories from database
export const LOAD_CATEGORY = 'LOAD_CATEGORY'; // async call
export const LOAD_CATEGORY_START = 'LOAD_CATEGORY_START';
export const LOAD_CATEGORY_SUCCESS = 'LOAD_CATEGORY_SUCCESS';
export const LOAD_CATEGORY_FAIL = 'LOAD_CATEGORY_FAIL';


// actions for the ROUTINES page 
export const LOAD_ROUTINES = 'LOAD_ROUTINES'; // async call
export const LOAD_ROUTINES_START = 'LOAD_ROUTINES_START';
export const LOAD_ROUTINES_SUCCESS = 'LOAD_ROUTINES_SUCCESS';
export const LOAD_ROUTINES_FAIL = 'LOAD_ROUTINES_FAIL';

export const CHANGE_CUSTOM_SWITCH_STATE = 'CHANGE_CUSTOM_SWITCH_STATE'; // custom switch action
export const CHANGE_CUSTOM_SWITCH_STATE_SUCCESS = 'CHANGE_SWITCH_STATE_SUCCESS';

// save routines in database
export const SAVE_ROUTINES = 'SAVE_ROUTINES'; // async call
export const SAVE_ROUTINES_START = 'SAVE_ROUTINES_START';
export const SAVE_ROUTINES_SUCCESS = 'SAVE_ROUTINES_SUCCESS';
export const SAVE_ROUTINES_FAIL = 'SAVE_ROUTINES_FAIL';

// delete routines when 'trash icon' button is clicked
export const DELETE_ROUTINE = 'DELETE_ROUTINE'; // async call
export const DELETE_ROUTINE_START = 'DELETE_ROUTINE_START';
export const DELETE_ROUTINE_SUCCESS = 'DELETE_ROUTINE_SUCCESS';
export const DELETE_ROUTINE_FAIL = 'DELETE_ROUTINE_FAIL';


// actions to handle the tiles click and show Modal or not
export const LOAD_MODAL_CLICK = 'LOAD_MODAL_CLICK';
export const CLOSE_MODAL_CLICK = 'CLOSE_MODAL_CLICK';


// load info for home page tiles (actions, overview, notifications)
export const LOAD_ACTONS = 'LOAD_ACTIONS';
export const LOAD_ACTONS_SUCCESS = 'LOAD_ACTIONS_SUCCESS';
export const LOAD_ACTONS_START = 'LOAD_ACTIONS_START';
export const LOAD_ACTONS_FAIL = 'LOAD_ACTIONS_FAIL';

export const LOAD_NOTIFICATIONS = 'LOAD_NOTIFICATIONS';
export const LOAD_NOTIFICATIONS_SUCCESS = 'LOAD_NOTIFICATIONS_SUCCESS';
export const LOAD_NOTIFICATIONS_START = 'LOAD_NOTIFICATIONS_START';
export const LOAD_NOTIFICATIONS_FAIL = 'LOAD_NOTIFICATIONS_FAIL';


// actions for the metrics page 
export const LOAD_METRICS_START = 'LOAD_METRICS_START';
export const LOAD_METRICS_SUCCESS = 'LOAD_METRICS_SUCCESS';
export const LOAD_METRICS_FAIL = 'LOAD_METRICS_FAIL';


// actions related to signing users in or up
export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';








