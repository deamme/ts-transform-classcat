import * as ts from 'typescript'
import updateSourceFile from './utils/updateSourceFile'

export default () => {
  return (context: ts.TransformationContext): ts.Transformer<ts.SourceFile> => {
    return (sourceFile: ts.SourceFile) => {
      context['classcat'] = false

      let newSourceFile = ts.visitEachChild(sourceFile, visitor, context)

      if (context['classcat']) {
        newSourceFile = updateSourceFile(newSourceFile, context['classcat'])
      }

      return newSourceFile
    }

    function visitor(node: ts.Node): ts.VisitResult<ts.Node> {
      switch (node.kind) {
        case ts.SyntaxKind.JsxElement:
          return visit(node as ts.JsxElement, (node as ts.JsxElement).children)

        case ts.SyntaxKind.JsxSelfClosingElement:
          return visit(node as ts.JsxSelfClosingElement)

        default:
          return ts.visitEachChild(node, visitor, context)
      }
    }

    function visit(
      node: ts.JsxElement | ts.JsxSelfClosingElement,
      children?: ts.NodeArray<ts.JsxChild>,
    ) {
      let properties

      if (children) {
        properties = (node as any).openingElement.attributes.properties
        children.forEach((child) => visitor(child))
      } else {
        properties = (node as ts.JsxSelfClosingElement).attributes.properties
      }

      properties.forEach((prop: any) => {
        const propName = prop.name ? prop.name.text : ''
        if (propName === 'class' || propName === 'className') {
          if (prop.initializer.kind === ts.SyntaxKind.JsxExpression) {
            prop.initializer.expression = ts.createCall(
              ts.createIdentifier('_cc'),
              undefined,
              [prop.initializer.expression],
            )
            context['classcat'] = true
          }
        }
      })

      return node
    }
  }
}
