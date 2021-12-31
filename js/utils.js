
/*Function pauses a loop by
set milliseconds*/

export function sleep(ms)
{
  var now = Date.now();
  var timer = Date.now() + ms;
  while (now < timer){now = Date.now();}
}

export const log = (content) =>
{
  console.log(content);
}

export const isIOS = () =>
{
  return (
    (/ipad|iphone|ipod/.test(navigator.platform) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1))
    && !window.MSStream //checking for not IE11
  );
};

//get parameters by name from url.
export const getParameterValue = (paramName, url) =>
{
  if(!url) url = window.location.href;
  const regex = new RegExp(`[&?]${paramName}(=([^&#]*))`);
  const results = regex.exec(url);
  //console.log(results);
  if(!results) return null;
  if(!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

export class StrUtils
{
  static ProperCase(string)
  {
    return `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`;
  }

  static Low(string)
  {
    return `${string.toLowerCase()}`;
  }

  static Up(string)
  {
    return `${string.toUpperCase}`;
  }

} 

export class Window
{
  constructor(url, name)
  {
    this.url = url;
    this.name = name;
    this.string = "";
  }
  setPos = (left=0, top=0) =>
  {
    this.left = left;
    this.top = top;
  };
  setSize = (height=1000, width=1000) =>
  {
    this.height = height;
    this.width = width;
  };
  setBars = (menubar=1, status=1, titlebar=1) =>
  {
    this.menubar = menubar;
    this.status = status;
    this.titlebar = titlebar;
  };
  buildString = () =>
  {
    this.string = `left=${this.left},top=${this.top},height=${this.height},width=${this.width},menubar=${this.menubar},status=${this.status},titlebar=${this.titlebar}`;
  };
  windowOpen = () =>
  {
    window.open(this.url, this.name, this.string);
  };
}

