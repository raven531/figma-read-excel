import { findBanner, serialize, Banner } from "./utils"

figma.showUI(__html__, {
  width: 500,
  height: 450
});

const settlement = "設置"
const preview = "預覽"
const mainTitle = "主標"
const subTitle = "小標"

let downloadObj = new Object()

figma.ui.onmessage = async msg => {
  if (msg === "export") {
    exportImage()
  }
  else {

    let data = serialize(msg)
    recomposeRow(data)

    //read fonts from excel
    for (let d of data) {
      if (d.fontFamily == undefined) {
        continue
      }
      await figma.loadFontAsync({ family: d.fontFamily, style: d.fontStyle })
    }

    //read fonts from current selected
    for (let child of getTitleNode()) {
      let txtNode = <TextNode>child["fontName"];
      if (txtNode === undefined) {
        continue
      }
      await figma.loadFontAsync({ family: txtNode["family"], style: txtNode["style"] })
    }


    for (let d of data) {
      if (d.text === undefined) {
        continue
      }

      figma.currentPage.children.forEach(res => {
        if (res.name === settlement) {
          const setNodes = <PageNode>figma.getNodeById(res.id)
          setNodes.children.forEach(node => {
            if (d.name == node.name) { //主標or 小標
              const titleNode = <PageNode>figma.getNodeById(node.id);
              titleNode.children.forEach(childNode => {
                if (childNode.name == d.region) { // region
                  nodeSettlement(childNode, d.name, data)
                }
              })
            }
          })
        }
      })
    }

    figma.ui.postMessage("success")
    // figma.closePlugin();
  }
}

function nodeSettlement(childNode, titleType, excelData): SceneNode {
  childNode.visible = false
  let b = findBanner(childNode.name, titleType, excelData);
  childNode["characters"] = b.text //change banner title
  let cnTextNode = <TextNode>childNode;
  cnTextNode.letterSpacing = <LetterSpacing>{ value: Number(b.letterSpacing), unit: "PERCENT" }
  cnTextNode.fontSize = Number(b.fontSize)
  cnTextNode.fontName = { family: b.fontFamily, style: b.fontStyle }
  return childNode
}

let nodeName = "";

async function exportImage() {
  let setting: ExportSettingsImage;

  let receive = [];

  const storeBuffer = async (lang: string) => {
    for (let child of figma.currentPage.children) {
      if (child.name === preview) {
        let frameNode = <InstanceNode>figma.getNodeById(child.id)
        for (let fn of frameNode.children) {
          nodeName = fn.name;
          await fn.exportAsync(setting).then(res => {
            receive.push({ "lang": lang, "name": nodeName, "buffer": res })
          })
        }
      }
    }
  }

  let lastElement = Object.keys(downloadObj).pop();

  for (const [k, _] of Object.entries(downloadObj)) {
    let filter = getTitleNode().filter(node => node.name === k)
    filter.forEach(res => { res.visible = true })
    // pass store buffer message to UI
    await storeBuffer(k).then(() => { console.log(k) })

    if (k === lastElement) { //prevent invisibility the last object
      continue
    }
    filter.forEach(res => { res.visible = false })
  }

  figma.ui.postMessage(receive) //send to ui
}

function recomposeRow(data: Banner[]) {
  for (let r of data) {
    if (downloadObj[r.region] == undefined) {
      downloadObj[r.region] = []
    }
    downloadObj[r.region].push(r.name)
  }
}

function getTitleNode(): SceneNode[] {
  let aggTxT = []

  figma.currentPage.children.forEach(res => {
    if (res.name === settlement) {
      const setNodes = <PageNode>figma.getNodeById(res.id)
      setNodes.children.forEach(res => {
        if (res.name === mainTitle || res.name === subTitle) {
          let titleNode = <PageNode>figma.getNodeById(res.id)
          titleNode.children.forEach(child => { aggTxT.unshift(child) })
        }
      })
    }
  })
  return aggTxT
}