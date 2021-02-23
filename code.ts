import { findBanner, serialize } from "./utils"

figma.showUI(__html__, {
  width: 480,
  height: 240
});


// let fn: FontName;

// const requireFontName = async (require: string) => {
//   await figma.listAvailableFontsAsync().
//     then(fonts => {
//       let recv = fonts.find(function (f) {
//         return f.fontName.family == require
//       })
//       fn = recv.fontName
//     })
// }

figma.ui.onmessage = async msg => {

  if (msg === "export") {
    exportImage()
  }
  else {

    let data = serialize(msg)
    for (let d of data) {
      if (d.fontFamily == undefined) {
        continue
      }
      await figma.loadFontAsync({ family: d.fontFamily, style: d.fontStyle })
    }

    let aggregateNodes: SceneNode[] = [];
    for (const node of figma.currentPage.selection) {
      switch (node.name) {
        case "主標":
          const mainTitle = <PageNode>figma.getNodeById(node.id)
          mainTitle.children.forEach(res => {
            switch (res.name) {
              case "cn":
                aggregateNodes.unshift(nodeSettlement(res, node.name, data))
                break
              case "en":
                aggregateNodes.unshift(nodeSettlement(res, node.name, data))
                break
              case "th":
                aggregateNodes.unshift(nodeSettlement(res, node.name, data))
                break
              case "mm":
                aggregateNodes.unshift(nodeSettlement(res, node.name, data))
                break
              case "vn":
                aggregateNodes.unshift(nodeSettlement(res, node.name, data))
                break
              case "id":
                aggregateNodes.unshift(nodeSettlement(res, node.name, data))
                break
            }
          })
          break
        case "小標":
          const subTitle = <PageNode>figma.getNodeById(node.id)
          subTitle.children.forEach(res => {
            switch (res.name) {
              case "cn":
                aggregateNodes.unshift(nodeSettlement(res, node.name, data))
                break
              case "en":
                aggregateNodes.unshift(nodeSettlement(res, node.name, data))
                break
              case "th":
                aggregateNodes.unshift(nodeSettlement(res, node.name, data))
                break
              case "mm":
                aggregateNodes.unshift(nodeSettlement(res, node.name, data))
                break
              case "vn":
                aggregateNodes.unshift(nodeSettlement(res, node.name, data))
                break
              case "id":
                aggregateNodes.unshift(nodeSettlement(res, node.name, data))
                break
            }
          })
          break
      }
    }
    figma.closePlugin();
  }
}

function nodeSettlement(childNode, titleType, excelData): SceneNode {
  childNode.visible = false
  let b = findBanner(childNode.name, titleType, excelData);
  childNode["characters"] = b.text //change banner title
  let cnTextNode = <TextNode>childNode;
  cnTextNode.fontName = { family: b.fontFamily, style: b.fontStyle }
  return childNode
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
