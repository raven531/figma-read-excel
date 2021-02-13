figma.showUI(__html__);

figma.ui.onmessage = msg => {
  console.log("msg: ", msg)
  figma.closePlugin();
}
