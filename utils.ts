
export interface Banner {
  name: string
  region: string
  text: string
  fontFamily: string
  fontStyle: string
  fontSize: number
  letterSpacing: number
}

export function findBanner(region: string, name: string, elements: Banner[]): Banner {
  return elements.find(function (item) {
    return item.name === name && item.region === region
  })
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
          fontStyle: obj.FontStyle,
          fontSize: obj.FontSize,
          letterSpacing: obj.LetterSpacing.split("%")[0]
        })
        break
      case "小標":
        banner.unshift({
          name: obj.Name,
          region: obj.Region,
          text: obj.Text,
          fontFamily: obj.FontFamily,
          fontStyle: obj.FontStyle,
          fontSize: obj.FontSize,
          letterSpacing: obj.LetterSpacing.split("%")[0]
        })
        break
    }
  }
  return banner
}