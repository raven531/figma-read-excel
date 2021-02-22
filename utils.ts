
interface Banner {
  name: string
  region: string
  text: string
  fontFamily: string
  fontStyle: string
}

export function findCharacter(region: string, name: string, elements: Banner[]): string {
  return elements.find(function (item) {
    return item.name === name && item.region === region
  }).text
}

export function serialize(data: []): Banner[] {
  let banner: Banner[] = [];
  for (let d of data) {
    const stringify = JSON.stringify(d)
    const obj = JSON.parse(stringify)

    switch (obj.Name) {
      case "主標":
        banner.unshift({
          name: obj.Name,
          region: obj.Region,
          text: obj.Text,
          fontFamily: obj.FontFamily,
          fontStyle: obj.FontStyle
        })
        break
      case "小標":
        banner.unshift({
          name: obj.Name,
          region: obj.Region,
          text: obj.Text,
          fontFamily: obj.FontFamily,
          fontStyle: obj.FontStyle
        })
        break
    }
  }
  return banner
}