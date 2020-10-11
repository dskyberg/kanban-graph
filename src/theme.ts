/**
 * Copyright (c) 2020 David Skyberg and Swankymutt.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * theme.tsx
 */
import red from '@material-ui/core/colors/red';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
   overrides: {
      MuiCssBaseline: {
         '@global': {
            code: {
               fontFamily: 'Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
            },
         },
      },
      MuiFormLabel: {
         root: {
            color: '#000000',
         },
      },
   },
   palette: {
      primary: {
         main: '#3f51b5',
         light: '#757de8',
         dark: '#002984',
      },
      secondary: {
         main: '#f44336',
         light: '#ff7961',
         dark: '#ba000d',
      },
      text: {
         secondary: '#ffffff',
         primary: '#000000',
      },
      error: {
         main: red.A400,
      },
      background: {
         default: '#fff',
      },
   },
});

export default theme;
