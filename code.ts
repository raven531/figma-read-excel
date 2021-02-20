
interface Banner {
  name: string
  region: string
  text: string
  fontStyle: string
}

figma.showUI(__html__, {
  width: 480,
  height: 240
});

figma.ui.onmessage = async msg => {
  if (msg === "close") {
    figma.closePlugin()
    return
  }
  if (msg === "export") {
    exportImage()
  }
  else {
    await figma.loadFontAsync({ family: "Yu Gothic UI", style: "Regular" })

    let data = serialize(msg)

    for (const node of figma.currentPage.selection) {
      switch (node.name) {
        case "主標":
          let mainTitle = <PageNode>figma.getNodeById(node.id);
          for (let child of mainTitle.children) {
            switch (child.name) {
              case "cn":
                child["characters"] = findCharacter(child.name, node.name, data);
                break
              case "th":
                child["characters"] = findCharacter(child.name, node.name, data);
                break
              case "mm":
                child["characters"] = findCharacter(child.name, node.name, data);
                break
              case "vn":
                child["characters"] = findCharacter(child.name, node.name, data);
                break
              case "id":
                child["characters"] = findCharacter(child.name, node.name, data);
                break
              case "en":
                child["characters"] = findCharacter(child.name, node.name, data);
                break
            }
          }
          break;
        case "小標":
          let subTitle = <PageNode>figma.getNodeById(node.id);
          for (let child of subTitle.children) {
            switch (child.name) {
              case "cn":
                child["characters"] = findCharacter(child.name, node.name, data);
                break
              case "th":
                child["characters"] = findCharacter(child.name, node.name, data);
                break
              case "mm":
                child["characters"] = findCharacter(child.name, node.name, data);
                break
              case "vn":
                child["characters"] = findCharacter(child.name, node.name, data);
                break
              case "id":
                child["characters"] = findCharacter(child.name, node.name, data);
                break
              case "en":
                child["characters"] = findCharacter(child.name, node.name, data);
                break
            }
          }
          break
      }
    }
    figma.closePlugin();
  }
}

let nodeName = "";

async function exportImage() {
  let setting: ExportSettingsImage;
  let receive = [];

  for (let node of figma.currentPage.selection) {
    nodeName = node.name;

    await node.exportAsync(setting)
      .then(res => {
        receive.push({ "name": nodeName, "buffer": res })
      })
      .catch(err => {
        console.log("Error: ", err)
      })
  }
  figma.ui.postMessage(receive) //send to ui
}

function findCharacter(region: string, name: string, elements: Banner[]): string {
  return elements.find(function (item) {
    return item.name === name && item.region === region
  }).text
}

function serialize(data: []): Banner[] {
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
          fontStyle: obj.FontStyle
        })
        break
      case "小標":
        banner.unshift({
          name: obj.Name,
          region: obj.Region,
          text: obj.Text,
          fontStyle: obj.FontStyle
        })
        break
    }
  }
  return banner
}