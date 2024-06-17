import { combineReducers } from "redux";
import session, { SessionState } from "./session";

export default combineReducers({
  session,
});

export interface RootState {
  session: SessionState;
}
