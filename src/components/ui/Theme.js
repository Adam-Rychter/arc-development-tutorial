import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const arcBlue = "#0B72B9"
const arcOrange = "#FFBA60"

export default createMuiTheme({
  palette: {
    common: {
        blue: `${arcBlue}`,
        orange: `${arcOrange}`
    },
    // this wil allow mui to generate shades of our main colors
    primary: {
        main: `${arcBlue}`
    },
    secondary: {
        main: `${arcOrange}`
    }
  },
  typography: {
      h3: {
          fontWeight: 300
      }
  }
});