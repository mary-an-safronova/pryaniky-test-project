import { PATH } from "./constants";

export const getCookie = (name: string): string => {
    const matches = document.cookie.match(
      // eslint-disable-next-line no-useless-escape
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : '';
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const setCookie = (name: string, value: string, props: { [key: string]: any }): void  => {
    props = {
      path: PATH.HOME,
      ...props,
    };
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
      const d = new Date();
      d.setTime(d.getTime() + exp * 1000);
      exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
      props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
      updatedCookie += '; ' + propName;
      const propValue = props[propName];
      if (propValue !== true) {
        updatedCookie += '=' + propValue;
      }
    }
    document.cookie = updatedCookie;
  }
  
  export const deleteCookie = (name: string): void => {
    setCookie(name, '', { expires: -1 });
  }