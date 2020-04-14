import * as ts from 'typescript'

export default function (sourceFile: ts.SourceFile, importMap: Object) {
  const props = []

  for (let key in importMap) {
    props.push(
      ts.createPropertyAssignment(
        ts.createLiteral(key),
        ts.createLiteral(importMap[key]),
      ),
    )
  }

  return ts.updateSourceFileNode(sourceFile, [
    ts.createVariableStatement(undefined, [
      ts.createVariableDeclaration(
        '_cc',
        undefined,
        ts.createPropertyAccess(
          ts.createCall(
            ts.createIdentifier('require'),
            [],
            [ts.createLiteral('classcat')],
          ),
          'default',
        ),
      ),
    ]),
    ...sourceFile.statements,
  ])
}
