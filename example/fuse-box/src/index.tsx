import { render, version, Component } from 'inferno'

const container = document.getElementById('app')

class MyComponent extends Component<any, any> {
  private tsxVersion: number

  constructor(props, context) {
    super(props, context)

    this.tsxVersion = 2.71 /* This is typed value */
  }

  public render() {
    return (
      <div>
        <h1
          class={{
            circle: true,
            off: !true,
            on: true,
            textOff: !true,
          }}
        >{`Welcome to Inferno TSX version ${this.tsxVersion}`}</h1>
      </div>
    )
  }
}

render(<MyComponent />, container)
