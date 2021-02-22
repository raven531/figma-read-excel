import { findCharacter, serialize } from "./utils"


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
    let fn: FontName;

    const requireFontName = async (require: string) => {
      await figma.listAvailableFontsAsync().
        then(fonts => {
          let recv = fonts.find(function (f) {
            return f.fontName.family == require
          })
          fn = recv.fontName
        })
    }

    let data = serialize(msg)
    for (let d of data) {
      if (d.fontFamily == undefined) {
        continue
      }
      await figma.loadFontAsync({ family: d.fontFamily, style: d.fontStyle })
    }


    for (const node of figma.currentPage.selection) {
      switch (node.name) {
        case "主標":
          let mainTitle = <PageNode>figma.getNodeById(node.id);
          for (let child of mainTitle.children) {
            switch (child.name) {
              case "cn":
                await requireFontName("Yu Gothic")
                let result = findCharacter(child.name, node.name, data)
                child["characters"] = result;
                const cnTextNode = <TextNode>child;
                cnTextNode.fontName = fn
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
                await requireFontName("Yrsa")
                const enTextNode = <TextNode>child;
                enTextNode.fontName = fn
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

