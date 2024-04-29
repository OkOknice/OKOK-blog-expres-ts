/**
 * 获取UUID
 * @returns {string}
 */
export const getUUID = function (): string {
  let d = Date.now();
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now(); //use high-precision timer if available
  }
  return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

// 处理 TOC 函数
interface IItem {
  content: string;
  slug: string;
  lvl: number;
}
interface IResult {
  name: string;
  anchor: string;
  level: number;
  children?: IResult[];
}

export const tranerTocResult = (data: IItem[]) => {
  let list: IItem[] = [];
  const stack: IResult[] = [];
  const resultList = [];
  let min = 6;
  list = data.filter((item) => item.lvl > 1);
  const createItem = (item: IItem): IResult => {
    return {
      name: item.content,
      anchor: item.slug,
      level: item.lvl,
      children: [],
    };
  };
  // if(resultList)
  const handleToItem = (item: IResult) => {
    const stackToc = stack[stack.length - 1];
    if (!stackToc) {
      stack.push(item);
    } else if (item.level > stackToc.level) {
      stackToc.children?.push(item);
      stack.push(item);
    } else {
      stack.pop();
      handleToItem(item);
    }
  };

  for (let i of list) {
    if (i.lvl < min) {
      min = i.lvl;
    }
  }

  for (let i of list) {
    const tocItem = createItem(i);
    if (tocItem.level === min) {
      // stack.push(createItem(i));
      resultList.push(tocItem);
    }
    handleToItem(tocItem);
  }
  return resultList;
};

export const handleHtmlContent = (content: string, data: IItem[]) => {
  let htmlContent = content;
  for (let i of data) {
    switch (i.lvl) {
      case 1: {
        let newStr = `<h1 id="${i.slug}">`;
        htmlContent = htmlContent.replace("<h1>", newStr);
        break;
      }
      case 2: {
        let newStr = `<h2 id="${i.slug}">`;
        htmlContent = htmlContent.replace("<h2>", newStr);

        break;
      }
      case 3: {
        let newStr = `<h3 id="${i.slug}">`;
        htmlContent = htmlContent.replace("<h3>", newStr);
        break;
      }
      case 4: {
        let newStr = `<h4 id="${i.slug}">`;
        htmlContent = htmlContent.replace("<h4>", newStr);
        break;
      }
      case 5: {
        let newStr = `<h5 id="${i.slug}">`;
        htmlContent = htmlContent.replace("<h5>", newStr);
        break;
      }
      case 6: {
        let newStr = `<h6 id="${i.slug}">`;
        htmlContent = htmlContent.replace("<h6>", newStr);
        break;
      }
    }
  }
  return htmlContent;
};
