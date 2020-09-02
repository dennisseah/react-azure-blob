import { color } from "d3-color";
import { interpolateRgb } from "d3-interpolate";
import React, { Component } from "react";
import LiquidFillGauge from "react-liquid-gauge";

const style = {
  display: "flex",
  "flex-flow": "column",
  "align-items": "center",
};

class App extends Component {
  state = {
    value: 50,
  };
  startColor = "#6495ed"; // cornflowerblue
  endColor = "#dc143c"; // crimson

  render() {
    const radius = 100;
    const interpolate = interpolateRgb(this.startColor, this.endColor);
    const fillColor = interpolate(this.state.value / 100);
    const gradientStops = [
      {
        key: "0%",
        stopColor: color(fillColor)!.darker(0.5).toString(),
        stopOpacity: 1,
        offset: "0%",
      },
      {
        key: "50%",
        stopColor: fillColor,
        stopOpacity: 0.75,
        offset: "50%",
      },
      {
        key: "100%",
        stopColor: color(fillColor)!.brighter(0.5).toString(),
        stopOpacity: 0.5,
        offset: "100%",
      },
    ];

    return (
      <div style={style}>
        <LiquidFillGauge
          style={{ margin: "0 auto" }}
          width={radius * 2}
          height={radius * 2}
          value={this.state.value}
          percent="%"
          textSize={1}
          riseAnimation
          waveAnimation
          waveFrequency={2}
          waveAmplitude={1}
          gradient
          gradientStops={gradientStops}
          circleStyle={{
            fill: fillColor,
          }}
          waveStyle={{
            fill: fillColor,
          }}
          textStyle={{
            fill: color("#444")!.toString(),
            fontFamily: "Arial",
          }}
          waveTextStyle={{
            fill: color("#fff")!.toString(),
            fontFamily: "Arial",
          }}
          onClick={() => {
            this.setState({ value: Math.random() * 100 });
          }}
        />
        <div style={{ margin: "8px" }}>
          <button
            type="button"
            className="btn btn-default btn-block"
            onClick={() => {
              this.setState({ value: Math.random() * 100 });
            }}
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }
}

export default App;
