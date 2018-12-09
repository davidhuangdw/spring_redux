import {createMuiTheme, colors} from "@material-ui/core"

export const MyTheme = createMuiTheme({
  flexGrow: 1,
  palette: {
    primary: colors.blue, // {main:"#2196f3"},
    secondary: colors.pink //{main:"#f50057"}
  },
});

export const HOUR_HEIGHT = 6.0;  // em for 1 hour
export const MENU_BAR_HEIGHT = "6.0em";  // em
