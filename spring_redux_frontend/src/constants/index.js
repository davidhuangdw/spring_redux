import {createMuiTheme, colors} from "@material-ui/core"

export const MyTheme = createMuiTheme({
  flexGrow: 1,
  palette: {
    primary: colors.blue, // {main:"#2196f3"},
    secondary: colors.pink //{main:"#f50057"}
  },
});

export const HOUR_HEIGHT = 6.0;  // em for 1 hour
// export const MENU_BAR_HEIGHT = 6.5;  // em
export const DEFAULT_ACTIVITY_COLOR = "#2196F3";

export const PATH_INDEX = '/';
export const PATH_ACTIVITIES = '/activities';
export const PATH_CATEGORIES = '/categories';
